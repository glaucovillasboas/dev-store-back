import { validSessionFactory } from './session.factory.js';
import { validProductFactory } from './product.factory.js';

const validCartFactory = async () => {
  const { token } = await validSessionFactory();
  const product = await validProductFactory();

  return {
    user: {
      token,
    },
    product: {
      id: product.id,
    },
  };
};

const invalidSessionFactory = () => ({
  token: 'a',
});

export {
  validCartFactory,
  invalidSessionFactory,
};
