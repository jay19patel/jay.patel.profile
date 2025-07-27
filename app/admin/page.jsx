'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  MessageSquare,
  Settings,
  Users,
  Shield
} from 'lucide-react';
import { toast } from 'sonner';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { AdminPageWrapper } from '@/components/customUi/AdminPageWrapper';
import { getAdminBlogs, getAdminProjects ,getMessages} from '@/app/actions/admin';
import ToolkitTab from '@/components/admin/ToolkitTab';
import SocialMediaTab from '@/components/admin/SocialMediaTab';
import QnATab from '@/components/admin/QnATab';
import ExperienceTab from '@/components/admin/ExperienceTab';

export default function AdminPage() {

  // Admin tabs

  const [activeTab, setActiveTab] = useState('toolkit');

  const tabs = [
    { id: 'toolkit', label: 'My Toolkit', icon: <Settings className="w-4 h-4" /> },
    { id: 'social', label: 'Social Media', icon: <Users className="w-4 h-4" /> },
    { id: 'qna', label: 'Q&A', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'experience', label: 'Experience', icon: <Shield className="w-4 h-4" /> },
  ];



  const [stats, setStats] = useState({
    blogs: { total: 0, active: 0 },
    projects: { total: 0, active: 0 }
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAdminAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [blogsRes, projectsRes,messagesRes] = await Promise.all([
          getAdminBlogs(),
          getAdminProjects(),
          getMessages(),
        ]);

        if (!blogsRes.success) throw new Error(blogsRes.error);
        if (!projectsRes.success) throw new Error(projectsRes.error);

        setStats({
          blogs: {
            total: blogsRes.data.length || 0,
            active: blogsRes.data.filter(blog => blog.featured)?.length || 0
          },
          projects: {
            total: projectsRes.data.length || 0,
            active: projectsRes.data.filter(project => project.status === 'Completed')?.length || 0
          },
          messages: {
            total : messagesRes.data.length || 0,
            active: messagesRes.data.filter(message => message.is_read === false)?.length || 0
          }
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stats:', error);
        toast.error('Failed to fetch dashboard stats');
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchStats();
    }
  }, [isAuthenticated]);

  if (authLoading) {
    return (
      <AdminPageWrapper>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </AdminPageWrapper>
    );
  }

  if (!isAuthenticated) {
    router.push('/admin/login');
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6"
    >
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-8"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your portfolio content and settings
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/admin/blog/new"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Blog
              </Link>
              <Link
                href="/admin/projects/new"
                className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-lg transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Project
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        {/* Blog Stats */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Blog Posts</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Content management</p>
              </div>
            </div>
            <Link
              href="/admin/blog"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm px-3 py-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {loading ? '...' : stats.blogs.total}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Posts</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {loading ? '...' : stats.blogs.active}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Featured</p>
            </div>
          </div>
        </motion.div>

        {/* Projects Stats */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Projects</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Portfolio showcase</p>
              </div>
            </div>
            <Link
              href="/admin/projects"
              className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium text-sm px-3 py-1 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {loading ? '...' : stats.projects.total}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Projects</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {loading ? '...' : stats.projects.active}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
            </div>
          </div>
        </motion.div>

        {/* Messages Stats */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Messages</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Contact inquiries</p>
              </div>
            </div>
            <Link
              href="/admin/messages"
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium text-sm px-3 py-1 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {loading ? '...' : stats.messages?.total || 0}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Messages</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {loading ? '...' : stats.messages?.active || 0}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Unread</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Portfolio Management Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700"
      >
        {/* Section Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio Management</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your portfolio content and settings</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-6">
          <div className="flex space-x-2 bg-gray-50 dark:bg-gray-700/50 p-2 rounded-xl border border-gray-200 dark:border-gray-600">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 flex-1 justify-center ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-300 shadow-lg border-2 border-blue-200 dark:border-blue-700 transform scale-[1.02]'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-gray-600/80 border-2 border-transparent'
                }`}
              >
                <div className={`${activeTab === tab.id ? 'text-blue-600 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'}`}>
                  {tab.icon}
                </div>
                <span className="hidden sm:inline font-semibold">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <div className="min-h-[400px] transition-all duration-300">
            {activeTab === 'toolkit' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">My Toolkit</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Manage your tech stack</span>
                </div>
                <ToolkitTab />
              </div>
            )}
            {activeTab === 'social' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Social Media</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Manage social links</span>
                </div>
                <SocialMediaTab />
              </div>
            )}
            {activeTab === 'qna' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Q&A</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Manage FAQ content</span>
                </div>
                <QnATab />
              </div>
            )}
            {activeTab === 'experience' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Experience</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Manage work history</span>
                </div>
                <ExperienceTab />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 