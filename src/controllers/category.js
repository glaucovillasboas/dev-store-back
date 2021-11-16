/* eslint-disable comma-dangle */
import connection from '../database.js';

const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const categoryQuery = await connection.query(
      `
      SELECT * FROM categories WHERE categories.id = $1
    `,
      [id]
    );

    if (categoryQuery.rowCount === 0) {
      return res.sendStatus(404);
    }

    const categoryProductsQuery = await connection.query(
      `
      SELECT * FROM products WHERE products.category_id = $1
    `,
      [id]
    );
    const products = categoryProductsQuery.rows;

    return res.status(200).send(products);
  } catch (err) {
    return res.sendStatus(500);
  }
};

export default getCategoryById;
