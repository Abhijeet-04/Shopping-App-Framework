import { Pool } from 'pg';
import config from '../config';

const pool = new Pool(config.database);

export const db = {
  query: (text: string, params: any[]) => pool.query(text, params),
};

export default async () => {
  try {
    const client = await pool.connect();
    console.log('PostgreSQL connected successfully');
    client.release();
    return pool;
  } catch (error) {
    console.error('Could not connect to PostgreSQL', error);
    process.exit(1);
  }
};
