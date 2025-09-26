import { Router, Request, Response } from 'express';
import { getProducts } from '../../services/productService';
import { verifyToken } from '../middleware/authMiddleware';

const route = Router();

export default (app: Router) => {
  app.use('/products', route);

  route.get('/', verifyToken, async (req: Request, res: Response) => {
    try {
      const products = await getProducts();
      res.json(products);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  });
};
