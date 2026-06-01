import { http, setAccessToken, clearAccessToken } from './http.js';

export const authApi = {
  login: async (body) => {
    const data = await http('/auth/login', { method: 'POST', body: JSON.stringify(body) });
    setAccessToken(data.data.accessToken);
    return data.data;
  },
  register: async (body) => {
    const data = await http('/auth/register', { method: 'POST', body: JSON.stringify(body) });
    setAccessToken(data.data.accessToken);
    return data.data;
  },
  logout: () => http('/auth/logout', { method: 'POST' }).finally(clearAccessToken),
  me: () => http('/auth/me'),
  refresh: () => http('/auth/refresh', { method: 'POST' }),
};
