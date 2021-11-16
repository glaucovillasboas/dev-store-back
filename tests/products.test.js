import '../src/setup.js';
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database.js';
import {
    validProductFactory,
    invalidProductFactory,
} from '../src/factories/product.factory.js';


afterAll(async () => {
    connection.end();
});

describe('get /products/:code', () => {

    test('returns 200 with valid product', async () => {
        const validProduct = await validProductFactory();
        const result = await supertest(app).get(`/products/${validProduct.code}`);
        expect(result.status).toEqual(200);
        expect(result.body).toHaveProperty('name');
        expect(result.body).toHaveProperty('price');
        expect(result.body).toHaveProperty('description');
        expect(result.body).toHaveProperty('code');
        expect(result.body).toHaveProperty('photo');
        expect(result.body).toHaveProperty('quantity');
        expect(result.body).toHaveProperty('category_name');
        expect(result.body).toHaveProperty('aspects');
    });

    test('returns 404 with invalid product', async () => {
        const invalidProduct = invalidProductFactory();
        const result = await supertest(app).get(`/products/${invalidProduct.code}`);
        expect(result.status).toEqual(404);
    });
});
