# System Architecture

**Last Updated**: 2026-01-18 | **Version**: 1.0

## Architecture Overview

Premium Bio Website follows a modern edge-first architecture with Cloudflare infrastructure at its core.

### High-Level Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                   User Requests                             │
│  (Desktop, Mobile, Tablet via HTTPS)                       │
└────────────────────────┬────────────────────────────────────┘
                         │
         ┌───────────────┴───────────────┐
         ▼                               ▼
    Public Bio Pages           Admin Panel
    (Static Export)            (Protected)
         │                         │
    ┌────┴─────────────────────────┴─────┐
    ▼                                    ▼
┌──────────────────────────────────────────────────┐
│        Cloudflare Pages (Edge Deployment)        │
│                                                  │
│  ├─ Static assets (cached globally)             │
│  ├─ API routes (serverless functions)           │
│  └─ Request routing & middleware                │
└──────────────┬─────────────┬────────────────────┘
               │             │
    ┌──────────┴─┐     ┌────┴──────────┐
    ▼            ▼     ▼               ▼
  KV Store   D1 DB   R2 Bucket   Image Optimization
 (Config,  (Users,  (Uploads,    (Cloudflare)
 Sessions) Products) Exports)
```

## Component Architecture

### 1. Frontend Layer

**Technology**: Next.js 14 App Router with Static Export

#### Key Components

```
src/app/
├── layout.tsx (Root wrapper with providers)
├── page.tsx (Bio page - main public interface)
├── not-found.tsx (404 handling)
├── providers.tsx (React Context providers)
└── admin/
    └── page.tsx (Admin dashboard - protected)
```

#### Data Flow

```
User Browser
    ↓ (HTTP GET /bio/[domain])
    ↓
Cloudflare CDN (cache hit 99%)
    ↓ (cache miss)
    ↓
Next.js Static HTML (./out/bio/[domain]/index.html)
    ↓
React Hydration on Client
    ↓
Interactive UI (handle click events, forms)
```

#### Admin Panel Flow

```
Admin User
    ↓ (navigate to /admin)
    ↓ (enters ADMIN_SECRET in form)
    ↓
Auth Validation (client-side + server-side)
    ↓ (if valid)
    ↓
Admin Dashboard (load user config from API)
    ↓ (user makes edits)
    ↓
POST /api/admin/update with payload
    ↓
Config updated in KV/D1
    ↓
Toast notification (success)
```

### 2. API Layer

**Technology**: Next.js API Routes (serverless on Cloudflare Pages)

#### Endpoints

| Endpoint | Method | Purpose | Implementation |
|----------|--------|---------|-----------------|
| `/api/config` | GET | Fetch bio configuration | Read from KV/D1 |
| `/api/admin/update` | POST | Update configuration | Write to KV/D1 + invalidate cache |
| `/api/admin/import` | POST | Import bio data from JSON | Bulk insert into D1 |
| `/api/admin/export` | GET | Export bio data | Serialize from D1 to JSON |

#### Request/Response Flow

```
POST /api/admin/update
├─ Validate ADMIN_SECRET header
├─ Parse request body
├─ Validate with Zod schema
├─ Update database (D1)
├─ Update cache (KV)
├─ Return { success: true, data: {...} }
└─ Client receives response → update UI
```

### 3. Data Layer

**Technology**: Cloudflare D1 (SQLite) + KV (Key-Value Cache)

#### D1 Database Schema (Planned)

```sql
-- Users table
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  domain TEXT UNIQUE NOT NULL,
  admin_secret_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Profile information
CREATE TABLE profiles (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT,
  avatar_url TEXT,
  cover_url TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Bio links
CREATE TABLE bio_links (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  position INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Social links
CREATE TABLE social_links (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Products
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  image_url TEXT,
  position INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

#### KV Namespace Structure

```
kv-namespaces:
├── bio-config
│   ├── "domain:example.com" → { profile, links, products, social }
│   ├── "domain:test.com" → {...}
│   └── "cache:buster:..." → timestamp
├── sessions
│   ├── "session:abc123def456" → { userId, expiresAt }
│   └── ...
└── temp-data
    ├── "export:user123:xyz789" → { data, expiresAt }
    └── ...
```

**Cache Strategy**:
- Config cache TTL: 5 minutes
- Session cache TTL: 24 hours
- Export data TTL: 1 hour

### 4. Storage Layer

**Technology**: Cloudflare R2 (S3-compatible object storage)

#### Bucket Structure

```
r2-bucket:
├── avatars/
│   ├── domain1-avatar.jpg
│   └── domain2-avatar.jpg
├── covers/
│   ├── domain1-cover.jpg
│   └── ...
├── products/
│   ├── product-001.jpg
│   └── ...
├── exports/
│   ├── domain1-export-2026-01-18.json
│   └── ...
└── temp/
    └── (temporary upload staging)
```

### 5. Configuration Layer

**File**: `wrangler.toml`

```toml
name = "premium-bio-website"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = "./out"

# Bindings (Phase 02-04)
# [[d1_databases]]
# [[kv_namespaces]]
# [[r2_buckets]]
```

## Data Flow Patterns

### Read Flow (Get Bio Config)

```
User Request: GET /bio/example.com
    ↓
Cloudflare Cache Check (KV)
    ├─ Hit: Return cached HTML (instant)
    └─ Miss:
        ↓
        Next.js Static Export (./out/bio/example.com/index.html)
        ↓
        Browser receives HTML + JS bundle
        ↓
        Client-side API call: GET /api/config
        ↓
        API checks KV cache
        ├─ Hit: Return cached config
        └─ Miss:
            ↓
            Query D1 database
            ↓
            Store in KV (5 min TTL)
            ↓
            Return JSON to client
        ↓
        React renders updated UI with fresh data
```

### Write Flow (Update Config)

```
Admin User: POST /api/admin/update
    ↓
Validate ADMIN_SECRET
    ├─ Invalid: Return 401 error
    └─ Valid:
        ↓
        Validate request body (Zod)
        ├─ Invalid: Return 400 error
        └─ Valid:
            ↓
            Update D1 database (transaction)
            ├─ Failure: Return 500 error
            └─ Success:
                ↓
                Invalidate KV cache (delete old entry)
                ↓
                Trigger cache purge via Cloudflare API (optional)
                ↓
                Return { success: true, data: {...} }
                ↓
                Client receives response
                ↓
                Refetch config API to get fresh data
                ↓
                Update UI with new state
```

## Security Architecture

### Authentication Flow

```
Admin Panel
    ↓ (user enters password)
    ↓
Client-side validation (empty check)
    ↓
POST /api/admin/update with ADMIN_SECRET header
    ↓
Server validation:
    ├─ Check header exists
    ├─ Compare with env var ADMIN_SECRET
    ├─ Constant-time comparison (prevent timing attacks)
    ├─ Log failed attempts (optional)
    └─ Return 401 if mismatch
        ↓
    ├─ Success: Process request
    └─ Failure: Deny operation
```

### Data Protection

```
Sensitive Data (Admin Secret)
    ↓
Environment Variable (never in code)
    ↓
.dev.vars (local, not committed)
Cloudflare Dashboard Secrets (production)
    ↓
Used for header validation only
    ↓
Never exposed to client
    ↓
Logged request details (no secrets)
```

## Deployment Architecture

### Build Process

```
Developer: git push origin main
    ↓
GitHub webhook → Cloudflare Pages
    ↓
Cloudflare builds project:
    ├─ npm install
    ├─ npm run build (Next.js export)
    ├─ Output: ./out directory
    └─ Deploy to global edge network
        ↓
        Assets replicated to 200+ data centers
        ↓
        DNS updated to point to Cloudflare
        ↓
        Users receive content from nearest edge
```

### Local Development

```
Developer: npm run build
    ↓
Next.js generates static export (./out)
    ↓
Developer: npx wrangler pages dev ./out
    ↓
Wrangler emulates Cloudflare Pages locally
    ├─ Serves static files
    ├─ Emulates API routes
    ├─ Emulates KV/D1 bindings
    └─ Server runs on http://localhost:8788
        ↓
        Developer tests locally
        ↓
        Commits changes
        ↓
        Pushes to GitHub
```

## Scalability Considerations

### Current (Free Tier)
- 100k Pages Functions requests/day
- 10GB D1 storage
- 5GB R2 storage
- 1M cached assets

### Growth Path

| Scale | Actions | Services |
|-------|---------|----------|
| 1k users | Current setup sufficient | Free tier |
| 10k users | Monitor KV hit ratio, add indexes | Free tier + analytics |
| 100k users | Consider paid tier, optimize queries | Paid plan + cache rules |
| 1M+ users | Database sharding, multi-region | Enterprise plan |

## Performance Optimization

### Caching Strategy

1. **CDN Level** (Cloudflare):
   - Static HTML: Cache everything, 1 year TTL
   - API responses: Cache GET requests, 5 min TTL
   - Images: Optimize + cache, 30 day TTL

2. **Application Level** (KV):
   - Bio config: 5 min TTL
   - Sessions: 24 hour TTL
   - Generated exports: 1 hour TTL

3. **Database Level** (D1):
   - Indexes on frequently queried columns
   - Pagination for list endpoints
   - Query optimization via EXPLAIN PLAN

### Load Testing

Target metrics:
- P50: < 50ms (config read)
- P95: < 100ms (config read)
- P99: < 200ms (config read)
- Admin operations: < 500ms

---

## Related Documentation

- [Code Standards](./code-standards.md) - Implementation details
- [Deployment Guide](./deployment-guide.md) - Deployment procedures
- [Project Overview](./project-overview-pdr.md) - Business requirements
