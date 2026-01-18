---
title: Cloudflare Migration Plan - Summary Report
date: 2026-01-18
author: general-purpose planner
status: complete
---

# Cloudflare Migration Plan - Summary Report

## Overview

Comprehensive migration plan created for transitioning Premium Bio Website from Vercel (Edge Config) to Cloudflare (Pages + D1 + KV + R2).

**Plan Location**: `/Users/mbpprm/Documents/mybuild/for-free/premium-bio-website/plans/260118-1602-cloudflare-migration/`

## Plan Structure

### Master Plan
- **File**: `plan.md`
- **Content**: Overview, phase status tracking, dependencies, success criteria

### Phase Files (10 phases)
1. **phase-01-environment-setup.md** (2h)
   - Cloudflare account, wrangler CLI, project initialization
   - Priority: P0 | Dependencies: none

2. **phase-02-database-schema.md** (3h)
   - D1 database, schema design, migrations, indexes
   - Priority: P0 | Dependencies: phase-01

3. **phase-03-kv-namespaces.md** (1h)
   - 3 KV namespaces: CONFIG_CACHE, SESSIONS, RATE_LIMIT
   - Priority: P0 | Dependencies: phase-01

4. **phase-04-r2-bucket.md** (1h)
   - R2 bucket for media storage, public access config
   - Priority: P1 | Dependencies: phase-01

5. **phase-05-api-routes-migration.md** (6h)
   - Migrate 4 API routes to Pages Functions
   - Convert Edge Config to D1 + KV operations
   - Priority: P0 | Dependencies: phase-02, phase-03

6. **phase-06-admin-panel-updates.md** (4h)
   - Session-based auth, rate limiting, login/logout endpoints
   - Priority: P0 | Dependencies: phase-03, phase-05

7. **phase-07-data-migration.md** (3h)
   - Export Edge Config, transform, bulk insert to D1
   - Priority: P0 | Dependencies: phase-02, phase-05

8. **phase-08-build-deploy-config.md** (2h)
   - next.config.js, wrangler.toml, CI/CD, environment variables
   - Priority: P0 | Dependencies: phase-01-04

9. **phase-09-testing-validation.md** (4h)
   - Comprehensive testing, smoke tests, performance benchmarks
   - Priority: P0 | Dependencies: phase-07, phase-08

10. **phase-10-cleanup-documentation.md** (2h)
    - Remove Vercel deps, update docs, archive Edge Config
    - Priority: P1 | Dependencies: phase-09

## Total Effort Estimate

**28 hours** (~3.5 days of focused work)

## Key Design Decisions

1. **D1 as Primary Database**
   - Relational schema: profiles, social_links, bio_links, products, carousel_items
   - SQLite-based, 10GB limit, supports millions of profiles
   - Foreign keys enforce referential integrity

2. **KV for Caching & Sessions**
   - CONFIG_CACHE: Profile data cache (TTL 1h) - 10-100x query reduction
   - SESSIONS: Admin session tokens (TTL 24h)
   - RATE_LIMIT: Auth attempt tracking (TTL 5-15min)

3. **R2 for Media (Optional Phase 1)**
   - Separate storage from database
   - Zero egress within Cloudflare
   - Custom domain for CDN access

4. **Domain-Based Multi-Tenancy**
   - Username = DOMAIN env var
   - Supports multiple domains per D1 database

5. **Backward Compatible Data Structure**
   - BioData type preserved from Edge Config
   - Existing admin panel works with minimal changes
   - Zero UI changes required

## Critical Path

```
Phase 01 → Phase 02 → Phase 05 → Phase 07 → Phase 08 → Phase 09 → Phase 10
         ↘ Phase 03 ↗         ↘ Phase 06 ↗
         ↘ Phase 04 ___________________↗
```

**Blockers:**
- Phase 02 blocks Phase 05 (API needs DB schema)
- Phase 03 blocks Phase 06 (Admin needs sessions KV)
- Phase 07 blocks Phase 09 (Can't test without data)
- Phase 08 blocks Phase 09 (Can't deploy without config)

## Research Integration

Plan incorporates findings from:
- **researcher-01-pages-deployment.md**
  - Next.js 14 compatibility
  - Pages Functions structure
  - API route migration patterns
  - Build configuration requirements

- **researcher-02-data-services.md**
  - D1 schema design
  - KV use cases and key strategies
  - R2 media storage architecture
  - CRUD operation patterns
  - Authentication with KV

## Each Phase Includes

✅ Context links to parent plan and adjacent phases
✅ Overview with priority, status, effort, date
✅ Key insights from research
✅ Functional and non-functional requirements
✅ Architecture diagrams (Mermaid)
✅ Related code files (create/modify/delete)
✅ Detailed implementation steps (numbered, actionable)
✅ Todo list with checkboxes
✅ Success criteria
✅ Risk assessment table
✅ Security considerations
✅ Next steps
✅ Unresolved questions

## File Naming Convention

- Kebab-case, descriptive names
- All files <200 lines (compliance: ✅)
- YAML frontmatter for metadata
- Markdown formatting

## Implementation Guidelines

### YAGNI Principles Applied
- No unused features (e.g., R2 media upload deferred to Phase 2)
- Minimal middleware (only auth + CORS)
- Simple cache invalidation (TTL-based, no complex tracking)

### KISS Principles Applied
- Straight SQL queries, no ORM
- Direct KV operations, no abstraction layer
- Single admin user table, no RBAC complexity

### DRY Principles Applied
- Reusable helper classes: BioDataQueries, ConfigCache, SessionManager, RateLimiter
- Shared middleware for all admin routes
- Common error handling patterns

## Security Highlights

- **Password hashing**: PBKDF2 with Web Crypto API (Workers-compatible)
- **Session tokens**: UUID v4, stored in KV with TTL
- **Rate limiting**: 5 attempts per 5min prevents brute force
- **SQL injection prevention**: Prepared statements with .bind()
- **Input validation**: Zod schemas before database operations

## Rollback Strategy

- Keep Edge Config read-only for 30 days
- Export backup before migration (Phase 07)
- Document rollback procedure (Phase 10)
- Dual-write capability (not implemented, documented as option)

## Success Metrics

- [ ] All 10 phases completed
- [ ] All API endpoints functional
- [ ] Admin panel authentication working
- [ ] Data migrated without loss
- [ ] Performance targets met (p50 <50ms cached)
- [ ] Zero UI changes or user disruption
- [ ] Production deployment successful

## Files Created

- **1 master plan**: plan.md
- **10 phase files**: phase-01 through phase-10
- **Total**: 11 markdown files, ~125KB documentation

## Code Artifacts to Create

### Migrations (3 files)
- 0001_initial_schema.sql
- 0002_seed_default_profile.sql
- 0003_admin_users.sql

### Scripts (5 files)
- export-edge-config.ts
- migrate-edge-config-to-d1.ts
- validate-migration.ts
- deploy.sh
- smoke-test.sh

### Library Code (9 files)
- lib/db/queries.ts
- lib/db/schema.ts
- lib/kv/cache.ts
- lib/kv/sessions.ts
- lib/kv/rate-limit.ts
- lib/r2/storage.ts
- lib/r2/types.ts
- lib/auth/password.ts
- lib/types.ts (update)

### Pages Functions (5 files)
- functions/_middleware.ts
- functions/api/config.ts
- functions/api/admin/login.ts
- functions/api/admin/logout.ts
- functions/api/admin/update.ts
- functions/api/admin/import.ts
- functions/api/admin/export.ts

### Documentation (4 files)
- docs/cloudflare-architecture.md
- docs/migration-log.md
- docs/troubleshooting.md
- docs/rollback-procedure.md

### Configuration (4 files)
- wrangler.toml (update)
- next.config.js (update)
- .gitignore (update)
- .github/workflows/deploy.yml

**Total**: ~30 files to create/modify

## Unresolved Questions (Consolidated)

### Environment & Setup
- [ ] Single Pages project with preview deployments or separate staging project?
- [ ] Preferred Node.js version (18 vs 20)?
- [ ] Need Cloudflare Tunnel for local dev with custom domain?

### Database & Schema
- [ ] Profile IDs: username or UUID? (Recommend UUID)
- [ ] Need admin_users table? (Yes, covered in Phase 06)
- [ ] Schema versioning strategy for future changes?
- [ ] Soft deletes (deleted_at column)?

### KV & Caching
- [ ] Session TTL configurable or hardcoded 24h?
- [ ] Separate rate limit thresholds per endpoint?
- [ ] KV namespace migration if we rename bindings?
- [ ] KV bulk delete for cache invalidation?

### R2 & Media
- [ ] Image optimization (resize, WebP) before upload?
- [ ] CORS config for direct browser uploads?
- [ ] Image migration from Unsplash/Cloudinary to R2?
- [ ] R2 lifecycle policies for tmp/ folder cleanup?

### API & Routes
- [ ] Request logging for debugging?
- [ ] Error tracking (Sentry, Cloudflare Workers Analytics)?
- [ ] API versioning if schema changes?
- [ ] ETag headers for config endpoint caching?

### Admin & Auth
- [ ] HttpOnly cookies instead of localStorage for tokens?
- [ ] Multi-factor authentication (2FA)?
- [ ] Track login history (IP, device, timestamp)?
- [ ] Forgot password / password reset flow?

### Migration & Data
- [ ] Incremental migration for large datasets?
- [ ] Automated rollback script if migration fails?
- [ ] Multi-domain migration (loop through all domains)?
- [ ] Archive Edge Config after cutover?

### Build & Deploy
- [ ] Preview environments for each PR?
- [ ] Staging environment separate from preview?
- [ ] Database migrations in CI/CD?
- [ ] Blue-green deployment strategy?

### Testing
- [ ] Automated E2E tests with Playwright?
- [ ] Monitoring/alerting for production?
- [ ] Rollback if critical issues in production?
- [ ] Canary deployment (gradual rollout)?

### Cleanup
- [ ] When to completely delete Edge Config?
- [ ] Keep dual setup for emergency rollback?
- [ ] Update team documentation or wiki?

## Next Steps

1. Review plan with stakeholders
2. Get approval for timeline and resource allocation
3. Begin Phase 01: Environment Setup
4. Execute phases sequentially, testing after each
5. Document blockers in phase reports
6. Final production cutover after Phase 09 validation

---

**Plan Status**: ✅ Complete and ready for implementation

**Estimated Timeline**: 3.5 days (28 hours) of focused work

**Risk Level**: Medium (D1 beta, new architecture, data migration)

**Mitigation**: Thorough testing, rollback procedure, 30-day Edge Config backup

**Recommendation**: Proceed with implementation, starting with Phase 01.
