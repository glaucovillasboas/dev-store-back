import '../src/setup.js';
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database.js';
import {
  validUserFactory,
  invalidUserFactory,
  wrongPasswordUserFactory,
  nonExistentUserFactory,
} from '../src/factories/user.factory.js';

afterAll(async () => {
  connection.end();
});

describe('POST /sign-in', () => {
  test('returns 200 with valid user and password', async () => {
    const validUser = await validUserFactory();
    const result = await supertest(app).post('/sign-in').send(validUser);
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
    const wrongPasswordUser = await wrongPasswordUserFactory();
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

  afterAll(async () => {
    await connection.query('DELETE FROM sessions;');
    await connection.query('DELETE FROM addresses;');
    await connection.query('DELETE FROM phones;');
    await connection.query('DELETE FROM users;');
  });
});
