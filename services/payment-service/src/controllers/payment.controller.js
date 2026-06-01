import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';
import * as paymentService from '../services/payment.service.js';

export const createPayment = asyncHandler(async (req, res) => {
  const payment = await paymentService.createPayment(req.body, req.headers.authorization);
  sendSuccess(res, {
    statusCode: 201,
    message: 'Payment recorded',
    data: { payment },
  });
});

export const listPayments = asyncHandler(async (req, res) => {
  const result = await paymentService.listPayments(req.query);
  sendSuccess(res, {
    message: 'Payments retrieved',
    data: result,
  });
});

export const getPayment = asyncHandler(async (req, res) => {
  const payment = await paymentService.getPaymentById(req.params.id);
  sendSuccess(res, {
    message: 'Payment retrieved',
    data: { payment },
  });
});
