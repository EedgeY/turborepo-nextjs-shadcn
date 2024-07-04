/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui'],
  env: {
    NEXT_PUBLIC_GOOGLESHEET_API: process.env.NEXT_PUBLIC_GOOGLESHEET_API,
    PRODUCTION_GAS_ENDPOINT: process.env.PRODUCTION_GAS_ENDPOINT,
  },
};

export default nextConfig;
