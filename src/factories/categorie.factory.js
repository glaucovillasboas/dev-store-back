/* eslint-disable comma-dangle */
import connection from '../database.js';

const validCategorieId = async () => {
  await connection.query(`
        INSERT INTO categories (name) VALUES ('mouses');
    `);

  const selectCategorie = await connection.query(
    `
        SELECT * FROM categories WHERE categories.name = 'mouses';
    `
  );

  return selectCategorie.rows[0].id;
};

const invalidCategorieId = () => 900000000;

export { validCategorieId, invalidCategorieId };
