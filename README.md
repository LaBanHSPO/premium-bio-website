# 🚀 Premium Bio Website - Free Forever Bio Link Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-F38020?logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

> 🎉 **100% Free Forever** | No Monthly Fees | No Setup Costs | Fully Open Source

A modern, powerful alternative to Linktree, Stan Store, and other paid bio link services. Built with Next.js and hosted on Cloudflare's free tier for **lifetime free hosting**.

**Live Demo**: [https://pandev00.sitehub.bio](https://pandev00.sitehub.bio)

---

## 🌟 Why Choose Premium Bio Website?

| Feature | Premium Bio Website | Linktree | Stan Store |
|---------|---------------------|----------|------------|
| **Monthly Cost** | $0 Forever | $5-$24/mo | $29/mo |
| **Setup Fee** | $0 | $0 | $0 |
| **Custom Domain** | ✅ Free | ✅ Paid plans | ✅ Included |
| **E-commerce** | ✅ Included | ❌ | ✅ Included |
| **Full Customization** | ✅ Source code | ❌ Limited | ❌ Limited |
| **Self-Hosted** | ✅ Your account | ❌ | ❌ |
| **Open Source** | ✅ MIT License | ❌ | ❌ |
| **No Branding** | ✅ Your brand | 💰 Paid plans | ✅ |

---

## ✨ Features

### 🎨 **Beautiful Design**
- Modern, responsive UI that looks great on all devices
- Mobile-first design optimized for creator audiences
- Smooth animations and transitions with Framer Motion
- Dark mode support (coming soon)

### 🔧 **Powerful Admin Panel**
- Secure admin dashboard with secret-key authentication
- Real-time updates without redeployment
- Drag-and-drop interface for link management
- Image upload and management
- Data import/export functionality

### 🛍️ **Lightweight E-Commerce**
- Product showcase with images and pricing
- Shopping cart functionality
- Multiple payment methods:
  - Stripe integration
  - PayPal support
  - Bank transfer (domestic)
- Product detail pages
- Simple checkout flow

### 📱 **Content Features**
- Profile information (name, bio, avatar, cover image)
- Unlimited social links
- Rich bio links with descriptions and images
- Swipable product/content carousel
- SEO optimized

### ⚡ **Edge-First Performance**
- Hosted on Cloudflare Pages (free tier)
- Global CDN distribution
- Lightning-fast page loads
- Zero cold starts

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- Git
- Cloudflare account (free)
- GitHub account

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/LaBanHSPO/premium-bio-website.git
cd premium-bio-website

# Install dependencies
npm install
# or
bun install
```

### 2. Environment Setup

```bash
# Copy example environment file
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Admin secret for authentication
ADMIN_SECRET=your_secure_random_secret

# Cloudflare configuration (after migration)
# For now, uses fallback data
```

### 3. Run Development Server

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see your bio page.

---

## 📦 Deploy to Cloudflare (Free Forever)

Deploy your own bio website on Cloudflare Pages for **free, forever**. No credit card required for the free tier.

### Quick Deploy

1. **Fork this repository** on GitHub
2. **Connect to Cloudflare Pages**:
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to Workers & Pages → Create application → Pages → Connect to Git
   - Select your forked repository
3. **Configure build settings**:
   - Build command: `npm run pages:build`
   - Build output directory: `.vercel/output/static`
4. **Deploy** and get your free URL: `https://your-project.pages.dev`

### Detailed Setup Guide

For step-by-step instructions with screenshots, see our comprehensive guide:

📖 **[Cloudflare + GitHub Setup Guide](./docs/cloudflare-github-setup-guide.md)**

This guide covers:
- Creating Cloudflare API tokens
- Setting up GitHub Actions for auto-deploy
- Configuring custom domains
- Environment variables and bindings
- Troubleshooting common issues

---

## 🎯 How to Use

### Access Admin Panel

1. Navigate to `https://your-domain.com/admin`
2. Enter your auth to authenticate
3. Update your profile, links, products, and more
4. Changes are reflected instantly on your bio page

### Customize Your Bio Page

The admin panel allows you to configure:

- **Profile**: Name, tagline, avatar, cover image
- **Social Links**: Add/edit/remove social media profiles
- **Bio Links**: Create rich links with descriptions and thumbnails
- **Products**: Showcase products with images, prices, and descriptions
- **Carousel**: Display featured content in a swipable carousel

### Import/Export Data

- **Export**: Backup your configuration as JSON
- **Import**: Restore from backup or migrate from another platform

---

## 🏗️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **UI Components** | shadcn/ui + Radix UI |
| **Forms** | React Hook Form + Zod |
| **Animations** | Framer Motion |
| **Deployment** | Cloudflare Pages |
| **Storage** | Cloudflare KV + D1 + R2 |
| **Analytics** | Vercel Analytics |

---

## 📊 Cloudflare Free Tier Limits

You get these resources **completely free**:

- ✅ **Pages**: Unlimited sites, 500 builds/month
- ✅ **KV**: 100,000 reads/day, 1,000 writes/day
- ✅ **D1**: 5 GB storage, 5M reads/day
- ✅ **R2**: 10 GB storage, 1M reads/month
- ✅ **Workers**: 100,000 requests/day
- ✅ **Custom Domains**: Unlimited
- ✅ **Global CDN**: Included

**Perfect for personal brands, creators, and small businesses!**

---

## 🤝 Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding features, or improving documentation, your help is appreciated.

### How to Contribute

1. 🍴 Fork the repository
2. 🌱 Create a feature branch: `git checkout -b feature/my-feature`
3. 🔧 Make your changes
4. ✅ Test thoroughly
5. 📬 Submit a pull request

### Contribution Ideas

- 🛠 Add new UI components or animations
- 🌐 Support for more social platforms
- 📦 Improve admin panel UX
- 🧪 Add tests for critical functionality
- 🌈 Theme and personalization options
- 💬 Localization / i18n support
- 📖 Documentation improvements

### Issues & Suggestions

Found a bug or have an idea? Open an [issue](https://github.com/LaBanHSPO/premium-bio-website/issues).

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**TL;DR**: You can use this for personal or commercial projects, modify it, and redistribute it freely. Attribution is appreciated but not required.

---

## 💼 Sponsored By

<div align="center">
  <a href="https://sagozen.digital" target="_blank">
    <img src="https://assets.sitehub.bio/sagozen.jpg" alt="SAGOZEN LLC" width="200" />
  </a>
  
  **[SAGOZEN LLC](https://sagozen.digital)**
  
  *Proud sponsor of this open-source project*
  
  Making professional bio pages accessible to everyone, forever free.
</div>

---

## 🌍 Community & Support

- 💬 **Discord**: [Join our community](https://discord.com/invite/WyW6MDgjzZ)
- 🤝 **Facebook**: [Sagozen LLC](https://web.facebook.com/profile.php?id=61586598001416)
- 📧 **Email**: hello@sagozen.digital
- 🌟 **Star this repo** if you find it useful!

---

## 🗺️ Roadmap

### ✅ Completed
- [x] Core bio page functionality
- [x] Admin panel with authentication
- [x] Social links management
- [x] Product showcase
- [x] Cloudflare Pages deployment
- [x] GitHub Actions auto-deploy



### 📋 Planned
- [ ] Dark mode support
- [ ] Custom themes
- [ ] Multi-language support (i18n)
- [ ] Advanced analytics
- [ ] Mobile app (React Native)
- [ ] Multi-user support
- [ ] Third-party integrations (Zapier, etc.)

---

## 📚 Documentation

- 📖 [Cloudflare Setup Guide](./docs/cloudflare-github-setup-guide.md)
- 🏗️ [System Architecture](./docs/system-architecture.md)
- 💻 [Code Standards](./docs/code-standards.md)
- 📋 [Project Overview](./docs/project-overview-pdr.md)

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Hosted on [Cloudflare Pages](https://pages.cloudflare.com/)
- Inspired by [stan.store](https://stan.store/), [Linktree](https://linktr.ee/), and other bio link platforms

---

## ⭐ Star History

If this project helped you, please consider giving it a star! It helps others discover the project.

[![Star History Chart](https://api.star-history.com/svg?repos=LaBanHSPO/premium-bio-website&type=Date)](https://star-history.com/#LaBanHSPO/premium-bio-website&Date)

---

<div align="center">
  
**Built with ❤️ by creators, for creators**

[Demo](https://pandev00.sitehub.bio) · [Documentation](./docs) · [Report Bug](https://github.com/LaBanHSPO/premium-bio-website/issues) · [Request Feature](https://github.com/LaBanHSPO/premium-bio-website/issues)

</div>
