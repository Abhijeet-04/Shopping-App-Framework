import dotenv from 'dotenv';

dotenv.config();

export default {
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'mydatabase',
  },
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
};
