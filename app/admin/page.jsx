'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
    <AdminPageWrapper
      breadcrumbItems={[
        { label: 'Admin', href: '/admin' },
        { label: 'Dashboard' }
      ]}
      title="Admin Dashboard"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <div className="flex gap-4">
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Blog
          </Link>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium text-sm"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Project
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Blog Stats */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-xl shadow-sm border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Blogs</h3>
            <Link
              href="/admin/blog"
              className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm"
            >
              View All
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                {loading ? '...' : stats.blogs.total}
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300">Total Posts</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                {loading ? '...' : stats.blogs.active}
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300">Featured</p>
            </div>
          </div>
        </div>

        {/* Projects Stats */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 p-6 rounded-xl shadow-sm border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">Projects</h3>
            <Link
              href="/admin/projects"
              className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-medium text-sm"
            >
              View All
            </Link>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">
                {loading ? '...' : stats.projects.total}
              </p>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">Total Projects</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">
                {loading ? '...' : stats.projects.active}
              </p>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">Completed</p>
            </div>
          </div>
          
        </div>


        {/* Messages Stats */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 p-6 rounded-xl shadow-sm border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">Messages</h3>
            <Link
              href="/admin/messages"
              className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-medium text-sm"
            >
              View All
            </Link>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">
                {loading ? '...' : stats.projects.total}
              </p>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">Total Projects</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">
                {loading ? '...' : stats.projects.active}
              </p>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">Completed</p>
            </div>
          </div>
          
        </div>
      </div>



        {/* Tabs */}

        <div className="w-full max-w-6xl mx-auto p-6  min-h-screen">
      {/* Custom Tab Navigation */}
      <div className="mb-8">
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
            Portfolio Manager
          </h1>
        </div>
        
        <div className="flex justify-center">
          <div className="flex bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-md transform scale-105'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="transition-all duration-300">
        {activeTab === 'toolkit' && <ToolkitTab />}
        {activeTab === 'social' && <SocialMediaTab />}
        {activeTab === 'qna' && <QnATab />}
        {activeTab === 'experience' && <ExperienceTab />}
      </div>
    </div>


    </AdminPageWrapper>
  );
} 