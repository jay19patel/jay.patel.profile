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
    <div className="min-h-screen">
     {/* Admin Content */}
        <main className="flex-grow w-full px-4 py-6">
          <section className='w-full px-4 py-6'>
              <div className="space-y-8 max-w-7xl mx-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-3xl shadow-[0_5px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_5px_20px_rgba(0,0,0,0.3)] p-6 md:p-12 transition-colors duration-300 overflow-hidden">
              {children}
            </div>
            </section>
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