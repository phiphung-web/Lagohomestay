import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 15.5 serializes remotePatterns into the production image manifest
    // as regular expressions, then compiles them a second time at runtime.
    // An exact domain allowlist avoids that production-only mismatch.
    domains: ["images.unsplash.com"],
    // Demo media is already resized and compressed by Unsplash through the
    // width/quality parameters in each URL. Bypass the production optimizer,
    // which rejects otherwise valid external URLs in this Next 15.5 build.
    unoptimized: true
  },
  poweredByHeader: false,
  experimental: {
    serverActions: { bodySizeLimit: "2mb" }
  }
};

export default nextConfig;
