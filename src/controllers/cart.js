/* eslint-disable comma-dangle */
import jwt from 'jsonwebtoken';
import connection from '../database.js';

const addCart = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.split('Bearer ')[1];

  const jwtSecret = process.env.JWT_SECRET;
  const user = jwt.verify(token, jwtSecret);

  let cartQuery = await connection.query(
    'SELECT * FROM carts WHERE user_id = $1 AND "finishedAt" IS NULL', [user.id]
  );

  let cart = cartQuery.rows[0];
  console.log(cart);

  if (!cart) {
    await connection.query(
      'INSERT INTO carts (user_id) VALUES ($1)', [user.id]
    );

    cartQuery = await connection.query(
      'SELECT * FROM carts WHERE user_id = $1 AND "finishedAt" IS NULL', [user.id]
    );

    cart = cartQuery.rows[0];
  }

  console.log(cart);
  res.send(cart);
};

export default addCart;
