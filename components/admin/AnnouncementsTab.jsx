'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Calendar,
  Clock,
  Link as LinkIcon,
  BookOpen,
  Target,
  CheckCircle,
  Circle,
  ExternalLink,
  Eye,
  EyeOff,
  Youtube,
  Instagram,
  Linkedin,
  Github
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function AnnouncementsTab() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({
    type: 'youtube',
    title: '',
    description: '',
    link: '',
    priority: 'medium',
    isActive: true
  });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showForm, setShowForm] = useState(false);

  const announcementTypes = [
    { id: 'youtube', label: 'YouTube', icon: Youtube, color: 'red' },
    { id: 'event', label: 'Event', icon: Calendar, color: 'blue' },
    { id: 'sponsor', label: 'Sponsor', icon: Target, color: 'green' },
    { id: 'course', label: 'Course', icon: BookOpen, color: 'purple' },
    { id: 'blog', label: 'Blog', icon: Edit3, color: 'indigo' }
  ];

  const priorities = [
    { id: 'low', label: 'Low', color: 'gray' },
    { id: 'medium', label: 'Medium', color: 'yellow' },
    { id: 'high', label: 'High', color: 'red' }
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await import('@/data/announcements.json');
      setAnnouncements(data.announcements || []);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const saveData = async (updatedAnnouncements) => {
    try {
      const response = await fetch('/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          announcements: updatedAnnouncements
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to save data');
      }
      
      return true;
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error('Failed to save data');
      return false;
    }
  };

  const addItem = async () => {
    if (!newItem.title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    const announcement = {
      id: Date.now(),
      type: newItem.type,
      title: newItem.title.trim(),
      description: newItem.description.trim(),
      link: newItem.link.trim(),
      icon: getTypeIcon(newItem.type),
      color: getTypeColor(newItem.type),
      isActive: newItem.isActive,
      priority: newItem.priority,
      createdAt: new Date().toISOString().split('T')[0],
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 30 days from now
    };

    const updatedAnnouncements = [...announcements, announcement];
    const saved = await saveData(updatedAnnouncements);
    
    if (saved) {
      setAnnouncements(updatedAnnouncements);
      resetForm();
      toast.success('Announcement added successfully');
    }
  };

  const deleteItem = async (id) => {
    const updatedAnnouncements = announcements.filter(item => item.id !== id);
    const saved = await saveData(updatedAnnouncements);
    
    if (saved) {
      setAnnouncements(updatedAnnouncements);
      toast.success('Announcement deleted successfully');
    }
  };

  const toggleActive = async (id) => {
    const updatedAnnouncements = announcements.map(item =>
      item.id === id ? { ...item, isActive: !item.isActive } : item
    );
    const saved = await saveData(updatedAnnouncements);
    
    if (saved) {
      setAnnouncements(updatedAnnouncements);
      toast.success('Announcement status updated');
    }
  };

  const resetForm = () => {
    setNewItem({
      type: 'youtube',
      title: '',
      description: '',
      link: '',
      priority: 'medium',
      isActive: true
    });
    setShowForm(false);
  };

  const getTypeIcon = (type) => {
    const typeConfig = announcementTypes.find(t => t.id === type);
    return typeConfig ? typeConfig.label.toLowerCase() : 'announcement';
  };

  const getTypeColor = (type) => {
    const typeConfig = announcementTypes.find(t => t.id === type);
    return typeConfig ? typeConfig.color : 'blue';
  };


  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Announcements</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your announcements displayed on the homepage
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Announcement
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {announcements.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Announcements</div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {announcements.filter(a => a.isActive).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {announcements.filter(a => a.priority === 'high').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">High Priority</div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {announcements.filter(a => a.type === 'youtube').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">YouTube Videos</div>
        </div>
      </div>

      {/* Add Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6"
          >
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Add New Announcement
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title *
                </label>
                <Input
                  value={newItem.title}
                  onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Announcement title..."
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type
                </label>
                <select
                  value={newItem.type}
                  onChange={(e) => setNewItem(prev => ({ 
                    ...prev, 
                    type: e.target.value 
                  }))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {announcementTypes.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={newItem.description}
                onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Description..."
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                rows={3}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Link
              </label>
              <Input
                value={newItem.link}
                onChange={(e) => setNewItem(prev => ({ ...prev, link: e.target.value }))}
                placeholder="https://example.com"
                className="w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Priority
              </label>
              <select
                value={newItem.priority}
                onChange={(e) => setNewItem(prev => ({ ...prev, priority: e.target.value }))}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {priorities.map(priority => (
                  <option key={priority.id} value={priority.id}>
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={newItem.isActive}
                  onChange={(e) => setNewItem(prev => ({ ...prev, isActive: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Active (show on homepage)
                </span>
              </label>
            </div>

            <div className="flex gap-3">
              <Button onClick={addItem} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Announcement
              </Button>
              <Button onClick={resetForm} variant="outline">
                Cancel
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Items List */}
      <div className="space-y-4">
        {announcements.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No announcements yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Create your first announcement to get started!
            </p>
          </div>
        ) : (
          announcements.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`bg-white dark:bg-gray-800 border rounded-lg p-6 transition-all duration-200 ${
                item.isActive
                  ? 'border-gray-200 dark:border-gray-700 hover:shadow-md' 
                  : 'border-gray-300 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-900/10'
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleActive(item.id)}
                  className="mt-1 flex-shrink-0"
                >
                  {item.isActive ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h4>
                    
                    <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300`}>
                        {item.type}
                      </span>
                      
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        item.priority === 'high' 
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                          : item.priority === 'medium'
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                          : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                      }`}>
                        {item.priority}
                      </span>
                    </div>
                  </div>

                  {item.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {item.description}
                    </p>
                  )}

                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors mb-3"
                    >
                      <ExternalLink className="w-3 h-3" />
                      View Link
                    </a>
                  )}


                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>
                      Created: {formatDate(item.createdAt)}
                    </span>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}