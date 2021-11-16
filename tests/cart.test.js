import '../src/setup.js';
import supertest from 'supertest';
import app from '../src/app.js';
import jwt from 'jsonwebtoken';
import connection from '../src/database.js';
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

describe('post /cart', () => {
    test('returns 200 with valid product and token', async () => {
        const user = await validSessionFactory();
        const validProduct = await validProductFactory();
        createdUsers.push(user);
        createdProducts.push(validProduct);

        const result = await supertest(app).post('/cart')
            .send({ code: validProduct.code })
            .set('Authorization', `Bearer ${user.token}`);
        expect(result.status).toEqual(200);
    });

    test('returns 404 with invalid product code', async () => {
        const user = createdUsers[0];

        const result = await supertest(app).post('/cart')
            .send({ code: '9090649805' })
            .set('Authorization', `Bearer ${user.token}`);
        expect(result.status).toEqual(404);
    });
});

describe('get /cart', () => {
    test('returns 200 with valid product and token', async () => {
        const user = createdUsers[0];
        const validProduct = createdProducts[0]

        await supertest(app).post('/cart')
            .send({ code: validProduct.code })
            .set('Authorization', `Bearer ${user.token}`);

        const result = await supertest(app).get('/cart')
            .set('Authorization', `Bearer ${user.token}`);
        expect(result.status).toEqual(200);
    });
});

describe('delete /cart', () => {
    test('returns 200 with valid product and token', async () => {
        const user = createdUsers[0];
        const validProduct = createdProducts[0]

        await supertest(app).post('/cart')
            .send({ code: validProduct.code })
            .set('Authorization', `Bearer ${user.token}`);

        const result = await supertest(app).delete(`/cart/${validProduct.code}`)
            .set('Authorization', `Bearer ${user.token}`);
        expect(result.status).toEqual(200);
    });
});