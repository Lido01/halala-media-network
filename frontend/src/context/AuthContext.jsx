import { createContext, useCallback, useEffect, useState } from 'react';
import apiService from '../api/api';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('username');
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setUser(null);
      return null;
    }

    try {
      const res = await apiService.get('/api/accounts/profile/');
      const profile = res?.data ?? null;
      setUser(profile);
      if (profile?.role) {
        localStorage.setItem('user_role', profile.role);
      }
      if (profile?.username) {
        localStorage.setItem('username', profile.username);
      }
      return profile;
    } catch {
      logout();
      return null;
    }
  }, [logout]);

  useEffect(() => {
    let mounted = true;

    const bootAuth = async () => {
      await refreshUser();
      if (mounted) {
        setLoading(false);
      }
    };

    bootAuth();

    const onStorage = () => {
      refreshUser();
    };

    window.addEventListener('storage', onStorage);
    return () => {
      mounted = false;
      window.removeEventListener('storage', onStorage);
    };
  }, [refreshUser]);

  return (
    <AuthContext.Provider value={{ user, loading, isLoggedIn: !!user, logout, refreshUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};