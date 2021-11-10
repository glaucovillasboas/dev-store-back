import '../src/setup.js';
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database.js';
import {
  validNewUserFactory,
  invalidNewUserFactory,
  existingUserFactory,
} from '../src/factories/registration.factory';

afterAll(async () => {
  connection.end();
});

describe('POST /sign-up', () => {
  test('returns 201 with valid new user data', async () => {
    const validNewUser = await validNewUserFactory();
    const result = await supertest(app).post('/sign-up').send(validNewUser);
    expect(result.status).toEqual(201);
  });

  test('returns 400 with invalid new user data', async () => {
    const invalidNewUser = await invalidNewUserFactory();
    const result = await supertest(app).post('/sign-up').send(invalidNewUser);
    expect(result.status).toEqual(400);
  });

  test('returns 409 when the user already exists', async () => {
    const existingUser = await existingUserFactory();
    const result = await supertest(app).post('/sign-up').send(existingUser);
    expect(result.status).toEqual(409);
  });

  afterAll(async () => {
    await connection.query('DELETE FROM addresses;');
    await connection.query('DELETE FROM phones;');
    await connection.query('DELETE FROM users;');
  });
});
