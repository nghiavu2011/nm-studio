import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Clear cache
  await page.setCacheEnabled(false);

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.message);
    console.log('STACK:', err.stack);
  });
  page.on('requestfailed', req =>
    console.log('REQUEST FAILED:', req.url(), req.failure()?.errorText)
  );

  console.log('Navigating with cache busting...');
  // Add a timestamp to bypass CDN/browser cache if possible
  await page.goto(`https://www.nmstudio.id.vn/?t=${Date.now()}`, { waitUntil: 'networkidle0' });
  
  console.log('Waiting 10s for potential async errors...');
  await new Promise(r => setTimeout(r, 10000));
  
  const content = await page.content();
  console.log('Has NM Studio text?', content.includes('NM Studio'));
  console.log('Body classes:', await page.evaluate(() => document.body.className));

  await browser.close();
})();
