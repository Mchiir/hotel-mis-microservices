import mongoose from 'mongoose';

const guestSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    nationality: { type: String, required: true, trim: true },
    idNumber: { type: String, required: true, unique: true, trim: true },
  },
  { timestamps: true },
);

guestSchema.methods.toJSON = function toJSON() {
  return {
    id: this._id.toString(),
    firstName: this.firstName,
    lastName: this.lastName,
    phone: this.phone,
    email: this.email,
    nationality: this.nationality,
    idNumber: this.idNumber,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

export const Guest = mongoose.model('Guest', guestSchema);
