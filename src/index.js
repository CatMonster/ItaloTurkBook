import puppeteer from 'puppeteer'
import dotenv from 'dotenv'

// Loads .env file variables
dotenv.config()

main()

async function main() {
  // .env vars
  const { DEBUG, PAGE_W, PAGE_H } = process.env
  
  // Init chromium instance
  const browser = await puppeteer.launch({
    headless: Boolean(!DEBUG),
    args: [`--window-size=${PAGE_W},${PAGE_H}`],
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1366, height: 768 })
  
  await page.goto('https://www.italotreno.it', { waitUntil: 'networkidle0' })
  const ato = await page.$$('input[autocomplete=off]')
  //from.type("Roma")
  //to.type("Steve")

  console.log(ato.lenght)

  //Individuare se il posto è occupato o non
  //document.querySelectorAll(".aUnit.unitGroup0")[numero_elemento_array].style.backgroundImage
  
  //Individuare il numero del posto (Numero elemento array != numero posto)
  //document.querySelectorAll(".aUnit.unitGroup0")[numero_elemento_array].querySelector("span").innerText
  
/*{
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
}*/
}