import faker from 'faker';
import { existingUserFactory } from './registration.factory.js';
import connection from '../database.js';

const validUserFactory = async () => {
  const user = await existingUserFactory();

  await connection.query(
    'SELECT * FROM users WHERE email = $1;',
    [user.email],
  );

  return {
    email: user.email,
    password: user.password,
  };
};

const wrongPasswordUserFactory = async () => {
  const validUser = await validUserFactory();

  return {
    email: validUser.email,
    password: 'wrongpassword',
  };
};

const invalidUserFactory = () => ({
  email: faker.internet.email(),
});

const nonExistentUserFactory = () => ({
  email: 'nonexistentemail@nonexistent.com',
  password: faker.internet.password(),
});

export {
  validUserFactory,
  invalidUserFactory,
  nonExistentUserFactory,
  wrongPasswordUserFactory,
};
