import mongoose from 'mongoose';
import { RESERVATION_STATUS, RESERVATION_STATUS_LIST } from '../constants/reservationStatus.js';

const reservationSchema = new mongoose.Schema(
  {
    guestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Guest', required: true },
    roomId: { type: String, required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    numberOfGuests: { type: Number, required: true, min: 1 },
    status: {
      type: String,
      enum: RESERVATION_STATUS_LIST,
      default: RESERVATION_STATUS.PENDING,
    },
  },
  { timestamps: true },
);

reservationSchema.methods.toJSON = function toJSON() {
  return {
    id: this._id.toString(),
    guestId: this.guestId.toString(),
    roomId: this.roomId,
    checkInDate: this.checkInDate,
    checkOutDate: this.checkOutDate,
    numberOfGuests: this.numberOfGuests,
    status: this.status,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

export const Reservation = mongoose.model('Reservation', reservationSchema);
