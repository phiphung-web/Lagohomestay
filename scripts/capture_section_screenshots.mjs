import { chromium } from 'playwright-core';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public', 'screenshots', 'order');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function capture() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Homepage Hero
  console.log('Capturing Home Hero...');
  const heroEl = await page.$('section:has(h1)');
  if (heroEl) {
    await heroEl.screenshot({ path: path.join(outDir, 'home_01_hero.jpg'), quality: 85 });
  }

  // 2. S? m?nh (#gioi-thieu)
  console.log('Capturing S? m?nh (#gioi-thieu)...');
  const bioEl = await page.$('#gioi-thieu');
  if (bioEl) {
    await bioEl.screenshot({ path: path.join(outDir, 'home_02_brand_story.jpg'), quality: 85 });
  }

  // 3. Luu Trú (#luu-tru)
  console.log('Capturing Luu Trú (#luu-tru)...');
  const staysEl = await page.$('#luu-tru');
  if (staysEl) {
    await staysEl.screenshot({ path: path.join(outDir, 'home_03_landscape_collections.jpg'), quality: 85 });
  }

  // 4. ?m th?c (#am-thuc)
  console.log('Capturing ?m th?c (#am-thuc)...');
  const diningEl = await page.$('#am-thuc');
  if (diningEl) {
    await diningEl.screenshot({ path: path.join(outDir, 'home_04_dining_preview.jpg'), quality: 85 });
  }

  // 5. M?t ngày ? LAKA (#mot-ngay)
  console.log('Capturing M?t ngày ? LAKA (#mot-ngay)...');
  const journeyEl = await page.$('#mot-ngay');
  if (journeyEl) {
    await journeyEl.screenshot({ path: path.join(outDir, 'home_05_day_journey.jpg'), quality: 85 });
  }

  // 6. Thu vi?n ký ?c (#ky-uc)
  console.log('Capturing Thu vi?n ký ?c (#ky-uc)...');
  const memoryEl = await page.$('#ky-uc');
  if (memoryEl) {
    await memoryEl.screenshot({ path: path.join(outDir, 'home_06_memory_gallery.jpg'), quality: 85 });
  }

  // 7. C?m nh?n khách ngh? (#feedback)
  console.log('Capturing C?m nh?n khách ngh? (#feedback)...');
  const feedbackEl = await page.$('#feedback');
  if (feedbackEl) {
    await feedbackEl.screenshot({ path: path.join(outDir, 'home_07_guest_stories.jpg'), quality: 85 });
  }

  // Subpage screenshots
  // 8. Subpage Banner Hero & Stays Explorer
  console.log('Navigating to /luu-tru ...');
  await page.goto('http://localhost:3000/luu-tru', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const subBanner = await page.$('header.relative, section.relative:has(h1)');
  if (subBanner) {
    await subBanner.screenshot({ path: path.join(outDir, 'subpage_banner_hero.jpg'), quality: 85 });
  }
  const stayCatalog = await page.$('#bo-suu-tap-can');
  if (stayCatalog) {
    await stayCatalog.screenshot({ path: path.join(outDir, 'subpage_stays_explorer.jpg'), quality: 85 });
  }

  // 9. Experience Catalog
  console.log('Navigating to /trai-nghiem ...');
  await page.goto('http://localhost:3000/trai-nghiem', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const expEl = await page.$('#trai-nghiem');
  if (expEl) {
    await expEl.screenshot({ path: path.join(outDir, 'subpage_experience_catalog.jpg'), quality: 85 });
  }

  // 10. Dining Catalog & Menu Scan
  console.log('Navigating to /am-thuc ...');
  await page.goto('http://localhost:3000/am-thuc', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const dinSpaces = await page.$('section[aria-labelledby="dining-spaces-heading"]');
  if (dinSpaces) {
    await dinSpaces.screenshot({ path: path.join(outDir, 'subpage_dining_spaces.jpg'), quality: 85 });
  }
  const menuEl = await page.$('#thuc-don');
  if (menuEl) {
    await menuEl.screenshot({ path: path.join(outDir, 'subpage_dining_menu.jpg'), quality: 85 });
  }

  // 11. Services Catalog
  console.log('Navigating to /dich-vu ...');
  await page.goto('http://localhost:3000/dich-vu', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const srvEl = await page.$('#danh-muc-dich-vu');
  if (srvEl) {
    await srvEl.screenshot({ path: path.join(outDir, 'subpage_services_catalog.jpg'), quality: 85 });
  }

  // 12. About LAKA Pillars
  console.log('Navigating to /ve-laka ...');
  await page.goto('http://localhost:3000/ve-laka', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const aboutEl = await page.$('#cau-chuyen');
  if (aboutEl) {
    await aboutEl.screenshot({ path: path.join(outDir, 'subpage_about_pillars.jpg'), quality: 85 });
  }

  // 13. Directions Journey
  console.log('Navigating to /chi-duong ...');
  await page.goto('http://localhost:3000/chi-duong', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const dirEl = await page.$('#chi-duong');
  if (dirEl) {
    await dirEl.screenshot({ path: path.join(outDir, 'subpage_directions_journey.jpg'), quality: 85 });
  }

  await browser.close();
  console.log('All screenshots captured successfully in:', outDir);
}

capture().catch(err => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
