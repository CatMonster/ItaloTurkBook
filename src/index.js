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
    slowMo: 80
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1366, height: 768 })
  
  await page.goto('https://biglietti.italotreno.it/Booking_Acquisto_SelezioneTreno_A.aspx', { waitUntil: 'networkidle0' })
  const oplist = await page.$$('.ghots-selection')

  //Activate and open the first list
  await oplist[0].click()
  await oplist[0].click()

  //Click on the departure station
  const listd = await page.$$('.destination__box--direct .list span')
  await listd[0].click()

  //The same thing as before for the other part
  await page.$$('.ghots-selection')
  await oplist[3].click()
  const lista = await page.$$('.destination__box--direct .list span')
  await lista[0].click()

  await page.click('#ModuloRicercaBookingRicercaRestylingBookingSelezioneTrenoAView_ButtonChangeSearchInBookingFlow',{waitUntil: 'networkidle2'})

  /*const go = await page.$('#ModuloRicercaBookingRicercaRestylingBookingSelezioneTrenoAView_ButtonChangeSearchInBookingFlow')
  await go.click()*/

  //Select the first train
  // const train = await page.$("#booking-flow > div.booking-flow-elenco-treni > div.main-section.no-padding-vert > div.lista-treni > div:nth-child(2) > div.accordion-header")
  // await train.click()
  
  //Selezione costo biglietto/accesso alla selezione posti
  //document.querySelectorAll('.button-tariffa label')[0].click()

  //Individuare se il posto è occupato o non
  //document.querySelectorAll(".aUnit.unitGroup0")[numero_elemento_array].style.backgroundImage
  
  //Individuare il numero del posto (Numero elemento array != numero posto)
  //document.querySelectorAll(".aUnit.unitGroup0")[numero_elemento_array].querySelector("span").innerText
  
  // Fill out login credentials and clicks login button
  // await page.type('#MasterHeaderRestylingBookingAcquistoRicercaView_MasterHeaderGlobalMenuRestylingBookingAcquistoRicercaView_MasterHeaderGlobalMenuMemberLoginRestylingBookingAcquistoRicercaView_TextBoxUserID', ITALO_LOGIN_USERNAME)
  // await page.type('#MasterHeaderRestylingBookingAcquistoRicercaView_MasterHeaderGlobalMenuRestylingBookingAcquistoRicercaView_MasterHeaderGlobalMenuMemberLoginRestylingBookingAcquistoRicercaView_PasswordFieldPassword', ITALO_LOGIN_PASSWORD)
}