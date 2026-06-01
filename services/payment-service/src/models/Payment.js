import mongoose from 'mongoose';
import { PAYMENT_METHOD_LIST } from '../constants/paymentMethods.js';

const paymentSchema = new mongoose.Schema(
  {
    reservationId: { type: String, required: true, index: true },
    amount: { type: Number, required: true, min: 0 },
    paymentMethod: { type: String, enum: PAYMENT_METHOD_LIST, required: true },
    paidAt: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true },
);

paymentSchema.methods.toJSON = function toJSON() {
  return {
    id: this._id.toString(),
    reservationId: this.reservationId,
    amount: this.amount,
    paymentMethod: this.paymentMethod,
    paidAt: this.paidAt,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

export const Payment = mongoose.model('Payment', paymentSchema);
