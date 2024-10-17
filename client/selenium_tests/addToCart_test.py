from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException, TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager  # Import ChromeDriverManager
from selenium import webdriver
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


def wait_for_page_load(driver, timeout=60):
    try:
        WebDriverWait(driver, timeout).until(
            lambda d: d.execute_script('return document.readyState') == 'complete'
        )
        print("Page fully loaded")
    except TimeoutException:
        print("Page load timeout")

def click_shopping_bag_and_checkout(driver):
    try:
        wait_for_page_load(driver)

        # Wait for the Shopping Bag element to be clickable
        shopping_bag_element = WebDriverWait(driver, 60).until(
            EC.element_to_be_clickable((By.XPATH, "//span[contains(@class, 'bg-green-500')]"))
        )

        # Click on the Shopping Bag
        shopping_bag_element.click()
        print("Clicked on Shopping Bag")

        # Wait for the Checkout button by its visible text
        checkout_button = WebDriverWait(driver, 20).until(
            EC.element_to_be_clickable((By.XPATH, "//button[text()='Checkout']"))
        )

        # Click on the Checkout button
        checkout_button.click()
        print("Clicked on Checkout")

        # Wait for 3 seconds after clicking the button
        time.sleep(3)

        # Show a success message
        print("Success: Navigated to the checkout page after clicking 'Checkout'.")

    except TimeoutException:
        print("Timeout while waiting for the Shopping Bag or Checkout button.")
    except NoSuchElementException:
        print("Required elements not found on the page.")


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
