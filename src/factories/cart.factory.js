import jwt from 'jsonwebtoken';
import { validSessionFactory } from './session.factory.js';
import connection from '../database.js';

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
  validSessionFactory,
  invalidSessionFactory,
};
