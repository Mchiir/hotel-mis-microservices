import Joi from 'joi';
import { ROLE_LIST } from '../constants/roles.js';

export const updateUserSchema = Joi.object({
  firstName: Joi.string().trim().min(2).max(50),
  lastName: Joi.string().trim().min(2).max(50),
  phone: Joi.string().trim().min(8).max(20),
  email: Joi.string().email().lowercase(),
  password: Joi.string().min(6).max(128),
  role: Joi.string().valid(...ROLE_LIST),
})
  .min(1)
  .messages({ 'object.min': 'At least one field is required to update' });

export const listUsersQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
  role: Joi.string().valid(...ROLE_LIST),
  search: Joi.string().trim().max(100).allow(''),
});

export const userIdParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    'string.hex': 'Invalid user id',
    'string.length': 'Invalid user id',
  }),
});
