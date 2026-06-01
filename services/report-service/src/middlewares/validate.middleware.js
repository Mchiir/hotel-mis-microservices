import { ApiError } from '../utils/ApiError.js';

export const validate = (schema, property = 'query') => (req, res, next) => {
  const { error, value } = schema.validate(req[property], {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errors = error.details.map((d) => d.message);
    return next(new ApiError(400, 'Validation failed', errors));
  }

  req[property] = value;
  next();
};
