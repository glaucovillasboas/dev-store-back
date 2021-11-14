import '../src/setup.js';
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database.js';

afterAll(async () => {
  connection.end();
});

describe('GET /highlights', () => {
  test('returns 200 with a list of products', async () => {
    const result = await supertest(app).get(`/highlights`);
    expect(result.status).toEqual(200);
  });
});

describe('GET /on-sale', () => {
  test('returns 200 with a list of products', async () => {
    const result = await supertest(app).get(`/highlights`);
    expect(result.status).toEqual(200);
  });
});

describe('GET /categories', () => {
  test('returns 200 with a list of categories', async () => {
    const result = await supertest(app).get(`/highlights`);
    expect(result.status).toEqual(200);
  });
});
