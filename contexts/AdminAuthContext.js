'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import { authenticateAdmin } from '@/app/actions/auth';

const AdminAuthContext = createContext();

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}

export function AdminAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if there's an auth token in localStorage
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (pin) => {
    try {
      setError(null);
      const result = await authenticateAdmin(pin);

      if (result.success) {
        // Store auth token in localStorage
        localStorage.setItem('adminToken', 'authenticated');
        setIsAuthenticated(true);
        return true;
      } else {
        setError(result.error);
        return false;
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    isLoading,
    error,
    login,
    logout
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
} 