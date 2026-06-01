import { ApiError } from '../utils/ApiError.js';
import { ROLES } from '../constants/roles.js';

export const reportAccess = (req, res, next) => {
  if (!req.user) {
    return next(new ApiError(401, 'Authentication required'));
  }
  if (![ROLES.ADMIN, ROLES.ACCOUNTANT].includes(req.user.role)) {
    return next(new ApiError(403, 'Insufficient permissions'));
  }
  next();
};
