import '../src/setup.js';
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database.js';
import {
  validCategorieId,
  invalidCategorieId,
} from '../src/factories/categorie.factory';

let createdCategoryId = 0;

afterAll(async () => {
  await connection.query('DELETE FROM categories WHERE id = $1;', [createdCategoryId]);
  connection.end();
});


describe('GET /categorie/:id', () => {
  test('returns 200 with valid category id', async () => {
    const validId = await validCategorieId();
    createdCategoryId = validId;
    const result = await supertest(app).get(`/categorie/${validId}`);
    expect(result.status).toEqual(200);
  });

  test('returns 404 with invalid category id', async () => {
    const invalidId = invalidCategorieId();
    const result = await supertest(app).get(`/categorie/${invalidId}`);
    expect(result.status).toEqual(404);
  });
});
