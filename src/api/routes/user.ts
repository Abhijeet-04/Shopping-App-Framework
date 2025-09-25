import { Router, Request, Response } from 'express';
import UserService from '../../services/userService';

const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  route.get('/:id', async (req: Request, res: Response) => {
    try {
      const userService = new UserService();
      const user = await userService.getUser(req.params.id);
      if (user) {
        return res.json(user).status(200);
      }
      return res.status(404).json({ message: 'User not found' });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });
};
