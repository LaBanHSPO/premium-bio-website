# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-01-23

### 🚀 Initial Release

We are excited to announce the first release of the Premium Bio Website template!
This release brings a powerful, highly customizable, and free-forever bio link solution.

### ✨ Features

- **Dual Theme Support**:
  - `next-link`: A clean, minimalist theme for simple bio pages.
  - `next-star`: A premium, feature-rich theme with enhanced visuals and layouts.

- **Easy Configuration**:
  - Centralized `config.ts` for managing profile data, links, products, and SEO.
  - No database required - simply edit the file and deploy.

- **Internationalization (i18n)**:
  - Built-in multi-language support.
  - Easy-to-manage JSON translation files.

- **Product Showcase**:
  - Dedicated components to display digital products and services.
  - Conversion-focused design.

- **Performance & SEO**:
  - 100% Static Export optimized for Cloudflare Pages.
  - Lightning-fast loading with zero cold starts.
  - Comprehensive SEO metadata configuration.

- **Modern Tech Stack**:
  - Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.
  - Accessible UI components using shadcn/ui.

### 🛠 Improvements

- **Automated Deployments**: Fixed GitHub Actions workflow for seamless Cloudflare Pages deployments.
- **Theme Switching**: Implemented a robust theme switching mechanism via `scripts/update-tsconfig.js` and dynamic imports.
- **Clean Architecture**: Refactored codebase to remove legacy admin infrastructure, ensuring a lightweight and secure template.

## [0.0.1] - 2025-06-15

**First Public Release** 🎉

🚀 First official release of Premium Bio Website – a modern, mobile-first bio link app powered by Next.js and Vercel Edge Config.

### ✨ Key Features
- 🎨 Beautiful, responsive design
- 🔧 Dynamic config updates without redeployment (Edge Config)
- 🔐 Secure admin panel (secret-protected)
- 📱 Mobile-first experience
- 🎠 Swipable carousel
- 🧩 Fully extensible for affiliate tools, personal branding, or digital products

### 📦 Tech Stack
- Next.js 14, Tailwind CSS, shadcn/ui
- Zod for validation, React Hook Form, Framer Motion
- Edge Config for real-time content updates
