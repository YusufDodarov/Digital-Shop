/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
     remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.clerk.dev',
    },
  ],
    domains: [
      'encrypted-tbn0.gstatic.com',
      'i.pinimg.com',
      "your-domain.com", "another-domain.com"
    ],
  },
};

module.exports = {
  reactStrictMode: true,
};
module.exports = {
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig;