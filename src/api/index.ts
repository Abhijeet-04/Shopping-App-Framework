import { Router } from 'express';
import hello from './routes/hello';
import user from './routes/user';

export default () => {
  const app = Router();
  hello(app);
  user(app);
  return app;
};