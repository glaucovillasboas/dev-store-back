import faker from 'faker';
import bcrypt from 'bcrypt';

const validNewUserFactory = () => {
  const fakeName = `${faker.name.firstName()} ${faker.name.middleName()} ${faker.name.lastName()}`;
  const fakeEmail = faker.internet.email();
  const fakePassword = faker.internet.password();
  const fakeCpf = `${faker.datatype.number(9)}${
    faker.datatype.number(999999999) + 1000000000
  }`;
  const fakePhoto = faker.internet.avatar();
  const fakePhone = faker.phoneNumber();
  const encryptedPassword = bcrypt.hashSync(fakePassword, 10);

  return {
    name: fakeName,
    email: fakeEmail,
    password: fakePassword,
    cpf: fakeCpf,
    photo: fakePhoto,
    // eslint-disable-next-line no-dupe-keys
    password: encryptedPassword,
    phone: fakePhone,
    cep: '12345-678',
  };
};

const invalidNewUserFactory = () => {};

// eslint-disable-next-line import/prefer-default-export
export { validNewUserFactory };
