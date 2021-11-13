import '../src/setup.js';
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database.js';
import {
    validSessionFactory,
} from '../src/factories/session.factory.js';

afterAll(async () => {
    connection.end();
});

describe('GET /user', () => {
    beforeAll(async () => {
        await connection.query('DELETE FROM sessions;');
        await connection.query('DELETE FROM addresses;');
        await connection.query('DELETE FROM phones;');
        await connection.query('DELETE FROM users;');
    });

    test('returns 200 with valid session', async () => {
        const validSession = await validSessionFactory();
        const result = await supertest(app).get('/user').set('Authorization', `Bearer ${validSession.token}`);
        expect(result.status).toEqual(200);
        expect(result.body).toHaveProperty('name');
        expect(result.body).toHaveProperty('phone');
        expect(result.body).toHaveProperty('photo');
        expect(result.body).toHaveProperty('address');
    });

    afterAll(async () => {
        await connection.query('DELETE FROM sessions;');
        await connection.query('DELETE FROM addresses;');
        await connection.query('DELETE FROM phones;');
        await connection.query('DELETE FROM users;');
    });
});
