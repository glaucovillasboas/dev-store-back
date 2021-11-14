/* eslint-disable comma-dangle */
import connection from '../database.js';

const getCategorieById = async (req, res) => {
  const { id } = req.params;
  try {
    const categorieQuery = await connection.query(
      `
      SELECT * FROM products WHERE products.category_id = $1
    `,
      [id]
    );
    const products = categorieQuery.rows;
    if (!products.length) {
      return res.sendStatus(404);
    }

    return res.status(200).send(products);
  } catch (err) {
    return res.sendStatus(500);
  }
};

export default getCategorieById;
