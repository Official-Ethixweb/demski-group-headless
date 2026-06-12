const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('http://localhost:4322/custom-software-development-experts/', { waitUntil: 'networkidle' });
  const logos = await page.$('.csd-hero__logos-wrap');
  await logos.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await logos.screenshot({ path: '.tmp-chunks/logos.png' });
  await browser.close();
})();
