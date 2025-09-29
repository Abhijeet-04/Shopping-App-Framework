# Shopping Cart API

This is a back-end API for a shopping cart application, built with Node.js, Express, and PostgreSQL.

## Features

- User registration and JWT-based authentication
- Product management
- Shopping cart functionality
- Order processing
- PostgreSQL integration

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)

### 2. Clone the Repository

```bash
git clone <your-repository-url>
cd <your-project-directory>
```

### 3. Install Dependencies

Install the required npm packages:

```bash
npm install
```

### 4. Set Up the Database

## Database Access Issues

If you encounter a "permission denied for table users" error, it means the database user configured for the application does not have the necessary permissions to access the `users` table.

To resolve this, you need to grant the required privileges to the user.

### Running the Command on Windows

1.  **Open the SQL Shell (psql):** You can find this application in your Start Menu under the PostgreSQL installation folder.
2.  **Connect to Your Database:** When prompted, provide the server, database, port, username, and password. The default database name is `mydatabase` and the user is `postgres`.
3.  **Run the Grant Command:** Once connected, execute the following SQL command in the `psql` shell:

    ```sql
    GRANT ALL PRIVILEGES ON TABLE users TO postgres;
    ```

This command will grant all necessary permissions to the `postgres` user, allowing the application to access the `users` table.

For Basic privileges for Write and Read From Databse
issue Use Belwo SQL Commands 

GRANT pg_read_all_data TO my_user;
GRANT pg_write_all_data TO my_user;


1.  **Start PostgreSQL:** Make sure your PostgreSQL server is running.

2.  **Create a Database:** Create a new database for this project.

    ```sql
    CREATE DATABASE your_database_name;
    ```

3.  **Run DDL and Sample Data Scripts:** Use `psql` to create the tables and populate them with sample data.

    ```bash
    psql -U your_postgres_user -d your_database_name -f database.sql
    psql -U your_postgres_user -d your_database_name -f sample_data.sql
    ```

    *Replace `your_postgres_user` and `your_database_name` with your actual credentials.*

### 5. Configure Environment Variables

Create a `.env` file in the root of the project and add your database credentials and other environment variables. A `.env.example` file is included for reference.

```env
# .env

# PostgreSQL Configuration
PG_HOST=localhost
PG_PORT=5432
PG_USER=your_postgres_user
PG_PASSWORD=your_postgres_password
PG_DATABASE=your_database_name

# Server Port
PORT=3000

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key
```

### 6. Run the Application

Start the server in development mode. It will automatically restart on file changes.

```bash
npm run dev
```

The API will be running at `http://localhost:3000`.

## API Endpoints

Here are the currently available API endpoints.

### Authentication

-   **POST `/api/auth/register`**
    -   Registers a new user.
    -   **Request Body:**
        ```json
        {
            "username": "testuser",
            "email": "test@example.com",
            "password": "password123"
        }
        ```
    -   **Success Response (201):**
        ```json
        {
            "message": "User created successfully",
            "user": {
                "id": "...",
                "username": "testuser",
                "email": "test@example.com"
            }
        }
        ```
    -   **Error Response (409):** If the email or username already exists.

-   **POST `/api/auth/login`**
    -   Logs in an existing user and returns a JWT.
    -   **Request Body:**
        ```json
        {
            "email": "test@example.com",
            "password": "password123"
        }
        ```
    -   **Success Response (200):**
        ```json
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
        ```
    -   **Error Response (401):** If credentials are invalid.

### Users

-   **GET `/api/users/:id`**
    -   Fetches a specific user by their ID.
    -   **Parameters:**
        -   `id` (string): The UUID of the user.
    -   **Response:**

        ```json
        {
            "id": "...",
            "username": "...",
            "email": "..."
        }
        ```

### Products

-   **GET `/api/products`**
    -   Fetches a list of all products.
    -   **Authentication:** Requires a valid JWT in the `Authorization` header (`Bearer <token>`)
    -   **Success Response (200):**

        ```json
        [
          {
            "id": "...",
            "name": "Laptop",
            "description": "A powerful laptop.",
            "price": "1200.00",
            "stock_quantity": 50
          },
          {
            "id": "...",
            "name": "Mouse",
            "description": "A wireless mouse.",
            "price": "25.00",
            "stock_quantity": 150
          }
        ]
        ```

### Cart

-   **POST `/api/cart/add`**
    -   Adds a product to the user's shopping cart. If the user does not have a cart, one will be created.
    -   **Authentication:** Requires a valid JWT in the `Authorization` header (`Bearer <token>`)
    -   **Request Body:**
        ```json
        {
            "productId": "...",
            "quantity": 1
        }
        ```
    -   **Success Response (200):** Returns the updated cart items.
        ```json
        [
          {
            "id": "...",
            "cart_id": "...",
            "product_id": "...",
            "quantity": 1
          }
        ]
        ```

*More endpoints for cart and orders will be documented here as they are developed.*

## Project Structure

-   **`src/`**: Main application source code.
    -   **`api/`**: Express routes.
    -   **`config/`**: Application configuration.
    -   **`loaders/`**: Modules for loading and initializing services (Express, PostgreSQL).
    -   **`services/`**: Business logic (e.g., `userService`, `authService`).
-   **`database.sql`**: DDL script to create the database schema.
-   **`sample_data.sql`**: Script to populate the database with sample data.
