import joi from 'joi';

const productSchema = joi.object({
  code: joi.string().min(10).max(10).required(),
});

export default productSchema;
