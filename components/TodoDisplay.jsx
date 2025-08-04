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
    return {
      bg: 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700',
      text: 'text-gray-900 dark:text-white',
      dot: 'bg-gray-400',
      shadow: 'shadow-gray-300 dark:shadow-gray-600'
    };
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
      <div className="relative max-w-4xl mx-auto px-4">
        {/* Vertical Line - Hidden on mobile */}
        <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 hidden sm:block"></div>
        
        {/* Todo Items */}
        <div className="space-y-4 sm:space-y-6">
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
                className="relative flex items-start space-x-4 sm:space-x-6"
              >
                {/* Timeline Dot - Hidden on mobile */}
                <div className="relative flex-shrink-0 hidden sm:block">
                  <div className={`w-4 h-4 ${statusStyle.dot} rounded-full border-4 border-white dark:border-gray-900 z-10 relative`}>
                    {todo.status === 'working' && (
                      <div className="absolute inset-0 bg-gray-400 rounded-full animate-ping opacity-75"></div>
                    )}
                  </div>
                </div>

                {/* Todo Card */}
                <div className={`flex-1 w-full ${statusStyle.bg} ${statusStyle.shadow} rounded-xl p-4 sm:p-6 shadow-md border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg`}>
                  {/* Mobile and Desktop Layout */}
                  <div className="space-y-3">
                    {/* Title */}
                    <h3 className={`text-lg sm:text-xl font-bold ${statusStyle.text}`}>
                      {todo.title}
                    </h3>
                    
                    {/* Badges Row - Responsive */}
                    <div className="flex flex-wrap gap-2">
                      {/* Date */}
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
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
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                        {todo.category}
                      </span>
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {todo.description}
                    </p>
                    
                    {/* Progress and Links Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      {/* Progress */}
                      {todo.progress !== undefined && (
                        <div className="flex items-center space-x-3">
                          <div className="flex-1 sm:w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full transition-all duration-300 bg-blue-500"
                              style={{ width: `${todo.progress}%` }}
                            />
                          </div>
                          <span className={`text-sm font-semibold ${statusStyle.text} min-w-[3rem]`}>
                            {todo.progress}%
                          </span>
                        </div>
                      )}
                      
                      {/* Links */}
                      {todo.links && todo.links.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {todo.links.map((link, linkIndex) => (
                            <a
                              key={linkIndex}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50"
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