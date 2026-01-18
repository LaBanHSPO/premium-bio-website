# Cloudflare Pages - Next.js 14 Deployment Research

## Executive Summary

Cloudflare Pages is a JAMstack platform supporting Next.js 14 with git-based auto-deployment, Pages Functions for serverless API routes, and Cloudflare bindings (KV, D1, R2). The current app runs on Vercel with Edge Config; migrating to Pages requires build config changes, API route restructuring, and environment variable management.

---

## 1. Deployment Process Overview

### Git-Based (Recommended for Production)
- Connect GitHub repo via Cloudflare dashboard → Workers & Pages → Create
- Auto-deploys on push to main; preview deployments per branch/PR
- Framework detection auto-configures build command + output directory

### Direct Upload (CLI)
```bash
npx wrangler pages deploy ./dist --project-name=my-project --branch=staging
```

### Local Development
```bash
npm run build
npx wrangler pages dev ./dist
# Or proxy mode for SSR:
npx wrangler pages dev -- npm run dev
```

---

## 2. Configuration Requirements

### wrangler.toml (required for Pages Functions & bindings)
```toml
name = "premium-bio-website"
pages_build_output_dir = "./out"  # Next.js output with standalone
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]

# Example bindings (if used)
[[kv_namespaces]]
binding = "KV"
id = "namespace-id"

[[d1_databases]]
binding = "DB"
database_id = "db-id"
```

### Build Settings (Dashboard)
- **Build command**: `npm run build`
- **Output directory**: `out` (Next.js with `output: 'standalone'` in next.config.js)
- **Environment variables**: Set per environment via dashboard

### Environment Variables
- **Local**: `.dev.vars` (never commit)
- **Production**: `npx wrangler pages secret put KEY --project-name=my-project`
- Access in Pages Functions: `env.KEY`

---

## 3. Next.js Compatibility Notes

### Supported Features
- ✅ Static sites + SSR/SSG via Pages Functions
- ✅ Dynamic routes, API routes (migrate to `functions/api/`)
- ✅ Middleware (via `_middleware.ts` in functions dir)
- ✅ Image optimization (static assets)
- ✅ Incrementally Static Regeneration (ISR) via edge caching

### Limitations
- ⚠️ **No Node.js-only packages** in API routes (use `nodejs_compat` flag)
- ⚠️ **20-min build timeout** (current app should be fine)
- ⚠️ **1MB script limit** (compress/tree-shake if complex)
- ⚠️ **Vercel Edge Config unavailable** → migrate to Cloudflare KV or D1
- ⚠️ **100k Functions requests/day free tier** (sufficient for bio link app)

### Current Project
- **Framework**: Next.js 14.2.0 ✅
- **Styling**: Tailwind CSS + shadcn/ui ✅
- **State**: React Query ✅
- **Config storage**: Vercel Edge Config ❌ (must migrate to KV/D1)

---

## 4. API Route Migration Pattern

### Current Structure (Vercel)
```
app/api/config/route.ts        → GET /api/config
app/api/admin/update/route.ts  → POST /api/admin/update
```

### Pages Functions Structure
```
functions/api/config.ts         → GET /api/config
functions/api/admin/update.ts   → POST /api/admin/update
functions/_middleware.ts        → Auth/CORS middleware
```

### Example Conversion
**Before (Next.js app router)**:
```typescript
// app/api/config/route.ts
export async function GET(request: Request) {
  const config = await edgeConfig.getItem('bio');
  return Response.json(config);
}
```

**After (Pages Functions)**:
```typescript
// functions/api/config.ts
export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const config = await env.KV.get('bio', 'json');
  return Response.json(config);
};
```

### Middleware Pattern
```typescript
// functions/_middleware.ts
export const onRequest: PagesFunction[] = [
  async (context) => {
    if (context.request.url.includes('/admin/')) {
      const authHeader = context.request.headers.get('x-admin-secret');
      if (authHeader !== context.env.ADMIN_SECRET) {
        return new Response('Unauthorized', { status: 401 });
      }
    }
    return context.next();
  }
];
```

---

## 5. Build & Deploy Commands

### Local Development
```bash
npm install
npm run dev                          # Next.js dev server
npx wrangler pages dev ./out -- npm run dev  # With Pages bindings
```

### Production Build
```bash
npm run build
npx wrangler pages deploy ./out --project-name=premium-bio-website
```

### Environment Setup
```bash
# Local secrets
echo "ADMIN_SECRET=secret123" > .dev.vars

# Production
npx wrangler pages secret put ADMIN_SECRET --project-name=premium-bio-website
npx wrangler pages secret put EDGE_CONFIG_TOKEN --project-name=premium-bio-website
```

### Logs & Monitoring
```bash
npx wrangler pages deployment tail --project-name=premium-bio-website
npx wrangler pages deployments list --project-name=premium-bio-website
```

---

## 6. Key Configuration Changes

### next.config.js Updates
```javascript
const nextConfig = {
  output: 'standalone',  // Required for Pages Functions
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: process.env.DOMAIN },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' }
    ]
  }
};
module.exports = nextConfig;
```

### package.json Build Script
No change needed; `npm run build` works with Pages auto-detection.

### .gitignore Additions
```
.dev.vars
.wrangler/
dist/
out/
```

---

## 7. Data Storage Migration

### Current (Vercel Edge Config)
- Non-mutable config in Edge Config dashboard
- Requires Vercel API token + Edge Config ID

### Pages Alternative: Cloudflare KV
- **Pros**: Free tier, fast, simple API
- **Cons**: Eventual consistency, not ideal for large datasets
- **Use for**: Bio data, user config, caching

### Pages Alternative: Cloudflare D1
- **Pros**: SQL database, strong consistency
- **Cons**: Beta, limited query history
- **Use for**: If complex relational data needed

### Recommended Migration
1. **KV for config**: Bio data, links, products (JSON blobs)
2. **D1 for transactions**: If adding checkout/payments
3. **R2 for assets**: If storing large images

---

## Unresolved Questions

1. **What's the current data source?** Is bio config stored in Edge Config JSON or fetched from external API?
2. **Admin update flow**: Does `/api/admin/update` mutate Edge Config or call Vercel API?
3. **Payment integration scope**: Is Stripe/PayPal checkout part of initial migration or Phase 2?
4. **Analytics**: Currently using Vercel Analytics; can we use Cloudflare Analytics Engine instead?
5. **Domain setup**: Will the site run under `*.pages.dev` subdomain or custom domain via Cloudflare DNS?

---

**Status**: Research complete. Ready for implementation planning.
