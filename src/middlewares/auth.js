/* eslint-disable consistent-return */
import connection from '../database.js';

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.split('Bearer ')[1];

  const sessionQuery = await connection.query(
    'SELECT * FROM sessions WHERE token = $1', [token],
  );

  const session = sessionQuery.rows[0];

  if (!session) {
    return res.sendStatus(401);
  }

  next();
};

export default auth;
