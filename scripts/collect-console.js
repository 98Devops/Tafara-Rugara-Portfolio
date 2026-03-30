const { chromium } = require('playwright');

(async () => {
  const url = process.argv[2] || 'http://localhost:3003';
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', msg => {
    console.log(`BROWSER LOG: [${msg.type()}] ${msg.text()}`);
  });

  page.on('pageerror', err => {
    console.log('BROWSER PAGE ERROR:', err);
  });

  try {
    const res = await page.goto(url, { waitUntil: 'load', timeout: 30000 });
    console.log('HTTP status:', res.status());
    // wait a bit for hydration
    await page.waitForTimeout(3000);
  } catch (err) {
    console.error('ERROR visiting page:', err);
  } finally {
    await browser.close();
  }
})();
