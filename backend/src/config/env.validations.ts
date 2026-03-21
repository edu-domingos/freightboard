import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_AUTOLOAD_ENTITIES: Joi.boolean().truthy('true').falsy('false').required(),
  DB_SYNCRONIZE: Joi.boolean().truthy('true').falsy('false').required(),

  PEPPER: Joi.string().required(),

  JWT_SECRET: Joi.string().required(),
  JWT_ALGORITHM: Joi.string().required(),
  JWT_AUDIENCE: Joi.string().required(),
  JWT_ISSUER: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),
  JWT_REFRESH_EXPIRES_IN: Joi.string().required(),

  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
});
