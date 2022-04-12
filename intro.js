const puppeteer=require('puppeteer');
let page;
let browserOperation=puppeteer.launch({
    headless : false
});
browserOperation.then(function(browser){
    console.log("Browser opened.");
    let pageOpenPromise=browser.pages();
    return pageOpenPromise;
}).then(function(browserPage){
        let page=browserPage[0];
        let gotoPromise=page.goto("https://www.google.com/");
        return gotoPromise;
}).then(function(){
    let kp=page.waitForSelector("input[type='text']",{visible : true})
    return kp;
})
.then(function(){
   // console.log("Reaced google home page");
  let keyPomise= page.type("input[type='text']","pepcoding",{delay :60});
  return keyPomise;
}).then(function(){
    let enterPress=page.keyboard.press("Enter",{delay :60});
    return enterPress;
}).catch(function(err){
    console.log(err);
})
