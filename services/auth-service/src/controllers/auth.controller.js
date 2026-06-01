import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';
import * as authService from '../services/auth.service.js';
import {
  setRefreshCookie,
  clearRefreshCookie,
  getRefreshTokenFromRequest,
} from '../services/token.service.js';

export const register = asyncHandler(async (req, res) => {
  const { user, tokens } = await authService.registerUser(req.body);
  setRefreshCookie(res, tokens.refreshToken);
  sendSuccess(res, {
    statusCode: 201,
    message: 'Registration successful',
    data: { user, accessToken: tokens.accessToken },
  });
});

export const login = asyncHandler(async (req, res) => {
  const { user, tokens } = await authService.loginUser(req.body);
  setRefreshCookie(res, tokens.refreshToken);
  sendSuccess(res, {
    message: 'Login successful',
    data: { user, accessToken: tokens.accessToken },
  });
});

export const refresh = asyncHandler(async (req, res) => {
  const refreshToken = getRefreshTokenFromRequest(req);
  const { user, tokens } = await authService.refreshSession(refreshToken);
  setRefreshCookie(res, tokens.refreshToken);
  sendSuccess(res, {
    message: 'Token refreshed',
    data: { user, accessToken: tokens.accessToken },
  });
});

export const logout = asyncHandler(async (req, res) => {
  const refreshToken = getRefreshTokenFromRequest(req);
  await authService.logoutUser(refreshToken);
  clearRefreshCookie(res);
  sendSuccess(res, { message: 'Logged out successfully' });
});

export const me = asyncHandler(async (req, res) => {
  const user = await authService.getCurrentUser(req.user.id);
  sendSuccess(res, { message: 'Profile retrieved', data: { user } });
});
