import pg from 'pg';

const { Pool } = pg;

let connData = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
};

if (process.env.NODE_ENV === 'prod') {
  connData = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const connection = new Pool(connData);

export default connection;
