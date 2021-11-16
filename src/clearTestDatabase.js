import './setup.js';
import connection from './database.js';

const clearDatabase = async () => {
  if (process.env.DB_NAME === 'dev_store_test') {
    await connection.query('DELETE FROM carts_products;');
    await connection.query('DELETE FROM carts;');
    await connection.query('DELETE FROM categories;');
    await connection.query('DELETE FROM products;');
    await connection.query('DELETE FROM sessions;');
    await connection.query('DELETE FROM addresses;');
    await connection.query('DELETE FROM phones;');
    await connection.query('DELETE FROM users;');
    connection.end();
    process.exit();
  }
};

clearDatabase();
