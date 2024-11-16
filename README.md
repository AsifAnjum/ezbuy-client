# EZBuy E-commerce Platform

### Live Link: https://ezbuy-pro.vercel.app/

## Project Overview

EZBuy is a comprehensive e-commerce platform that provides a seamless shopping experience for users, featuring advanced functionalities such as product browsing, wishlist management, cart handling, secure checkout using Stripe, and user dashboards. The platform also includes an admin panel for managing users, products, orders, and other administrative tasks.

## Features

### User-Facing Features

- **Product Listing and Search**: Users can browse, filter, and search for products.
- **Product Rating**: Users can rating and comment on product. ProductDetails Page -> then click on rating
- **Wishlist and Cart**: Users can add products to their wishlist or cart for future purchases.
- **Checkout Process**: Multiple payment options, including Stripe and Cash on Delivery (COD), with coupon discounts.
- **Contact Form**: Users can send messages to the server for inquiries or support.
- **User Dashboard**:
  - Profile viewing and editing.
  - Order history and details.
  - Order analytics and statistics.

### Admin/Moderator Panel

- **User Management**: View and manage registered users.
- **Order Management**: View and manage all orders.
- **Product Management**: Add, edit, remove products, image upload and remove image.
- **Coupon Management**: Create and manage discount coupons.
- **Contact Message Management**: Review and respond to user-submitted contact messages.
- **Analytics**:
  - User, order, and product analytics displayed using charts.

## Authentication System

- **Login Methods**:
  - Email and password.
  - Google login integration.
- **Password Recovery**:
  - Users can request a password reset link via email.

## Tech Stack

### Frontend

- **React**: Core UI framework for building components.
- **React Router**: Client-side routing.
- **Tailwind CSS & DaisyUI**: Utility-first CSS framework for styling.
- **React Hook Form**: Form handling and validation.
- **Recharts**: Charting library for data visualization.
- **React Slick**: Carousel/slider component.
- **React Toastify**: User notifications.
- **React Icons**: Icon library.

### Backend

- **Node.js**: JavaScript runtime for building scalable server-side applications.

- **Express**: Web framework for Node.js used to create RESTful APIs.

- **MongoDB**: NoSQL database for storing user data, products, orders, etc.

- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.

- **Firebase**: Used for cloud storage.

- **JWT (jsonwebtoken)**: For secure authentication.

- **Nodemailer**: For email service to send password reset emails.

- **Stripe**: Integration for handling online payments.

- **Multer**: Middleware for handling file uploads.

- **Validator**: Library for data validation and sanitization.

- **bcryptjs**: Used for password hashing.

- **Google APIs**: For Google authentication.

### Build and Development

- **Vite**: Fast build tool for development and production.

## Package Details

```json
{
  "dependencies": {
    "@hookform/resolvers": "^3.9.0",
    "@reduxjs/toolkit": "^2.2.7",
    "@stripe/react-stripe-js": "^2.8.1",
    "@stripe/stripe-js": "^4.8.0",
    "jwt-decode": "^4.0.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.53.0",
    "react-icons": "^5.3.0",
    "react-redux": "^9.1.2",
    "react-router-dom": "^6.26.1",
    "react-slick": "^0.30.2",
    "react-toastify": "^10.0.5",
    "recharts": "^2.13.3",
    "slick-carousel": "^1.8.1",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.0",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.20",
    "daisyui": "^4.12.10",
    "eslint": "^9.9.0",
    "eslint-plugin-react": "^7.35.0",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.9",
    "globals": "^15.9.0",
    "postcss": "^8.4.41",
    "tailwindcss": "^3.4.10",
    "vite": "^5.4.1"
  }
}
```

## License

This project is licensed under [Asif Anjum](https://github.com/AsifAnjum) .

## Contact

For any questions, please contact at asif.anjum.rabi@gmail.com
