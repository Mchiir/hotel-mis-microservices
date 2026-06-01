import { http } from './http.js';

export const guestApi = {
  list: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return http(`/guests${q ? `?${q}` : ''}`);
  },
  get: (id) => http(`/guests/${id}`),
  create: (body) => http('/guests', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) => http(`/guests/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
};
