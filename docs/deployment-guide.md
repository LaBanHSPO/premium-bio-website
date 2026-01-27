# 📦 Deployment Guide for SiteHub.bio

This document outlines the deployment strategies for SiteHub.bio. This project is optimized for **Static Export**, making it compatible with various static hosting providers.

## 📋 Prerequisites
* A **GitHub** account with this repository forked.
* A custom domain name (optional but recommended).
* **Node.js** installed locally (if building manually).

---

## 1. Cloudflare Pages (Recommended)

This is the preferred method as the project is pre-configured for Cloudflare.

### 🎥 Video Guide
📺 [Watch the deployment tutorial on YouTube](https://youtu.be/L6LbUxtXS2A?list=PLDFbFJoLpF2WG39xXiBc-Xly4ux50r_Uq)

### 🚀 Deployment Steps
1.  **Fork** this repository to your GitHub account.
2.  Log in to the **[Cloudflare Dashboard](https://dash.cloudflare.com)**.
3.  Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
4.  Select your forked repository.
5.  **Configure Build Settings**:
    * **Framework Preset:** `Next.js (Static HTML Export)`
    * **Build Command:** `npm run build:cloudfare-page` (Uses `@cloudflare/next-on-pages` with standalone mode)
    * **Build Output Directory:** `.vercel/output/static`
6.  **Environment Variables**:
    * Add `THEME` = `next-star` (or your preferred theme).
    * Add `DEPLOYMENT` = `cloudfare_page` (Optional: The build command sets this automatically, but you can define it here to be explicit).
7.  Click **Save and Deploy**.

### 🌐 Custom Domain Setup
1.  Go to your Pages project > **Custom domains** tab.
2.  Click **Set up a custom domain**.
3.  Enter your domain (e.g., `mysite.com`).
4.  **DNS Configuration**:
    * **If managing DNS on Cloudflare:** It will configure automatically.
    * **If external (Namecheap, GoDaddy, etc.):** Cloudflare will ask you to change your **Nameservers** to Cloudflare's. *Note: The Free plan typically requires a Nameserver change.*

---

## 2. GitHub Actions → Cloudflare Pages (CI/CD)

Use this method if you want precise control over deployment triggers via GitHub Actions.

### 🚀 Setup Steps
1.  **Get Account ID:** From the Cloudflare Dashboard overview (right sidebar).
2.  **Generate API Token:**
    * Go to **[API Tokens](https://dash.cloudflare.com/profile/api-tokens)** > **Create Token** > **Create Custom Token**.
    * **Permissions:** Account > Cloudflare Pages > **Edit**.
    * **Account Resources:** Include your specific account.
3.  **Configure GitHub Secrets:**
    * In your GitHub Repo, go to **Settings** > **Secrets and variables** > **Actions**.
    * Add `CLOUDFLARE_API_TOKEN`: Paste your API Token.
    * Add `CLOUDFLARE_ACCOUNT_ID`: Paste your Account ID.
    * **Note:** Ensure usage of `DEPLOYMENT=cloudfare_page` in your workflow if not already preset.
4.  **Trigger:** Any push to the `main` branch will trigger the workflow defined in `.github/workflows/deploy.yml`.

---

## 3. GitHub Actions → Railway

Railway is suitable if you prefer containerized deployments, though it is overkill for a static site.

### 🚀 Deployment Steps
1.  Log in to **[Railway](https://railway.app)**.
2.  Click **New Project** > **Deploy from GitHub repo**.
3.  Select your repository.
4.  **Settings**:
    * **Build Command:** `npm run build` (Standard Next.js build).
    * **Start Command:** `npm start` (Note: Ensure `next.config.js` is set for standalone mode, or use a static file server).
5.  Railway will automatically detect the push and deploy.

### 🌐 Custom Domain Setup
1.  In Railway Project Settings > **Domains**.
2.  Click **Custom Domain**.
3.  **DNS Configuration:**
    * Railway will provide a **CNAME** record.
    * Add this CNAME record to your DNS provider (e.g., Namecheap). **No Nameserver change required.**

---

## 4. Vercel (Native Next.js Support)

Vercel provides the smoothest experience for Next.js and allows custom domains without changing Nameservers.

### 🚀 Deployment Steps
1.  Log in to **[Vercel](https://vercel.com)**.
2.  Click **Add New...** > **Project**.
3.  Import your GitHub repository.
4.  **Configuration**:
    * **Framework Preset:** `Next.js` (Auto-detected).
    * **Build Command:** Default (`next build`).
    * **Environment Variables:** Add `THEME` = `next-star`.
5.  Click **Deploy**.

### 🌐 Custom Domain Setup
1.  Go to **Settings** > **Domains**.
2.  Enter your domain (e.g., `mysite.com`).
3.  **DNS Configuration:**
    * Vercel will provide an **A Record** (for root domain) and a **CNAME** (for `www`).
    * Add these records at your DNS registrar. **No Nameserver change required.**

---

## 5. Netlify

Another excellent option for static hosting that supports CNAME setups.

### 🚀 Deployment Steps
1.  Log in to **[Netlify](https://www.netlify.com)**.
2.  Click **Add new site** > **Import an existing project**.
3.  Connect GitHub and select your repo.
4.  **Build Settings**:
    * **Build Command:** `npm run build`
    * **Publish Directory:** `.next` (or `out` if using `output: 'export'`).
5.  Click **Deploy**.

### 🌐 Custom Domain Setup
1.  Go to **Domain management** > **Add a domain**.
2.  **DNS Configuration:**
    * Add a **CNAME** record pointing to your `[project-name].netlify.app`.
    * **No Nameserver change required.**

---

## 6. VPS (Nginx + Static Files)

For self-hosting on Ubuntu/CentOS servers.

### 🚀 Deployment Steps
1.  **Build Locally:**
    ```bash
    npm install
    # Ensure next.config.js has output: 'export'
    npm run build
    ```
2.  **Upload:**
    Transfer the contents of the output folder (usually `out` or `.vercel/output/static`) to your VPS (e.g., `/var/www/sitehub`).
3.  **Nginx Configuration:**
    Create a server block:
    ```nginx
    server {
        listen 80;
        server_name yourdomain.com;
        root /var/www/sitehub;
        index index.html;
        
        location / {
            try_files $uri $uri.html $uri/ =404;
        }
    }
    ```
4.  **Restart Nginx:** `sudo systemctl restart nginx`

### 🌐 Custom Domain Setup
1.  Go to your DNS Registrar.
2.  Create an **A Record** pointing to your VPS IP Address.
