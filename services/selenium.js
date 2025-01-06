const { Builder, By, until } = require('selenium-webdriver');

const automateLumaForm = async (link, userData) => {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // Navigate to the Luma event page
    await driver.get(link);

    // Wait for the "Request to Join" button to appear and click it
    const requestToJoinButton = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(@class, 'luma-button') and contains(@class, 'primary')]")),
      10000 // Wait up to 10 seconds
    );
    await requestToJoinButton.click();

    // Wait for the form to load
    await driver.wait(until.elementLocated(By.name('name')), 10000);

    // Fill out the form fields
    if (userData.name) {
      await driver.findElement(By.name('name')).sendKeys(userData.name);
    }
    if (userData.email) {
      await driver.findElement(By.name('email')).sendKeys(userData.email);
    }

    // Update phone field logic
    const phoneField = await driver.wait(
      until.elementLocated(By.xpath("//input[contains(@placeholder, 'Phone') or @type='tel']")),
      10000 // Wait for phone field
    );
    await phoneField.sendKeys(userData.phone);

    // Submit the form
    // Submit the form
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await submitButton.click();

    // Wait for confirmation (if any)
    await driver.sleep(5000);

    return 'Form submitted successfully';
  } catch (error) {
    console.error('Error in Selenium:', error);
    throw error;
  } finally {
    await driver.quit();
  }
};

module.exports = { automateLumaForm };
