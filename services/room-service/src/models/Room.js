import mongoose from 'mongoose';
import { ROOM_STATUS, ROOM_STATUS_LIST } from '../constants/roomStatus.js';

const roomSchema = new mongoose.Schema(
  {
    roomNumber: { type: String, required: true, unique: true, trim: true },
    roomType: { type: String, required: true, trim: true },
    floor: { type: Number, required: true, min: 0 },
    capacity: { type: Number, required: true, min: 1 },
    pricePerNight: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ROOM_STATUS_LIST, default: ROOM_STATUS.AVAILABLE },
  },
  { timestamps: true },
);

roomSchema.methods.toJSON = function toJSON() {
  return {
    id: this._id.toString(),
    roomNumber: this.roomNumber,
    roomType: this.roomType,
    floor: this.floor,
    capacity: this.capacity,
    pricePerNight: this.pricePerNight,
    status: this.status,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

export const Room = mongoose.model('Room', roomSchema);
