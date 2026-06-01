import { ApiError } from '../utils/ApiError.js';
import { Payment } from '../models/Payment.js';
import { PAYABLE_RESERVATION_STATUSES } from '../constants/reservationStatus.js';
import * as reservationClient from '../utils/reservationClient.js';

const format = (payment) => payment.toJSON();

export const createPayment = async (payload, authorization) => {
  const reservation = await reservationClient.getReservation(payload.reservationId, authorization);

  if (!PAYABLE_RESERVATION_STATUSES.includes(reservation.status)) {
    throw new ApiError(
      400,
      `Payment not allowed for reservation with status ${reservation.status}`,
    );
  }

  const payment = await Payment.create({
    reservationId: payload.reservationId,
    amount: payload.amount,
    paymentMethod: payload.paymentMethod,
    paidAt: payload.paidAt ?? new Date(),
  });

  return format(payment);
};

export const listPayments = async ({ page, limit, reservationId, paymentMethod, paidFrom, paidTo }) => {
  const filter = {};

  if (reservationId) filter.reservationId = reservationId;
  if (paymentMethod) filter.paymentMethod = paymentMethod;

  if (paidFrom || paidTo) {
    filter.paidAt = {};
    if (paidFrom) filter.paidAt.$gte = new Date(paidFrom);
    if (paidTo) filter.paidAt.$lte = new Date(paidTo);
  }

  const skip = (page - 1) * limit;

  const [payments, total] = await Promise.all([
    Payment.find(filter).sort({ paidAt: -1 }).skip(skip).limit(limit),
    Payment.countDocuments(filter),
  ]);

  return {
    payments: payments.map(format),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    },
  };
};

export const getPaymentById = async (id) => {
  const payment = await Payment.findById(id);
  if (!payment) {
    throw new ApiError(404, 'Payment not found');
  }
  return format(payment);
};

export const getPaymentsByReservation = async (reservationId) => {
  const payments = await Payment.find({ reservationId }).sort({ paidAt: -1 });
  return payments.map(format);
};

export const getTotalPaidForReservation = async (reservationId) => {
  const result = await Payment.aggregate([
    { $match: { reservationId } },
    { $group: { _id: null, total: { $sum: '$amount' } } },
  ]);
  return result[0]?.total ?? 0;
};
