from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

# Set up Chrome options
chrome_options = Options()
chrome_options.add_argument("--headless")  # Optional: Run in headless mode for testing
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--window-size=1920,1080")

# Setup WebDriver using ChromeDriverManager
# service = Service(ChromeDriverManager().install())
service = Service("C:\Program Files\Google\Chrome\Application\chromedriver.exe")
driver = webdriver.Chrome(service=service, options=chrome_options)

try:
    # Step 1: Open the target webpage
    driver.get("https://fresh-shop-client.vercel.app/")  # Replace with the actual product page URL
    print("Navigated to the products page")

    # Step 2: Locate the product container using the 'img' alt attribute
    ginger_product_container = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "//img[@alt='Ginger']/ancestor::div[contains(@class, 'cursor-pointer')]"))
    )
    print("Located the product container for 'Ginger'")

    # Step 3: Within the container, locate the "Add to Cart" button
    add_to_cart_button = ginger_product_container.find_element(By.XPATH, ".//button[contains(text(), 'Add to Cart')]")

    # Step 4: Click the "Add to Cart" button
    add_to_cart_button.click()
    print("Clicked the 'Add to Cart' button for Ginger")

    # Optional: Verify if the toast message appears
    toast_message = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'Product added in cart')]"))
    )
    if toast_message:
        print("Test Passed: Product successfully added to the cart.")
    else:
        print("Test Failed: 'Product added in cart' message not found.")

finally:
    # Close the browser after test completion
    driver.quit()
