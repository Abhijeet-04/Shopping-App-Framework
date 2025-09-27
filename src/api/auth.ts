import express, { Request, Response, NextFunction } from 'express';
import authService from '../services/authService';

const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required' });
  }

  try {
    const user = await authService.register(username, email, password);
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    // Basic error handling, you might want to check for unique constraint violations
    if (error.code === '23505') { // Unique violation in PostgreSQL
        return res.status(409).json({ message: 'Email or username already exists.' });
    }
    next(error);
  }
});

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const result = await authService.login(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

export default router;
