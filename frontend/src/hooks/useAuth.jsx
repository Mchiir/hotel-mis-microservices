import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authApi } from '../api/auth.api.js';
import { setAccessToken, clearAccessToken } from '../api/http.js';
import { loadUser, saveUser } from '../utils/storage.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser);
  const [loading, setLoading] = useState(true);

  const bootstrap = useCallback(async () => {
    try {
      const refreshed = await authApi.refresh();
      setAccessToken(refreshed.data.accessToken);
      const me = await authApi.me();
      const profile = me.data.user;
      setUser(profile);
      saveUser(profile);
    } catch {
      clearAccessToken();
      setUser(null);
      saveUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    bootstrap();
    const onLogout = () => {
      setUser(null);
      saveUser(null);
    };
    window.addEventListener('auth:logout', onLogout);
    return () => window.removeEventListener('auth:logout', onLogout);
  }, [bootstrap]);

  const login = async (credentials) => {
    const data = await authApi.login(credentials);
    setUser(data.user);
    saveUser(data.user);
    return data.user;
  };

  const register = async (payload) => {
    const data = await authApi.register(payload);
    setUser(data.user);
    saveUser(data.user);
    return data.user;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      setUser(null);
      saveUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
