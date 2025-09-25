# Shopping Cart API

This is a back-end API for a shopping cart application, built with Node.js, Express, and PostgreSQL.

## Features

- User authentication (conceptual)
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
```

### 6. Run the Application

Start the server in development mode. It will automatically restart on file changes.

```bash
npm run dev
```

The API will be running at `http://localhost:3000`.

## API Endpoints

Here are the currently available API endpoints.

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

*More endpoints for products, cart, and orders will be documented here as they are developed.*

## Project Structure

-   **`src/`**: Main application source code.
    -   **`api/`**: Express routes.
    -   **`config/`**: Application configuration.
    -   **`loaders/`**: Modules for loading and initializing services (Express, PostgreSQL).
    -   **`services/`**: Business logic (e.g., `userService`).
-   **`database.sql`**: DDL script to create the database schema.
-   **`sample_data.sql`**: Script to populate the database with sample data.
