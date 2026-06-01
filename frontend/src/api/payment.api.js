import { http } from './http.js';

export const paymentApi = {
  list: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return http(`/payments${q ? `?${q}` : ''}`);
  },
  get: (id) => http(`/payments/${id}`),
  create: (body) => http('/payments', { method: 'POST', body: JSON.stringify(body) }),
};
