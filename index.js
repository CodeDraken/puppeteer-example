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

    // grab team data
    const teams = await page.evaluate(() => {
      // a helper function for some slight code reuse
      // grab the TD, the text and remove trailing whitespace
      const grabFromRow = (row, classname) => row
        .querySelector(`td.${classname}`)
        .innerText
        .trim()

      // our selectors
      const TEAM_ROW_SELECTOR = 'tr.team'

      // we'll store our data in an array of objects
      const data = []

      // get all team rows
      const teamRows = document.querySelectorAll(TEAM_ROW_SELECTOR)

      // loop over each team row, creating objects
      for (const tr of teamRows) {
        data.push({
          name: grabFromRow(tr, 'name'),
          year: grabFromRow(tr, 'year'),
          wins: grabFromRow(tr, 'wins'),
          losses: grabFromRow(tr, 'losses')
        })
      }

      // send the data back into the teams variable
      return data
    })

    // log the data for testing purposes
    console.log(JSON.stringify(teams, null, 2))

    // output
    // [
    //   {
    //     "name": "Boston Bruins",
    //     "year": "1990",
    //     "wins": "44",
    //     "losses": "24"
    //   },
    //   {
    //     "name": "Buffalo Sabres",
    //     "year": "1990",
    //     "wins": "31",
    //     "losses": "30"
    //   },

    //   ...etc
    // ]

    // save the data as JSON
    const fs = require('fs')

    fs.writeFile(
      './json/teams.json',
      JSON.stringify(teams, null, 2), // optional params to format it nicely
      (err) => err ? console.error('Data not written!', err) : console.log('Data written!')
    )

    // all done, close this browser
    await browser.close()
  } catch (error) {
    // if something goes wrong
    // display the error message in console
    console.log(error)
  }
})()
