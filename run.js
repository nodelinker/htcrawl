const htcrawl = require('./main.js');

(async () =>{
    const crawler = await htcrawl.launch("http://192.168.239.129:3000/", {headlessChrome: false, openChromeDevtoos:false});

    crawler._page.on('console', (msg) =>{
      console.log('PAGE LOG:', msg.text())
    });

// Print out the url of ajax calls
crawler.on("xhr", e => {
  console.log("XHR to " + e.params.request.url);
});

// crawler.on("earlydetach", e => {
//     console.log("earlydetach " + e);
//   });

// Start crawling!
crawler.start();



})();

