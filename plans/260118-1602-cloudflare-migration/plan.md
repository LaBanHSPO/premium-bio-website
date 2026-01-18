---
title: Cloudflare Migration Plan
date: 2026-01-18
status: in-progress
priority: P0
effort: 3-5 days
---

# Cloudflare Migration Plan

Migrate Premium Bio Website from Vercel (Edge Config) to Cloudflare (Pages + D1 + KV + R2).

## Context

- **Current**: Next.js 14 on Vercel, Edge Config for data storage
- **Target**: Cloudflare Pages, D1 database, 3 KV namespaces, R2 media bucket
- **Scope**: Backend data layer only, no UI changes
- **Constraint**: Maintain data structure compatibility

## Research Reports

- [Researcher 01: Pages Deployment](/Users/mbpprm/Documents/mybuild/for-free/premium-bio-website/plans/260118-1602-cloudflare-migration/research/researcher-01-pages-deployment.md)
- [Researcher 02: Data Services](/Users/mbpprm/Documents/mybuild/for-free/premium-bio-website/plans/260118-1602-cloudflare-migration/research/researcher-02-data-services.md)

## Architecture Overview

```
Current: Next.js API Routes → Vercel Edge Config → JSON data
Target:  Pages Functions → D1 (SQLite) + KV (cache/sessions) + R2 (media)
```

## Phase Status

| Phase | Name | Status | Completed | Priority | Effort |
|-------|------|--------|-----------|----------|--------|
| 01 | Environment Setup | completed | 2026-01-18 17:45 | P0 | 2h |
| 02 | Database Schema | pending | - | P0 | 3h |
| 03 | KV Namespaces | pending | - | P0 | 1h |
| 04 | R2 Bucket | pending | - | P1 | 1h |
| 05 | API Routes Migration | pending | - | P0 | 6h |
| 06 | Admin Panel Updates | pending | - | P0 | 4h |
| 07 | Data Migration | pending | - | P0 | 3h |
| 08 | Build & Deploy Config | pending | - | P0 | 2h |
| 09 | Testing & Validation | pending | - | P0 | 4h |
| 10 | Cleanup & Documentation | pending | - | P1 | 2h |

**Total Estimate:** 28 hours (~3.5 days)
**Progress:** 1/10 phases complete (10%) | Estimated completion: ~3.2 days remaining

## Key Design Decisions

1. **D1 as primary source**: Structured relational data with SQLite
2. **KV for caching**: Aggressive TTL (1-24h) reduces D1 queries 10-100x
3. **R2 for media**: Separate storage from DB, zero egress within Cloudflare
4. **Domain-based namespacing**: Multi-tenant support via DOMAIN env var
5. **Backward compatibility**: Keep data structure matching current Edge Config format

## Critical Dependencies

- Phase 02 blocks Phase 05 (API needs DB schema)
- Phase 03 blocks Phase 06 (Admin needs sessions KV)
- Phase 07 blocks Phase 09 (Can't test without data)
- Phase 08 blocks Phase 09 (Can't deploy without config)

## Success Criteria

- [ ] All API endpoints functional on Cloudflare Pages
- [ ] Admin panel authentication working with KV sessions
- [ ] Data migrated from Edge Config to D1 without loss
- [ ] Local development working with wrangler dev
- [ ] Production deployment successful with custom domain
- [ ] Zero UI changes or user-facing disruption

## Risk Mitigation

- **Risk**: D1 beta instability → **Mitigation**: Keep Edge Config read-only during dual-write period
- **Risk**: API route breaking changes → **Mitigation**: Test all endpoints in staging before production
- **Risk**: Data migration errors → **Mitigation**: Export Edge Config backup before migration
- **Risk**: Build timeout (20min limit) → **Mitigation**: Optimize build, use caching

## Next Steps

1. Start with Phase 01: Environment Setup
2. Proceed sequentially through phases
3. Test after each phase completion
4. Document blockers in phase reports

---

**Updated:** 2026-01-18 17:45 | **Author:** project-manager | **Latest:** Phase 01 marked completed
