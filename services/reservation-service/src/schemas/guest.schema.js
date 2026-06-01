import Joi from 'joi';

export const createGuestSchema = Joi.object({
  firstName: Joi.string().trim().min(2).max(50).required(),
  lastName: Joi.string().trim().min(2).max(50).required(),
  phone: Joi.string().trim().min(8).max(20).required(),
  email: Joi.string().email().lowercase().required(),
  nationality: Joi.string().trim().min(2).max(50).required(),
  idNumber: Joi.string().trim().min(3).max(30).required(),
});

export const updateGuestSchema = Joi.object({
  firstName: Joi.string().trim().min(2).max(50),
  lastName: Joi.string().trim().min(2).max(50),
  phone: Joi.string().trim().min(8).max(20),
  email: Joi.string().email().lowercase(),
  nationality: Joi.string().trim().min(2).max(50),
  idNumber: Joi.string().trim().min(3).max(30),
})
  .min(1)
  .messages({ 'object.min': 'At least one field is required to update' });

export const listGuestsQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
  search: Joi.string().trim().max(100).allow(''),
});

export const idParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    'string.hex': 'Invalid id',
    'string.length': 'Invalid id',
  }),
});
