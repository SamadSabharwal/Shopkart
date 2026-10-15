🛒 ShopKart - Full-Stack E-Commerce Application

ShopKart is a full-stack e-commerce web application built using the MERN stack. It allows users to browse products, manage their wishlist and shopping cart, securely complete checkout, and view their order history.

This project was developed as part of my full-stack web development learning journey.

✨ Features

🔐 User Authentication

* User registration and login
* Cookie-based authentication
* Protected user-specific functionality
* Secure logout

🛍️ Product Catalogue

* Browse available products
* View product details
* Search and filter products by category

❤️ Wishlist

* Add products to a personal wishlist
* View saved products
* Remove products from the wishlist
* Persist wishlist data in MongoDB

🛒 Shopping Cart

* Add products to the cart
* Update product quantities
* Remove products from the cart
* Calculate the total number of items and subtotal
* Validate product availability and stock on the backend

💳 Checkout and Orders

* Razorpay Test Mode integration
* Backend payment signature verification
* Order creation and order history
* Store product details in order snapshots
* Clear the cart after successful payment verification

🛠️ Tech Stack

Frontend

* React.js
* Vite
* JavaScript
* HTML5
* CSS3
* Axios
* React Context API

Backend

* Node.js
* Express.js
* REST APIs
* JWT and cookie-based authentication

Database

* MongoDB
* Mongoose

Payment Integration

* Razorpay Test Mode

Development Tools

* Git
* GitHub
* Visual Studio Code
* npm

📂 Project Structure

ShopKart/
├── Backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── index.js
│   └── .env
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── ...
│
└── README.md

⚙️ Installation and Setup

Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB or a MongoDB Atlas account
* Razorpay test API credentials

1. Clone the Repository

git clone <YOUR_GITHUB_REPOSITORY_URL>
cd ShopKart

Replace <YOUR_GITHUB_REPOSITORY_URL> with your repository URL.

2. Set Up the Backend

Navigate to the backend directory:

cd Backend
npm install

Create a .env file inside the Backend directory and configure the environment variables required by your backend code.

Example:

dbURL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_test_key_id
RAZORPAY_KEY_SECRET=your_razorpay_test_key_secret

Use the exact variable names expected by your implementation.

Start the backend server:

node index.js

The main project configuration uses port 8084.

3. Set Up the Frontend

Open another terminal and navigate to the frontend directory:

cd Frontend
npm install
npm run dev

Open the local URL displayed by Vite, usually:

http://localhost:5173

4. Configure the API Proxy

Ensure the Vite development proxy forwards frontend /api requests to the correct backend address.

For the main project setup, the backend runs on:

http://localhost:8084

🔌 Main API Modules

Module	Description
Customer	Registration, login, current-user information, and logout
Products	Product listing and product details
Wishlist	Add, retrieve, and remove wishlist items
Cart	Retrieve cart items, update quantities, and remove products
Orders	Order creation, payment verification, and order history

The exact endpoints and HTTP methods depend on the backend implementation.

🔒 Security Considerations

* Authentication is handled using cookies and JWT-based mechanisms.
* User-specific cart and wishlist data are stored in the database.
* The backend validates product IDs, availability, and stock.
* Payment signatures are verified on the backend before an order is marked as paid.
* Sensitive credentials are stored in environment variables.
* Razorpay Test Mode is used for development and testing.

Never commit your .env file, database credentials, or payment secrets to GitHub.

🚀 Learning Outcomes

Through this project, I gained practical experience with:

* Full-stack web application development
* Building REST APIs using Node.js and Express.js
* Database modelling with MongoDB and Mongoose
* Authentication and protected routes
* Global state management using React Context API
* Managing shopping carts and wishlists
* Integrating a payment gateway
* Handling frontend-backend communication
* Using Git and GitHub for version control


