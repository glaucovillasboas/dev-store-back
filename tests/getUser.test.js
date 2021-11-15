import '../src/setup.js';
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database.js';
import {
    validSessionFactory,
    invalidSessionFactory
} from '../src/factories/session.factory.js';

afterAll(async () => {
    connection.end();
});

describe('GET /user', () => {
    test('returns 200 with valid user token', async () => {
        const validSession = await validSessionFactory();
        const result = await supertest(app).get('/user').set('Authorization', `Bearer ${validSession.token}`);
        expect(result.status).toEqual(200);
        expect(result.body).toHaveProperty('name');
        expect(result.body).toHaveProperty('phone');
        expect(result.body).toHaveProperty('photo');
        expect(result.body).toHaveProperty('address');
    });

    test('returns 401 with invalid user token', async () => {
        const invalidSession = invalidSessionFactory();
        const result = await supertest(app).get('/user').set('Authorization', `Bearer ${invalidSession.token}`);
        expect(result.status).toEqual(401);
    });

    afterAll(async () => {
        await connection.query('DELETE FROM sessions;');
        await connection.query('DELETE FROM addresses;');
        await connection.query('DELETE FROM phones;');
        await connection.query('DELETE FROM users;');
    });
});
