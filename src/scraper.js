const puppeteer = require('puppeteer');

module.exports = (placeTxt) =>
  new Promise((resolve, reject) => {
    if (!placeTxt || typeof placeTxt !== 'string')
      return resolve({ url: false, lat: false, lng: false });

    (async () => {
      try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.google.co.id/maps/place/' + encodeURIComponent(placeTxt));
        await page.waitForNavigation();
        /* istanbul ignore next */
        const link = await page.evaluate(() => {
          const match = document.URL.match(/3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
          return {
            url: document.URL,
            lat: parseFloat(match?.[1]) || false,
            lng: parseFloat(match?.[2]) || false
          };
        });
        await page.close();
        await browser.close();
        return resolve(link);
      } catch (error) {
        return reject(error);
      }
    })();
  });
