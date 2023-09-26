const htcrawl = require('./main.js');
const fs = require('fs');

(async () => {
  const crawler = await htcrawl.launch("http://192.168.239.130:3000/#/login", { headlessChrome: false, openChromeDevtoos: true });

  crawler._page.on('console', (msg) => {
    console.log('PAGE LOG:', msg.text())
  });

  // Print out the url of ajax calls
  crawler.on("xhr", e => {
    console.log("XHR to " + e.params.request.url);
    fs.appendFileSync("xhrFetchUrl.log", e.params.request.url + "\n");
  });


  crawler.on("fetch", e => {
    console.log("fetch to " + e.params.request.url);
    fs.appendFileSync("xhrFetchUrl.log", e.params.request.url + "\n");
  });

  // crawler.on("earlydetach", e => {
  //     console.log("earlydetach " + e);
  //   });

  // Start crawling!
  await crawler.start();


})();

