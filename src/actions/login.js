const { ITALO_LOGIN_USERNAME, ITALO_LOGIN_PASSWORD } = process.env

export default async function login(page) {
  const loginPage = 'https://biglietti.italotreno.it/Booking_Acquisto_Ricerca.aspx'

  if (page.url() !== loginPage) {
    // Open italo login page
    await page.goto(loginPage)
  }

  try {
    const loginMenu = await page.waitForSelector('.loginSection', { timeout: 2000 })
    if (loginMenu) {
      console.log(
        'Skipping... user already logged in. If you are using login function unconditionally please remove it or wrap it with a login check first by using "isUserLoggedIn" function',
      )
      return
    }
  } catch (e) {
    // Open login form
    await page.click('.italo_button_red.fancybox')

    // Fill out login credentials and clicks login button
    await page.type(
      '#MasterHeaderRestylingBookingAcquistoRicercaView_MasterHeaderGlobalMenuRestylingBookingAcquistoRicercaView_MasterHeaderGlobalMenuMemberLoginRestylingBookingAcquistoRicercaView_TextBoxUserID',
      ITALO_LOGIN_USERNAME,
    )
    await page.type(
      '#MasterHeaderRestylingBookingAcquistoRicercaView_MasterHeaderGlobalMenuRestylingBookingAcquistoRicercaView_MasterHeaderGlobalMenuMemberLoginRestylingBookingAcquistoRicercaView_PasswordFieldPassword',
      ITALO_LOGIN_PASSWORD,
    )

    // Press "Rember me" checkbox
    await page.$eval(
      '#MasterHeaderRestylingBookingAcquistoRicercaView_MasterHeaderGlobalMenuRestylingBookingAcquistoRicercaView_MasterHeaderGlobalMenuMemberLoginRestylingBookingAcquistoRicercaView_CheckBoxRemainLogged',
      (checkBox) => checkBox.click(),
    )

    await page.$eval(
      '#MasterHeaderRestylingBookingAcquistoRicercaView_MasterHeaderGlobalMenuRestylingBookingAcquistoRicercaView_MasterHeaderGlobalMenuMemberLoginRestylingBookingAcquistoRicercaView_ButtonLogIn',
      (form) => form.click(),
    )

    await page.waitForNavigation({ waitUntil: 'networkidle2' })

    // Testing if user was logged in successfully
    await isUserLoggedIn(page)
  }
}

export async function isUserLoggedIn(page) {
  console.log('Checking if user is loggend in')
  try {
    const loginMenu = await page.waitForSelector('.loginSection', { timeout: 2000 })
    if (loginMenu) {
      console.log('User logged in')
      return true
    }
  } catch (error) {
    console.log('User not logged in')
    return false
  }
}
