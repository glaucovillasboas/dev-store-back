import '../src/setup.js';
import supertest from 'supertest';
import app from '../src/app.js';

describe('GET /status', () => {
    test('returns 200 if server is working', async () => {
        const result = await supertest(app).get('/statusss')
        expect(result.status).toEqual(200);
    });
});