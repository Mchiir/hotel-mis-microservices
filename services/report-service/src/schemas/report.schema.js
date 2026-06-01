import Joi from 'joi';

export const dateRangeQuerySchema = Joi.object({
  from: Joi.date().iso(),
  to: Joi.date().iso(),
});

export const checkInReportQuerySchema = Joi.object({
   date: Joi.date().iso().default(Date.now),
});
