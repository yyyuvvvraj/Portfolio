import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    await page.goto('http://localhost:3000/', { waitUntil: 'load' });
    
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'test_2s.png' });
    console.log("Took test_2s.png");
    
    await new Promise(r => setTimeout(r, 4000));
    await page.screenshot({ path: 'test_6s.png' });
    console.log("Took test_6s.png");

    await browser.close();
  } catch (err) {
    console.error('Script Error:', err);
  }
})();
