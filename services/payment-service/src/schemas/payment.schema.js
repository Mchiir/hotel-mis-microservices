import Joi from 'joi';
import { PAYMENT_METHOD_LIST } from '../constants/paymentMethods.js';

export const createPaymentSchema = Joi.object({
  reservationId: Joi.string().hex().length(24).required(),
  amount: Joi.number().min(0.01).required(),
  paymentMethod: Joi.string()
    .valid(...PAYMENT_METHOD_LIST)
    .required(),
  paidAt: Joi.date().iso(),
});

export const listPaymentsQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
  reservationId: Joi.string().hex().length(24),
  paymentMethod: Joi.string().valid(...PAYMENT_METHOD_LIST),
  paidFrom: Joi.date().iso(),
  paidTo: Joi.date().iso(),
});

export const paymentIdParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    'string.hex': 'Invalid payment id',
    'string.length': 'Invalid payment id',
  }),
});
