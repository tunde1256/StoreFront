# API Documentation

## Overview

This API is built with **Express.js** and interacts with a **Prisma** database. It provides endpoints for user registration, product management, and other authentication features. The application uses a **rate limiter** to restrict excessive requests for the registration endpoint and implements **password hashing** with `bcrypt` for security.

---

## Endpoints

### 1. **User Registration**

**POST /auth/register**

Registers a new user. Passwords are hashed using `bcrypt` before storing in the database. Rate limiting is applied to prevent too many requests from the same IP within a minute.

#### Request Body:
```json
{
  "email": "user@example.com",
  "password": "user_password",
  "name": "User Name",
  "role": "CUSTOMER"
}
email: User's email (unique).

password: User's password (will be hashed).

name: User's full name.

role: Optional. Default is "CUSTOMER". Can be any role like "ADMIN", "USER", etc.

Success Response:

{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "User Name",
    "role": "CUSTOMER"
  }
}
Error Response:
400 Bad Request: User with the same email already exists or validation errors.
{
  "error": "User with this email already exists"
}
500 Internal Server Error: Registration failed due to server errors.

{
  "error": "Registration failed"
}
Rate Limiting:
Max 5 requests per minute from the same IP address.

2. Product Management
2.1 Create a New Product
POST /products

Creates a new product in the system.

Request Body:
{
  "name": "Product Name",
  "description": "Product Description",
  "price": 20.99,
  "categoryId": 1
}
name: Name of the product.

description: Description of the product.

price: Price of the product.

categoryId: Category ID to associate the product with.

Success Response:
{
  "id": 1,
  "name": "Product Name",
  "description": "Product Description",
  "price": 20.99,
  "categoryId": 1
}
Error Response:
500 Internal Server Error: Error creating the product.
{
  "error": "Failed to create product"
}
Update an Existing Product
PUT /products/:id

Updates the details of an existing product by ID.

Request Body:
{
  "name": "Updated Product Name",
  "description": "Updated Description",
  "price": 25.99
}
name: Updated name of the product.

description: Updated description of the product.

price: Updated price of the product.

Success Response:
{
  "id": 1,
  "name": "Updated Product Name",
  "description": "Updated Description",
  "price": 25.99,
  "categoryId": 1
}
Error Response:
500 Internal Server Error: Error updating the product.
{
  "error": "Failed to update product"
}
Delete a Product
DELETE /products/:id

Deletes a product from the system.

Success Response:
{
  "message": "Product deleted successfully"
}
Error Response:
500 Internal Server Error: Error deleting the product.
{
  "error": "Failed to delete product"
}
List Products by Category
GET /products/category/:categoryId

Fetches all products that belong to a specific category.

Success Response:
[
  {
    "id": 1,
    "name": "Product 1",
    "description": "Description 1",
    "price": 20.99,
    "categoryId": 1
  },
  {
    "id": 2,
    "name": "Product 2",
    "description": "Description 2",
    "price": 25.99,
    "categoryId": 1
  }
]
Error Response:
404 Not Found: No products found for the given category.
{
  "error": "No products found for this category"
}
500 Internal Server Error: Error fetching products by category.


{
  "error": "Failed to fetch products"
}
Get Product by ID
GET /products/:id

Fetches a product by its unique ID.

Success Response:
{
  "id": 1,
  "name": "Product 1",
  "description": "Product Description",
  "price": 20.99,
  "categoryId": 1,
  "category": {
    "id": 1,
    "name": "Category 1"
  }
}
Error Response:
404 Not Found: Product not found for the given ID.
{
  "error": "Product not found"
}
500 Internal Server Error: Error fetching the product.


{
  "error": "Failed to fetch product"
}
List All Products
GET /products

Fetches all products in the system.

Success Response:
[
  {
    "id": 1,
    "name": "Product 1",
    "description": "Description 1",
    "price": 20.99,
    "categoryId": 1
  },
  {
    "id": 2,
    "name": "Product 2",
    "description": "Description 2",
    "price": 25.99,
    "categoryId": 2
  }
]
Error Response:
500 Internal Server Error: Error fetching all products.
{
  "error": "Failed to fetch products"
}
Rate Limiting
For the registration endpoint, a rate limiter is implemented using express-rate-limit. This limits the number of requests a user can make to the registration endpoint in a given time window (e.g., 5 requests per minute from the same IP).

Error Codes
400 Bad Request: The request is invalid, such as when the user already exists during registration.

404 Not Found: The resource (e.g., product or category) is not found.

500 Internal Server Error: General server error.


// Authentication Routes
router.post('/register', rateLimiter, register);
router.post('/login', login);

// Category Routes
router.get('/categories/get-all', listCategories);
router.get('/categories/:id', getCategory);
router.post('/categories/create-category', authenticate, authorizeAdmin, createCategory);
router.put('/categories/:id', authenticate, authorizeAdmin, updateCategory);
router.delete('/categories/:id', authenticate, authorizeAdmin, deleteCategory);

// Product Routes
router.get('/products/category/:categoryId', listProductsByCategory);
router.get('/products/:id', getProduct);
router.post('/products/create-product', authenticate, authorizeAdmin, createProduct);
router.put('/products/:id', authenticate, authorizeAdmin, updateProduct);
router.delete('/products/:id', authenticate, authorizeAdmin, deleteProduct);


Conclusion
This API provides user registration, product management, and rate limiting for registration. The endpoints are reusable and follow best practices to ensure security, ease of use, and scalability.
