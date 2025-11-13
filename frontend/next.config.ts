import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false, // (N)
  // reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
