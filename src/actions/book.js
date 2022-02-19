async function book(page) {
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

  await dateSelector(new Date())
}

async function dateSelector(page, date) {
  const pickerMonth = page.$eval('#datepicker span.ui-datepicker-month')
  const pickerYear = page.$eval('#datepicker span.ui-datepicker-year')
  const availableDays = page.$eval('#datepicker a.ui-state-default')

  const dummyPickerDate = new Date(`1 ${pickerMonth} ${pickerYear}`)
  console.log({ dummyPickerDate })

  const selectYear = (year) => {
    let currentYear = dummyPickerDate.getMonth()
    if (currentYear !== year) {
      // place next year selector here
    }
  }

  const selectMonth = (month) => {
    let currentMonth = dummyPickerDate.getMonth()
    if (currentMonth !== month) {
      // place next month selector here
    }
  }

  const selectDay = (day) => {
    for (let i = 0; i < availableDays.length; i++) {
      if (availableDays[i].innerText == day) {
        availableDays[i].click()
      } else if (i + 1 === availableDays.length) {
        console.log('Selected day is not available for booking')
      }
    }
  }

  selectYear(date.getYear())
  selectMonth(date.getMonth())
  selectDay(date.getDate())
}

exports.book = book
