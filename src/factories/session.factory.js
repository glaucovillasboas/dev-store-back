/* eslint-disable  prefer-destructuring */
import jwt from 'jsonwebtoken';
import { existingUserFactory } from './registration.factory.js';
import connection from '../database.js';

const validSessionFactory = async () => {
  const user = await existingUserFactory();

  const userQuery = await connection.query(
    `   SELECT users.*
        FROM users
        WHERE users.email = $1;`,
    [user.email],
  );

  const userId = userQuery.rows[0].id;

  const data = { id: userId, email: user.email, name: user.name };
  const jwtSecret = process.env.JWT_SECRET;
  const token = jwt.sign(data, jwtSecret);

  await connection.query(
    'INSERT INTO sessions (user_id, token) VALUES ($1, $2);',
    [userId, token],
  );

  return {
    token,
  };
};

const invalidSessionFactory = () => ({
  token: 'a',
});

export {
  validSessionFactory,
  invalidSessionFactory,
};
