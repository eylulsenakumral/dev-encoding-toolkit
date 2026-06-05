import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/dev-encoding-toolkit',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
