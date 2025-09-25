import { Application } from 'express';
import expressLoader from './express';
import firebaseLoader from './firebase';

export default async ({ expressApp }: { expressApp: Application }) => {
  await firebaseLoader();
  console.log('Firebase Initialized');

  await expressLoader({ app: expressApp });
  console.log('Express Initialized');
};