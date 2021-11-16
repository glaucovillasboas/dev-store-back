/* eslint-disable comma-dangle */
import connection from '../database.js';

const validCategoryId = async () => {
  await connection.query(`
        INSERT INTO categories (name) VALUES ('mouses');
    `);

  const selectCategory = await connection.query(
    `
        SELECT * FROM categories WHERE categories.name = 'mouses';
    `
  );

  return selectCategory.rows[0].id;
};

const invalidCategoryId = () => 900000000;

export { validCategoryId, invalidCategoryId };
