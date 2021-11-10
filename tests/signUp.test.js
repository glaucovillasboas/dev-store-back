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
