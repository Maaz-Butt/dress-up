import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "replicate.delivery",
      },
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
      },
      {
        protocol: "https",
        hostname: "img.sonofatailor.com",
      },
      {
        protocol: "https",
        hostname: "cdn-2.stacees.co.uk",
      },
    ],
  },
};

export default nextConfig;
