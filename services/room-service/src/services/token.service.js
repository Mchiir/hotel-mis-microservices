import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const verifyAccessToken = (token) => jwt.verify(token, env.jwtAccessSecret);
