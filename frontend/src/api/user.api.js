import { http } from './http.js';

export const userApi = {
  list: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return http(`/users${q ? `?${q}` : ''}`);
  },
  get: (id) => http(`/users/${id}`),
  update: (id, body) => http(`/users/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  remove: (id) => http(`/users/${id}`, { method: 'DELETE' }),
};
