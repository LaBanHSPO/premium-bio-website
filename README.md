# 🚀 SiteHub.bio - Static Next.js Template

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-F38020?logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

> 🎉 **100% Free Forever** | Static & Fast | Easy Configuration | Fully Open Source

**SiteHub.bio** is a modern, powerful **static** bio link generator. Hosted on your Cloudflare, stored in your GitHub. You control the source code and data forever—we have zero access. Built with Next.js and designed to be hosted on Cloudflare Pages (or any static host) for free.

**Live Demo**: [https://pandev00.sitehub.bio](https://pandev00.sitehub.bio)

---

## 🌟 Why Choose SiteHub.bio?

| Feature | SiteHub.bio | Linktree | Stan Store |
|---------|---------------------|----------|------------|
| **Monthly Cost** | $0 Forever | $8-$35/mo | $29/mo |
| **Custom Domain** | ✅ Free | ✅ Paid plans | ✅ Included |
| **Performance** | ⚡ Static/Edge | 🐢 Server | 🐢 Server |
| **Customization** | ✅ Full Control | ❌ Limited | ❌ Limited |
| **Design** | ✅ Custom Themes | ❌ Fixed Themes | ❌ Fixed Themes |
| **Open Source** | ✅ MIT License | ❌ | ❌ |

---

## ✨ Features

### 🎨 **Beautiful Themes**
- **Two Built-in Themes**: `next-link` (Minimalist) and `next-star` (Premium/Feature-rich).
- Modern, responsive UI optimized for all devices.
- Smooth animations with Framer Motion.
- Dark mode support (theme dependent).

### ⚙️ **Simple Configuration**
- No database required.
- **Config-based setup**: Just edit `config.ts` to update your profile, links, and products.
- Easy to manage and version control.

### 🌍 **Internationalization (i18n)**
- Built-in multi-language support.
- JSON-based translation files.

### 🛍️ **Product Showcase**
- Display your digital products or services.
- Clean, conversion-focused UI.

### ⚡ **Edge-First Performance**
- 100% Static Export.
- Lightning-fast page loads on Cloudflare Pages.
- Zero cold starts.

---

## 🚀 Quick Start

### Prerequisites
- Google Account (for signing up GitHub and Cloudflare)

## 📦 Deploy to Cloudflare (Free Forever)

Deploy your own bio website on Cloudflare Pages for **free**.

### Quick Deploy

1. **Fork this repository** on GitHub.
2. **Connect to Cloudflare Pages**:
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com) > Workers & Pages > Create application > Pages > Connect to Git.
   - Select your forked repository.
3. **Configure build settings**:
   - **Framework Preset**: Next.js (Static HTML Export)
   - **Build command**: `npm run pages:build`
   - **Build output directory**: `.vercel/output/static`
   - **Environment Variables**: Add `THEME` = `next-star` (or your chosen theme).
4. **Deploy**!

For detailed instructions, see the **[Cloudflare Setup Guide](./docs/cloudflare-github-setup-guide.md)**.

---

## 🏗️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui + Radix UI
- **Animations**: Framer Motion
- **Deployment**: Static Export (Cloudflare Pages, Vercel, Netlify)

---

## 🗺️ Roadmap

### 📅 Weekly Themes
Specific, tailored designs for various niches:
- **Affiliate Markets**
- **Content Creators**
- **Trainers & Coaches**
- **Developers**
- **Business Analysts**
- **Amazon KDP Sellers**

### 📇 Business Features
- **Organization Business Card**: Digital card with QR code sharing.
- **Free Cloud Version**: One-click profile creation with subdomain/subpath (e.g., `username.sitehub.bio`, `sitehub.bio/username`).

### 💳 Integrations
- **Payments**: SePay (VN), Polar, PayPal, and Local Wallet/Banks global-wide support.

### 🎨 Vibe Design
- **Live Edit**: Customize themes in real-time with AI simple prompts and save configurations.

### 🛠️ Admin & Infrastructure
- **Backend Power**: Integration with Cloudflare D1, KV, and R2.
- **Developer Tools**: Webhooks and API Keys management.

---

## 🤝 Contributing

**Contributions are OPEN!** 

We have an ambitious roadmap and invite developers, designers, and creators to help build the future of SiteHub.bio. Whether it's a new theme, a payment integration, or a core feature, your contribution is welcome.

Please feel free to submit a Pull Request or open an issue to discuss your ideas.

---

## 📜 Changelog

See the [CHANGELOG.md](CHANGELOG.md) for a detailed history of changes.

---

## 📝 License

This project is licensed under the **MIT License**.

---

## 💼 Sponsored By

<div align="center">
  <a href="https://sagozen.digital" target="_blank">
    <img src="https://assets.sitehub.bio/sagozen.jpg" alt="SAGOZEN LLC" width="200" />
  </a>
  
  **[SAGOZEN LLC](https://sagozen.digital)**
  
  *Proud sponsor of this open-source project*
</div>

---

## 🌍 Community & Support

- 💬 **Discord**: [Join our community](https://discord.com/invite/WyW6MDgjzZ)
- 📧 **Email**: hello@sagozen.digital

---

<div align="center">
  
**Built with ❤️ by developer, for creators**

</div>
