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

  await dateSelector(page, new Date())
  // await timeSelector('7:49')
}

async function dateSelector(page, date) {
  const pickerMonthSelector = await page.$('#datepicker span.ui-datepicker-month')
  const pickerMonth = await pickerMonthSelector.evaluate((el) => el.textContent)
  const pickerYearSelector = await page.$('#datepicker span.ui-datepicker-year')
  const pickerYear = await pickerYearSelector.evaluate((el) => el.textContent)
  const availableDays = await page.$('#datepicker a.ui-state-default')

  console.log({ pickerMonth, pickerYear })

  const dummyPickerDate = new Date(`1 ${pickerMonth} ${pickerYear}`)
  console.log({ dummyPickerDate })

  const selectYear = async (year) => {
    let currentYear = dummyPickerDate.getYear()
    while (currentYear !== year) {
      // Get all next button classes
      const nextButtonClasses = await page.evaluate(
        () => document.querySelector('#datepicker a.ui-datepicker-next').className,
      )
      // Checks if button is clickable or not
      if (nextButtonClasses.includes('ui-state-disabled')) {
        // Button cannot be clicked, so next year is not available
        break
      } else {
        // Button can be clicked
        const nextButton = await page.$('#datepicker a.ui-datepicker-next')
        await nextButton.evaluate((el) => el.click())
      }
      console.error(`Selected year (${year}) is not available`)
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
        break
      } else if (i + 1 === availableDays.length) {
        console.log('Selected day is not available for booking')
      }
    }
  }

  selectYear(date.getYear())
  selectMonth(date.getMonth())
  selectDay(date.getDate())
}

// async function timeSelector(page, departureTime) {
//   const rows = page.waitForSelector('.risposta .accordion-header', { visible: true, timeout: 0 })

//   for (let i = 0; i < rows.length; i++) {
//     if (rows[i].evaluate('.layout p').innerText === departureTime) {
//       rows[i].click()

//       break
//     }
//     console.log("Error, can't select trip, requested time not found")
//   }
// }

exports.book = book
