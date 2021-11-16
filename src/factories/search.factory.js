import faker from 'faker';

const validNewSearch = () => {
  const validName = faker.commerce.productName();
  return validName;
};

const invalidNewSearch = () => {
  const invalidName = 10852.25;
  return invalidName;
};
export { validNewSearch, invalidNewSearch };
