/* eslint-disable comma-dangle */
import connection from '../database.js';

const signIn = async (req, res) => {
  try {
    const productsQuery = await connection.query(
      'SELECT * FROM products'
    );

    const products = productsQuery.rows;

    return res.status(200).send(products);
  } catch (err) {
    return res.sendStatus(500);
  }
};

export default signIn;
