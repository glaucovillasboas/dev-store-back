/* eslint-disable comma-dangle */
import faker from 'faker';
import bcrypt from 'bcrypt';
import connection from '../database.js';

const validNewUserFactory = () => {
  const fakeName = `${faker.name.firstName()} ${faker.name.middleName()} ${faker.name.lastName()}`;
  const fakeEmail = 'teste@gmail.com';
  const fakePassword = faker.internet.password();
  const fakeCpf = `${faker.datatype.number(9)}${faker.datatype.number(999999999) + 1000000000}`;
  const fakePhoto = faker.internet.avatar();
  const fakePhone = '(11) 00000-0000';
  const fakeAddress = 'rua';

  return {
    name: fakeName,
    email: fakeEmail,
    password: fakePassword,
    cpf: fakeCpf,
    photo: fakePhoto,
    phone: fakePhone,
    address: fakeAddress,
    cep: '12345-678',
    complement: '',
    state: 1,
  };
};

const invalidNewUserFactory = () => {
  const fakeName = `${faker.name.firstName()} ${faker.name.middleName()} ${faker.name.lastName()}`;
  const fakeEmail = faker.internet.email();
  const fakePhoto = faker.internet.avatar();
  const fakeAddress = 'Rua 1';
  const fakePhone = '(11) 00000-0000';

  return {
    name: fakeName,
    email: fakeEmail,
    password: '12345',
    cpf: '111222x3301',
    photo: fakePhoto,
    address: fakeAddress,
    phone: fakePhone,
    cep: '1234678',
    state: 1,
    complement: '',
  };
};

const existingUserFactory = async () => {
  const newUser = validNewUserFactory();
  const encryptedPassword = bcrypt.hashSync(newUser.password, 10);
  await connection.query(
    `
    INSERT INTO users (name, email, password, cpf, photo) VALUES ($1, $2, $3, $4, $5);`,
    [newUser.name, newUser.email, encryptedPassword, newUser.cpf, newUser.photo]
  );

  const createdUser = await connection.query(
    `
    SELECT * FROM users WHERE email = $1;`,
    [newUser.email]
  );

  const userId = createdUser.rows[0].id;

  await connection.query(
    `
    INSERT INTO addresses (user_id, address, cep, complement, state_id) VALUES ($1, $2, $3, $4, $5);`,
    [userId, newUser.address, newUser.cep, newUser.complement, newUser.state]
  );

  await connection.query(
    `
    INSERT INTO phones (user_id, phone) VALUES ($1, $2);
    `,
    [userId, newUser.phone]
  );

  return {
    name: newUser.name,
    email: newUser.email,
    password: newUser.password,
    cpf: newUser.cpf,
    photo: newUser.photo,
    phone: newUser.phone,
    address: newUser.address,
    cep: newUser.cep,
    complement: newUser.complement,
    state: newUser.state,
  };
};

export { validNewUserFactory, invalidNewUserFactory, existingUserFactory };
