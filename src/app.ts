import express from 'express';
import loaders from './loaders';

async function startServer() {
  const app = express();

  await loaders({ expressApp: app });

  const server = app.listen(process.env.PORT, () => {
    console.log(`Server listening on port: ${process.env.PORT}`);
  }).on('error', err => {
    console.error(err);
    process.exit(1);
  });

  return { app, server };
}

// Conditionally start the server
if (require.main === module) {
  startServer();
}

export { startServer };
