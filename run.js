const htcrawl = require('./main.js');
const fs = require('fs');

(async () => {
  const crawler = await htcrawl.launch("http://192.168.239.129:3000/#/login", { headlessChrome: false, openChromeDevtoos: false });

  crawler._page.on('console', (msg) => {
    if (String(msg.text()).startsWith('{"XpathCorrespondUrl------>')){
      // xpath 与 url 对应关系
      const XpathCorrespondUrlData = JSON.parse(msg.text());
      for (const key in XpathCorrespondUrlData){
        fs.appendFileSync("XpathCorrespondUrl.log", JSON.stringify(XpathCorrespondUrlData[key]) + "\n");
      }
      
    }else{
      console.log('PAGE LOG:', msg.text());
    }
    
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
