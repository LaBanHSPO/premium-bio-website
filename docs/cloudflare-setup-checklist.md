# Cloudflare + GitHub Auto-Deploy Setup Checklist

Use this checklist to track your setup progress:

## 1. Cloudflare Account Setup
- [ ] Log in to Cloudflare Dashboard
- [ ] Copy your Account ID
- [ ] Save Account ID securely

## 2. API Token Creation
- [ ] Go to Cloudflare API Tokens page
- [ ] Create custom token with name: `GitHub Actions Deploy`
- [ ] Add permission: Account - Cloudflare Pages - Edit
- [ ] Add permission: Account - D1 - Edit
- [ ] Add permission: Account - Workers KV Storage - Edit
- [ ] Add permission: Account - R2 - Edit
- [ ] Set Account Resources to your account
- [ ] Create token and COPY IT IMMEDIATELY
- [ ] Save token securely (you won't see it again!)

## 3. Cloudflare Pages Project
- [ ] Go to Workers & Pages in Cloudflare Dashboard
- [ ] Create new Pages application
- [ ] Connect to your GitHub repository
- [ ] Set project name: `premium-bio-website`
- [ ] Set production branch: `main`
- [ ] Set build command: `npm run pages:build`
- [ ] Set build output directory: `.vercel/output/static`
- [ ] Save and deploy

## 4. Cloudflare Environment Variables
- [ ] Go to project Settings → Environment variables
- [ ] Add `ADMIN_SECRET` with your secret value
- [ ] Add `NODE_ENV=production`
- [ ] Add any other required environment variables
- [ ] Save changes

## 5. Cloudflare Bindings
- [ ] Go to project Settings → Functions → Bindings
- [ ] Add D1 binding: `DB` → `premium-bio-db`
- [ ] Add KV binding: `CONFIG_CACHE`
- [ ] Add KV binding: `SESSIONS`
- [ ] Add KV binding: `RATE_LIMIT`
- [ ] Add R2 binding: `MEDIA` → `bio-media`
- [ ] Save changes

## 6. GitHub Secrets
- [ ] Go to GitHub repository
- [ ] Navigate to Settings → Secrets and variables → Actions
- [ ] Add secret: `CLOUDFLARE_API_TOKEN` with token from step 2
- [ ] Add secret: `CLOUDFLARE_ACCOUNT_ID` with ID from step 1

## 7. Test Deployment
- [ ] Make a small code change
- [ ] Commit and push to main branch
- [ ] Go to GitHub → Actions tab
- [ ] Watch workflow run and complete successfully
- [ ] Visit your Cloudflare Pages URL to verify deployment

## 8. Optional: Custom Domain
- [ ] Go to Cloudflare Pages project
- [ ] Navigate to Custom domains
- [ ] Add your domain
- [ ] Follow DNS configuration instructions

## Quick Commands

```bash
# Test deployment
git add .
git commit -m "test: trigger cloudflare deployment"
git push origin main

# Watch GitHub Actions
# Go to: https://github.com/YOUR_USERNAME/YOUR_REPO/actions

# View Cloudflare Pages deployments
# Go to: https://dash.cloudflare.com → Workers & Pages → premium-bio-website
```

## URLs to Have Open

1. **Cloudflare Dashboard:** https://dash.cloudflare.com
2. **API Tokens:** https://dash.cloudflare.com/profile/api-tokens
3. **GitHub Repository Settings:** https://github.com/YOUR_USERNAME/YOUR_REPO/settings
4. **GitHub Actions:** https://github.com/YOUR_USERNAME/YOUR_REPO/actions

## Common Issues

**Build fails:**
- Check Node.js version in workflow (currently v20)
- Verify `pages:build` script exists in package.json

**Deployment unauthorized:**
- Verify API token is correct
- Check token permissions

**Environment variables not working:**
- Add them in Cloudflare Pages, not GitHub secrets
- GitHub secrets are only for API tokens

**Bindings not working:**
- Configure in Cloudflare Pages → Settings → Functions
- Match names with wrangler.toml

---

**Status:** [ ] Setup Complete ✓

Once all checkboxes are checked, your auto-deployment is fully configured!
