'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Users } from 'lucide-react';

const TodoDisplay = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos');
      const data = await response.json();
      console.log('Todos API response:', data);
      if (data.success) {
        const visibleTodos = data.todos.filter(todo => todo.visible);
        console.log('Visible todos:', visibleTodos);
        setTodos(visibleTodos);
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'working':
        return {
          bg: 'bg-gradient-to-r from-pink-500 to-rose-500',
          text: 'text-white',
          dot: 'bg-pink-500',
          shadow: 'shadow-pink-500/30'
        };
      case 'pending':
        return {
          bg: 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700',
          text: 'text-gray-900 dark:text-white',
          dot: 'bg-gray-400',
          shadow: 'shadow-gray-300 dark:shadow-gray-600'
        };
      case 'ongoing':
        return {
          bg: 'bg-gradient-to-r from-blue-500 to-indigo-500',
          text: 'text-white',
          dot: 'bg-blue-500',
          shadow: 'shadow-blue-500/30'
        };
      case 'completed':
        return {
          bg: 'bg-gradient-to-r from-green-500 to-emerald-500',
          text: 'text-white',
          dot: 'bg-green-500',
          shadow: 'shadow-green-500/30'
        };
      case 'paused':
        return {
          bg: 'bg-gradient-to-r from-yellow-400 to-orange-400',
          text: 'text-white',
          dot: 'bg-yellow-500',
          shadow: 'shadow-yellow-500/30'
        };
      case 'cancelled':
        return {
          bg: 'bg-gradient-to-r from-red-500 to-red-600',
          text: 'text-white',
          dot: 'bg-red-500',
          shadow: 'shadow-red-500/30'
        };
      case 'review':
        return {
          bg: 'bg-gradient-to-r from-purple-500 to-violet-500',
          text: 'text-white',
          dot: 'bg-purple-500',
          shadow: 'shadow-purple-500/30'
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700',
          text: 'text-gray-900 dark:text-white',
          dot: 'bg-gray-400',
          shadow: 'shadow-gray-300 dark:shadow-gray-600'
        };
    }
  };

  if (loading) {
    return null;
  }

  if (todos.length === 0) {
    return null;
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-2 text-blue-500 mb-4">
          <div className="w-8 h-px bg-blue-500" />
          <span className="text-sm font-semibold tracking-wide uppercase">Current Tasks</span>
          <div className="w-8 h-px bg-blue-500" />
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              What I'm <span className="text-blue-600 dark:text-blue-400 relative">Working On<div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded" /></span>
        </h2>

        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Stay updated with my current projects and upcoming tasks. Here's what I'm focusing on right now.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-2xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>
        
        {/* Todo Items */}
        <div className="space-y-6">
          {todos.map((todo, index) => {
            const statusStyle = getStatusColor(todo.status);
            const isHighlighted = todo.status === 'working';
            
            return (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative flex items-start space-x-6"
              >
                {/* Timeline Dot */}
                <div className="relative flex-shrink-0">
                  <div className={`w-4 h-4 ${statusStyle.dot} rounded-full border-4 border-white dark:border-gray-900 z-10 relative`}>
                    {todo.status === 'working' && (
                      <div className="absolute inset-0 bg-pink-500 rounded-full animate-ping opacity-75"></div>
                    )}
                  </div>
                </div>

                {/* Todo Card */}
                <div className={`flex-1 ${statusStyle.bg} ${statusStyle.shadow} rounded-xl p-4 ${isHighlighted ? 'shadow-xl' : 'shadow-md'} border border-gray-200 dark:border-gray-700 transition-all`}>
                  {/* First Row: Title, Date, Priority, Category */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3 flex-1">
                      <h3 className={`text-lg font-bold ${statusStyle.text} truncate`}>
                        {todo.title}
                      </h3>
                      
                      {/* Date */}
                      <span className={`text-xs px-2 py-1 rounded-full ${isHighlighted ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                        {new Date(todo.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      
                      {/* Priority Badge */}
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        todo.priority === 'high' 
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                          : todo.priority === 'medium'
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                          : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                      }`}>
                        {todo.priority}
                      </span>
                      
                      {/* Category Badge */}
                      <span className={`text-xs px-2 py-1 rounded-full ${isHighlighted ? 'bg-white/10 text-white/80' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'}`}>
                        {todo.category}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {/* Progress */}
                      {todo.progress !== undefined && (
                        <div className="flex items-center space-x-2">
                          <div className={`w-16 ${isHighlighted ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-700'} rounded-full h-1.5`}>
                            <div 
                              className={`h-1.5 rounded-full transition-all duration-300 ${
                                isHighlighted 
                                  ? 'bg-white' 
                                  : todo.status === 'completed' 
                                    ? 'bg-green-500' 
                                    : 'bg-blue-500'
                              }`}
                              style={{ width: `${todo.progress}%` }}
                            />
                          </div>
                          <span className={`text-xs font-semibold ${statusStyle.text}`}>
                            {todo.progress}%
                          </span>
                        </div>
                      )}
                      
                      {/* Links */}
                      {todo.links && todo.links.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {todo.links.map((link, linkIndex) => (
                            <a
                              key={linkIndex}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all ${
                                isHighlighted
                                  ? 'bg-white/20 text-white hover:bg-white/30'
                                  : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                              }`}
                            >
                              {link.url_title ? (
                                <span>{link.url_title}</span>
                              ) : (
                                <ExternalLink className="w-3 h-3" />
                              )}
                            </a>
                          ))}
                        </div>
                      )}

                    </div>
                  </div>
                  
                  {/* Second Row: Description */}
                  <p className={`${isHighlighted ? 'text-white/80' : 'text-gray-600 dark:text-gray-300'} text-sm line-clamp-2`}>
                    {todo.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default TodoDisplay;