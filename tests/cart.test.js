import '../src/setup.js';
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database.js';
import { validSessionFactory } from '../src/factories/session.factory.js';
import { validProductFactory } from '../src/factories/product.factory.js';

afterAll(async () => {
    await connection.query('DELETE FROM carts_products;');
    await connection.query('DELETE FROM carts;');
    await connection.query('DELETE FROM categories;');
    await connection.query('DELETE FROM products;');
    await connection.query('DELETE FROM sessions;');
    await connection.query('DELETE FROM addresses;');
    await connection.query('DELETE FROM phones;');
    await connection.query('DELETE FROM users;');
    connection.end();
});

describe('post /cart', () => {
    test('returns 200 with valid product and token', async () => {
        const { token } = await validSessionFactory();
        const validProduct = await validProductFactory();

        const result = await supertest(app).post('/cart')
            .send({ code: validProduct.code })
            .set('Authorization', `Bearer ${token}`);
        expect(result.status).toEqual(200);
    });

    test('returns 404 with invalid product code', async () => {
        const { token } = await validSessionFactory();

        const result = await supertest(app).post('/cart')
            .send({ code: '9090649805' })
            .set('Authorization', `Bearer ${token}`);
        expect(result.status).toEqual(404);
    });
});

describe('get /cart', () => {
    test('returns 200 with valid product and token', async () => {
        const { token } = await validSessionFactory();
        const validProduct = await validProductFactory();

        await supertest(app).post('/cart')
            .send({ code: validProduct.code })
            .set('Authorization', `Bearer ${token}`);

        const result = await supertest(app).get('/cart')
            .set('Authorization', `Bearer ${token}`);
        expect(result.status).toEqual(200);
    });
});

describe('delete /cart', () => {
    test('returns 200 with valid product and token', async () => {
        const { token } = await validSessionFactory();
        const validProduct = await validProductFactory();

        await supertest(app).post('/cart')
            .send({ code: validProduct.code })
            .set('Authorization', `Bearer ${token}`);

        const result = await supertest(app).delete(`/cart/${validProduct.code}`)
            .set('Authorization', `Bearer ${token}`);
        expect(result.status).toEqual(200);
    });
});