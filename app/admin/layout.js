'use client'

import React from 'react'
import { AdminAuthProvider, useAdminAuth } from '@/contexts/AdminAuthContext'
import AdminLogin from '@/components/AdminLogin'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Loader, LogOut, Shield, LayoutDashboard, MessageSquare, Settings, Menu, X } from 'lucide-react'
import { Button } from '@/components/customUi/Button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const AdminLayoutContent = ({ children }) => {
  const { isAuthenticated, isLoading, logout } = useAdminAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const navigationItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
  ]

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main Content */}
      <div className="flex flex-col min-w-0">

        {/* Page Content */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 min-h-0"
        >
          <div className="h-full">
            {children}
          </div>
        </motion.main>
      </div>
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