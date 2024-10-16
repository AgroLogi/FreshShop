from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException, TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager  # Import ChromeDriverManager

import time

def login_to_fresh_shop(driver, email, password):
    try:
        print("Test 1: Fresh Shop (Checking Login function....)")

        # Open the login page of Fresh Shop
        driver.get("https://fresh-shop-client.vercel.app/sign-in")

        # Wait for the page to load
        time.sleep(3)

        # Find the email field and enter the email
        email_field = driver.find_element(By.CSS_SELECTOR, "input[placeholder='Email']")
        email_field.send_keys(email)
        print("Step 1: Entered Email")

        # Find the password field and enter the password
        password_field = driver.find_element(By.CSS_SELECTOR, "input[placeholder='password']")
        password_field.send_keys(password)
        print("Step 2: Entered Password")

        # Find the 'Login' button and click it using XPath
        login_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Login')]")
        login_button.click()
        print("Step 3: Clicked Login Button")

        # Wait for the URL to change after clicking the login button
        WebDriverWait(driver, 10).until(EC.url_changes("https://fresh-shop-client.vercel.app/sign-in"))

        # Check if the redirected URL is the home page ("/")
        if driver.current_url == "https://fresh-shop-client.vercel.app/":
            print("Login successful in Fresh Shop. Redirected to the home page.")
            return True
        else:
            print(f"Login failed. Redirected to {driver.current_url} instead of the home page.")
            return False

    except TimeoutException:
        print("Login failed. Timeout while waiting for the page to redirect.")
        return False
    except NoSuchElementException:
        print("Login failed or required elements not found.")
        return False

def click_shopping_bag_and_checkout(driver):
    try:
       # Wait for the element with text "12" to be clickable
        element = WebDriverWait(driver, 20).until(
            EC.element_to_be_clickable((By.XPATH, "//span[contains(@class, 'bg-green-500') and contains(text(), '12')]"))
        )

        # Click on the element
        element.click()
        print("Clicked on element with text '12'")

        # Wait for the Checkout button to be visible and clickable
        checkout_button_element = WebDriverWait(driver, 20).until(
            EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Checkout')]"))
        )

        # Click on the Checkout button
        checkout_button_element.click()
        print("Clicked on Checkout")

        time.sleep(5)

        # Wait for the URL to change to the checkout page
        WebDriverWait(driver, 20).until(
            EC.url_changes("https://fresh-shop-client.vercel.app/checkout")
        )

        # Check if the URL has changed to the checkout page
        if driver.current_url == "https://fresh-shop-client.vercel.app/checkout":
            print("Successfully navigated to the checkout page.")
        else:
            print(f"Failed to navigate to checkout. Current URL: {driver.current_url}")

    except TimeoutException:
        print("Failed to click on ShoppingBag or Checkout. Timeout while waiting for the element to be clickable.")
    except NoSuchElementException:
        print("Failed to click on ShoppingBag or Checkout. Required elements not found.")

# Setup Chrome options
chrome_options = Options()
chrome_options.add_argument("--start-maximized")
chrome_options.add_argument("--headless")  # Run in headless mode
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--window-size=1920,1080")

# Setup WebDriver with the correct ChromeDriver path
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)

try:
    if login_to_fresh_shop(driver, "test@example.com", "Demo@123"):
        # Continue with other actions after successful login
        click_shopping_bag_and_checkout(driver)
    else:
        print("Exiting due to login failure.")

finally:
    # Close the browser
    driver.quit()