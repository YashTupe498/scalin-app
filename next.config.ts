import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/scalin-app',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
