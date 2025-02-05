
# Frontend for Product Management App

This project is the frontend of the Product Management Application built using React with Vite, styled with Material-UI, and integrated with the Express.js backend API. The app allows users to manage products and their details efficiently.

---

## Table of Contents

1. [Features](#features)
2. [Project Setup](#project-setup)
3. [Folder Structure](#folder-structure)
4. [Dependencies](#dependencies)
5. [API Integration](#api-integration)
6. [Screenshots](#screenshots)

---

## Features

### 1. **Product Management**
- **Add New Product**: Users can add new products with details such as name, description, and price.
- **Edit Existing Product**: Users can edit details of a product including name, description, and price.
- **Delete Product**: Users can remove a product from the list.
- **Product List**: A paginated list of all products with options to search and filter by name or description.
- **Product Details**: Detailed view of each product with full information.
- **Product Image Upload**: Users can upload product images.

### 2. **User Authentication**
- **Login**: Users can log in using their email and password.
- **User Registration**: New users can register by providing their name, email, contact number, and password.
- **Profile**: Users can view their profile details once logged in.

### 3. **Pagination & Sorting**
- Products are displayed with pagination and sorting options based on creation date or name.
- Supports dynamic filtering and searching by product name or description.

---

## Project Setup

### 1. Clone the Repository
Clone this repository to your local machine:

```bash
git clone <repository-url>
cd <frontend-directory>
```

### 2. Install Dependencies
Install the required dependencies:

```bash
npm install
```

### 3. Start the Development Server
Run the following command to start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

---

## Folder Structure

```
/src
  /assets         # Static assets like images and icons
  /components     # React components
  /pages          # React pages (Login, Register, Dashboard, etc.)
  /services       # API calls and data fetching logic
  /store          # Redux store and actions
  /utils          # Utility functions and constants
  /styles         # Global styles
  /App.js         # Main component
  /index.js       # Entry point of the application
```

---

## Dependencies

- **React**: Frontend framework.
- **Vite**: Build tool for faster development.
- **Material-UI**: UI library for React.
- **Redux**: State management for the application.
- **React Router**: For navigation between pages.
- **Axios**: For making API requests.
- **Jest**: Testing framework.

---

## API Integration

The frontend interacts with the following backend APIs:

### 1. **Register User**
- **POST** `http://localhost:6001/web/user/register`
- **Request Body**:
  ```json
  {
    "name": "reshav gupta",
    "emailId": "reshavbajaj786@gmail.com",
    "contactNo": "7654101068",
    "password": "resh1234"
  }
  ```

### 2. **Login User**
- **POST** `http://localhost:6001/web/user/login`
- **Request Body**:
  ```json
  {
    "emailId": "peter.parker@gmail.com",
    "password": "pete1234"
  }
  ```

### 3. **Add Product**
- **POST** `http://localhost:6001/web/product/add`
- **Authorization**: Bearer Token
- **Request Body**:
  ```json
  {
    "name": "natraj pencil",
    "description": "Bold dark pencil strokes",
    "price": 4
  }
  ```

### 4. **Show Product**
- **GET** `http://localhost:6001/web/product/show`

### 5. **Edit Product**
- **PUT** `http://localhost:6001/web/product/edit/:productId`
- **Authorization**: Bearer Token
- **Request Body**:
  ```json
  {
    "name": "updated product name",
    "description": "updated description",
    "price": 5
  }
  ```

---

## Screenshots

### Login Page
![Login Page](./screenshots/login-page.png)

### Product List
![Product List](./screenshots/product-list.png)

---

## Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request with your changes. Please ensure that your code is well-documented and thoroughly tested.

---

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
