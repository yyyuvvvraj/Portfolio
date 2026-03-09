import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
    
    await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
    
    for (let i = 0; i < 10; i++) {
        await page.screenshot({ path: `screenshot_${i}.png` });
        console.log(`Took screenshot_${i}.png`);
        await new Promise(r => setTimeout(r, 1000));
    }
    
    await browser.close();
  } catch (err) {
    console.error('Script Error:', err);
  }
})();
