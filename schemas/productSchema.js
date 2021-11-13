import joi from 'joi';

const productSchema = joi.object({
  id: joi.number().required(),
});

export default productSchema;
