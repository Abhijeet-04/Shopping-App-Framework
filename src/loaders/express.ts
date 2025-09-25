import express, { Application } from 'express';
import routes from '../api';

export default ({ app }: { app: Application }) => {
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  app.use('/', routes());

  return app;
};