# E-Commerce Website

## Overview

This project is a full-stack e-commerce web application designed to provide a seamless shopping experience. The application supports product browsing, user authentication, shopping cart management, and payment processing. It is built with modern technologies to ensure scalability, security, and maintainability.

## Technologies Used

- **Frontend:** React.js, Tailwind CSS, Axios  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (using Mongoose ODM)  
- **Authentication:** JSON Web Tokens (JWT)  
- **File Storage:** Cloudinary for image hosting  
- **Payment Processing:** Stripe API  
- **Other:** Multer for handling multipart form data uploads, dotenv for environment variables, CORS for cross-origin requests  

## Features

- **User Authentication:** Registration and login with JWT-based authentication and role management.  
- **Product Management:** CRUD operations for products, including categories and image uploads.  
- **Shopping Cart:** Add, update, and remove products in the cart.  
- **Order Processing:** Checkout flow integrated with Stripe for secure payments.  
- **Admin Panel:** Restricted routes to manage products and orders.  
- **Cloudinary Integration:** Image upload and storage in the cloud.  
- **API Security:** Middleware for authentication and authorization checks.  
- **Error Handling:** Centralized error handling middleware to manage API responses.  
- **Responsive UI:** Responsive design ensuring usability across devices.  

## Repository Structure

```

ecom-site/
│
├── backend/                  # Backend source code
│   ├── controllers/          # API route handlers
│   ├── middleware/           # Authentication and error handling middleware
│   ├── models/               # Mongoose schemas and models
│   ├── routes/               # Express routes
│   ├── utils/                # Utility functions (e.g., Cloudinary config)
│   ├── server.js             # Express app entry point
│   └── config/               # Configuration files (e.g., database, environment variables)
│
├── frontend/                 # Frontend source code
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/            # Page components (Login, Signup, Home, Product, etc.)
│   │   ├── context/          # React context providers
│   │   ├── services/         # API calls via Axios
│   │   ├── styles/           # Tailwind CSS configuration and custom styles
│   │   └── App.jsx           # Root React component
│   └── public/               # Static assets
│
├── .env                      # Environment variables (not committed)
├── .gitignore                # Files and directories to ignore in git
├── package.json              # Node.js dependencies and scripts
├── README.md                 # Project documentation
└── ...

````

## Setup Instructions

### Prerequisites

- Node.js (version 16+ recommended)  
- MongoDB Atlas or local MongoDB instance  
- Cloudinary account for image storage  
- Stripe account for payment integration  
- npm or yarn package manager  

### Backend Setup

1. Clone the repository and navigate to the backend folder:

   ```bash
   git clone https://github.com/manasdekivadia/ecom-site.git
   cd ecom-site/backend


2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example` and set the following variables:

   * `mongodb` - MongoDB connection string
   * `JWT_SECRET` - Secret key for JWT token signing
   * `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` - Cloudinary credentials
   * `STRIPE_SECRET_KEY` - Stripe API secret key
   * `PORT` - Set the port on which the backend should run (generally 3000)
   * `FRONTEND_URL` - Frontend URL

4. Start the backend server:

   ```bash
   npm run dev
   ```

   The backend API will be available at `http://localhost:3000` (or your configured port).

### Frontend Setup

1. Navigate to the frontend folder:

   ```bash
   cd ../frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with the required frontend environment variables .
   * `VITE_REACT_APP_BACKEND_BASEURL` - Your Backend Base URL (http://localhost:3000)

5. Start the frontend development server:

   ```bash
   npm run dev
   ```

   The frontend will be served at `http://localhost:5173`.

## API Endpoints (Summary)

* **User:**

  * POST `/api/users/register` - Register a new user
  * POST `/api/users/login` - User login and token generation

* **Products:**

  * GET `/api/products` - List all products
  * GET `/api/products/:id` - Get single product details
  * POST `/api/admin/product/create` - Create new product (admin only)
  * PUT `/api/admin/products/edit/:id` - Update product (admin only)
  * DELETE `/api/products/delete/:id` - Delete product (admin only)

## Testing

Testing is manual at this stage. Use tools like Postman or Insomnia to verify API endpoints. Frontend interactions can be tested via the running development server.

## Deployment

* Backend can be deployed on platforms like Render, Heroku, or DigitalOcean.
* Frontend can be deployed on Vercel, Netlify, or similar static hosting providers.
* Ensure environment variables are configured correctly for production environments.
* Secure API routes with HTTPS in production.

## Contributing

Contributions are welcome via pull requests. Please adhere to the existing code style and ensure all tests pass before submitting.

## License

This project is licensed under the MIT License.
