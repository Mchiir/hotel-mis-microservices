import { http } from './http.js';

export const reservationApi = {
  list: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return http(`/reservations${q ? `?${q}` : ''}`);
  },
  get: (id) => http(`/reservations/${id}`),
  create: (body) => http('/reservations', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) => http(`/reservations/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  remove: (id) => http(`/reservations/${id}`, { method: 'DELETE' }),
  checkIn: (id) => http(`/reservations/${id}/check-in`, { method: 'POST' }),
  checkOut: (id) => http(`/reservations/${id}/check-out`, { method: 'POST' }),
};
