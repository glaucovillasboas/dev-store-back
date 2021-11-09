import faker from 'faker';
import bcrypt from 'bcrypt';
import connection from '../database.js';

const validUserFactory = async () => {
  const fakeName = `${faker.name.firstName()} ${faker.name.middleName()} ${faker.name.lastName()}`;
  const fakeEmail = faker.internet.email();
  const fakePassword = faker.internet.password();
  const fakeCpf = `${faker.datatype.number(9)}${(faker.datatype.number(999999999) + 1000000000)}`;
  const fakePhoto = faker.internet.avatar();
  const encryptedPassword = bcrypt.hashSync(fakePassword, 10);

  await connection.query(`
            INSERT INTO users (name, email, password, cpf, photo) VALUES ($1, $2, $3, $4, $5);
        `, [fakeName, fakeEmail, encryptedPassword, fakeCpf, fakePhoto]);

  return {
    email: fakeEmail,
    password: fakePassword,
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
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export {
  validUserFactory,
  invalidUserFactory,
  nonExistentUserFactory,
  wrongPasswordUserFactory,
};
