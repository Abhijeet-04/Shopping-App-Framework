import { Router } from 'express';
import hello from './routes/hello';
import user from './routes/user';
import product from './routes/product';
import cart from './routes/cart';

export default () => {
  const app = Router();
  hello(app);
  user(app);
  product(app);
  cart(app);
  return app;
};
