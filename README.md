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

## Components and Functionalities

### 1. Axios Client Setup (`_utils/GlobalApi.js`)

This file manages all the API interactions between the frontend and the Strapi backend. It creates an Axios instance for making HTTP requests to the backend. Here’s a breakdown of each function:

- **`getCategory`**: Fetches all categories from Strapi CMS with populated data (images, names).
- **`getCategoryList`**: Returns a list of categories in a structured format.
- **`getSliders`**: Fetches slider/banner data for the home page.
- **`getAllProducts`**: Retrieves a list of products, populating essential product attributes like images, prices, and categories.
- **`getProductsByCategory`**: Fetches products by category.
- **`registerUser`**: Handles user registration using Strapi’s built-in authentication system.
- **`Login`**: Authenticates the user and returns a JWT for protected routes.
- **`addToCart`**: Adds a product to the user's cart.
- **`getTotalCartItems`**: Fetches the total cart items for the authenticated user.
- **`deleteCartItem`**: Deletes a specific item from the cart.
- **`createOrder`**: Sends order data to Strapi and records the purchase details.

### 2. Category and Product Pages (`/products_category/[name].jsx`)

Each product page is dynamic and renders information based on the product ID. The page fetches data from Strapi using the `getAllProducts` or `getProductsByCategory` function from `GlobalApi.js`. Key product attributes like images, descriptions, and pricing are displayed, with a button for adding the item to the cart.

### 3. Cart Management (`_components/CartItemList.jsx`)

Cart functionality is managed using the Context API. The cart stores the selected products, their quantity, and the total price. These values are dynamically updated as users add/remove products. The following actions are supported:

- Add to Cart
- Remove from Cart
- Update Quantity

### 4. Checkout Process (`routes/checkout/page.jsx`)

The checkout process is user-friendly, capturing essential details such as name, email, phone number, shipping address, and zip code. Users can review their order before proceeding, and the total amount is calculated dynamically, including delivery fees.

- **Order Creation:** The `createOrder` function in `GlobalApi.js` sends the order data to Strapi, including user details, cart items, and the total order amount.
- **Confirmation:** After successful order creation, the user is redirected to the order confirmation page.

### 5. Authentication (`auth/sign-in/page.jsx`)

Authentication is handled via JWT tokens stored in the browser's `sessionStorage`. The `Login` function in `GlobalApi.js` verifies user credentials and retrieves a JWT, allowing users to access protected routes like checkout and order history.

### 6. Responsive Design (Tailwind CSS)

Tailwind CSS is utilized for designing responsive layouts, ensuring a consistent experience across devices. All major UI elements, such as buttons, forms, and grids, are styled using Tailwind’s utility-first classes.

### 7. Order Confirmation (`route/OrderConfirmation/page.jsx`)

This page is displayed once an order is successfully placed. It shows a green checkmark icon indicating success and confirms the order details, including the total amount and items purchased.

---

## Backend (Strapi CMS)

The backend for FreshShop is managed using Strapi CMS. It handles:

- **Product Management:** Admins can create, update, and delete product listings.
- **User Management:** User registration, authentication, and permission handling.
- **Order Management:** Stores order details, including user information and products purchased.
- **Category and Slider Management:** Admins can manage product categories and promotional sliders.

---

## Features

- **Product Listings:** Browse and filter products by category.
- **Cart Management:** Add, update, and remove products from the cart.
- **User Authentication:** JWT-based login and registration.
- **Checkout and Order Confirmation:** Users can place orders and receive confirmation.
- **Admin Dashboard:** Managed through Strapi for products, orders, and users.

---



## References and Resources

### Axios Client Setup (`_utils/GlobalApi.js`):
- Documentation for Axios: [Axios GitHub Repository](https://github.com/axios/axios)
- Strapi API Documentation: [Strapi API](https://docs.strapi.io/dev-docs/api/rest)

### Category and Product Pages (`/products_category/[name].jsx`):
- Dynamic Routes in Next.js: [Next.js Dynamic Routing](https://nextjs.org/docs/routing/dynamic-routes)
- Fetching Data in Next.js: [Next.js Data Fetching](https://nextjs.org/docs/basic-features/data-fetching)

### Cart Management (`_components/CartItemList.jsx`):
- Context API for State Management: [React Context API](https://vercel.com/guides/react-context-state-management-nextjs)
- React Hooks: [React Hooks Documentation](https://medium.com/@alisoneuropa/introduction-to-react-hooks-how-to-use-hooks-to-improve-your-code-in-next-js-fed3ef1641e6)

### Checkout Process (`routes/checkout/page.jsx`):
- Handling Forms in React: [React Forms](https://reactjs.org/docs/forms.html)
- Axios Post Requests: [Axios Post](https://axios-http.com/docs/post_example)

### Authentication (`auth/sign-in/page.jsx`):
- JWT Authentication with Strapi: [Strapi Authentication](https://docs.strapi.io/dev-docs/plugins/users-permissions)
- Handling Authentication in Next.js: [NextAuth.js](https://next-auth.js.org/)

### Responsive Design (Tailwind CSS):
- Tailwind CSS Documentation: [Tailwind CSS](https://tailwindcss.com/docs)
- Responsive Design Best Practices: [Responsive Web Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

### Order Confirmation (`route/OrderConfirmation/page.jsx`):
- React Router: [React Router](https://nextjs.org/docs/pages/api-reference/functions/use-router)
- Managing Order Data: [Strapi Relations](https://docs.strapi.io/dev-docs/plugins/users-permissions)

### Backend (Strapi CMS):
- Strapi CMS Documentation: [Strapi Docs](https://docs.strapi.io/)
- Setting Up Roles and Permissions: [Strapi Permissions](https://docs.strapi.io/user-docs/latest/users-roles-permissions/configuring-administrator-roles.html)


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

