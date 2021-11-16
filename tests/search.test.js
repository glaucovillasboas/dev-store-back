import '../src/setup.js';
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database.js';
import {
  validNewSearch,
  invalidNewSearch,
} from '../src/factories/search.factory';

afterAll(async () => {
  connection.end();
});

describe('POST /search', () => {
  test('returns 200 with valid search string', async () => {
    const body = {
      name: validNewSearch(),
    };
    const result = await supertest(app).post('/search').send(body);
    expect(result.status).toEqual(200);
  });

  test('returns 400 with invalid search', async () => {
    const body = {
      name: invalidNewSearch(),
    };
    const result = await supertest(app).post('/search').send(body);
    expect(result.status).toEqual(400);
  });
});
