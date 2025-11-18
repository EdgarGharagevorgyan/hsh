import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false, // (N)
  // reactStrictMode: true,   
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-6c6add49eca04d65829c6f2f9141c519.r2.dev",
        pathname: "/**",        
      },
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