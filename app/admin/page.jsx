'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  MessageSquare,
  Settings,
  CheckSquare,
  Images
} from 'lucide-react';
import { toast } from 'sonner';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { AdminPageWrapper } from '@/components/customUi/AdminPageWrapper';
import { getMessages} from '@/app/actions/admin';
import ToolkitTab from '@/components/admin/ToolkitTab';
import QnATab from '@/components/admin/QnATab';
import AnnouncementsTab from '@/components/admin/AnnouncementsTab';
import GalleryTab from '@/components/admin/GalleryTab';

export default function AdminPage() {

  // Admin tabs

  const [activeTab, setActiveTab] = useState('toolkit');

  const tabs = [
    { id: 'toolkit', label: 'My Toolkit', icon: <Settings className="w-4 h-4" /> },
    { id: 'qna', label: 'Q&A', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'announcements', label: 'Announcements', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'gallery', label: 'Gallery', icon: <Images className="w-4 h-4" /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare className="w-4 h-4" /> },
  ];



  const [stats, setStats] = useState({
    messages: { total: 0, unread: 0 }
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAdminAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const messagesRes = await getMessages();

        setStats({
          messages: {
            total : messagesRes.data.length || 0,
            unread: messagesRes.data.filter(message => message.is_read === false)?.length || 0
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Header Section */}
      <div className="mb-8">
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
          </div>
        </div>
      </div>


      {/* Portfolio Management Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
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
            {activeTab === 'qna' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Q&A</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Manage FAQ content</span>
                </div>
                <QnATab />
              </div>
            )}
            {activeTab === 'announcements' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Announcements</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Manage announcements</span>
                </div>
                <AnnouncementsTab />
              </div>
            )}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Gallery</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Manage gallery images</span>
                </div>
                <GalleryTab />
              </div>
            )}
            {activeTab === 'messages' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Messages</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">View message statistics</span>
                </div>
                
                {/* Message Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {loading ? '...' : stats.messages?.total || 0}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Messages</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                        <CheckSquare className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {loading ? '...' : (stats.messages?.total || 0) - (stats.messages?.unread || 0)}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Read Messages</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {loading ? '...' : stats.messages?.unread || 0}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Unread Messages</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* View Messages Button */}
                <div className="text-center">
                  <button
                    onClick={() => router.push('/admin/messages')}
                    className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    View All Messages
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 