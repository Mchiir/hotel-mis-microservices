import { env } from '../config/env.js';
import { ApiError } from './ApiError.js';

export const getReservation = async (reservationId, authorization) => {
  const res = await fetch(`${env.reservationServiceUrl}/reservations/${reservationId}`, {
    headers: { Authorization: authorization },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(res.status, data.message || 'Reservation validation failed');
  }

  return data.data?.reservation ?? data.data;
};
