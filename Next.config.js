/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true, // so Vercel doesn't block on lint errors
  },
  typescript: {
    ignoreBuildErrors: true, // allow builds even if TS warnings exist
  },
};

module.exports = nextConfig;
