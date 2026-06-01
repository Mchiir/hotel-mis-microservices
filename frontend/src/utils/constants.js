export const ROLES = {
  ADMIN: 'ADMIN',
  RECEPTIONIST: 'RECEPTIONIST',
  ACCOUNTANT: 'ACCOUNTANT',
};

export const ROOM_STATUS = {
  AVAILABLE: 'AVAILABLE',
  RESERVED: 'RESERVED',
  OCCUPIED: 'OCCUPIED',
  MAINTENANCE: 'MAINTENANCE',
};

export const RESERVATION_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CHECKED_IN: 'CHECKED_IN',
  CHECKED_OUT: 'CHECKED_OUT',
  CANCELLED: 'CANCELLED',
};

export const PAYMENT_METHODS = {
  CASH: 'CASH',
  CARD: 'CARD',
  MOMO: 'MOMO',
};

export const STATUS_VARIANTS = {
  AVAILABLE: 'success',
  CONFIRMED: 'info',
  CHECKED_IN: 'warning',
  CHECKED_OUT: 'default',
  CANCELLED: 'danger',
  PENDING: 'warning',
  RESERVED: 'info',
  OCCUPIED: 'warning',
  MAINTENANCE: 'danger',
  PAID: 'success',
  UNPAID: 'danger',
  ACTIVE: 'success',
  INACTIVE: 'default',
};
