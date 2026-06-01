import Joi from 'joi';
import { ROLE_LIST } from '../constants/roles.js';

export const registerSchema = Joi.object({
  firstName: Joi.string().trim().min(2).max(50).required(),
  lastName: Joi.string().trim().min(2).max(50).required(),
  phone: Joi.string().trim().min(8).max(20).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).max(128).required(),
  role: Joi.string()
    .valid(...ROLE_LIST)
    .default('RECEPTIONIST'),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().required(),
});
