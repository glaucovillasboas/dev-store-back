import '../src/setup.js';
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database.js';
import jwt from 'jsonwebtoken';
import {
    validSessionFactory,
    invalidSessionFactory
} from '../src/factories/session.factory.js';

const createdUsers = [];

afterAll(async () => {
    const jwtSecret = process.env.JWT_SECRET;
    const userId = jwt.verify(createdUsers[0].token, jwtSecret).id;
    await connection.query(`DELETE FROM sessions WHERE user_id = $1;`, [userId]);
    await connection.query(`DELETE FROM addresses WHERE user_id = $1;`, [userId]);
    await connection.query(`DELETE FROM phones WHERE user_id = $1;`, [userId]);
    await connection.query(`DELETE FROM users WHERE id = $1;`, [userId]);
    connection.end();
});

describe('GET /user', () => {
    test('returns 200 with valid user token', async () => {
        const validSession = await validSessionFactory();
        createdUsers.push(validSession);
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
});
