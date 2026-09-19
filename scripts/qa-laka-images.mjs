import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { chromium } from "playwright-core";

const baseUrl = process.argv[2] ?? "http://localhost:3000";
const outputDir = path.join(os.tmpdir(), "laka-web-qa");
fs.mkdirSync(outputDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true
});

async function settleImages(page) {
  const images = await page.locator("img").all();
  for (const image of images) {
    if (!(await image.isVisible())) continue;
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((element) => new Promise((resolve) => {
      if (element.complete) {
        resolve(undefined);
        return;
      }
      const timeout = window.setTimeout(resolve, 2000);
      element.addEventListener("load", () => {
        window.clearTimeout(timeout);
        resolve(undefined);
      }, { once: true });
      element.addEventListener("error", () => {
        window.clearTimeout(timeout);
        resolve(undefined);
      }, { once: true });
    }));
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(250);
}

try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const routes = [
    "/",
    "/luu-tru",
    "/trai-nghiem",
    "/dich-vu",
    "/luu-tru/forest-lake-suite",
    "/luu-tru/bungalow"
  ];
  const report = [];

  for (const route of routes) {
    await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    await settleImages(page);
    const state = await page.evaluate(() => ({
      images: document.images.length,
      broken: [...document.images]
        .filter((image) => !image.complete || image.naturalWidth === 0)
        .map((image) => image.currentSrc || image.src),
      local: [...document.images]
        .filter((image) => (image.currentSrc || image.src).includes("/images/laka/"))
        .length,
      unsplash: [...document.images]
        .filter((image) => (image.currentSrc || image.src).includes("images.unsplash.com"))
        .length
    }));
    report.push({ route, ...state });

    if (route === "/") {
      await page.locator("section:has(h1)").first().screenshot({ path: path.join(outputDir, "home-hero-desktop.png") });
      await page.locator("#luu-tru").screenshot({ path: path.join(outputDir, "home-stays.png") });
      await page.locator("#ky-uc").screenshot({ path: path.join(outputDir, "home-gallery.png") });
    }
    if (route === "/trai-nghiem") {
      await page.locator("#trai-nghiem").screenshot({ path: path.join(outputDir, "experiences.png") });
    }
    if (route === "/dich-vu") {
      await page.locator("#danh-muc-dich-vu").screenshot({ path: path.join(outputDir, "services.png") });
    }
  }

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto(baseUrl, { waitUntil: "networkidle" });
  await mobile.locator("section:has(h1)").first().screenshot({ path: path.join(outputDir, "home-hero-mobile.png") });
  await mobile.close();

  console.log(JSON.stringify({ outputDir, report }, null, 2));
} finally {
  await browser.close();
}
