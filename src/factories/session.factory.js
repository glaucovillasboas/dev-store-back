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

  const data = { userId };
  const jwtSecret = process.env.JWT_SECRET;
  const token = jwt.sign(data, jwtSecret);

  const sessionQuery = await connection.query(
    'SELECT * FROM sessions WHERE user_id = $1;',
    [userId],
  );

  const session = sessionQuery.rows[0];

  if (!session) {
    await connection.query(
      'INSERT INTO sessions (user_id, token) VALUES ($1, $2);',
      [userId, token],
    );
  } else {
    await connection.query(
      'UPDATE sessions SET token = $1 WHERE user_id = $2;',
      [token, userId],
    );
  }

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
