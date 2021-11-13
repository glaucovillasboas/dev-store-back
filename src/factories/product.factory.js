import connection from '../database.js';

const validProductFactory = async () => {
  const category = {
    name: 'Category',
  };

  await connection.query(
    'INSERT INTO categories (name) VALUES ($1);', [category.name],
  );

  const categoryQuery = await connection.query(
    'SELECT id FROM categories WHERE name = $1', [category.name],
  );

  const categoryId = categoryQuery.rows[0].id;

  const product = {
    name: 'teste',
    description: 'teste',
    price: 720.50,
    quantity: 109,
    photo: 'https://images-submarino.b2w.io/produtos/01/00/img7/01/00/item/133777/3/133777366_1GG.png',
    category_id: categoryId,
  };

  await connection.query(
    'INSERT INTO products (name, description, price, quantity, photo, category_id) VALUES ($1, $2, $3, $4, $5, $6);',
    [
      product.name,
      product.description,
      product.price,
      product.quantity,
      product.photo,
      product.category_id,
    ],
  );

  const productQuery = await connection.query(
    'SELECT * FROM products WHERE name = $1', [product.name],
  );

  const completeProduct = productQuery.rows[0];

  return {
    ...completeProduct,
  };
};

const invalidProductFactory = () => ({
  code: '9999999999',
});

export {
  validProductFactory,
  invalidProductFactory,
};
