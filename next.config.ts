import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        hostname: 'picsum.photos',
        protocol: 'https',
        port: '',
      },
      {
        hostname: 'canny-parakeet-73.convex.cloud',
        protocol: 'https',
        port: '',
      },
      {
        hostname: 'avatar.iran.liara.run',
        protocol: 'https',
        port: '',
      },
    ],
  },
}

export default nextConfig
