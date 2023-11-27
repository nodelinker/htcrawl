const htcrawl = require('./main.js');
const fs = require('fs');
const optionHelper = require("./option-helper.js");

const data = require('./test.json');
optionHelper.option.parse(data);

(async (options) => {
  const crawler = await htcrawl.launch("http://192.168.239.130:3000/", options);


  crawler.on("xhr", e => {
    console.log("XHR to " + e.params.request.url);
    fs.appendFileSync("xhrFetchUrl.log", "xhr: " + e.params.request.url + "\n");
  });


  crawler.on("fetch", e => {
    console.log("fetch to " + e.params.request.url);
    fs.appendFileSync("xhrFetchUrl.log", "fetch: " + e.params.request.url + "\n");
  });


  crawler.on("otherrequests", e => {
    console.log("otherrequests to " + e.params.request.url());
    fs.appendFileSync("xhrFetchUrl.log", "otherrequests: " + e.params.request.url() + "\n");
  });


  await crawler.start();


})(optionHelper.option);



