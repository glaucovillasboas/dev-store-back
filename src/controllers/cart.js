/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */

import jwt from 'jsonwebtoken';
import connection from '../database.js';
import productSchema from '../../schemas/productSchema.js';

const addCart = async (req, res) => {
  const product = req.body;
  const validation = productSchema.validate(product);

  if (validation.error) {
    return res.sendStatus(400);
  }

  const { authorization } = req.headers;
  const token = authorization?.split('Bearer ')[1];

  const jwtSecret = process.env.JWT_SECRET;
  const user = jwt.verify(token, jwtSecret);

  try {
    let cartQuery = await connection.query(
      'SELECT * FROM carts WHERE user_id = $1 AND "finishedAt" IS NULL', [user.id],
    );

    let cart = cartQuery.rows[0];

    if (!cart) {
      await connection.query(
        'INSERT INTO carts (user_id) VALUES ($1)', [user.id],
      );

      cartQuery = await connection.query(
        'SELECT * FROM carts WHERE user_id = $1 AND "finishedAt" IS NULL', [user.id],
      );

      cart = cartQuery.rows[0];
    }

    const cartProductQuery = await connection.query(
      'SELECT * FROM carts_products WHERE cart_id = $1 AND product_id = $2', [cart.id, product.id],
    );

    const cartProduct = cartProductQuery.rows[0];

    if (cartProduct) {
      await connection.query(
        'UPDATE carts_products SET quantity = quantity + 1 WHERE id = $1', [cartProduct.id],
      );
    } else {
      await connection.query(
        'INSERT INTO carts_products (user_id, product_id, cart_id, quantity) VALUES ($1, $2, $3, $4)',
        [user.id, product.id, cart.id, 1],
      );
    }

    res.send(cart);
  } catch (err) {
    res.sendStatus(500);
  }
};

export default addCart;
