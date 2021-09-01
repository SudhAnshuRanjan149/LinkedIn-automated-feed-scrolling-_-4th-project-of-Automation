const puppeteer = require("puppeteer");

(async () => {
    //Launch browser
  let openBrowserPromise = puppeteer.launch({
    headless: false,
    slowMo: 50,
    defaultViewport: null,
    args: ["--start-maximized"],
  });

  openBrowserPromise
  //open a page
    .then(function (browser) {
      let pageArrPromise = browser.pages();
      return pageArrPromise;
    })
    //search for linkedIn.com
    .then(function (browserPages) {
      page = browserPages[0];
      let gotoGooglePromise = page.goto("https://www.linkedin.com/");
      return gotoGooglePromise;
    })
    //looking for logIn id input selector
    .then(function () {
      let waitForElementPromise = page.waitForSelector("#session_key", {
        visible: true,
      });
      return waitForElementPromise;
    })
    //Auto Login ID typing code
    .then(function () {
      let typePromise = page.type(
        "#session_key",
        //Put here your login ID
        "Put here your login ID"
      );
      return typePromise;
    })
    //Auto Password typing code
    .then(function () {
    // Put here your login Password
      let typePromise = page.type("#session_password", "Put here your login Password");
      return typePromise;
    })
    //pressed enter to login to your account
    .then(function () {
      let pressEnterPromise = page.keyboard.press("Enter");
      return pressEnterPromise;
    })
    //waiting for inbox selector
    .then(function (){
        let waitForSudElementPromise = page.waitForSelector("#msg-overlay > div.msg-overlay-list-bubble.ml4 > header > div",{visible: true});
        return waitForSudElementPromise;
    })
    //clicking on inbox to minimize this
    .then(function (){
        let elemClickPromise = page.click("#msg-overlay > div.msg-overlay-list-bubble.ml4 > header > div");
        return elemClickPromise;
    })
    //waiting for load all the thing properly
    .then(function () {
      let waitPromise = page.waitFor(3000);
      return waitPromise;
    })
    //calling scroll function
    .then(function () {
      let call = scrollToBottom(page);
      return call;
    });

    //wait for 3 sec
    await page.waitFor(3000);
    //close window if it comes to end
    await browser.close();

})();


//Code for Scrollling
async function scrollToBottom(page) {
    const distance = 100; // should be less than or equal to window.innerHeight
    const delay = 100;
    while (await page.evaluate(() => document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight)) {
      await page.evaluate((y) => { document.scrollingElement.scrollBy(0, y); }, distance);
      await page.waitFor(delay);
    }
  }
