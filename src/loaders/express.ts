import express, { Application } from 'express';
import routes from '../api';
import authRoutes from '../api/auth';

export default ({ app }: { app: Application }) => {
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  app.use(express.json());
  app.use('/api/auth', authRoutes);
  app.use('/', routes());

  return app;
};
