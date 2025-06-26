'use client'

import React from 'react'
import Link from 'next/link'
import { PageSection } from '@/components/customUi/PageSection'
import { Button } from '@/components/customUi/Button'
import { 
  FileText, 
  Users, 
  Settings, 
  BarChart3,
  Plus,
  Edit,
  Eye,
  ArrowRight
} from 'lucide-react'

const AdminDashboard = () => {
  const adminCards = [
    {
      title: 'Blog Management',
      description: 'Create, edit, and manage blog posts',
      icon: <FileText className="w-8 h-8" />,
      href: '/admin/blog',
      color: 'blue',
      actions: [
        { label: 'Create New Post', icon: <Plus className="w-4 h-4" />, href: '/admin/blog' },
        { label: 'View All Posts', icon: <Eye className="w-4 h-4" />, href: '/blog' }
      ]
    },
    {
      title: 'Portfolio Stats',
      description: 'Monitor website performance and analytics',
      icon: <BarChart3 className="w-8 h-8" />,
      href: '#',
      color: 'green',
      comingSoon: true,
      actions: [
        { label: 'View Analytics', icon: <Eye className="w-4 h-4" />, href: '#' },
        { label: 'Export Reports', icon: <ArrowRight className="w-4 h-4" />, href: '#' }
      ]
    },
    {
      title: 'User Management',
      description: 'Manage user accounts and permissions',
      icon: <Users className="w-8 h-8" />,
      href: '#',
      color: 'purple',
      comingSoon: true,
      actions: [
        { label: 'View Users', icon: <Eye className="w-4 h-4" />, href: '#' },
        { label: 'Add User', icon: <Plus className="w-4 h-4" />, href: '#' }
      ]
    },
    {
      title: 'Site Settings',
      description: 'Configure website settings and preferences',
      icon: <Settings className="w-8 h-8" />,
      href: '#',
      color: 'orange',
      comingSoon: true,
      actions: [
        { label: 'General Settings', icon: <Edit className="w-4 h-4" />, href: '#' },
        { label: 'Theme Settings', icon: <Settings className="w-4 h-4" />, href: '#' }
      ]
    }
  ]

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        icon: 'text-blue-600 dark:text-blue-400',
        border: 'border-blue-200 dark:border-blue-800',
        button: 'bg-blue-600 hover:bg-blue-700 text-white'
      },
      green: {
        bg: 'bg-green-50 dark:bg-green-900/20',
        icon: 'text-green-600 dark:text-green-400',
        border: 'border-green-200 dark:border-green-800',
        button: 'bg-green-600 hover:bg-green-700 text-white'
      },
      purple: {
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        icon: 'text-purple-600 dark:text-purple-400',
        border: 'border-purple-200 dark:border-purple-800',
        button: 'bg-purple-600 hover:bg-purple-700 text-white'
      },
      orange: {
        bg: 'bg-orange-50 dark:bg-orange-900/20',
        icon: 'text-orange-600 dark:text-orange-400',
        border: 'border-orange-200 dark:border-orange-800',
        button: 'bg-orange-600 hover:bg-orange-700 text-white'
      }
    }
    return colors[color] || colors.blue
  }

  return (
    <PageSection>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Welcome to Admin Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage your portfolio website content and settings from this central dashboard.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Blog Posts</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">4</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Published Posts</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">4</p>
            </div>
            <Eye className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Categories</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">4</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Admin Status</p>
              <p className="text-sm font-semibold text-green-600 dark:text-green-400">Active</p>
            </div>
            <Settings className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          </div>
        </div>
      </div>

      {/* Admin Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {adminCards.map((card, index) => {
          const colors = getColorClasses(card.color)
          
          return (
            <div 
              key={index}
              className={`bg-white dark:bg-slate-800 rounded-xl border-2 ${colors.border} p-6 transition-all hover:shadow-lg`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`flex items-center justify-center w-16 h-16 ${colors.bg} rounded-xl`}>
                  <div className={colors.icon}>
                    {card.icon}
                  </div>
                </div>
                
                {card.comingSoon && (
                  <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs px-2 py-1 rounded-full">
                    Coming Soon
                  </span>
                )}
              </div>

              {/* Card Content */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {card.description}
                </p>
              </div>

              {/* Card Actions */}
              <div className="space-y-3">
                {card.actions.map((action, actionIndex) => (
                  <Link
                    key={actionIndex}
                    href={action.href}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      card.comingSoon 
                        ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                        : `${colors.button} hover:shadow-md`
                    }`}
                    onClick={(e) => card.comingSoon && e.preventDefault()}
                  >
                    {action.icon}
                    {action.label}
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/admin/blog">
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create New Blog Post
            </Button>
          </Link>
          
          <Link href="/blog">
            <Button variant="outline" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              View Live Blog
            </Button>
          </Link>
          
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              Back to Website
            </Button>
          </Link>
        </div>
      </div>
    </PageSection>
  )
}

export default AdminDashboard 