'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEYS = {
  token: 'admin_token',
  username: 'admin_username'
} as const;

interface AuthState {
  token: string | null;
  username: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = { token: null, username: null, isAuthenticated: false };

/**
 * Client-side authentication hook for admin session management
 */
export function useAuth() {
  const [auth, setAuth] = useState<AuthState>(initialState);

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.token);
    const username = localStorage.getItem(STORAGE_KEYS.username);

    if (token && username) {
      setAuth({ token, username, isAuthenticated: true });
    }
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      const error = await response.json() as { error?: string };
      throw new Error(error.error || 'Login failed');
    }

    const data = await response.json() as { token: string; username: string };
    localStorage.setItem(STORAGE_KEYS.token, data.token);
    localStorage.setItem(STORAGE_KEYS.username, data.username);

    setAuth({ token: data.token, username: data.username, isAuthenticated: true });
    return data;
  }, []);

  const logout = useCallback(async () => {
    if (auth.token) {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${auth.token}` }
      }).catch(() => {}); // Ignore logout API errors
    }

    localStorage.removeItem(STORAGE_KEYS.token);
    localStorage.removeItem(STORAGE_KEYS.username);
    setAuth(initialState);
  }, [auth.token]);

  const getAuthHeaders = useCallback(() => {
    return auth.token ? { Authorization: `Bearer ${auth.token}` } : {};
  }, [auth.token]);

  return { ...auth, login, logout, getAuthHeaders };
}
