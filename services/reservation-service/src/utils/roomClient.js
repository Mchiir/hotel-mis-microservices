import { env } from '../config/env.js';
import { ApiError } from './ApiError.js';
import { logger } from './logger.js';

const parseResponse = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(res.status, data.message || 'Room service request failed');
  }
  return data.data ?? data;
};

export const checkRoomAvailability = async (roomId, authorization) => {
  const res = await fetch(`${env.roomServiceUrl}/rooms/${roomId}/availability`, {
    headers: { Authorization: authorization },
  });
  return parseResponse(res);
};

export const updateRoomStatus = async (roomId, status, authorization) => {
  const res = await fetch(`${env.roomServiceUrl}/rooms/${roomId}/status`, {
    method: 'PATCH',
    headers: {
      Authorization: authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  const data = await parseResponse(res);
  logger.debug('Room status updated', { roomId, status });
  return data;
};
