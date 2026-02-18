import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@hookform/resolvers'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};


export default nextConfig;
