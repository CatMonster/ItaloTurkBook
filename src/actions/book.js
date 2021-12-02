export default async function book(page) {
  await page.goto('https://biglietti.italotreno.it/Customer_Account_MieiAcquisti_MieiCarnet.aspx')
  // Click on "Prenota" button
  try {
    await page.waitForSelector('._inl-ctaButton._inl-ctaBlock')
    await page.$eval('._inl-ctaButton._inl-ctaBlock', (button) => button.click())
  } catch (error) {
    console.log(error)
  }

  // Select route - 0: Brescia - Milano Centrale, 1: Milano Centrale - Brescia
  await page.waitForTimeout(1000)
  await page.waitForSelector('.risposta', { visible: true, timeout: 0 })
  const radioButtons = await page.$$('.risposta input')
  await radioButtons[1].evaluate((radio) => radio.click())
}
