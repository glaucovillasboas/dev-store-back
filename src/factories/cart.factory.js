import { validSessionFactory } from './session.factory.js';

const validCartFactory = async () => {
  const { token } = await validSessionFactory();

  return {
    token,
  };
};

const invalidSessionFactory = () => ({
  token: 'a',
});

export {
  validCartFactory,
  invalidSessionFactory,
};
