/* eslint-disable comma-dangle */
import connection from '../database.js';

const getResearchedProduct = async (req, res) => {
  try {
    const { name } = req.body;
    const researchedName = name.toLowerCase();
    const result = await connection.query(
      `
      SELECT * FROM products WHERE LOWER(products.name) LIKE '%${researchedName}%';
    `
    );
    return res.status(200).send(result.rows);
  } catch (err) {
    return res.sendStatus(500);
  }
};

export default getResearchedProduct;
