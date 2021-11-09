/* eslint import/prefer-default-export: "off" */
import joi from 'joi';

const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

export {
  signInSchema,
};
