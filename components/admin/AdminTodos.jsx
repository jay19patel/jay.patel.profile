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
  EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function AdminTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'learning',
    dueDate: '',
    time: '',
    status: 'pending',
    progress: 0,
    links: [{ url: '', title: '' }],
    visible: true
  });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showForm, setShowForm] = useState(false);

  const categories = [
    { id: 'learning', label: 'Learning', icon: BookOpen, color: 'blue' },
    { id: 'event', label: 'Event', icon: Calendar, color: 'purple' },
    { id: 'task', label: 'Task', icon: Target, color: 'green' },
    { id: 'design', label: 'Design', icon: Target, color: 'pink' },
    { id: 'reminder', label: 'Reminder', icon: Clock, color: 'orange' }
  ];

  const priorities = [
    { id: 'low', label: 'Low', color: 'gray' },
    { id: 'medium', label: 'Medium', color: 'yellow' },
    { id: 'high', label: 'High', color: 'red' }
  ];

  const statuses = [
    { id: 'pending', label: 'Pending', color: 'gray' },
    { id: 'ongoing', label: 'Ongoing', color: 'blue' },
    { id: 'working', label: 'Working', color: 'pink' },
    { id: 'completed', label: 'Completed', color: 'green' }
  ];

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      // Import from JSON file
      const announcementData = await import('@/data/announcements.json');
      const currentTasks = announcementData.currentTasks || [];
      
      // Convert to the format expected by the component
      const convertedTodos = currentTasks.map(task => ({
        id: task.id.toString(),
        title: task.title,
        description: task.description,
        category: task.category?.toLowerCase() || 'task',
        priority: task.priority || 'medium',
        dueDate: task.dueDate || '',
        status: task.status === 'in_progress' ? 'ongoing' : task.status || 'pending',
        progress: task.progress || 0,
        completed: task.status === 'completed',
        visible: true,
        links: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
      
      setTodos(convertedTodos);
    } catch (error) {
      console.error('Error loading todos:', error);
      toast.error('Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  const saveTodos = async (updatedTodos) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ todos: updatedTodos })
      });
      
      if (!response.ok) {
        throw new Error('Failed to save todos');
      }
      
      return true;
    } catch (error) {
      console.error('Error saving todos:', error);
      toast.error('Failed to save todos');
      return false;
    }
  };

  const addTodo = async () => {
    if (!newTodo.title.trim()) {
      toast.error('Please enter a todo title');
      return;
    }

    const todo = {
      id: Date.now().toString(),
      title: newTodo.title.trim(),
      description: newTodo.description.trim(),
      priority: newTodo.priority,
      category: newTodo.category,
      dueDate: newTodo.dueDate,
      time: newTodo.time,
      status: newTodo.status,
      progress: newTodo.progress,
      links: newTodo.links.filter(link => link.url.trim()),
      completed: newTodo.status === 'completed',
      visible: newTodo.visible,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedTodos = [...todos, todo];
    const saved = await saveTodos(updatedTodos);
    
    if (saved) {
      setTodos(updatedTodos);
      setNewTodo({
        title: '',
        description: '',
        priority: 'medium',
        category: 'learning',
        dueDate: '',
        time: '',
        status: 'pending',
        progress: 0,
        links: [{ url: '', title: '' }],
        visible: true
      });
      setShowForm(false);
      toast.success('Todo added successfully');
    }
  };

  const toggleTodo = async (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id 
        ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
        : todo
    );
    
    const saved = await saveTodos(updatedTodos);
    if (saved) {
      setTodos(updatedTodos);
      const todo = updatedTodos.find(t => t.id === id);
      toast.success(`Todo ${todo.completed ? 'completed' : 'reopened'}`);
    }
  };

  const toggleVisibility = async (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id 
        ? { ...todo, visible: !todo.visible, updatedAt: new Date().toISOString() }
        : todo
    );
    
    const saved = await saveTodos(updatedTodos);
    if (saved) {
      setTodos(updatedTodos);
      const todo = updatedTodos.find(t => t.id === id);
      toast.success(`Todo ${todo.visible ? 'made visible' : 'hidden'}`);
    }
  };

  const deleteTodo = async (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    const saved = await saveTodos(updatedTodos);
    
    if (saved) {
      setTodos(updatedTodos);
      toast.success('Todo deleted successfully');
    }
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditForm({
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      category: todo.category,
      dueDate: todo.dueDate,
      time: todo.time || '',
      status: todo.status || 'pending',
      progress: todo.progress || 0,
      links: todo.links && todo.links.length > 0 ? todo.links : [{ url: '', title: '' }],
      visible: todo.visible ?? true
    });
  };

  const saveEdit = async () => {
    if (!editForm.title.trim()) {
      toast.error('Please enter a todo title');
      return;
    }

    const updatedTodos = todos.map(todo =>
      todo.id === editingId
        ? {
            ...todo,
            title: editForm.title.trim(),
            description: editForm.description.trim(),
            priority: editForm.priority,
            category: editForm.category,
            dueDate: editForm.dueDate,
            time: editForm.time,
            status: editForm.status,
            progress: editForm.progress,
            links: editForm.links.filter(link => link.url && link.url.trim()),
            completed: editForm.status === 'completed',
            visible: editForm.visible,
            updatedAt: new Date().toISOString()
          }
        : todo
    );

    const saved = await saveTodos(updatedTodos);
    
    if (saved) {
      setTodos(updatedTodos);
      setEditingId(null);
      setEditForm({});
      toast.success('Todo updated successfully');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const getCategoryIcon = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.icon : BookOpen;
  };

  const getCategoryColor = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.color : 'blue';
  };

  const getPriorityColor = (priorityId) => {
    const priority = priorities.find(p => p.id === priorityId);
    return priority ? priority.color : 'gray';
  };

  const addLinkField = (form, setForm) => {
    setForm(prev => ({
      ...prev,
      links: [...prev.links, { url: '', title: '' }]
    }));
  };

  const updateLink = (index, field, value, form, setForm) => {
    setForm(prev => ({
      ...prev,
      links: prev.links.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      )
    }));
  };

  const removeLink = (index, form, setForm) => {
    setForm(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index)
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
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
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">My Todos</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your learning progress and upcoming events
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Todo
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {todos.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Todos</div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {todos.filter(t => t.completed).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {todos.filter(t => !t.completed).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {todos.filter(t => !t.completed && isOverdue(t.dueDate)).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Overdue</div>
        </div>
      </div>

      {/* Add Todo Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6"
          >
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New Todo</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title *
                </label>
                <Input
                  value={newTodo.title}
                  onChange={(e) => setNewTodo(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="What do you want to learn or do?"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Due Date
                </label>
                <Input
                  type="date"
                  value={newTodo.dueDate}
                  onChange={(e) => setNewTodo(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time
                </label>
                <Input
                  type="time"
                  value={newTodo.time}
                  onChange={(e) => setNewTodo(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={newTodo.status}
                  onChange={(e) => setNewTodo(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {statuses.map(status => (
                    <option key={status.id} value={status.id}>
                      {status.label}
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
                value={newTodo.description}
                onChange={(e) => setNewTodo(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Additional details..."
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={newTodo.category}
                  onChange={(e) => setNewTodo(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Priority
                </label>
                <select
                  value={newTodo.priority}
                  onChange={(e) => setNewTodo(prev => ({ ...prev, priority: e.target.value }))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {priorities.map(priority => (
                    <option key={priority.id} value={priority.id}>
                      {priority.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Progress: {newTodo.progress}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newTodo.progress}
                  onChange={(e) => setNewTodo(prev => ({ ...prev, progress: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Links (Optional)
              </label>
              {newTodo.links.map((link, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                  <Input
                    value={link.url}
                    onChange={(e) => updateLink(index, 'url', e.target.value, newTodo, setNewTodo)}
                    placeholder="https://example.com"
                  />
                  <div className="flex gap-2">
                    <Input
                      value={link.title}
                      onChange={(e) => updateLink(index, 'title', e.target.value, newTodo, setNewTodo)}
                      placeholder="Link title"
                      className="flex-1"
                    />
                    {newTodo.links.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeLink(index, newTodo, setNewTodo)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addLinkField(newTodo, setNewTodo)}
                className="mt-2"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Link
              </Button>
            </div>

            <div className="mb-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={newTodo.visible}
                  onChange={(e) => setNewTodo(prev => ({ ...prev, visible: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Visible on homepage
                </span>
              </label>
            </div>

            <div className="flex gap-3">
              <Button onClick={addTodo} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Todo
              </Button>
              <Button onClick={() => setShowForm(false)} variant="outline">
                Cancel
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Todos List */}
      <div className="space-y-4">
        {todos.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No todos yet</h3>
            <p className="text-gray-600 dark:text-gray-400">Create your first todo to get started!</p>
          </div>
        ) : (
          todos.map((todo) => {
            const CategoryIcon = getCategoryIcon(todo.category);
            const categoryColor = getCategoryColor(todo.category);
            const priorityColor = getPriorityColor(todo.priority);
            const overdue = isOverdue(todo.dueDate);

            return (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`bg-white dark:bg-gray-800 border rounded-lg p-6 transition-all duration-200 ${
                  todo.completed 
                    ? 'border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10' 
                    : overdue 
                    ? 'border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/10'
                    : 'border-gray-200 dark:border-gray-700 hover:shadow-md'
                }`}
              >
                {editingId === todo.id ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        value={editForm.title}
                        onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Todo title"
                      />
                      <Input
                        type="date"
                        value={editForm.dueDate}
                        onChange={(e) => setEditForm(prev => ({ ...prev, dueDate: e.target.value }))}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        type="time"
                        value={editForm.time}
                        onChange={(e) => setEditForm(prev => ({ ...prev, time: e.target.value }))}
                        placeholder="Time"
                      />
                      <select
                        value={editForm.status}
                        onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value }))}
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        {statuses.map(status => (
                          <option key={status.id} value={status.id}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Description"
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      rows={2}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <select
                        value={editForm.category}
                        onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                      
                      <select
                        value={editForm.priority}
                        onChange={(e) => setEditForm(prev => ({ ...prev, priority: e.target.value }))}
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        {priorities.map(priority => (
                          <option key={priority.id} value={priority.id}>
                            {priority.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Progress: {editForm.progress}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={editForm.progress}
                        onChange={(e) => setEditForm(prev => ({ ...prev, progress: parseInt(e.target.value) }))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Links
                      </label>
                      {editForm.links.map((link, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                          <Input
                            value={link.url || ''}
                            onChange={(e) => updateLink(index, 'url', e.target.value, editForm, setEditForm)}
                            placeholder="https://example.com"
                          />
                          <div className="flex gap-2">
                            <Input
                              value={link.title || ''}
                              onChange={(e) => updateLink(index, 'title', e.target.value, editForm, setEditForm)}
                              placeholder="Link title"
                              className="flex-1"
                            />
                            {editForm.links.length > 1 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeLink(index, editForm, setEditForm)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addLinkField(editForm, setEditForm)}
                        className="mt-2"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Link
                      </Button>
                    </div>

                    <div className="mb-4">
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={editForm.visible}
                          onChange={(e) => setEditForm(prev => ({ ...prev, visible: e.target.checked }))}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Visible on homepage
                        </span>
                      </label>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={saveEdit} size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        <Check className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                      <Button onClick={cancelEdit} variant="outline" size="sm">
                        <X className="w-4 h-4 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className="mt-1 flex-shrink-0"
                    >
                      {todo.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className={`text-lg font-semibold ${
                          todo.completed 
                            ? 'text-gray-500 dark:text-gray-400 line-through' 
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {todo.title}
                        </h4>
                        
                        <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${categoryColor}-100 text-${categoryColor}-800 dark:bg-${categoryColor}-900/30 dark:text-${categoryColor}-300`}>
                            <CategoryIcon className="w-3 h-3 mr-1" />
                            {categories.find(c => c.id === todo.category)?.label}
                          </span>
                          
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${priorityColor}-100 text-${priorityColor}-800 dark:bg-${priorityColor}-900/30 dark:text-${priorityColor}-300`}>
                            {priorities.find(p => p.id === todo.priority)?.label}
                          </span>
                        </div>
                      </div>

                      {todo.description && (
                        <p className={`text-sm mb-3 ${
                          todo.completed 
                            ? 'text-gray-400 dark:text-gray-500' 
                            : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {todo.description}
                        </p>
                      )}

                      {todo.dueDate && (
                        <div className={`flex items-center gap-1 text-xs mb-3 ${
                          overdue && !todo.completed
                            ? 'text-red-600 dark:text-red-400' 
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          <Calendar className="w-3 h-3" />
                          Due: {formatDate(todo.dueDate)}
                          {overdue && !todo.completed && ' (Overdue)'}
                        </div>
                      )}

                      {todo.links && todo.links.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {todo.links.map((link, index) => (
                            <a
                              key={index}
                              href={typeof link === 'string' ? link : link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                            >
                              <ExternalLink className="w-3 h-3" />
                              {typeof link === 'string' ? `Link ${index + 1}` : (link.title || `Link ${index + 1}`)}
                            </a>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>
                          Created: {formatDate(todo.createdAt)}
                        </span>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleVisibility(todo.id)}
                            className={`p-1 transition-colors ${
                              todo.visible 
                                ? 'text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300' 
                                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                            }`}
                            title={todo.visible ? 'Hide from homepage' : 'Show on homepage'}
                          >
                            {todo.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => startEditing(todo)}
                            className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteTodo(todo.id)}
                            className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}