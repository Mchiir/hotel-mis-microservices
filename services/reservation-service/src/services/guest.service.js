import { ApiError } from '../utils/ApiError.js';
import { Guest } from '../models/Guest.js';

const format = (guest) => guest.toJSON();

export const createGuest = async (payload) => {
  const existing = await Guest.findOne({
    $or: [{ idNumber: payload.idNumber }, { email: payload.email }],
  });
  if (existing) {
    throw new ApiError(409, 'Guest with this id number or email already exists');
  }

  const guest = await Guest.create(payload);
  return format(guest);
};

export const listGuests = async ({ page, limit, search }) => {
  const filter = {};

  if (search) {
    const term = search.trim();
    filter.$or = [
      { firstName: { $regex: term, $options: 'i' } },
      { lastName: { $regex: term, $options: 'i' } },
      { email: { $regex: term, $options: 'i' } },
      { phone: { $regex: term, $options: 'i' } },
      { idNumber: { $regex: term, $options: 'i' } },
    ];
  }

  const skip = (page - 1) * limit;
  const [guests, total] = await Promise.all([
    Guest.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Guest.countDocuments(filter),
  ]);

  return {
    guests: guests.map(format),
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) || 1 },
  };
};

export const getGuestById = async (id) => {
  const guest = await Guest.findById(id);
  if (!guest) {
    throw new ApiError(404, 'Guest not found');
  }
  return format(guest);
};

export const updateGuest = async (id, payload) => {
  const guest = await Guest.findById(id);
  if (!guest) {
    throw new ApiError(404, 'Guest not found');
  }

  if (payload.idNumber || payload.email) {
    const conflict = await Guest.findOne({
      _id: { $ne: id },
      $or: [
        ...(payload.idNumber ? [{ idNumber: payload.idNumber }] : []),
        ...(payload.email ? [{ email: payload.email }] : []),
      ],
    });
    if (conflict) {
      throw new ApiError(409, 'Guest with this id number or email already exists');
    }
  }

  Object.assign(guest, payload);
  await guest.save();
  return format(guest);
};
