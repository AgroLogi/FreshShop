from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException, TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager  # Import ChromeDriverManager
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

        # Find the 'Create an Account' button using XPath and click it
        signup_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Create an Account')]")
        signup_button.click()
        print("Step 4: Clicked Create Account Button")

        # Wait for the URL to change after clicking the signup button
        WebDriverWait(driver, 10).until(EC.url_changes("https://fresh-shop-client.vercel.app/sign-up"))

        # Check if the redirected URL is the home page ("/")
        if driver.current_url == "https://fresh-shop-client.vercel.app/":
            print("Signup successful in Fresh Shop. Redirected to the home page.")
            return True
        else:
            print(f"Signup failed. Redirected to {driver.current_url} instead of the home page.")
            return False

    except TimeoutException:
        print("Signup failed. Timeout while waiting for the page to redirect.")
        return False
    except NoSuchElementException:
        print("Signup failed or required elements not found.")
        return False

# Setup Chrome options
chrome_options = Options()
chrome_options.add_argument("--start-maximized")
chrome_options.add_argument("--headless")  # Run in headless mode
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--window-size=1920,1080")

# Setup WebDriver with ChromeDriverManager
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)

try:
    if signup_to_fresh_shop(driver, "testUser", "test@example.com", "Demo@123"):
        # Continue with other actions after successful signup
        pass
    else:
        print("Exiting due to signup failure.")

finally:
    # Close the browser
    driver.quit()
