import { Router, Request, Response } from 'express';
import { getProducts } from '../../services/productService';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/products', verifyToken, async (req: Request, res: Response) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
