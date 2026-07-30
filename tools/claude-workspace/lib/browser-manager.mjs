import path from "node:path";
import { mkdir } from "node:fs/promises";

function safeName(value) {
  return value
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 70) || "page";
}

export class BrowserManager {
  constructor() {
    this.browser = null;
    this.provider = null;
  }

  async launch() {
    if (this.browser?.isConnected()) return this.browser;
    const { chromium } = await import("playwright-core");
    const attempts = [
      { channel: "chrome", label: "Google Chrome" },
      { channel: "msedge", label: "Microsoft Edge" }
    ];
    let lastError;
    for (const attempt of attempts) {
      try {
        this.browser = await chromium.launch({
          channel: attempt.channel,
          headless: true,
          args: ["--disable-dev-shm-usage"]
        });
        this.provider = attempt.label;
        return this.browser;
      } catch (error) {
        lastError = error;
      }
    }
    throw new Error(`Chrome/Edge could not be launched: ${lastError?.message ?? "unknown error"}`);
  }

  async status() {
    try {
      await this.launch();
      return { available: true, provider: this.provider };
    } catch (error) {
      return { available: false, error: error.message };
    }
  }

  async batch({ urls, viewports, fullPage = true, sessionEvidenceDir }) {
    if (!Array.isArray(urls) || !urls.length) throw new Error("At least one URL is required.");
    if (urls.length > 6) throw new Error("A browser batch supports at most 6 URLs.");
    const sizes = Array.isArray(viewports) && viewports.length
      ? viewports.slice(0, 3)
      : [{ width: 1440, height: 900 }, { width: 360, height: 800 }];

    await mkdir(sessionEvidenceDir, { recursive: true });
    const browser = await this.launch();
    const results = [];

    for (const item of urls) {
      const rawUrl = typeof item === "string" ? item : item.url;
      const label = typeof item === "string" ? rawUrl : item.label || item.url;
      const parsed = new URL(rawUrl);
      if (!["http:", "https:"].includes(parsed.protocol)) throw new Error(`Unsupported URL: ${rawUrl}`);

      for (const viewport of sizes) {
        const width = Math.max(320, Math.min(1920, Number(viewport.width) || 1440));
        const height = Math.max(568, Math.min(1200, Number(viewport.height) || 900));
        const context = await browser.newContext({
          viewport: { width, height },
          reducedMotion: "reduce",
          locale: "vi-VN"
        });
        const page = await context.newPage();
        const consoleErrors = [];
        page.on("console", (message) => {
          if (message.type() === "error") consoleErrors.push(message.text().slice(0, 500));
        });
        page.on("pageerror", (error) => consoleErrors.push(error.message.slice(0, 500)));

        const startedAt = Date.now();
        try {
          const response = await page.goto(rawUrl, { waitUntil: "domcontentloaded", timeout: 60_000 });
          await page.waitForTimeout(900);
          const metrics = await page.evaluate(() => ({
            title: document.title,
            lang: document.documentElement.lang,
            width: window.innerWidth,
            height: window.innerHeight,
            scrollWidth: document.documentElement.scrollWidth,
            scrollHeight: document.documentElement.scrollHeight,
            h1: document.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim() ?? null,
            headings: [...document.querySelectorAll("h1,h2")]
              .slice(0, 18)
              .map((element) => element.textContent?.replace(/\s+/g, " ").trim()),
            sections: [...document.querySelectorAll("main > section, main > div > section")]
              .slice(0, 24)
              .map((section, index) => ({
                index,
                id: section.id || null,
                height: Math.round(section.getBoundingClientRect().height),
                images: section.querySelectorAll("img").length
              })),
            links: [...document.querySelectorAll("a[href]")]
              .slice(0, 40)
              .map((link) => ({
                text: link.textContent?.replace(/\s+/g, " ").trim().slice(0, 100),
                href: link.href
              }))
          }));

          const fileName = `${safeName(label)}-${width}x${height}-${Date.now()}.jpg`;
          const screenshotPath = path.join(sessionEvidenceDir, fileName);
          await page.screenshot({ path: screenshotPath, type: "jpeg", quality: 78, fullPage });
          results.push({
            label,
            requestedUrl: rawUrl,
            finalUrl: page.url(),
            status: response?.status() ?? null,
            viewport: { width, height },
            durationMs: Date.now() - startedAt,
            screenshot: fileName,
            consoleErrors,
            ...metrics
          });
        } catch (error) {
          results.push({
            label,
            requestedUrl: rawUrl,
            viewport: { width, height },
            durationMs: Date.now() - startedAt,
            error: error.message,
            consoleErrors
          });
        } finally {
          await context.close();
        }
      }
    }
    return { provider: this.provider, results };
  }

  async flow({ url, viewport, steps = [], sessionEvidenceDir }) {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) throw new Error(`Unsupported URL: ${url}`);
    if (!Array.isArray(steps) || steps.length > 20) {
      throw new Error("A browser flow supports at most 20 steps.");
    }

    const width = Math.max(320, Math.min(1920, Number(viewport?.width) || 1440));
    const height = Math.max(568, Math.min(1200, Number(viewport?.height) || 900));
    await mkdir(sessionEvidenceDir, { recursive: true });
    const browser = await this.launch();
    const context = await browser.newContext({
      viewport: { width, height },
      reducedMotion: "reduce",
      locale: "vi-VN"
    });
    const page = await context.newPage();
    const consoleErrors = [];
    const evidence = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text().slice(0, 500));
    });
    page.on("pageerror", (error) => consoleErrors.push(error.message.slice(0, 500)));

    const screenshot = async (label, fullPage = false) => {
      const fileName = `${safeName(label)}-${width}x${height}-${Date.now()}.jpg`;
      await page.screenshot({
        path: path.join(sessionEvidenceDir, fileName),
        type: "jpeg",
        quality: 80,
        fullPage
      });
      evidence.push(fileName);
      return fileName;
    };

    try {
      const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
      await page.waitForTimeout(700);
      for (let index = 0; index < steps.length; index += 1) {
        const step = steps[index];
        const timeout = Math.max(1_000, Math.min(20_000, Number(step.timeout_ms) || 10_000));
        switch (step.action) {
          case "click":
            await page.locator(step.selector).first().click({ timeout });
            break;
          case "fill":
            await page.locator(step.selector).first().fill(String(step.value ?? ""), { timeout });
            break;
          case "press":
            await page.locator(step.selector).first().press(String(step.key), { timeout });
            break;
          case "wait":
            await page.waitForTimeout(Math.max(0, Math.min(5_000, Number(step.ms) || 500)));
            break;
          case "scroll":
            if (step.selector) {
              await page.locator(step.selector).first().scrollIntoViewIfNeeded({ timeout });
            } else {
              await page.mouse.wheel(0, Math.max(-5_000, Math.min(5_000, Number(step.y) || height)));
            }
            break;
          case "screenshot":
            await screenshot(step.label || `step-${index + 1}`, Boolean(step.fullPage));
            break;
          default:
            throw new Error(`Unsupported browser action at step ${index + 1}: ${step.action}`);
        }
        if (step.action !== "wait") await page.waitForTimeout(250);
      }

      if (!evidence.length) await screenshot("browser-flow-final", false);
      const snapshot = await page.evaluate(() => ({
        title: document.title,
        lang: document.documentElement.lang,
        url: location.href,
        width: innerWidth,
        height: innerHeight,
        scrollWidth: document.documentElement.scrollWidth,
        scrollHeight: document.documentElement.scrollHeight,
        activeElement: document.activeElement?.tagName ?? null,
        h1: document.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim() ?? null,
        visibleDialogs: [...document.querySelectorAll('[role="dialog"],dialog')]
          .filter((element) => {
            const style = getComputedStyle(element);
            const rect = element.getBoundingClientRect();
            return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
          })
          .map((element) => element.textContent?.replace(/\s+/g, " ").trim().slice(0, 600)),
        headings: [...document.querySelectorAll("h1,h2,h3")]
          .slice(0, 24)
          .map((element) => element.textContent?.replace(/\s+/g, " ").trim()),
        buttons: [...document.querySelectorAll("button")]
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            return rect.width > 0 && rect.height > 0;
          })
          .slice(0, 30)
          .map((element) => element.textContent?.replace(/\s+/g, " ").trim().slice(0, 120))
      }));

      return {
        provider: this.provider,
        initialStatus: response?.status() ?? null,
        viewport: { width, height },
        evidence,
        consoleErrors,
        ...snapshot
      };
    } finally {
      await context.close();
    }
  }

  async close() {
    await this.browser?.close().catch(() => {});
    this.browser = null;
  }
}
