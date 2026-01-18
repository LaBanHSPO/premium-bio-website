# Code Review: Phase 08 Build & Deploy Config

**Reviewer**: code-reviewer-a946d3a
**Date**: 2026-01-18 18:23
**Plan**: Phase 08 Build & Deploy Config
**Score**: 7/10

---

## Scope

**Files Reviewed**:
- `/next.config.js` (modified)
- `/wrangler.toml` (modified)
- `/scripts/deploy.sh` (created)
- `/.github/workflows/deploy.yml` (created)
- `/.gitignore` (modified)

**Lines Analyzed**: ~200 LOC
**Review Focus**: Build & deployment configuration for Cloudflare Pages migration
**Build Status**: ✅ Compiles successfully (with TS errors in scripts/)

---

## Overall Assessment

**Score: 7/10**

Configuration follows Cloudflare Pages requirements, build succeeds. Major concerns: security (wildcard hostname, hardcoded IDs in wrangler.toml), missing environment variable validation, TypeScript errors in utility scripts.

Implementation matches plan requirements but needs security hardening before production deployment.

---

## Critical Issues

### 1. **SECURITY: Wildcard Image Hostname** (next.config.js:16)
```javascript
hostname: process.env.DOMAIN || '**',  // ⚠️ DANGEROUS FALLBACK
```
**Impact**: Allows images from ANY external domain if DOMAIN unset
**Attack**: SSRF, external image proxy abuse, bandwidth theft
**Fix**:
```javascript
hostname: process.env.DOMAIN || 'localhost',  // Safe fallback
// OR throw error if DOMAIN missing in production:
if (!process.env.DOMAIN && process.env.NODE_ENV === 'production') {
  throw new Error('DOMAIN env var required in production');
}
```

### 2. **SECURITY: Hardcoded Resource IDs in wrangler.toml**
**Lines**: 14, 19, 23, 27, 32, etc.

Actual production IDs committed to git:
- `database_id = "539d40de-68bc-43f6-bb9b-fef11612f7cf"`
- `id = "670f1bfb9a6c4aa78ca3e02c11d073c7"`

**Impact**: Exposes infrastructure topology, enables targeted attacks
**Risk**: If repo becomes public or attacker gains read access, they know exact resource IDs
**Fix**: Use environment variables or CLI deployment:
```toml
# Option 1: Use placeholders, set via CLI
[[env.production.d1_databases]]
binding = "DB"
database_name = "premium-bio-db"
# database_id set via: wrangler pages deploy --d1=DB:premium-bio-db

# Option 2: Document IDs externally, reference in deployment docs only
```

### 3. **Missing Environment Variable Validation**
**Files**: All API routes, next.config.js

No runtime checks for required env vars (ADMIN_SECRET, DOMAIN, R2_PUBLIC_DOMAIN).

**Impact**: Silent failures, security bypasses if vars unset
**Fix**: Create env validation utility:
```typescript
// src/lib/env.ts
const requiredEnvVars = ['ADMIN_SECRET', 'DOMAIN'] as const;
requiredEnvVars.forEach(key => {
  if (!process.env[key]) throw new Error(`Missing ${key}`);
});
```

---

## High Priority Findings

### 4. **Build Output Directory Mismatch**
**Issue**: Build succeeds but `/out/` directory not created
**Expected**: next.config.js sets `output: 'standalone'`
**Actual**: Build creates `.next/` only (verified via `ls out/` → not found)

**Root Cause**: Next.js 14.2+ `standalone` mode creates `.next/standalone/`, not `out/`
**Fix**: Update package.json build script:
```json
"build": "next build && cp -r .next/standalone ./out && cp -r .next/static ./out/.next/static && cp -r public ./out/public"
```
OR change next.config.js:
```javascript
output: 'export',  // For static export to /out/
```

### 5. **TypeScript Compilation Errors** (scripts/generate-admin-hash.ts)
```
error TS2802: Type 'Uint8Array' requires --downlevelIteration
error TS1378: Top-level 'await' requires module: 'es2022'
```
**Impact**: Scripts fail in strict mode, CI/CD may break
**Fix**: Update tsconfig.json:
```json
{
  "compilerOptions": {
    "module": "es2022",
    "target": "es2017",
    "downlevelIteration": true
  }
}
```

### 6. **GitHub Actions: Missing Build Artifacts Check**
**Issue**: Deploy step runs even if build fails (no `if: success()`)
**Fix**:
```yaml
- name: Build
  id: build
  run: npm run build

- name: Deploy to Cloudflare Pages
  if: success()  # Only deploy if build succeeds
  uses: cloudflare/pages-action@v1
```

### 7. **Deployment Script: No Error Rollback**
**File**: scripts/deploy.sh:20

`set -e` exits on error but doesn't rollback partial deploys.

**Fix**: Add cleanup trap:
```bash
cleanup() {
  if [ $? -ne 0 ]; then
    echo "❌ Deployment failed, rollback needed"
    # Add rollback logic or notify
  fi
}
trap cleanup EXIT
```

---

## Medium Priority Improvements

### 8. **Missing Build Performance Tracking**
Add build time/size metrics to CI:
```yaml
- name: Build
  run: |
    npm run build
    du -sh out/ >> $GITHUB_STEP_SUMMARY
    echo "Build completed in $SECONDS seconds"
```

### 9. **Incomplete .gitignore Patterns**
Missing:
```gitignore
# Build artifacts
.next/
out/
*.log

# Cloudflare local dev
.wrangler/
.dev.vars
.mf/

# OS
.DS_Store
Thumbs.db
```

### 10. **No Health Check After Deploy**
Add smoke test to GitHub Actions:
```yaml
- name: Health Check
  run: |
    sleep 10  # Wait for propagation
    curl -f https://premium-bio-website.pages.dev/api/config || exit 1
```

### 11. **wrangler.toml: Duplicate Bindings**
**Lines**: Production and preview use same resource IDs.

Preview should use separate resources to avoid data conflicts:
```toml
[env.preview]
[[env.preview.d1_databases]]
database_id = "<SEPARATE_PREVIEW_DB_ID>"  # Not production ID
```

---

## Low Priority Suggestions

### 12. **Deployment Script UX**
Add progress indicators:
```bash
echo "🚀 [1/3] Building..."
npm run build
echo "☁️ [2/3] Deploying..."
npx wrangler pages deploy
echo "✅ [3/3] Complete!"
```

### 13. **Workflow Naming**
GitHub Actions job name generic. Use descriptive:
```yaml
jobs:
  deploy-production:
    name: Deploy to Cloudflare Pages (${{ github.ref_name }})
```

### 14. **Missing CHANGELOG Entry**
Should document deployment config changes in `/docs/project-changelog.md`.

---

## Positive Observations

✅ **Executable permissions set** on deploy.sh (verified)
✅ **Build succeeds** without runtime errors
✅ **Server actions configured** for Cloudflare compatibility
✅ **R2 image pattern added** for CDN support
✅ **Environment separation** (production/preview) structure correct
✅ **GitHub Actions uses official Cloudflare action** (v1)
✅ **Script uses `set -e`** for error handling

---

## Recommended Actions

**Priority Order**:

1. **[P0] Fix wildcard hostname** → Change `'**'` to `'localhost'` or throw error
2. **[P0] Verify build output** → Fix `/out/` directory creation (update build script or use `output: 'export'`)
3. **[P0] Remove hardcoded IDs** → Move wrangler.toml IDs to deployment docs, use CLI flags
4. **[P1] Add env validation** → Create startup check for required env vars
5. **[P1] Fix TypeScript errors** → Update tsconfig.json module settings
6. **[P1] Add deploy safety check** → Add `if: success()` to GitHub Actions deploy step
7. **[P2] Separate preview resources** → Use different D1/KV/R2 IDs for preview environment
8. **[P2] Add health check** → Smoke test after deployment in CI/CD
9. **[P3] Improve UX** → Better logging, progress indicators

---

## Plan Update Required

**File**: `/plans/260118-1602-cloudflare-migration/phase-08-build-deploy-config.md`

**Tasks Completed**:
- ✅ Update next.config.js with standalone output
- ✅ Complete wrangler.toml with bindings
- ✅ Create scripts/deploy.sh
- ✅ Make deploy.sh executable
- ✅ Create .github/workflows/deploy.yml
- ✅ Update .gitignore

**Tasks Remaining**:
- ⚠️ Fix build output directory issue
- ⚠️ Add CLOUDFLARE_API_TOKEN to GitHub secrets (manual)
- ⚠️ Configure environment variables in dashboard (manual)
- ⚠️ Test local deployment
- ⚠️ Manual deploy to production
- ⚠️ Security hardening (wildcard hostname, hardcoded IDs)

**Status**: 60% complete → Update to `in-progress`, blockers identified

---

## Metrics

- **Type Coverage**: N/A (config files)
- **Test Coverage**: 0% (no tests for config)
- **Linting Issues**: 0 (linting disabled in next.config.js)
- **TypeScript Errors**: 4 (in utility scripts only, not blocking)
- **Security Issues**: 3 critical, 1 high
- **Build Time**: ~8 seconds (acceptable)
- **Build Size**: Unknown (out/ directory missing)

---

## YAGNI/KISS/DRY Compliance

**YAGNI**: ✅ No over-engineering, minimal config
**KISS**: ⚠️ wrangler.toml could be simplified (too many duplicate IDs)
**DRY**: ⚠️ Environment config duplicated (production/preview identical)

---

## Unresolved Questions

1. **Build Output Format**: Should use `standalone` or `export`? Plan specifies standalone, but Pages typically uses export for static sites. Need clarification on Pages Functions requirement.

2. **Resource ID Management**: How to manage wrangler.toml IDs securely? Options: (a) Keep in git but use separate preview resources, (b) Move to external secrets management, (c) Use CLI deployment with flags. Which approach preferred?

3. **Environment Variables**: Should DOMAIN be set per-deployment or globally in Cloudflare dashboard? Current plan says "configure in dashboard" but implementation allows fallback to `**`.

4. **Preview Environment Strategy**: Plan asks "Should we use preview environments for each PR?" - implementation assumes yes, but using same resources as production. Need decision and separate resource provisioning.

5. **Database Migrations in CI/CD**: Plan asks "How to handle database migrations in CI/CD?" - no migration step in workflow yet. Should this be added before Phase 08 completion?

6. **Deploy.sh vs GitHub Actions**: Should manual deploy script use same environment detection as CI/CD? Currently hardcoded to `--branch=main`.
