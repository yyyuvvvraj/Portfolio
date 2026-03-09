import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
    page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
    
    await page.evaluateOnNewDocument(() => {
      window.addEventListener('error', e => console.error('WINDOW ERROR:', e.message, e.filename, e.lineno));
      window.addEventListener('unhandledrejection', e => console.error('UNHANDLED PROMISE:', e.reason));
      const origError = console.error;
      console.error = function() {
        origError.apply(console, arguments);
        console.log('REACT ERROR INTERCEPTED:', Array.from(arguments).join(' '));
      };
    });
    
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
    
    await new Promise(r => setTimeout(r, 6000));
    
    const bodyHtml = await page.evaluate(() => document.body.innerHTML);
    process.stdout.write("======== FINAL URL ========\n" + page.url() + "\n");
    process.stdout.write("======== BODY DUMP ========\n" + bodyHtml + "\n===========================\n");
    await browser.close();
  } catch (err) {
    console.error('Script Error:', err);
  }
})();
