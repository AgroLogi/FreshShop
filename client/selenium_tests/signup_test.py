from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.common.exceptions import NoSuchElementException
import time

def signup_to_fresh_shop(driver, username, email, password):
    try:
        print("Test 1: Fresh Shop (Checking Signup function....)")

        # Open the signup page of Fresh Shop
        driver.get("https://fresh-shop-client.vercel.app/sign-up")

        # Wait for the page to load
        time.sleep(3)

        # Find the username field and enter the username
        username_field = driver.find_element(By.CSS_SELECTOR, "input[placeholder='Username']")
        username_field.send_keys(username)
        print("Step 1: Entered Username")

        # Find the email field and enter the email
        email_field = driver.find_element(By.CSS_SELECTOR, "input[placeholder='Email']")
        email_field.send_keys(email)
        print("Step 2: Entered Email")

        # Find the password field and enter the password
        password_field = driver.find_element(By.CSS_SELECTOR, "input[placeholder='password']")
        password_field.send_keys(password)
        print("Step 3: Entered Password")

        # Find the 'Create an Account' button and click it
        signup_button = driver.find_element(By.CSS_SELECTOR, "button:contains('Create an Account')")
        signup_button.click()
        print("Step 4: Clicked Create Account Button")

        # Wait for some time to ensure the account creation is processed
        time.sleep(3)

        # Check if signup was successful by verifying the presence of a specific element in the home page after redirection
        driver.find_element(By.CSS_SELECTOR, "div.gradient")
        print("Signup successful in Fresh Shop")
        return True

    except NoSuchElementException:
        print("Signup failed or required elements not found")
        return False

# Setup Chrome options
chrome_options = Options()
chrome_options.add_argument("--start-maximized")
chrome_options.add_argument("--headless")  # Run in headless mode
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--window-size=1920,1080")

# Setup WebDriver
service = Service(ChromeDriverManager().install())
# service = Service("C:\Program Files\Google\Chrome\Application\chrome.exe")
driver = webdriver.Chrome(service=service, options=chrome_options)

try:
    if signup_to_fresh_shop(driver, "testUser", "test@example.com", "demo@123"):
        # Continue with other actions after successful signup
        pass
    else:
        print("Exiting due to signup failure.")

finally:
    # Close the browser
    driver.quit()
