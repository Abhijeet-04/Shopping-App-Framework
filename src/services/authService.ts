import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../loaders/postgres';
import { v4 as uuidv4 } from 'uuid';

const saltRounds = 10;

class AuthService {
  async register(username: string, email: string, password: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const id = uuidv4();

    const newUser = await db.query(
      'INSERT INTO users (id, username, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING id, username, email',
      [id, username, email, hashedPassword]
    );

    return newUser.rows[0];
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      throw new Error('User not found');
    }

    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Ensure JWT_SECRET is not undefined
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    
    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
      expiresIn: '1h',
    });

    return { token };
  }
}

export default new AuthService();
