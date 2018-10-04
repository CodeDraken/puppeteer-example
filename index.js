// load in puppeteer
const puppeteer = require('puppeteer')

// this wrapper means immediately execute this code
void (async () => {
  // wrapper to catch errors
  try {
    // create a new browser instance
    const browser = await puppeteer.launch()

    // create a page inside the browser
    const page = await browser.newPage()

    // navigate to a website
    await page.goto('https://scrapethissite.com/pages/forms/')

    // take a screenshot and save it to
    // this folder/screenshots/page1.png
    await page.screenshot({
      path: './screenshots/page1.png'
    })

    // generate a pdf of the page and save it to
    // this folder/pdfs/page1.pdf
    await page.pdf({ path: './pdfs/page1.pdf' })

    // all done, close this browser
    await browser.close()
  } catch (error) {
    // if something goes wrong
    // display the error message in console
    console.log(error)
  }
})()
