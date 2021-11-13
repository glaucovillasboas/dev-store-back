/* eslint-disable comma-dangle */
import connection from '../database.js';

const getProductByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const productsQuery = await connection.query(
      `SELECT 
        products.id, products.name, products.price, products.description, products.code, products.photo, products.quantity,
        categories.name AS category_name
      FROM products
        JOIN categories
          ON products.category_id = categories.id
      WHERE products.code = $1`, [code]
    );

    const product = productsQuery.rows[0];

    if (!product) {
      return res.sendStatus(404);
    }

    const aspectsQuery = await connection.query(
      'SELECT name, value FROM aspects WHERE product_id = $1', [product.id]
    );

    const aspects = aspectsQuery.rows;

    return res.status(200).send({
      aspects,
      name: product.name,
      price: product.price,
      description: product.description,
      code: product.code,
      photo: product.photo,
      quantity: product.quantity,
      category_name: product.category_name,
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export default getProductByCode;
