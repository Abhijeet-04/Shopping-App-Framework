
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db } = require('../loaders/postgres');
const { v4: uuidv4 } = require('uuid');

const saltRounds = 10;

class AuthService {
  async register(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const id = uuidv4();
    
    const newUser = await db.query(
      'INSERT INTO users (id, username, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING id, username, email',
      [id, username, email, hashedPassword]
    );

    return newUser.rows[0];
  }

  async login(email, password) {
    const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      throw new Error('User not found');
    }

    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return { token };
  }
}

module.exports = new AuthService();
