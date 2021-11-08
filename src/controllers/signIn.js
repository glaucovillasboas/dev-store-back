/* eslint import/prefer-default-export: "off" */
import { signInSchema } from '../../schemas/userSchema.js';
import { selectFactory } from '../factories/select.factory.js';

async function signIn(req, res) {
  const validation = signInSchema.validate(req.body);
  if (validation.error) {
    return res.sendStatus(400);
  }

  const query = await selectFactory('users');

  return res.send(query.rows[0]);
}

export {
  signIn,
};
