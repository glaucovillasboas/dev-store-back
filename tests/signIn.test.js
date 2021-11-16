import '../src/setup.js';
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database.js';
import jwt from 'jsonwebtoken';
import {
  validUserFactory,
  invalidUserFactory,
  nonExistentUserFactory,
} from '../src/factories/user.factory.js';

let userToken = '';
const createdUsers = [];

afterAll(async () => {
  const jwtSecret = process.env.JWT_SECRET;
  const userId = jwt.verify(userToken, jwtSecret).id;

  await connection.query(`DELETE FROM sessions WHERE user_id = $1;`, [userId]);
  await connection.query(`DELETE FROM addresses WHERE user_id = $1;`, [userId]);
  await connection.query(`DELETE FROM phones WHERE user_id = $1;`, [userId]);
  await connection.query(`DELETE FROM users WHERE id = $1;`, [userId]);
  connection.end();
});

describe('POST /sign-in', () => {
  test('returns 200 with valid user and password', async () => {
    const validUser = await validUserFactory();
    createdUsers.push(validUser);
    const result = await supertest(app).post('/sign-in').send(validUser);
    userToken = result.body.token;
    expect(result.status).toEqual(200);
    expect(result.body).toHaveProperty('token');
    expect(result.body).toHaveProperty('name');
    expect(result.body).toHaveProperty('photo');
    expect(result.body).toHaveProperty('phone');
    expect(result.body).toHaveProperty('address');
  });

  test('returns 400 with invalid user', async () => {
    const invalidUser = invalidUserFactory();
    const result = await supertest(app).post('/sign-in').send(invalidUser);
    expect(result.status).toEqual(400);
  });

  test('returns 401 with existent user with wrong password', async () => {
    const wrongPasswordUser = createdUsers[0];
    wrongPasswordUser.password = 'wrongpassword';
    const result = await supertest(app)
      .post('/sign-in')
      .send(wrongPasswordUser);
    expect(result.status).toEqual(401);
  });

  test('returns 404 with non-existent user', async () => {
    const nonExistentUser = nonExistentUserFactory();
    const result = await supertest(app).post('/sign-in').send(nonExistentUser);
    expect(result.status).toEqual(404);
  });
});
