import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    react: {
      version: '18.2.0'
    }
  }
};

// export default nextConfig;
module.exports = nextConfig
