const { Builder, By, until, Capabilities } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
let axios = require("axios");
let cheerio = require("cheerio");
let fs = require("fs");
var moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");
const caps = new Capabilities();
caps.setPageLoadStrategy("normal");

(async function myFunction() {
  try {
    let driver = await new Builder()
      .withCapabilities(caps)
      .forBrowser("chrome")
      // .setChromeOptions(new chrome.Options()
      // .headless())
      .build();
    // Apply timeout for 10 seconds
    await driver.manage().setTimeouts({ implicit: 10000 });
    await driver.get("https://bbs.ruliweb.com/psp/board/1020");
    await driver.manage().setTimeouts({ implicit: 10000 });
    // Waiting 30 seconds for an element to be present on the page, checking
    // for its presence once every 5 seconds.
    let class_lists = [
      "id",
      "divsn",
      "subject",
      "writer text_over",
      "recomd",
      "hit",
      "time",
    ];

    let webElement = await driver.findElement(By.className("board_list_table"));
    let elements = await webElement.findElements(By.className("table_body"));
    let links = await webElement.findElements(By.tagName("href"));
    console.log(links.length);
    console.log(elements.length);
    let e;
    resultArray = [];

    let i = 1;
    for (e of elements) {
      result = {};
      await driver.manage().setTimeouts({ implicit: 10000 });

      //   prod_name = await e.findElement(By.className(class_lists[1])).getText();
      //   if (!(await e.findElement(By.className(class_lists[2])).getText())) {
      //     prod_intro = await e
      //       .findElement(By.className(class_lists[2]))
      //       .getText();
      //   } else {
      //     prod_intro = await e
      //       .findElement(By.className(class_lists[2]))
      //       .getText();
      //   }

      id = await e.findElement(By.className(class_lists[0])).getText();
      category = await e.findElement(By.className(class_lists[1])).getText();
      subject = await e.findElement(By.className(class_lists[2])).getText();
      writer = await e.findElement(By.className(class_lists[3])).getText();
      recomd = await e.findElement(By.className(class_lists[4])).getText();
      hit = await e.findElement(By.className(class_lists[5])).getText();
      time = await e.findElement(By.className(class_lists[6])).getText();

      result.id = id;
      result.category = category;
      result.subject = subject;
      result.writer = writer;
      result.recomd = recomd;
      result.hit = hit;
      result.time = time;

      resultArray.push(result);

      //   console.log(resultArray);
      //   console.log(i++);
      if (i > elements.length) {
        break;
      }
    }

    var sJoon = JSON.stringify(resultArray);
    console.log(sJoon);
    fs.writeFileSync("search_result.json", sJoon);
    const dataBuffer1 = fs.readFileSync("search_result.json");
    const dataJSON1 = dataBuffer1.toString();
    console.log(dataJSON1);

    var isEmpty = function (value) {
      if (
        value == "" ||
        value == null ||
        value == undefined ||
        (value != null &&
          typeof value == "object" &&
          !Object.keys(value).length)
      ) {
        return true;
      } else {
        return false;
      }
    };
  } finally {
    //   catch (error) {
    //     console.log("error가 발생");
    //   }
    console.log("끝");
  }
})();
