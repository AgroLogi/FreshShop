# FreshShop Ecommerce Store Documentation

## Project Overview

FreshShop is an e-commerce store built using **Next.js** for the frontend, **Strapi CMS** for the backend, and **shadcn UI components** for the user interface. The application is designed to be scalable, secure, and user-friendly, allowing customers to browse products, add them to their cart, and proceed with checkout seamlessly. The backend provides content management capabilities, such as managing categories, products, and user orders, all powered by a modern headless CMS.

---

## Key Technologies

- **Frontend:** Next.js
- **Backend:** Strapi CMS
- **UI Components:** shadcn (for reusable UI elements like buttons, forms, and modals)
- **State Management:** React's `useState`, `useEffect`, and Context API
- **API Communication:** Axios for making HTTP requests to Strapi API
- **Styling:** Tailwind CSS for responsive and modern design
- **Authentication:** JWT-based authentication for login and registration

---

## Project Structure

The project follows a modular structure, organizing reusable components, context, API utilities, and page routes into separate folders. Below is a breakdown of the key directories and files:

### 1. Components (`_components/`)

- **AllProductList.jsx**: Displays all products available in the store.
- **CartItemList.jsx**: Handles displaying items in the cart, including their quantity, price, and image.
- **CategoryList.jsx**: Displays categories for filtering products.
- **DeliveryBanner.jsx**: A promotional banner used to display delivery offers or announcements.
- **Footer.jsx**: The footer section of the store.
- **Header.jsx**: The header section, including the navigation bar and search bar.
- **ProductItem.jsx**: A component that displays individual product details.
- **ProductItemDetails.jsx**: Displays detailed information for a single product.
- **Slider.jsx**: A slider component for displaying banners or promotional content on the home page.

### 2. Context (`_context/`)

- **UpdateCart.jsx**: Manages the cart state globally, including adding, updating, and removing products from the cart. This uses the Context API to share state across components.

### 3. API Utilities (`_utils/GlobalApi.js`)

This file manages all the API interactions between the frontend and the Strapi backend. It creates an Axios instance for making HTTP requests to the backend.

- **`getCategory`**: Fetches all categories from Strapi CMS with populated data.
- **`getCategoryList`**: Returns a structured list of categories.
- **`getSliders`**: Fetches slider/banner data for the home page.
- **`getAllProducts`**: Retrieves a list of products with essential attributes like images, prices, and categories.
- **`getProductsByCategory`**: Fetches products based on their category.
- **`registerUser`**: Handles user registration using Strapi's authentication.
- **`Login`**: Authenticates the user and returns a JWT token.
- **`addToCart`**: Adds a product to the cart.
- **`getTotalCartItems`**: Retrieves all cart items for a particular user.
- **`deleteCartItem`**: Deletes a cart item.
- **`createOrder`**: Creates an order and saves the data in Strapi.

### 4. Authentication Pages (`auth/`)

- **sign-in/page.jsx**: The user login page, which includes fields for the email and password and authenticates users using JWT.
- **sign-up/page.jsx**: The user registration page, allowing new users to sign up.

### 5. Routes (`routes/`)

This folder contains the main routes of the store:

- **checkout/page.jsx**: The checkout page where users enter their details (name, email, phone, address) and confirm their order.
- **orderConfirmation/page.jsx**: Displays an order confirmation message with a green checkmark once the order has been successfully placed.
- **products_category/[name].jsx**: A dynamic route that renders product listings filtered by category.

---

## Features

- **Product Listings:** Browse and filter products by category.
- **Cart Management:** Add, update, and remove products from the cart.
- **User Authentication:** JWT-based login and registration.
- **Checkout and Order Confirmation:** Users can place orders and receive confirmation.
- **Admin Dashboard:** Managed through Strapi for products, orders, and users.

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AgroLogi/FreshShop.git
   cd FreshShop


2. **Install dependencies for backend:**
   ```bash
   cd server

3. **Connect With Postgres Database modify .env file:**
   ```bash
   # Database
     DATABASE_CLIENT=xxxxx
     DATABASE_HOST=xxxxx
     DATABASE_PORT=xxxx
     DATABASE_NAME=xxx
     DATABASE_USERNAME=xxxxx
     DATABASE_PASSWORD=xxxx
     DATABASE_SSL=false
   #Object Storage : Cloudnary
     CLOUDINARY_NAME = xxxx
     CLOUDINARY_KEY = xxxx
     CLOUDINARY_SECRET = xxxxx

   
4. **Install dependencies for backend:**
   ```bash
   cd server
   npm run build
   npm run dev
  
  **Access the Strapi backend at http://localhost:1337 for admin access.**

5. **Install dependencies for frontend:**
   ```bash
   cd client
   npm run build
   npm start

6. **Set up environment variables in .env for Next.js::**
   ```bash
      NEXT_PUBLIC_BACKEND_BASE_URL=http://localhost:1337/api

7. **Run the development server:**
   ```bash
      npm run dev


# Contributing
We welcome contributions! Please open an issue or submit a pull request for any improvements.

