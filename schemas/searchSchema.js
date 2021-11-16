import joi from 'joi';

const searchSchema = joi.object({
  name: joi.string().required(),
});

export default searchSchema;
