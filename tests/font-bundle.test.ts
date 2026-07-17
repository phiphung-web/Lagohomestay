import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(join(process.cwd(), "src/app/fonts.css"), "utf8");

describe("Vietnamese font bundle", () => {
  it("keeps only the 24 Latin and Vietnamese WOFF2 faces used by Lago", () => {
    expect(css.match(/@font-face/g)).toHaveLength(24);
    expect(css.match(/\.woff2\"/g)).toHaveLength(24);
    expect(css).not.toMatch(/\.woff\"/);
    expect(css).not.toMatch(/cyrillic|latin-ext|math|symbols/);
  });

  it("covers every body and display weight used by the three templates", () => {
    for (const weight of [400, 500, 600, 700, 800, 900]) {
      expect(css).toContain(`be-vietnam-pro-vietnamese-${weight}-normal.woff2`);
      expect(css).toContain(`be-vietnam-pro-latin-${weight}-normal.woff2`);
    }
    for (const face of ["400-italic", "500-normal", "500-italic", "600-normal", "600-italic", "700-normal"]) {
      expect(css).toContain(`lora-vietnamese-${face}.woff2`);
      expect(css).toContain(`lora-latin-${face}.woff2`);
    }
  });
});
