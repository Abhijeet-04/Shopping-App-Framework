import { pool } from '../loaders/postgres';

export const getProducts = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM products');
    return result.rows;
  } finally {
    client.release();
  }
};
