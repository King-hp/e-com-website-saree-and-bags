/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
    domains: ['localhost'],
  },
  // Enable static image imports from absolute paths
  experimental: {
    externalDir: true,
  },
};

module.exports = nextConfig; 