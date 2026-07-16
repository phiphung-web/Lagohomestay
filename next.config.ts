import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 15.5 serializes remotePatterns into the production image manifest
    // as regular expressions, then compiles them a second time at runtime.
    // An exact domain allowlist avoids that production-only mismatch.
    domains: ["images.unsplash.com"]
  },
  poweredByHeader: false,
  experimental: {
    serverActions: { bodySizeLimit: "2mb" }
  }
};

export default nextConfig;
