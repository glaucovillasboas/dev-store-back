/* eslint-disable comma-dangle */
import connection from '../database.js';
import searchSchema from '../../schemas/searchSchema.js';

const getResearchedProduct = async (req, res) => {
  try {
    const { name } = req.body;

    const validation = searchSchema.validate(req.body);

    if (validation.error) {
      return res.sendStatus(400);
    }

    const researchedName = name.toLowerCase();
    const result = await connection.query(
      `
      SELECT * FROM products WHERE LOWER(products.name) LIKE $1;
    `,
      [`%${researchedName}%`]
    );
    return res.status(200).send(result.rows);
  } catch (err) {
    return res.sendStatus(500);
  }
};

export default getResearchedProduct;
