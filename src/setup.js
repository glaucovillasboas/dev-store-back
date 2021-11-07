import dotenv from 'dotenv';

let envFile = '.env.dev';

if (process.env.NODE_ENV === 'prod') {
  envFile = '.env.prod';
}

if (process.env.NODE_ENV === 'test') {
  envFile = '.env.test';
}

dotenv.config({
  path: envFile,
});
