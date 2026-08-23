import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const source = (path: string) => readFileSync(join(root, path), "utf8");

describe("LAKA showcase layout guards", () => {
  it("keeps fill-image frames within the viewport", () => {
    const globals = source("src/app/globals.css");

    expect(globals).toContain(".laka-media-frame { max-height: 100svh; }");
    expect(globals).toContain(":has(> img[data-nimg=\"fill\"]) { max-height: 100svh; }");
    expect(globals).toContain("button, article, span");
  });

  it("coordinates the sticky stay filter with the hide-on-scroll header", () => {
    const header = source("src/features/showcase/components/scroll-aware-header.tsx");
    const explorer = source("src/features/showcase/components/stay-product-explorer.tsx");

    expect(header).toContain("--laka-header-offset");
    expect(header).toContain('hidden ? "0px" : "92px"');
    expect(explorer).toContain("top-[var(--laka-header-offset)]");
  });

  it("keeps the compact header and resilient contact alternatives", () => {
    const site = source("src/features/showcase/site/complete-template-site.tsx");
    const form = source("src/features/showcase/components/contact-inquiry-form.tsx");

    expect(site).toContain('BrandLogo variant="wordmark"');
    expect(site.match(/whitespace-nowrap/g)?.length).toBeGreaterThanOrEqual(2);
    expect(form).toContain("publicContact.zaloHref");
    expect(form).toContain("publicContact.phoneHref");
    expect(form).toContain('role="status"');
  });
});
