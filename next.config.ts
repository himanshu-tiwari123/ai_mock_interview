/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  eslint: {
    // Allows production builds to complete even if there are ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allows production builds to complete even if there are TypeScript errors.
    ignoreBuildErrors: true,
  },
  // Add other config options here if needed...
};

module.exports = nextConfig;