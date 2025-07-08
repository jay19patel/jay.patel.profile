'use client'

import React from 'react'
import { AdminAuthProvider, useAdminAuth } from '@/contexts/AdminAuthContext'
import AdminLogin from '@/components/AdminLogin'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Loader, LogOut, Shield } from 'lucide-react'
import { Button } from '@/components/customUi/Button'
import Link from 'next/link'

const AdminLayoutContent = ({ children }) => {
  const { isAuthenticated, isLoading, logout } = useAdminAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AdminLogin />
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
     {/* Admin Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

    </div>
  )
}

export default function AdminLayout({ children }) {
  return (
    <ThemeProvider>
      <AdminAuthProvider>
        <AdminLayoutContent>
          {children}
        </AdminLayoutContent>
      </AdminAuthProvider>
    </ThemeProvider>
  )
} 