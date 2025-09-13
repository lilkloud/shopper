# Shopper E-commerce Website

A full-stack e-commerce website built with Node.js, Express, MongoDB, and vanilla JavaScript.

## Features

- **User Authentication**: Register, login, and manage user profiles
- **Product Catalog**: Browse products by categories
- **Shopping Cart**: Add/remove items, update quantities
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI/UX**: Clean and intuitive interface

## Prerequisites

- Node.js (v14 or later)
- MongoDB (v4.4 or later)
- npm or yarn

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shopper
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the `backend` directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/shopper
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

4. **Start the backend server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

5. **Open the website**
   Open `index.html` in your browser or use a local server like Live Server in VS Code.

## Project Structure

```
shopper/
├── backend/               # Backend server code
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── .env              # Environment variables
│   └── server.js         # Main server file
├── js/                   # Frontend JavaScript
│   ├── services/         # API service modules
│   ├── utils/            # Utility functions
│   ├── apiService.js     # API service
│   ├── authContext.js    # Authentication context
│   └── cartContext.js    # Shopping cart context
├── index.html            # Main HTML file
└── README.md             # This file
```

## Available Scripts

In the `backend` directory, you can run:

- `npm run dev` - Start the development server with nodemon
- `npm start` - Start the production server
- `npm test` - Run tests (coming soon)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Bootstrap for the responsive design
- Font Awesome for icons
- MongoDB for the database
