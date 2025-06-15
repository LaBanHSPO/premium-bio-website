/** @type {import('next').NextConfig} */
const nextConfig = {
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
        hostname: process.env.DOMAIN,
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      }
    ],
  },
}

module.exports = nextConfig
