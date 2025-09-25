import { initializeApp, cert } from 'firebase-admin/app';

export default () => {
  const serviceAccount = require('../../serviceAccountKey.json');

  initializeApp({
    credential: cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
  });
};