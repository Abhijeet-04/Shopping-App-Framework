import { Router, Request, Response } from 'express';
import { addProductToCart } from '../../services/cartService';
import { verifyToken } from '../middleware/authMiddleware';

const route = Router();

export default (app: Router) => {
  app.use('/cart', route);

  route.post('/add', verifyToken, async (req: Request, res: Response) => {
    const { productId, quantity } = req.body;
    const userId = (req as any).user.id;

    if (!productId || !quantity) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    try {
      const cart = await addProductToCart(userId, productId, quantity);
      res.status(200).json(cart);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  });
};
