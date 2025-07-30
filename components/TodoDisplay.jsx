'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Calendar, 
  Target, 
  Clock, 
  ExternalLink
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const TypewriterText = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 80 + delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return (
    <span className="inline-block">
      {displayText}
      {currentIndex < text.length && (
        <span className="animate-pulse text-blue-500 dark:text-blue-400">|</span>
      )}
    </span>
  );
};

export default function TodoDisplay() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const response = await fetch('/api/todos');
      if (response.ok) {
        const data = await response.json();
        setTodos(data.todos || []);
      }
    } catch (error) {
      console.error('Error loading todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'learning', label: 'Learning', icon: BookOpen, color: 'blue' },
    { id: 'event', label: 'Event', icon: Calendar, color: 'purple' },
    { id: 'task', label: 'Task', icon: Target, color: 'green' },
    { id: 'reminder', label: 'Reminder', icon: Clock, color: 'orange' }
  ];

  const getCategoryData = (categoryId) => {
    return categories.find(c => c.id === categoryId) || categories[0];
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const activeTodos = todos.filter(todo => todo.visible !== false);
  const visibleTodos = activeTodos.filter(todo => !todo.completed);
  const completedTodos = activeTodos.filter(todo => todo.completed);

  if (loading) {
    return (
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (activeTodos.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-16 max-w-7xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg relative transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 px-8"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
            <span className="text-sm font-medium tracking-wide uppercase text-blue-600 dark:text-blue-400">Currently Learning</span>
            <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            My <span className="text-blue-600 dark:text-blue-400 relative">Focus<div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded" /></span>
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            My ongoing projects and skills I'm currently developing and mastering.
          </p>
        </div>

        {/* Todos List */}
        <div className="space-y-4">
          {[...visibleTodos, ...completedTodos].slice(0, 8).map((todo, index) => {
            const categoryData = getCategoryData(todo.category);
            const CategoryIcon = categoryData.icon;

            return (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                className={`flex items-center gap-4 p-4 rounded-xl transition-colors group ${
                  todo.completed 
                    ? 'bg-gray-100/50 dark:bg-gray-800/50 opacity-75'
                    : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {/* Category Icon */}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${categoryData.color}-100 dark:bg-${categoryData.color}-900/30 flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <CategoryIcon className={`w-5 h-5 text-${categoryData.color}-600 dark:text-${categoryData.color}-400`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-lg font-semibold transition-colors ${
                      todo.completed 
                        ? 'text-gray-500 dark:text-gray-400 line-through'
                        : 'text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'
                    }`}>
                      <TypewriterText text={todo.title} delay={index * 200} />
                    </h3>
                    
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {/* Date */}
                      {todo.dueDate && (
                        <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(todo.dueDate)}</span>
                        </div>
                      )}

                      {/* Category Badge */}
                      <Badge 
                        variant={categoryData.color}
                        className="text-xs"
                      >
                        {categoryData.label}
                      </Badge>

                      {/* Links */}
                      {todo.links && todo.links.length > 0 && (
                        <div className="flex gap-1">
                          {todo.links.slice(0, 1).map((link, linkIndex) => (
                            <a
                              key={linkIndex}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          ))}
                        </div>
                      )}

                    </div>
                  </div>

                  {/* Description */}
                  {todo.description && (
                    <p className={`text-sm mt-1 line-clamp-1 ${
                      todo.completed 
                        ? 'text-gray-400 dark:text-gray-500 line-through'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {todo.description}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Show more indicator */}
        {[...visibleTodos, ...completedTodos].length > 8 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
          >
            <span className="text-sm text-gray-500 dark:text-gray-400">
              and {[...visibleTodos, ...completedTodos].length - 8} more items...
            </span>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}