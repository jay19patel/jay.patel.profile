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
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pin }),
      })

      const data = await response.json()

      if (data.success) {
        setIsAuthenticated(true)
        localStorage.setItem('adminAuth', 'true')
        localStorage.setItem('adminAuthTime', new Date().toISOString())
        return { success: true }
      } else {
        return { success: false, error: 'Invalid PIN' }
      }
    } catch (error) {
      return { success: false, error: 'Authentication failed' }
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('adminAuth')
    localStorage.removeItem('adminAuthTime')
  }

  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout,
  }

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  )
} 