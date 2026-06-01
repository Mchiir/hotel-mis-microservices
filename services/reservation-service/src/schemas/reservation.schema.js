import Joi from 'joi';
import { RESERVATION_STATUS_LIST } from '../constants/reservationStatus.js';

export const createReservationSchema = Joi.object({
  guestId: Joi.string().hex().length(24).required(),
  roomId: Joi.string().hex().length(24).required(),
  checkInDate: Joi.date().iso().required(),
  checkOutDate: Joi.date().iso().greater(Joi.ref('checkInDate')).required(),
  numberOfGuests: Joi.number().integer().min(1).required(),
  status: Joi.string().valid(...RESERVATION_STATUS_LIST).default('CONFIRMED'),
});

export const updateReservationSchema = Joi.object({
  guestId: Joi.string().hex().length(24),
  roomId: Joi.string().hex().length(24),
  checkInDate: Joi.date().iso(),
  checkOutDate: Joi.date().iso(),
  numberOfGuests: Joi.number().integer().min(1),
  status: Joi.string().valid(...RESERVATION_STATUS_LIST),
})
  .min(1)
  .messages({ 'object.min': 'At least one field is required to update' });

export const listReservationsQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
  status: Joi.string().valid(...RESERVATION_STATUS_LIST),
  guestId: Joi.string().hex().length(24),
  roomId: Joi.string().hex().length(24),
  checkInFrom: Joi.date().iso(),
  checkInTo: Joi.date().iso(),
});

export const reservationIdParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    'string.hex': 'Invalid reservation id',
    'string.length': 'Invalid reservation id',
  }),
});
