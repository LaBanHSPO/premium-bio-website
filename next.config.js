/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Required for Cloudflare Pages Functions
  // Skip type checking during build for faster builds
  typescript: {
    ignoreBuildErrors: true,
  },
  // Skip ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.DOMAIN || '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '*.r2.cloudflarestorage.com', // R2 public URLs
      }
    ],
  },
  // Cloudflare Pages compatibility
  experimental: {
    serverActions: {
      allowedOrigins: ['*.pages.dev', process.env.DOMAIN].filter(Boolean)
    }
  },
  webpack: (config) => {
    const theme = process.env.THEME || "next-star";
    const path = require("path");

    console.log(`Building with theme: ${theme}`);

    config.resolve.alias = {
      ...config.resolve.alias,
      "@/theme": path.resolve(__dirname, `src/themes/${theme}`),
      "@/components": path.resolve(__dirname, `src/themes/${theme}/components`),
      "@/lib": path.resolve(__dirname, `src/themes/${theme}/lib`),
      "@/hooks": path.resolve(__dirname, `src/themes/${theme}/hooks`),
      "@/i18n": path.resolve(__dirname, `src/themes/${theme}/i18n`),
      "@/app-shared": path.resolve(__dirname, "src/app"),
    };

    return config;
  },
}

module.exports = nextConfig
