/* eslint-disable no-useless-escape */
import joi from 'joi';

const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const signUpSchema = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  cpf: joi
    .string()
    .min(11)
    .max(14)
    .pattern(/^([-\.\s]?(\d{3})){3}[-\.\s]?(\d{2})$/)
    .required(),
  phone: joi.string().min(14).max(16).required(),
  photo: joi.string().uri().allow(null, ''),
  address: joi.string().required(),
  cep: joi
    .string()
    .max(9)
    .pattern(/^\d{5}-?\d{3}$/)
    .required(),
  complement: joi.string().allow(null, ''),
  state: joi.number().min(1).max(27).required(),
});

export { signInSchema, signUpSchema };
