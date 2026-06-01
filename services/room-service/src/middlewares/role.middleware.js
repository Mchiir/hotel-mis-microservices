import { ApiError } from '../utils/ApiError.js';
import { ROLES } from '../constants/roles.js';

export const authorize = (...roles) => (req, res, next) => {
  if (!req.user) {
    return next(new ApiError(401, 'Authentication required'));
  }
  if (!roles.includes(req.user.role)) {
    return next(new ApiError(403, 'Insufficient permissions'));
  }
  next();
};

export const adminOnly = authorize(ROLES.ADMIN);

export const staffRead = authorize(ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.ACCOUNTANT);

export const staffWrite = authorize(ROLES.ADMIN, ROLES.RECEPTIONIST);
