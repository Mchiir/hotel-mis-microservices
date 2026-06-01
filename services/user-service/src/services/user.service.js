import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/User.js';

export const listUsers = async ({ page, limit, role, search }) => {
  const filter = {};

  if (role) filter.role = role;

  if (search) {
    const term = search.trim();
    filter.$or = [
      { firstName: { $regex: term, $options: 'i' } },
      { lastName: { $regex: term, $options: 'i' } },
      { email: { $regex: term, $options: 'i' } },
      { phone: { $regex: term, $options: 'i' } },
    ];
  }

  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    User.countDocuments(filter),
  ]);

  return {
    users: users.map((u) => u.toSafeJSON()),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    },
  };
};

export const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return user.toSafeJSON();
};

export const updateUser = async (id, payload, requesterId) => {
  const user = await User.findById(id).select('+password');
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (payload.email && payload.email !== user.email) {
    const taken = await User.findOne({ email: payload.email, _id: { $ne: id } });
    if (taken) {
      throw new ApiError(409, 'Email already in use');
    }
  }

  const roleChanged = payload.role && payload.role !== user.role;
  const passwordChanged = Boolean(payload.password);

  Object.assign(user, payload);
  if (roleChanged || passwordChanged) {
    user.tokenVersion += 1;
  }

  await user.save();
  return user.toSafeJSON();
};

export const deleteUser = async (id, requesterId) => {
  if (id === requesterId) {
    throw new ApiError(400, 'You cannot delete your own account');
  }

  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return user.toSafeJSON();
};
