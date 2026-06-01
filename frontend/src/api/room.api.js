import { http } from './http.js';

export const roomApi = {
  list: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return http(`/rooms${q ? `?${q}` : ''}`);
  },
  get: (id) => http(`/rooms/${id}`),
  create: (body) => http('/rooms', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) => http(`/rooms/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  remove: (id) => http(`/rooms/${id}`, { method: 'DELETE' }),
  updateStatus: (id, status) =>
    http(`/rooms/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
};
