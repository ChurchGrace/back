import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../config.env') });
process.on('uncaughtException', err => {
  if (err instanceof Error) {
    console.log('uncaughtException');
    console.log(err);
    console.log(err.name);
    console.log(err.message);
  }
  process.exit(1);
});
import app from './app';

const server = app.listen(8888, () => {
  console.log(`app listening on port ${8888}`);
});

process.on('unhandledRejection', err => {
  if (err instanceof Error) {
    console.log('unhandledRejection');
    console.log(err.name);
    console.log(err.message);
  }
  server.close(() => {
    process.exit(1);
  });
});
