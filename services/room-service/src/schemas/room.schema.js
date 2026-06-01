import Joi from 'joi';
import { ROOM_STATUS_LIST } from '../constants/roomStatus.js';

export const createRoomSchema = Joi.object({
  roomNumber: Joi.string().trim().min(1).max(20).required(),
  roomType: Joi.string().trim().min(2).max(50).required(),
  floor: Joi.number().integer().min(0).required(),
  capacity: Joi.number().integer().min(1).required(),
  pricePerNight: Joi.number().min(0).required(),
  status: Joi.string()
    .valid(...ROOM_STATUS_LIST)
    .default('AVAILABLE'),
});

export const updateRoomSchema = Joi.object({
  roomNumber: Joi.string().trim().min(1).max(20),
  roomType: Joi.string().trim().min(2).max(50),
  floor: Joi.number().integer().min(0),
  capacity: Joi.number().integer().min(1),
  pricePerNight: Joi.number().min(0),
  status: Joi.string().valid(...ROOM_STATUS_LIST),
})
  .min(1)
  .messages({ 'object.min': 'At least one field is required to update' });

export const updateStatusSchema = Joi.object({
  status: Joi.string()
    .valid(...ROOM_STATUS_LIST)
    .required(),
});

export const listRoomsQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
  status: Joi.string().valid(...ROOM_STATUS_LIST),
  roomType: Joi.string().trim().max(50),
  floor: Joi.number().integer().min(0),
  search: Joi.string().trim().max(100).allow(''),
});

export const roomIdParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    'string.hex': 'Invalid room id',
    'string.length': 'Invalid room id',
  }),
});
