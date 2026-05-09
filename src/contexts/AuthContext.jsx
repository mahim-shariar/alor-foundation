import { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../services/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token'));
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(!!localStorage.getItem('admin_token'));

  useEffect(() => {
    if (token) {
      api.getMe()
        .then(data => { setAdmin(data); setLoading(false); })
        .catch(() => { localStorage.removeItem('admin_token'); setToken(null); setLoading(false); });
    }
  }, [token]);

  async function login(username, password) {
    const data = await api.login(username, password);
    localStorage.setItem('admin_token', data.token);
    setToken(data.token);
    setAdmin(data.admin);
    return data.admin;
  }

  function logout() {
    localStorage.removeItem('admin_token');
    setToken(null);
    setAdmin(null);
  }

  return (
    <AuthContext.Provider value={{ token, admin, loading, login, logout, setAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }
