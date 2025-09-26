import { Application } from 'express';
import expressLoader from './express';
import postgresLoader from './postgres';

export default async ({ expressApp }: { expressApp: Application }) => {
  if (process.env.NODE_ENV !== 'test') {
    await postgresLoader();
    console.log('PostgreSQL Initialized');
  }

  await expressLoader({ app: expressApp });
  console.log('Express Initialized');
};
