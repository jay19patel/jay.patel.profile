'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

const AdminAuthContext = createContext()

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider')
  }
  return context
}

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if user is already authenticated from localStorage
    const authStatus = localStorage.getItem('adminAuth')
    const authTime = localStorage.getItem('adminAuthTime')
    
    if (authStatus === 'true' && authTime) {
      // Check if authentication is still valid (expires after 24 hours)
      const authDate = new Date(authTime)
      const now = new Date()
      const hoursDiff = (now - authDate) / (1000 * 60 * 60)
      
      if (hoursDiff < 24) {
        setIsAuthenticated(true)
      } else {
        // Clear expired authentication
        localStorage.removeItem('adminAuth')
        localStorage.removeItem('adminAuthTime')
      }
    }
    
    setIsLoading(false)
  }, [])

  const login = async (pin) => {
    try {
      setError(null);
      
      if (!pin) {
        throw new Error('PIN is required');
      }

      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pin }),
      })

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid PIN');
        }
        throw new Error('Authentication failed');
      }

      const data = await response.json()

      if (data.success) {
        setIsAuthenticated(true)
        localStorage.setItem('adminAuth', 'true')
        localStorage.setItem('adminAuthTime', new Date().toISOString())
        return { success: true }
      } else {
        throw new Error(data.error || 'Authentication failed')
      }
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setError(null)
    localStorage.removeItem('adminAuth')
    localStorage.removeItem('adminAuthTime')
  }

  const value = {
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
  }

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  )
} 