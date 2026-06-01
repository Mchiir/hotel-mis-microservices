import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/User.js';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from './token.service.js';

const issueTokens = (user) => ({
  accessToken: signAccessToken(user),
  refreshToken: signRefreshToken(user),
});

export const registerUser = async (payload) => {
  const existing = await User.findOne({ email: payload.email });
  if (existing) {
    throw new ApiError(409, 'Email already registered');
  }

  const user = await User.create(payload);
  const tokens = issueTokens(user);
  return { user: user.toSafeJSON(), tokens };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const tokens = issueTokens(user);
  return { user: user.toSafeJSON(), tokens };
};

export const refreshSession = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError(401, 'Refresh token required');
  }

  let payload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    throw new ApiError(401, 'Invalid or expired refresh token');
  }

  const user = await User.findById(payload.sub);
  if (!user || user.tokenVersion !== payload.tokenVersion) {
    throw new ApiError(401, 'Session revoked');
  }

  user.tokenVersion += 1;
  await user.save();

  const tokens = issueTokens(user);
  return { user: user.toSafeJSON(), tokens };
};

export const logoutUser = async (refreshToken) => {
  if (!refreshToken) return;

  try {
    const payload = verifyRefreshToken(refreshToken);
    await User.findByIdAndUpdate(payload.sub, { $inc: { tokenVersion: 1 } });
  } catch {
    // ignore invalid token on logout
  }
};

export const getCurrentUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return user.toSafeJSON();
};
