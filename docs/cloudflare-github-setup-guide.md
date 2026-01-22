# Cloudflare Pages + GitHub Actions Auto-Deploy Setup Guide

This guide will walk you through setting up automatic deployment to Cloudflare Pages when you push commits to your GitHub repository.

## Prerequisites

- GitHub repository with your code
- Cloudflare account
- Git installed locally

## Step 1: Get Your Cloudflare Account ID

1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com)
2. On the right side of the overview page, you'll see your **Account ID**
3. Copy this ID (it looks like: `d75d0978428e12467185290c27919b53`)
4. Save it for later - you'll need to add it to GitHub secrets

## Step 2: Create a Cloudflare API Token

1. Go to [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click **"Create Token"**
3. Choose **"Create Custom Token"**
4. Configure the token with these settings:

   **Token Name:** `GitHub Actions Deploy`

   **Permissions:**
   - Account - Cloudflare Pages - Edit

   **Account Resources:**
   - Include - Your Account (select your account)

   **Zone Resources:**
   - All zones (or select specific zones)

5. Click **"Continue to summary"**
6. Click **"Create Token"**
7. **IMPORTANT:** Copy the token immediately and save it securely
   - You won't be able to see it again!
   - Example format: `aBc123XyZ...`

## Step 3: Create Cloudflare Pages Project

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages**
2. Click **"Create application"** → **"Pages"** → **"Connect to Git"**
3. Select your GitHub repository
4. Configure build settings:
   - **Project name:** `premium-bio-website`
   - **Production branch:** `main`
   - **Framework preset:** Next.js (Static HTML Export)
   - **Build command:** `npm run pages:build`
   - **Build output directory:** `.vercel/output/static`
5. Click **"Save and Deploy"**

### Configure Environment Variables (Optional)

1. In your Cloudflare Pages project, go to **Settings** → **Environment variables**
2. Add variables if needed (e.g., `THEME` to switch themes):
   ```
   THEME=next-star
   ```
3. Click **"Save"**

## Step 4: Add Secrets to GitHub Repository

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**

Add these two secrets:

**Secret 1:**
- Name: `CLOUDFLARE_API_TOKEN`
- Value: The API token you created in Step 2
- Click **"Add secret"**

**Secret 2:**
- Name: `CLOUDFLARE_ACCOUNT_ID`
- Value: The Account ID you copied in Step 1
- Click **"Add secret"**

## Step 5: Verify GitHub Actions Workflow

The workflow file is already configured at `.github/workflows/deploy.yml`. It will:
- Trigger on push to `main` branch
- Trigger on pull requests to `main` branch
- Build your Next.js app for Cloudflare Pages
- Deploy to Cloudflare Pages automatically

## Step 6: Test the Deployment

1. Make a small change to your code.
2. Commit and push to `main` branch:
   ```bash
   git add .
   git commit -m "test: trigger cloudflare deployment"
   git push origin main
   ```
3. Go to GitHub → **Actions** tab
4. Watch the workflow run
5. Once completed, check your Cloudflare Pages URL

## Troubleshooting

### Build Fails with "Command not found"
- Check that `pages:build` script exists in `package.json`
- Verify Node.js version is compatible (using v20 in workflow)

### Deployment Fails with "Unauthorized"
- Verify `CLOUDFLARE_API_TOKEN` is correct
- Check API token permissions include Cloudflare Pages Edit

### Different Output Directory
- If build output is in different location, update `directory` in workflow
- Common paths: `.vercel/output/static`, `out`, `dist`

## Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Next.js on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
- [GitHub Actions for Cloudflare Pages](https://github.com/cloudflare/pages-action)
