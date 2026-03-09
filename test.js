import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
  
  await page.goto('http://localhost:3000/');
  
  // Wait for boot screen to render
  await page.waitForTimeout(1000);
  
  // Skip boot screen
  try {
    await page.click('button:has-text("[SKIP_BOOT_SEQUENCE]")', { timeout: 2000 });
    console.log("Clicked skip button.");
  } catch (e) {
    console.log("Could not click skip button, waiting for finish.");
  }

  // Wait to see what happens
  await page.waitForTimeout(3000);
  
  // Get body innerHTML length
  const bodyLen = await page.evaluate(() => document.body.innerHTML.length);
  console.log("Body innerHTML length:", bodyLen);
  
  await browser.close();
})();
