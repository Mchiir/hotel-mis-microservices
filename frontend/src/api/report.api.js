import { http } from './http.js';

export const reportApi = {
  occupancy: () => http('/reports/occupancy'),
  revenue: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return http(`/reports/revenue${q ? `?${q}` : ''}`);
  },
  reservations: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return http(`/reports/reservations${q ? `?${q}` : ''}`);
  },
  checkins: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return http(`/reports/checkins${q ? `?${q}` : ''}`);
  },
};
