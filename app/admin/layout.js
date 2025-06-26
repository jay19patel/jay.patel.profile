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
      {/* Admin Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Admin Title */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded">
                <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Admin Panel
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Portfolio Management
                </p>
              </div>
            </div>

            {/* Admin Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link 
                href="/admin/blog"
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Blog Management
              </Link>
              <Link 
                href="/"
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                View Site
              </Link>
            </nav>

            {/* Logout Button */}
            <Button
              onClick={logout}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Admin Footer */}
      <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            🔒 Secure Admin Panel - Session expires in 24 hours
          </p>
        </div>
      </footer>
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