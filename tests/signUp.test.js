import '../src/setup.js';
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database.js';
import {
  validNewUserFactory,
  invalidNewUserFactory,
} from '../src/factories/registration.factory';

const createdUsers = [];

afterAll(async () => {
  const userQuery = await connection.query(
    'SELECT * FROM users WHERE users.email = $1;', [createdUsers[0].email]
  );

  const user = userQuery.rows[0];
  await connection.query(`DELETE FROM sessions WHERE user_id = $1;`, [user.id]);
  await connection.query(`DELETE FROM addresses WHERE user_id = $1;`, [user.id]);
  await connection.query(`DELETE FROM phones WHERE user_id = $1;`, [user.id]);
  await connection.query(`DELETE FROM users WHERE id = $1;`, [user.id]);
  connection.end();
});

describe('POST /sign-up', () => {
  test('returns 201 with valid new user data', async () => {
    const validNewUser = validNewUserFactory();
    createdUsers.push(validNewUser);
    const result = await supertest(app).post('/sign-up').send(validNewUser);
    expect(result.status).toEqual(201);
  });

  test('returns 400 with invalid new user data', async () => {
    const invalidNewUser = invalidNewUserFactory();
    const result = await supertest(app).post('/sign-up').send(invalidNewUser);
    expect(result.status).toEqual(400);
  });

  test('returns 409 when the user already exists', async () => {
    const existingUser = createdUsers[0];
    const result = await supertest(app).post('/sign-up').send(existingUser);
    expect(result.status).toEqual(409);
  });
});
