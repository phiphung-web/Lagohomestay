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

  it("keeps the public-site heading hierarchy clear and hides unapproved feedback placeholders", () => {
    const globals = source("src/app/globals.css");
    const home = source("src/features/showcase/site/main-home.tsx");
    const site = source("src/features/showcase/site/complete-template-site.tsx");
    const story = source("src/features/showcase/components/home-brand-story.tsx");
    const stays = source("src/features/showcase/components/home-landscape-collections.tsx");
    const destinations = source("src/features/showcase/components/template-destination-sections.tsx");
    const feedback = source("src/features/showcase/components/home-guest-stories.tsx");

    expect(globals).toContain('.laka-heading-section, .laka-home-section-title { font-family: "Be Vietnam Pro"');
    expect(globals).toContain('.laka-section-lead, .laka-home-section-lead { font-family: "Lora"');
    expect(globals).toContain("font-size: clamp(1.0625rem, 1.25vw, 1.25rem)");
    expect(site).toContain('<h2 className="laka-heading-section max-w-3xl">');
    expect(site).toContain('<p className="laka-section-lead mt-5 max-w-3xl opacity-72">');
    expect(destinations).toContain('className="laka-heading-card mt-6"');
    expect(home).toContain('"Chọn" Cabin - "Trọn" Thung Lũng');
    expect(home).toContain("LaKa - Nhà giữa khoảng xanh");
    expect(story).toContain('h-[min(58svh,440px)]');
    expect(stays).toContain("Ba nhóm không gian");
    expect(stays).toContain('href={basePath + "/luu-tru"}');
    expect(stays).not.toContain("stay.details");
    expect(home).not.toContain("Khung lưới linh hoạt");
    expect(feedback).toContain('aria-roledescription="carousel"');
    expect(feedback).toContain("laka-feedback-track");
    expect(feedback).toContain("if (guestStories.length === 0) return null");
    expect(feedback).not.toContain("Một slider phản hồi tổng hợp");
    expect(feedback).not.toContain("Đang xem khung phản hồi");
    expect(feedback).not.toContain("Phản hồi thực tế sẽ xuất hiện");
    expect(feedback).not.toContain("Khách Việt Nam");
    expect(feedback).not.toContain("Khách nước ngoài");
  });
});
