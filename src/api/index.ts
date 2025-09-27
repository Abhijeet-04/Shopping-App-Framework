import { Router } from 'express';
import hello from './routes/hello';
import user from './routes/user';
import product from './routes/product';
import cart from './routes/cart';
import auth from './auth';

export default () => {
  const app = Router();
  hello(app);
  user(app);
  product(app);
  cart(app);
  app.use('/auth', auth);
  return app;
};
