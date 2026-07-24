import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allows CI/QA builds to run alongside a local preview without sharing
  // Next.js build artifacts. Production keeps the standard `.next` folder.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    // Generate responsive Unsplash CDN URLs in the browser instead of routing
    // through /_next/image, which is intentionally avoided on the demo VPS.
    loader: "custom",
    loaderFile: "./src/shared/lib/image-loader.ts",
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [32, 64, 96, 128, 256, 384]
  },
  poweredByHeader: false,
  experimental: {
    serverActions: { bodySizeLimit: "2mb" }
  }
};

export default nextConfig;
