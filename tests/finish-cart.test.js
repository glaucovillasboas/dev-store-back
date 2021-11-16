import '../src/setup.js';
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database.js';
import jwt from 'jsonwebtoken';
import { validSessionFactory } from '../src/factories/session.factory.js';
import { validProductFactory } from '../src/factories/product.factory.js';

const createdUsers = [];
const createdProducts = [];

afterAll(async () => {
    const jwtSecret = process.env.JWT_SECRET;
    const users_ids = createdUsers.map((user) => jwt.verify(user.token, jwtSecret).id).join(',');
    const categories_ids = createdProducts.map((product) => product.category_id).join(',');
    await connection.query(`DELETE FROM carts_products WHERE user_id IN (${users_ids});`);
    await connection.query(`DELETE FROM carts WHERE user_id IN (${users_ids});`);
    await connection.query(`DELETE FROM categories WHERE id IN (${categories_ids});`);
    await connection.query(`DELETE FROM products WHERE category_id IN (${categories_ids});`);
    await connection.query(`DELETE FROM sessions WHERE user_id IN (${users_ids});`);
    await connection.query(`DELETE FROM addresses WHERE user_id IN (${users_ids});`);
    await connection.query(`DELETE FROM phones WHERE user_id IN (${users_ids});`);
    await connection.query(`DELETE FROM users WHERE id IN (${users_ids});`);
    connection.end();
});


describe('post /finish-cart', () => {
    test('returns 404 with valid token but no cart', async () => {
        const user = await validSessionFactory();
        createdUsers.push(user);

        const result = await supertest(app).post('/finish-cart')
            .set('Authorization', `Bearer ${user.token}`);
        expect(result.status).toEqual(404);
    });

    test('returns 200 with valid token and created cart', async () => {
        const user = createdUsers[0];
        const validProduct = await validProductFactory();
        createdProducts.push(validProduct);

        await supertest(app).post('/cart')
            .send({ code: validProduct.code })
            .set('Authorization', `Bearer ${user.token}`);

        const result = await supertest(app).post('/finish-cart')
            .set('Authorization', `Bearer ${user.token}`);
        expect(result.status).toEqual(200);
    });
});