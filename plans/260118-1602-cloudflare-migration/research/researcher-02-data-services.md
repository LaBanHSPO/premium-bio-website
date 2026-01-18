# Cloudflare D1, KV, R2 Integration Research

**Date:** 2026-01-18 | **Researcher:** general-purpose | **Project:** Premium Bio Website Migration

---

## Executive Summary

Cloudflare's data services provide a comprehensive stack for migrating from Vercel Edge Config to serverless architecture. D1 (SQLite) offers structured data, KV provides distributed cache/sessions, and R2 handles media storage. Combined, they enable a fully decoupled bio page system deployable on Cloudflare Pages Functions.

---

## 1. D1 Schema Design for Bio Data

### Recommended Schema

```sql
-- Users/Profiles (core entity)
CREATE TABLE profiles (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  tagline TEXT,
  avatar_url TEXT,
  cover_url TEXT,
  bio TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Social Links
CREATE TABLE social_links (
  id TEXT PRIMARY KEY,
  profile_id TEXT NOT NULL,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  display_label TEXT,
  order_index INTEGER,
  FOREIGN KEY (profile_id) REFERENCES profiles(id),
  UNIQUE (profile_id, platform)
);

-- Bio Links (clickable links)
CREATE TABLE bio_links (
  id TEXT PRIMARY KEY,
  profile_id TEXT NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  icon_url TEXT,
  order_index INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (profile_id) REFERENCES profiles(id)
);

-- Products
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  profile_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price REAL NOT NULL,
  image_url TEXT,
  stripe_product_id TEXT,
  order_index INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (profile_id) REFERENCES profiles(id)
);

-- Tools/Carousel Items
CREATE TABLE carousel_items (
  id TEXT PRIMARY KEY,
  profile_id TEXT NOT NULL,
  title TEXT NOT NULL,
  image_url TEXT,
  order_index INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (profile_id) REFERENCES profiles(id)
);

-- Track auth attempts (for rate limiting)
CREATE TABLE auth_attempts (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  success BOOLEAN
);

CREATE INDEX idx_profile_username ON profiles(username);
CREATE INDEX idx_social_profile ON social_links(profile_id);
CREATE INDEX idx_bio_links_profile ON bio_links(profile_id);
CREATE INDEX idx_products_profile ON products(profile_id);
```

**Size Estimate:** ~500KB per profile with full data. 10GB D1 limit supports ~20M profiles.

---

## 2. KV Use Cases & Key Strategies

### Configuration Cache
- **Key:** `config:{profile_id}`
- **TTL:** 3600s (1 hour)
- **Content:** Aggregated profile + links + products JSON
- **Benefit:** Minimize D1 reads on page load

### Session Management
- **Key:** `session:{token}`
- **TTL:** 86400s (24 hours)
- **Metadata:** { admin_id, username, role }
- **Pattern:** Generate UUID token on login, store in KV

### Rate Limiting & Auth
- **Key:** `auth_attempt:{username}`
- **TTL:** 300s (5 minutes)
- **Value:** Incremental counter
- **Threshold:** 5 attempts triggers 15min lockout

### Username Lookup Cache
- **Key:** `username:{name}` → profile_id
- **TTL:** 86400s
- **Benefit:** Fast profile routing without D1 lookup

### Feature Flags
- **Key:** `feature:{flag_name}`
- **Value:** JSON with enabled/rules
- **Pattern:** Update cache via admin without D1 redeploy

---

## 3. R2 Media Storage Architecture

### Bucket Structure
```
bio-media/
├── profiles/{profile_id}/
│   ├── avatar.{ext}
│   ├── cover.{ext}
│   └── carousel/{item_id}.{ext}
├── products/{product_id}/
│   └── image.{ext}
└── tmp/{upload_id}/
```

### Use Cases
- **Profile avatars/covers:** Medium-resolution images (500KB-2MB)
- **Product images:** Compressed thumbnails (100-500KB)
- **Carousel items:** Optimized for swipe UX
- **Temp storage:** Multi-part uploads before DB commit

### Benefits Over D1 BLOBs
- Unlimited storage (D1 1MB row limit blocks >4 images)
- CDN distribution via Cloudflare cache
- Zero egress fees within Cloudflare ecosystem
- Signed URLs for private/public access

---

## 4. wrangler.toml Binding Configuration

```toml
[env.production]
name = "premium-bio"
main = "src/index.ts"

[[env.production.d1_databases]]
binding = "DB"
database_name = "premium-bio-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

[[env.production.kv_namespaces]]
binding = "CONFIG_CACHE"
id = "kv-namespace-id-1"

[[env.production.kv_namespaces]]
binding = "SESSIONS"
id = "kv-namespace-id-2"

[[env.production.kv_namespaces]]
binding = "RATE_LIMIT"
id = "kv-namespace-id-3"

[[env.production.r2_buckets]]
binding = "MEDIA"
bucket_name = "bio-media"
jurisdiction = "eu"  # Optional: GDPR compliance
```

---

## 5. CRUD Operation Patterns

### Read Profile (D1 + KV Cache)
```typescript
async function getProfile(username: string, db: D1Database, cache: KVNamespace): Promise<Profile> {
  const cached = await cache.get<Profile>(`profile:${username}`, "json");
  if (cached) return cached;

  const profile = await db.prepare(`
    SELECT p.*,
           json_group_array(json_object('platform', s.platform, 'url', s.url)) as socials
    FROM profiles p
    LEFT JOIN social_links s ON p.id = s.profile_id
    WHERE p.username = ?
    GROUP BY p.id
  `).bind(username).first<Profile>();

  if (profile) await cache.put(`profile:${username}`, JSON.stringify(profile), { expirationTtl: 3600 });
  return profile;
}
```

### Create Product with Image (D1 + R2)
```typescript
async function createProduct(profileId: string, productData: ProductInput, imageFile: File) {
  const productId = crypto.randomUUID();
  const imageKey = `products/${productId}/image.${imageFile.type.split('/')[1]}`;

  // Upload to R2
  await env.MEDIA.put(imageKey, await imageFile.arrayBuffer());
  const imageUrl = `https://cdn.example.com/${imageKey}`;

  // Store metadata in D1
  await env.DB.prepare(`
    INSERT INTO products (id, profile_id, name, description, price, image_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(productId, profileId, productData.name, productData.description, productData.price, imageUrl).run();

  // Invalidate cache
  await env.CONFIG_CACHE.delete(`config:${profileId}`);
  return { id: productId, imageUrl };
}
```

### Update Profile (D1 + Cache Invalidation)
```typescript
async function updateProfile(profileId: string, updates: Partial<Profile>) {
  const setClause = Object.keys(updates).map(k => `${k} = ?`).join(', ');
  const values = [...Object.values(updates), profileId];

  await env.DB.prepare(`UPDATE profiles SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`)
    .bind(...values).run();

  // Invalidate all caches for this profile
  const username = (await env.DB.prepare(`SELECT username FROM profiles WHERE id = ?`).bind(profileId).first()).username;
  await env.CONFIG_CACHE.delete(`profile:${username}`);
}
```

---

## 6. Authentication with KV for Admin Secrets

### Password Validation Pattern
```typescript
async function authenticateAdmin(username: string, password: string, env: Env): Promise<string | null> {
  // Check rate limiting
  const attemptKey = `auth_attempt:${username}`;
  const attempts = parseInt(await env.RATE_LIMIT.get(attemptKey) || '0');
  if (attempts >= 5) return null;

  // Query D1 for stored hash
  const user = await env.DB.prepare(`SELECT password_hash FROM admin_users WHERE username = ?`).bind(username).first<{password_hash: string}>();
  if (!user) {
    await env.RATE_LIMIT.put(attemptKey, String(attempts + 1), { expirationTtl: 300 });
    return null;
  }

  // Verify password (using bcrypt or similar)
  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    await env.RATE_LIMIT.put(attemptKey, String(attempts + 1), { expirationTtl: 300 });
    return null;
  }

  // Generate session token
  const token = crypto.randomUUID();
  await env.SESSIONS.put(`session:${token}`, JSON.stringify({ username, admin: true }), { expirationTtl: 86400 });

  // Clear rate limit on success
  await env.RATE_LIMIT.delete(attemptKey);
  return token;
}

async function verifySession(token: string, env: Env): Promise<boolean> {
  const session = await env.SESSIONS.get(`session:${token}`, "json");
  return !!session;
}
```

---

## 7. Data Migration from Edge Config

### Migration Strategy
1. **Export current Edge Config** to JSON
2. **Normalize data** to match D1 schema (profile, links, products, tools)
3. **Upload media** to R2 (extract image URLs from Edge Config)
4. **Bulk insert** into D1 via `db.batch()` for atomic consistency
5. **Warm KV cache** with migrated configs
6. **Dual-write period** (24-48h): Edge Config + D1, read from D1
7. **Cutover:** Update routing to D1-only, archive Edge Config

### Batch Migration Code
```typescript
async function migrateEdgeConfigToD1(edgeConfigData: any[], env: Env) {
  const statements = [];

  for (const profile of edgeConfigData) {
    statements.push(env.DB.prepare(`
      INSERT INTO profiles (id, username, display_name, tagline, avatar_url, cover_url, bio)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(profile.id, profile.username, profile.name, profile.tagline, profile.avatar, profile.cover, profile.bio));

    // Migrate links
    for (const link of profile.bioLinks || []) {
      statements.push(env.DB.prepare(`
        INSERT INTO bio_links (id, profile_id, title, url, description, order_index)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(crypto.randomUUID(), profile.id, link.title, link.url, link.description, link.order));
    }
  }

  // Execute atomically
  await env.DB.batch(statements);
}
```

---

## 8. Binding & Environment Variables

### Required Env Vars for Pages Functions
```env
D1_DATABASE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
KV_NAMESPACE_ID_CONFIG=kv-id-1
KV_NAMESPACE_ID_SESSIONS=kv-id-2
KV_NAMESPACE_ID_RATE_LIMIT=kv-id-3
R2_BUCKET_NAME=bio-media
R2_ACCOUNT_ID=your-account-id
ADMIN_SECRET=secure-bcrypt-hash-of-secret
DOMAIN=premiumbiodemo.com
```

### Pages Function Context Type
```typescript
type Env = {
  DB: D1Database;
  CONFIG_CACHE: KVNamespace;
  SESSIONS: KVNamespace;
  RATE_LIMIT: KVNamespace;
  MEDIA: R2Bucket;
  DOMAIN: string;
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Route handling with bindings
  }
};
```

---

## Key Insights

1. **D1 as primary:** All structured data; 10GB/DB limit requires multi-tenant namespacing per domain
2. **KV for speed:** Cache aggregated profiles; ~100ms latency improvement vs direct D1
3. **R2 mandatory:** Media storage separates from DB row limits; zero egress benefits multi-cdn setup
4. **Session security:** KV + rate limiting + token expiry = stateless auth without DB overhead
5. **Atomic batches:** Use `DB.batch()` for multi-table operations (profile + links + products)
6. **TTL discipline:** Aggressive cache TTLs (1-24h) reduce D1 query volume 10-100x

---

## Unresolved Questions

- [ ] Should profile IDs use username or UUID? (UUID more flexible, username simpler UX)
- [ ] How to handle image resizing/optimization before R2 upload? (Cloudflare Images API?)
- [ ] Multi-region failover strategy for D1? (Per-region replicas vs single primary?)
- [ ] Encryption for sensitive data in KV (sessions, admin tokens)? (Cloudflare KV doesn't encrypt by default)
- [ ] Data retention policy for auth_attempts and logs? (Archive to R2 after 30d?)
