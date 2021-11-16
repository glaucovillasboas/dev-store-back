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
    const productQuery = await connection.query(
      'SELECT * FROM products WHERE code = $1', [product.code],
    );

    product.id = productQuery.rows[0] ? productQuery.rows[0].id : false;

    if (!product.id) {
      return res.sendStatus(404);
    }

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

const deleteProduct = async (req, res) => {
  const { code } = req.params;
  const validation = productSchema.validate(req.params);

  if (validation.error) {
    return res.sendStatus(400);
  }

  const { authorization } = req.headers;
  const token = authorization?.split('Bearer ')[1];

  const jwtSecret = process.env.JWT_SECRET;
  const user = jwt.verify(token, jwtSecret);

  try {
    const cartQuery = await connection.query(
      'SELECT * FROM carts WHERE user_id = $1 AND "finishedAt" IS NULL', [user.id],
    );

    const cart = cartQuery.rows[0];

    if (!cart) {
      return res.sendStatus(404);
    }

    const productQuery = await connection.query(
      'SELECT id FROM products WHERE code = $1', [code],
    );

    const product = productQuery.rows[0];

    if (!product) {
      return res.sendStatus(404);
    }

    await connection.query(
      `
      DELETE FROM carts_products
      WHERE cart_id = $1 AND product_id = $2`, [cart.id, product.id],
    );

    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
};

const getCart = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.split('Bearer ')[1];

  const jwtSecret = process.env.JWT_SECRET;
  const user = jwt.verify(token, jwtSecret);

  try {
    const cartQuery = await connection.query(
      'SELECT * FROM carts WHERE user_id = $1 AND "finishedAt" IS NULL', [user.id],
    );

    const cart = cartQuery.rows[0];

    if (!cart) {
      return res.sendStatus(404);
    }

    const cartsProductsQuery = await connection.query(
      `SELECT 
      carts_products.quantity,
      products.id, products.name, products.price, products.photo, products.code, products.description
    FROM carts_products
      JOIN products
        ON products.id = carts_products.product_id
    WHERE cart_id = $1`, [cart.id],
    );

    const cartsProducts = cartsProductsQuery.rows;

    let total = 0;
    cartsProducts.forEach((product, i) => {
      total += product.price * product.quantity;
      cartsProducts[i].price = product.price * product.quantity;
    });

    res.send({
      products: cartsProducts,
      total: total.toFixed(2),
    });
  } catch (err) {
    res.sendStatus(500);
  }
};

const finishCart = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.split('Bearer ')[1];

  const jwtSecret = process.env.JWT_SECRET;
  const user = jwt.verify(token, jwtSecret);

  try {
    const cartQuery = await connection.query(
      'SELECT * FROM carts WHERE user_id = $1 AND "finishedAt" IS NULL', [user.id],
    );

    const cart = cartQuery.rows[0];

    if (!cart) {
      return res.sendStatus(404);
    }

    const cartProductQuery = await connection.query(
      'SELECT * FROM carts_products WHERE cart_id = $1', [cart.id],
    );

    const cartsProducts = cartProductQuery.rows;

    let queryConditions = `
      UPDATE products
      SET quantity = CASE
      `;

    cartsProducts.forEach((product) => {
      queryConditions += `WHEN ${product.product_id} = id THEN quantity - ${product.quantity}
      `;
    });
    queryConditions += `END WHERE id IN (${cartsProducts.map((product) => product.product_id).join(',')})`;

    await connection.query(queryConditions);

    await connection.query(
      'UPDATE carts SET "finishedAt" = now() WHERE id = $1', [cart.id],
    );

    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
};

export {
  addCart, getCart, deleteProduct, finishCart,
};
