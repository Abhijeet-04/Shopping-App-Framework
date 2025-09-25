import { Router, Request, Response } from 'express';

const route = Router();

export default (app: Router) => {
  app.use('/hello', route);

  route.get('/', (req: Request, res: Response) => {
    return res.json({ message: 'Hello World' }).status(200);
  });
};