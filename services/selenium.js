const { Builder, By, Key } = require('selenium-webdriver');

const automateLumaForm = async (link, userData) => {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // Navigate to the Luma event page
    await driver.get(link);

    // Fill out the form fields
    if (userData.name) {
      await driver.findElement(By.name('name')).sendKeys(userData.name);
    }
    if (userData.email) {
      await driver.findElement(By.name('email')).sendKeys(userData.email);
    }
    if (userData.phone) {
      await driver.findElement(By.name('phone')).sendKeys(userData.phone);
    }

    // Submit the form
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await submitButton.click();

    // Wait for confirmation (adjust time as needed)
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
