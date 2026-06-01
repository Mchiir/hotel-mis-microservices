const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

let accessToken = null;
let refreshPromise = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

export const clearAccessToken = () => {
  accessToken = null;
};

const refreshAccessToken = async () => {
  if (!refreshPromise) {
    refreshPromise = fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.message || 'Session expired');
        setAccessToken(data.data?.accessToken);
        return data.data?.accessToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
};

export const http = async (path, options = {}, retry = true) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  const data = await res.json().catch(() => ({}));

  if (res.status === 401 && retry && !path.includes('/auth/login') && !path.includes('/auth/register')) {
    try {
      await refreshAccessToken();
      return http(path, options, false);
    } catch {
      clearAccessToken();
      window.dispatchEvent(new Event('auth:logout'));
      throw new Error(data.message || 'Session expired');
    }
  }

  if (!res.ok) {
    const err = new Error(data.message || 'Request failed');
    err.errors = data.errors;
    err.status = res.status;
    throw err;
  }

  return data;
};
