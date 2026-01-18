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
  }
}

module.exports = nextConfig
