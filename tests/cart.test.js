import '../src/setup.js';
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database.js';
import { validSessionFactory } from '../src/factories/session.factory.js';
import { validProductFactory } from '../src/factories/product.factory.js';

afterAll(async () => {
    connection.end();
});


describe('post /cart', () => {

    test('returns 200 with valid product and token', async () => {
        const { token } = await validSessionFactory();
        const validProduct = await validProductFactory();

        const sessionQuery = await connection.query(
            'SELECT * FROM sessions WHERE token = $1;',
            [token],
        );

        session = sessionQuery.rows[0];

        const result = await supertest(app).post('/cart')
            .send({ id: validProduct.code })
            .set('Authorization', `Bearer ${token}`);
        expect(result.status).toEqual(200);
    });

    afterAll(async () => {
        await connection.query('DELETE FROM carts_products;');
        await connection.query('DELETE FROM carts;');
        await connection.query('DELETE FROM categories;');
        await connection.query('DELETE FROM products;');
        await connection.query('DELETE FROM sessions;');
        await connection.query('DELETE FROM addresses;');
        await connection.query('DELETE FROM phones;');
        await connection.query('DELETE FROM users;');
    });
});