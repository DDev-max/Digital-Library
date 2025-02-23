import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fiverr-res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'entail-assets.com',
        port: '',
        pathname: '/**/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.aboutamazon.com',
        port: '',
        pathname: '/**/**',
      },
      {
        hostname: 'books.google.com',
        port: '',
        pathname: '/**/**',
      },
    ],
  },
}

export default nextConfig
