'use strict'

const puppeteer = require('puppeteer')

const { login, isUserLoggedIn } = require('./actions/login')
const { book } = require('./actions/book')

;(async function main() {
  // .env vars
  const { DEBUG, PAGE_W, PAGE_H, CHROME_PATH, PROFILE_PATH } = process.env

  // Init chromium instance
  const browser = await puppeteer.launch({
    headless: Boolean(!DEBUG),
    args: [`--window-size=${PAGE_W},${PAGE_H}`],
    executablePath: CHROME_PATH,
    userDataDir: PROFILE_PATH,
  })
  const page = await browser.newPage()
  await page.setViewport({ width: parseInt(PAGE_W), height: parseInt(PAGE_H) })

  // -------------------------
  // NSFW things start here 😏
  // -------------------------
  await page.goto('https://biglietti.italotreno.it/Booking_Acquisto_Ricerca.aspx')

  const loggedIn = await isUserLoggedIn(page)
  console.log(`Login status: ${loggedIn}`)
  if (!loggedIn) {
    console.log('User not logged in, trying to logging user in')
    await login(page)
  }

  await book(page)

  // Close page
  // page.close()
})()
