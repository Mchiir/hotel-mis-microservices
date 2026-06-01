import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

const REFRESH_COOKIE = 'refreshToken';

export const signAccessToken = (user) =>
  jwt.sign(
    { sub: user._id.toString(), email: user.email, role: user.role },
    env.jwtAccessSecret,
    { expiresIn: env.jwtAccessExpiresIn },
  );

export const signRefreshToken = (user) =>
  jwt.sign(
    {
      sub: user._id.toString(),
      tokenVersion: user.tokenVersion,
    },
    env.jwtRefreshSecret,
    { expiresIn: env.jwtRefreshExpiresIn },
  );

export const verifyAccessToken = (token) => jwt.verify(token, env.jwtAccessSecret);

export const verifyRefreshToken = (token) => jwt.verify(token, env.jwtRefreshSecret);

export const setRefreshCookie = (res, token) => {
  res.cookie(REFRESH_COOKIE, token, {
    httpOnly: true,
    secure: env.cookieSecure,
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const clearRefreshCookie = (res) => {
  res.clearCookie(REFRESH_COOKIE, {
    httpOnly: true,
    secure: env.cookieSecure,
    sameSite: 'lax',
    path: '/',
  });
};

export const getRefreshTokenFromRequest = (req) => req.cookies?.[REFRESH_COOKIE];
