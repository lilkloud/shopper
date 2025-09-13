# Shopper E-commerce Backend

This is the backend for the Shopper e-commerce website, built with Node.js, Express, and MongoDB.

## Features

- User authentication (register, login, profile management)
- Product management (CRUD operations)
- Shopping cart functionality
- Product reviews and ratings
- Search and filter products
- Pagination

## Prerequisites

- Node.js (v14 or later)
- MongoDB (v4.4 or later)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd shopper/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the variables in `.env` as needed

4. Start the development server:
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:5000`

## API Documentation

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create a product (admin only)
- `PUT /api/products/:id` - Update a product (admin only)
- `DELETE /api/products/:id` - Delete a product (admin only)
- `POST /api/products/:id/reviews` - Create product review
- `GET /api/products/top` - Get top rated products

### Cart

- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token generation
- `NODE_ENV` - Application environment (development/production)

## Deployment

1. Set `NODE_ENV=production` in your environment variables
2. Install production dependencies:
   ```bash
   npm install --production
   ```
3. Start the server:
   ```bash
   npm start
   ```

## License

This project is licensed under the MIT License.
