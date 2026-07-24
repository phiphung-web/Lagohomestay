import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { showcaseTemplates } from "../src/features/showcase/data/templates";

const root = process.cwd();
const brandAssets = [
  "public/brand/laka-wordmark.png",
  "public/brand/laka-homestay.png",
  "public/brand/laka-homestay-est-2026.png",
  "public/brand/laka-icon.png",
  "src/app/icon.png"
] as const;

describe("LAKA brand system", () => {
  it("ships every official logo asset used by the interface", () => {
    for (const asset of brandAssets) {
      const path = join(root, asset);
      expect(existsSync(path), asset).toBe(true);
      expect(statSync(path).size, asset).toBeGreaterThan(10_000);
    }
  });

  it("anchors all three concepts in the official brand palette", () => {
    for (const template of showcaseTemplates) {
      expect(template.colors).toContain("#16311c");
      expect(template.colors).toContain("#eae1d2");
    }
  });

  it("uses the official name in global metadata", () => {
    const layout = readFileSync(join(root, "src/app/layout.tsx"), "utf8");
    const manifest = readFileSync(join(root, "src/app/manifest.ts"), "utf8");
    expect(layout).toContain("LAKA Homestay");
    expect(manifest).toContain("LAKA Homestay");
  });
});
