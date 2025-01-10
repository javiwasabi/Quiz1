const { Builder, By, until, Capabilities } = require('selenium-webdriver');
const fs = require('fs');

(async function automatedFlow() {
  const capabilities = Capabilities.chrome();
  capabilities.set('chromeOptions', {
    args: ['--headless', '--disable-gpu', '--no-sandbox']
  });

  const driver = await new Builder()
    .forBrowser('chrome')
    .withCapabilities(capabilities)
    .build();

  const takeScreenshot = async (filename) => {
    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync(filename, screenshot, 'base64');
  };

  try {
    console.log("Starting automated flow...");

    await takeScreenshot('step1_initial_page.png');
    console.log("Initial page screenshot captured.");

    await driver.get('http://localhost:3500');
    console.log("Navigating to FirstPage...");
    await driver.wait(() => {
      return driver.executeScript('return document.readyState').then(state => state === 'complete');
    }, 10000);
    console.log("DOM fully loaded.");

    await takeScreenshot('step2_page_loaded.png');
    console.log("Page load screenshot captured.");

    const startButton = await driver.wait(
      until.elementLocated(By.xpath("//button[text()='START']")),
      15000
    );
    await startButton.click();
    console.log("START button clicked, proceeding to MiddlePage...");
    await takeScreenshot('step3_start_button_clicked.png');
    console.log("START button clicked screenshot captured.");

    let onFinalPage = false;
    while (!onFinalPage) {
      console.log("Answering questions on MiddlePage...");

      try {
        const finalButton = await driver.findElement(By.id("final-button"));
        if (finalButton) {
          console.log("Final button found, proceeding to FinalPage...");
          await finalButton.click();
          onFinalPage = true;
          continue;
        }
      } catch (err) {
        console.log("Not on FinalPage yet, continuing...");
      }

      try {
        const killerButton = await driver.wait(
          until.elementLocated(By.xpath("//span[text()='Killer']")),
          5000
        );
        await killerButton.click();
        console.log("Selected: Killer");
      } catch (err) {
        const inventorButton = await driver.wait(
          until.elementLocated(By.xpath("//span[text()='Inventor']")),
          5000
        );
        await inventorButton.click();
        console.log("Selected: Inventor");
      }

      try {
        const nextButton = await driver.wait(
          until.elementLocated(By.id("next-button")),
          15000
        );
        await nextButton.click();
        console.log("NEXT button clicked...");
      } catch (err) {
        console.error("Failed to find NEXT button:", err);
        await takeScreenshot('error_next_button.png');
        throw err;
      }
    }

    console.log("Completing data on FinalPage...");
    const emailIcon = await driver.wait(
      until.elementLocated(By.id("email-buttton")),
      15000
    );
    await emailIcon.click();
    console.log("Email icon clicked.");

    await takeScreenshot('step4_email_icon_clicked.png');
    console.log("Email icon clicked screenshot captured.");

    const emailInput = await driver.wait(
      until.elementLocated(By.xpath("//input[@type='email']")),
      5000
    );
    await emailInput.sendKeys("test@example.com");
    console.log("Email entered.");

    const checklist1 = await driver.wait(
      until.elementLocated(By.xpath("(//input[@type='checkbox'])[1]")),
      5000
    );
    await checklist1.click();
    console.log("Checklist 1 checked.");

    const checklist2 = await driver.wait(
      until.elementLocated(By.xpath("(//input[@type='checkbox'])[2]")),
      5000
    );
    await checklist2.click();
    console.log("Checklist 2 checked.");

    const score = 2;  
    console.log(`Score entered: ${score}`);

    await takeScreenshot('step5_email_and_checklist_completed.png');
    console.log("Email and checklist completed screenshot captured.");

    const submitButton = await driver.wait(
      until.elementLocated(By.xpath("//button[text()='Submit']")),
      5000
    );
    await submitButton.click();
    console.log("Form successfully submitted.");

    await takeScreenshot('step6_form_submitted.png');
    console.log("Form submitted screenshot captured.");
  } catch (err) {
    console.error("An error occurred:", err);
    await takeScreenshot('error.png');
  } finally {
    
    setTimeout(() => {
      driver.quit();
      console.log("Browser closed.");
    }, 3000);
  }
})();
