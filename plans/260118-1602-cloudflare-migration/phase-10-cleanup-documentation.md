---
phase: 10
title: Cleanup & Documentation
date: 2026-01-18
priority: P1
status: pending
effort: 2h
dependencies: phase-09
---

# Phase 10: Cleanup & Documentation

## Context Links

- **Parent Plan**: [Migration Plan](./plan.md)
- **Previous**: [Phase 09: Testing & Validation](./phase-09-testing-validation.md)

## Overview

Remove Vercel dependencies, clean up old code, update documentation, archive Edge Config, finalize migration.

**Priority**: P1 (post-migration cleanup)
**Status**: pending
**Effort**: 2 hours
**Date**: 2026-01-18

## Key Insights

- Keep old Next.js API routes for 30 days as fallback
- Archive Edge Config, don't delete immediately
- Update README with Cloudflare deployment instructions
- Document new architecture and data flow
- Remove @vercel/* dependencies from package.json

## Requirements

### Functional
- Remove Vercel-specific dependencies
- Update README.md with new setup instructions
- Create architecture documentation
- Archive Edge Config data
- Document rollback procedure

### Non-Functional
- Documentation clear and comprehensive
- Migration timeline documented
- Troubleshooting guide created

## Architecture

No architecture changes, this phase focuses on cleanup and documentation.

## Related Code Files

### To Create
- `/docs/cloudflare-architecture.md` - New architecture doc
- `/docs/migration-log.md` - Migration timeline and notes
- `/docs/troubleshooting.md` - Common issues and solutions
- `/docs/rollback-procedure.md` - Emergency rollback steps

### To Modify
- `/README.md` - Update deployment instructions
- `/package.json` - Remove Vercel dependencies
- `/.env.example` - Update with Cloudflare variables

### To Delete (after 30 days)
- `/src/app/api/config/route.ts`
- `/src/app/api/admin/update/route.ts`
- `/src/app/api/admin/import/route.ts`
- `/src/app/api/admin/export/route.ts`

## Implementation Steps

### 1. Update README.md

```markdown
# Premium Bio Website - Cloudflare Edition

A modern bio link application built with Next.js and deployed on Cloudflare Pages with D1, KV, and R2.

## Features

- 🎨 Modern, responsive design
- 🔧 Dynamic configuration updates via admin panel
- 🔒 Secure session-based authentication
- 📱 Mobile-first design
- ⚡ Edge computing with Cloudflare Pages
- 🗄️ D1 SQLite database
- 💾 KV cache for performance
- 📦 R2 object storage for media
- 🎯 Support for:
  - Profile information
  - Social links
  - Bio links
  - Products showcase
  - Swipable carousel

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Database**: Cloudflare D1 (SQLite)
- **Cache**: Cloudflare KV
- **Storage**: Cloudflare R2
- **Deployment**: Cloudflare Pages
- **Forms**: React Hook Form + Zod validation

## Getting Started

### Prerequisites

- Node.js 18+
- Cloudflare account
- Wrangler CLI

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Cloudflare Resources

```bash
# Login to Cloudflare
wrangler login

# Create D1 database
wrangler d1 create premium-bio-db

# Create KV namespaces
wrangler kv:namespace create "CONFIG_CACHE"
wrangler kv:namespace create "SESSIONS"
wrangler kv:namespace create "RATE_LIMIT"

# Create R2 bucket
wrangler r2 bucket create bio-media
```

### 3. Configure wrangler.toml

Update `wrangler.toml` with your resource IDs:

```toml
[[d1_databases]]
binding = "DB"
database_id = "<your-d1-id>"

[[kv_namespaces]]
binding = "CONFIG_CACHE"
id = "<your-kv-id>"
# ... (repeat for other namespaces)
```

### 4. Run Database Migrations

```bash
wrangler d1 execute premium-bio-db --remote --file=./migrations/0001_initial_schema.sql
wrangler d1 execute premium-bio-db --remote --file=./migrations/0002_seed_default_profile.sql
wrangler d1 execute premium-bio-db --remote --file=./migrations/0003_admin_users.sql
```

### 5. Environment Setup

Create `.dev.vars` for local development:

```env
ADMIN_SECRET=your_secure_admin_secret
DOMAIN=localhost
NODE_ENV=development
```

### 6. Run Development Server

```bash
npm run build
npx wrangler pages dev ./out
```

Open [http://localhost:8788](http://localhost:8788) to see your bio page.

## Deployment

### Deploy to Cloudflare Pages

```bash
# Build and deploy
npm run build
npx wrangler pages deploy ./out --project-name=premium-bio-website
```

### Or use GitHub Actions

Push to `main` branch to trigger automatic deployment.

### Configure Environment Variables

In Cloudflare Dashboard: Workers & Pages > premium-bio-website > Settings > Environment Variables

Required variables:
- `ADMIN_SECRET`
- `DOMAIN`
- `NODE_ENV`
- `R2_PUBLIC_DOMAIN` (optional)

## Admin Panel

Access at `/admin` to manage your bio content.

Default credentials:
- Username: `admin`
- Password: `changeme123` (change immediately!)

## API Endpoints

- `GET /api/config` - Fetch current bio configuration
- `POST /api/admin/login` - Admin authentication
- `POST /api/admin/logout` - End admin session
- `POST /api/admin/update` - Update bio configuration
- `POST /api/admin/import` - Import bio data from JSON
- `GET /api/admin/export` - Export bio data to JSON

## Migration from Vercel

See `/docs/migration-log.md` for details on the Vercel to Cloudflare migration.

## Documentation

- [Architecture](./docs/cloudflare-architecture.md)
- [Migration Log](./docs/migration-log.md)
- [Troubleshooting](./docs/troubleshooting.md)
- [Rollback Procedure](./docs/rollback-procedure.md)

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

MIT License
```

### 2. Update package.json

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "deploy": "npm run build && wrangler pages deploy ./out --project-name=premium-bio-website",
    "migrate:export": "tsx scripts/export-edge-config.ts",
    "migrate:d1": "tsx scripts/migrate-edge-config-to-d1.ts",
    "migrate:validate": "tsx scripts/validate-migration.ts",
    "wrangler:dev": "npm run build && wrangler pages dev ./out",
    "db:migrate": "wrangler d1 execute premium-bio-db --remote --file=./migrations/0001_initial_schema.sql"
  },
  "dependencies": {
    // Remove these Vercel dependencies after testing:
    // "@vercel/edge-config": "^x.x.x",  // REMOVE after 30 days
  }
}
```

### 3. Update .env.example

```env
# Cloudflare Configuration
ADMIN_SECRET=your_secure_random_secret_min_32_chars
DOMAIN=yourdomain.com
NODE_ENV=production
R2_PUBLIC_DOMAIN=media.yourdomain.com

# Legacy Vercel (for migration only, remove after cutover)
# EDGE_CONFIG=...
# EDGE_CONFIG_ID=...
# EDGE_CONFIG_TOKEN=...
```

### 4. Create Architecture Documentation

```bash
cat > docs/cloudflare-architecture.md << 'EOF'
# Cloudflare Architecture

## Overview

Premium Bio Website runs on Cloudflare Pages with serverless Pages Functions, D1 database, KV cache, and R2 storage.

## Architecture Diagram

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│ Cloudflare Pages    │
│ (Next.js Static)    │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Pages Functions     │
│ (API Routes)        │
└──────┬──────────────┘
       │
       ├──────────────────┐
       │                  │
       ▼                  ▼
┌─────────────┐    ┌──────────────┐
│  KV Cache   │    │  D1 Database │
│             │    │  (SQLite)    │
│ • Config    │    │              │
│ • Sessions  │    │ • Profiles   │
│ • RateLimit │    │ • Links      │
└─────────────┘    │ • Products   │
                   │ • Carousel   │
                   └──────────────┘
                         │
                         ▼
                   ┌──────────────┐
                   │  R2 Storage  │
                   │  (Media)     │
                   └──────────────┘
```

## Data Flow

### Read Flow (GET /api/config)
1. Request → Pages Function
2. Check KV cache for profile data
3. If cache miss: Query D1 → Aggregate data → Store in KV
4. Return JSON response

### Write Flow (POST /api/admin/update)
1. Request → Middleware (auth check)
2. Validate session token in SESSIONS KV
3. Validate data with Zod schema
4. Begin D1 transaction:
   - Update profile
   - Delete old relations
   - Insert new links/products/tools
5. Commit transaction
6. Invalidate KV cache
7. Return success response

## Performance Characteristics

- **Cache hit**: <50ms response time
- **Cache miss**: <150ms (includes D1 query + aggregation)
- **Admin update**: <500ms (includes multi-table write + cache invalidation)
- **Global edge latency**: <100ms (Cloudflare's edge network)

## Security

- **Authentication**: Session-based with KV storage
- **Rate Limiting**: 5 failed login attempts = 15min lockout
- **SQL Injection**: Prevented via prepared statements
- **XSS**: React's built-in escaping + Content Security Policy
- **CORS**: Configured in middleware for API endpoints

## Scaling

- **D1**: 10GB database limit, supports millions of profiles
- **KV**: 1GB storage, 100k reads/day free tier
- **R2**: 10GB storage, unlimited bandwidth within Cloudflare
- **Pages Functions**: Auto-scales with traffic

## Monitoring

- Cloudflare Analytics (built-in)
- Wrangler logs: `wrangler pages deployment tail`
- D1 metrics in dashboard
EOF
```

### 5. Create Migration Log

```bash
cat > docs/migration-log.md << 'EOF'
# Migration Log: Vercel to Cloudflare

## Timeline

- **2026-01-18**: Migration planning initiated
- **Phase 01-04**: Infrastructure setup (4h)
- **Phase 05-06**: API migration and admin updates (10h)
- **Phase 07**: Data migration from Edge Config (3h)
- **Phase 08**: Build and deploy configuration (2h)
- **Phase 09**: Testing and validation (4h)
- **Phase 10**: Cleanup and documentation (2h)

**Total effort**: ~25 hours over 3-4 days

## Key Changes

### Infrastructure
- **Before**: Vercel Edge Functions + Edge Config
- **After**: Cloudflare Pages Functions + D1 + KV + R2

### Data Storage
- **Before**: Vercel Edge Config (JSON blob)
- **After**: D1 SQLite (relational schema)

### Cache
- **Before**: None (Edge Config is fast)
- **After**: KV cache with 1h TTL

### Authentication
- **Before**: Simple ADMIN_SECRET header
- **After**: Session-based auth with rate limiting

## Migration Challenges

1. **D1 beta limitations**: Worked around with careful query design
2. **Password hashing in Workers**: Used Web Crypto API (PBKDF2) instead of bcrypt
3. **Edge Config migration**: Required custom transformation script
4. **Cache invalidation**: Implemented aggressive TTLs to handle updates

## Rollback Triggers

- Critical bugs affecting data integrity
- Performance degradation >2x slower
- D1 availability issues
- Auth system failures

## Post-Migration Monitoring

- Monitor D1 query performance for 48h
- Check cache hit rate (target >80%)
- Validate data integrity daily for 7 days
- Keep Edge Config as read-only backup for 30 days

## Lessons Learned

- Test bindings locally before production
- Use atomic D1 batch operations for multi-table updates
- Implement rate limiting from day one
- Document all resource IDs in wrangler.toml

## Future Improvements

- Add media upload to R2 (Phase 2)
- Implement forgot password flow
- Add admin user management
- Setup Sentry for error tracking
- Implement E2E tests with Playwright
EOF
```

### 6. Create Troubleshooting Guide

```bash
cat > docs/troubleshooting.md << 'EOF'
# Troubleshooting Guide

## Common Issues

### Build Failures

**Issue**: `npm run build` fails with TypeScript errors

**Solution**:
```bash
# Verify Node.js version
node --version  # Should be 18+

# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Bindings Not Found

**Issue**: `env.DB is undefined` in Pages Functions

**Solution**:
```bash
# Verify wrangler.toml has correct IDs
wrangler d1 list
wrangler kv:namespace list
wrangler r2 bucket list

# Update wrangler.toml with correct IDs
# Redeploy
```

### Admin Login Fails

**Issue**: Login returns 401 even with correct password

**Solution**:
```bash
# Check admin_users table
wrangler d1 execute premium-bio-db --remote --command="SELECT * FROM admin_users"

# Reset password if needed
wrangler d1 execute premium-bio-db --remote --command="UPDATE admin_users SET password_hash='<new-hash>' WHERE username='admin'"
```

### Cache Not Invalidating

**Issue**: Updates don't reflect on frontend

**Solution**:
```bash
# Manually clear cache
wrangler kv:key delete --binding=CONFIG_CACHE "profile:yourdomain.com"

# Check cache keys
wrangler kv:key list --binding=CONFIG_CACHE

# Verify update endpoint invalidates cache (check logs)
```

### Slow Response Times

**Issue**: API responses >500ms

**Solution**:
```bash
# Check D1 query performance
wrangler d1 execute premium-bio-db --remote --command="EXPLAIN QUERY PLAN SELECT * FROM profiles WHERE username='default'"

# Add missing indexes if needed
wrangler d1 execute premium-bio-db --remote --command="CREATE INDEX idx_name ON table(column)"

# Verify cache is working
curl -w "%{time_total}" http://yoursite.com/api/config
```

### Migration Script Errors

**Issue**: `migrate-edge-config-to-d1.ts` fails

**Solution**:
```bash
# Check environment variables
cat .env.local | grep EDGE_CONFIG

# Verify Edge Config access
curl -H "Authorization: Bearer $EDGE_CONFIG_TOKEN" \
  https://api.vercel.com/v1/edge-config/$EDGE_CONFIG_ID/items

# Run migration in debug mode
tsx scripts/migrate-edge-config-to-d1.ts --verbose
```

## Getting Help

- Check Cloudflare docs: https://developers.cloudflare.com/pages/
- Cloudflare Discord: https://discord.gg/cloudflaredev
- GitHub Issues: [your-repo]/issues
EOF
```

### 7. Create Rollback Procedure

```bash
cat > docs/rollback-procedure.md << 'EOF'
# Rollback Procedure

## When to Rollback

Rollback if:
- Critical data integrity issues
- Auth system completely broken
- Performance degradation >5x
- D1 database unavailable for >10 minutes

## Emergency Rollback Steps

### Option 1: Revert to Vercel (Full Rollback)

```bash
# 1. Revert code to pre-migration commit
git revert <migration-commit-hash>
git push origin main

# 2. Redeploy to Vercel
vercel --prod

# 3. Restore Edge Config from backup
curl -X PATCH \
  -H "Authorization: Bearer $EDGE_CONFIG_TOKEN" \
  -H "Content-Type: application/json" \
  -d @data/backups/edge-config-backup-*.json \
  https://api.vercel.com/v1/edge-config/$EDGE_CONFIG_ID/items

# 4. Verify Vercel deployment working
curl https://yourdomain.com/api/config
```

### Option 2: Keep Cloudflare, Rollback Data (Partial)

```bash
# 1. Re-import Edge Config backup to D1
npm run migrate:d1

# 2. Validate data
npm run migrate:validate

# 3. Clear all KV caches
wrangler kv:key delete --binding=CONFIG_CACHE --all

# 4. Restart Pages deployment
wrangler pages deployment create --project-name=premium-bio-website
```

### Option 3: Hybrid Mode (Dual Read)

**Not implemented in current version**. Would require:
- Modify `functions/api/config.ts` to try D1 first, fallback to Edge Config
- Keep both systems running for 7 days
- Gradually increase D1 traffic %

## Post-Rollback

1. Document root cause
2. Fix issues in staging environment
3. Re-test thoroughly
4. Attempt migration again with fixes

## Rollback Deadline

- **Days 1-7**: Easy rollback (Edge Config still has data)
- **Days 8-30**: Harder rollback (need backup restoration)
- **After 30 days**: No rollback (Edge Config archived)
EOF
```

### 8. Archive Edge Config

```bash
# Export final backup
npm run migrate:export

# Move to archive folder
mkdir -p data/archive
mv data/backups/edge-config-backup-*.json data/archive/

# Document in archive README
cat > data/archive/README.md << 'EOF'
# Edge Config Archive

This directory contains backups from the Vercel Edge Config before migration to Cloudflare D1.

**Do not delete for 90 days** (until 2026-04-18).

## Files
- `edge-config-backup-*.json`: Full Edge Config export at migration time

## Restoration
If needed, restore with:
```bash
npm run migrate:d1
```
EOF
```

### 9. Remove Vercel Dependencies (after 30 days)

```bash
# Schedule for 30 days from now (2026-02-18)
# Remove from package.json:
# - @vercel/edge-config
# - Any other Vercel-specific packages

# Remove old API route files:
# rm -rf src/app/api/config/route.ts
# rm -rf src/app/api/admin/update/route.ts
# rm -rf src/app/api/admin/import/route.ts
# rm -rf src/app/api/admin/export/route.ts
```

### 10. Update Project Documentation

```bash
# Add to project README
echo "## Migration Complete

Migrated from Vercel to Cloudflare on 2026-01-18.

See [Migration Log](./docs/migration-log.md) for details.
" >> README.md
```

## Todo List

- [ ] Update README.md with Cloudflare instructions
- [ ] Remove @vercel/edge-config from package.json (after 30 days)
- [ ] Update .env.example with Cloudflare variables
- [ ] Create docs/cloudflare-architecture.md
- [ ] Create docs/migration-log.md
- [ ] Create docs/troubleshooting.md
- [ ] Create docs/rollback-procedure.md
- [ ] Archive Edge Config backup to data/archive/
- [ ] Schedule old API routes deletion (30 days)
- [ ] Notify team of migration completion
- [ ] Update project documentation

## Success Criteria

- [ ] README.md reflects new Cloudflare setup
- [ ] All documentation created and accurate
- [ ] Edge Config archived with README
- [ ] Vercel dependencies documented for removal
- [ ] Troubleshooting guide covers common issues
- [ ] Rollback procedure documented and tested (in staging)

## Risk Assessment

No critical risks in this phase. Main focus is documentation quality.

## Security Considerations

- **Edge Config backup**: Contains production data, keep secure
- **Documentation**: Don't include actual secrets or IDs
- **Archive retention**: Keep backups for 90 days minimum

## Next Steps

1. Monitor production for 7 days
2. Remove Vercel dependencies after 30 days
3. Delete old API routes after 30 days
4. Archive Edge Config permanently after 90 days

---

## Unresolved Questions

- When to completely delete Edge Config from Vercel?
- Should we keep dual setup for emergency rollback?
- Need to update team documentation or wiki?
