import puppeteer from 'puppeteer'
import dotenv from 'dotenv'

// Loads .env file variables
dotenv.config()

main()

async function main() {
  // .env vars
  const { DEBUG, PAGE_W, PAGE_H, ITALO_LOGIN_USERNAME, ITALO_LOGIN_PASSWORD } = process.env

  // Init chromium instance
  const browser = await puppeteer.launch({
    headless: Boolean(!DEBUG),
    args: [`--window-size=${PAGE_W},${PAGE_H}`],
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1366, height: 768 })

  // -------------------------
  // NSFW things start here 😏
  // -------------------------

  // Open italo login page and wait until there are no more than 0 network connections for at least 500 ms.
  await page.goto('https://biglietti.italotreno.it/Booking_Acquisto_Ricerca.aspx', { waitUntil: 'networkidle0' })

  // Open login popup
  await page.click( '.italo_button_red.fancybox')
  
  // Fill out login credentials and clicks login button
  await page.type('#MasterHeaderRestylingBookingAcquistoRicercaView_MasterHeaderGlobalMenuRestylingBookingAcquistoRicercaView_MasterHeaderGlobalMenuMemberLoginRestylingBookingAcquistoRicercaView_TextBoxUserID', ITALO_LOGIN_USERNAME)
  await page.type('#MasterHeaderRestylingBookingAcquistoRicercaView_MasterHeaderGlobalMenuRestylingBookingAcquistoRicercaView_MasterHeaderGlobalMenuMemberLoginRestylingBookingAcquistoRicercaView_PasswordFieldPassword', ITALO_LOGIN_PASSWORD)
  await page.$eval('#MasterHeaderRestylingBookingAcquistoRicercaView_MasterHeaderGlobalMenuRestylingBookingAcquistoRicercaView_MasterHeaderGlobalMenuMemberLoginRestylingBookingAcquistoRicercaView_ButtonLogIn', form => form.click())
  
  // Wait until user is logged by html checking user menu
  await page.waitForSelector('.adacto.ada-user-button.ada-user-button-social', { visible: true, timeout: 0 })
  
  // Open carnet page
  await page.goto('https://biglietti.italotreno.it/Customer_Account_MieiAcquisti_MieiCarnet.aspx', { waitUntil: 'networkidle0' })

  // TODO - Verify pagination order

  // Click on "Prenota" button
  await page.click('._inl-ctaButton._inl-ctaBlock')
}
