"use client"
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Calendar } from 'lucide-react'

const AnnouncementCard = ({ item, index, isActive }) => {
  const getTypeStyles = (type) => {
    const styles = {
      youtube: {
        bg: 'bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20',
        border: 'border-red-200 dark:border-red-800',
        accent: 'text-red-600 dark:text-red-400',
        icon: '🎥'
      },
      event: {
        bg: 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
        border: 'border-blue-200 dark:border-blue-800',
        accent: 'text-blue-600 dark:text-blue-400',
        icon: '🎤'
      },
      sponsor: {
        bg: 'bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
        border: 'border-green-200 dark:border-green-800',
        accent: 'text-green-600 dark:text-green-400',
        icon: '🤝'
      },
      course: {
        bg: 'bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
        border: 'border-purple-200 dark:border-purple-800',
        accent: 'text-purple-600 dark:text-purple-400',
        icon: '📚'
      },
      blog: {
        bg: 'bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20',
        border: 'border-indigo-200 dark:border-indigo-800',
        accent: 'text-indigo-600 dark:text-indigo-400',
        icon: '📝'
      },
      task: {
        bg: 'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20',
        border: 'border-gray-200 dark:border-gray-800',
        accent: 'text-gray-600 dark:text-gray-400',
        icon: item.icon || '📋'
      }
    }
    return styles[type] || styles.task
  }

  const typeStyle = getTypeStyles(item.type)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-lg group"
    >
      {/* Background Image */}
      <div className="relative h-80 md:h-96">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        ) : (
          /* Fallback background */
          <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl opacity-80">{typeStyle.icon}</span>
            </div>
          </div>
        )}
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Text overlay */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <motion.h3 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center leading-tight drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {item.title}
          </motion.h3>
        </div>
        
        {/* Link button at bottom center */}
        {item.link && (
          <motion.a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>
              {item.type === 'youtube' ? 'Watch' :
               item.type === 'event' ? 'Join' :
               item.type === 'course' ? 'Enroll' :
               item.type === 'blog' ? 'Read' :
               'View'}
            </span>
            <ExternalLink className="w-3 h-3" />
          </motion.a>
        )}
      </div>
    </motion.div>
  )
}

export default function AnnouncementDisplay() {
  const [items, setItems] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const announcementData = await import('@/data/announcements.json')

        // Combine announcements and current tasks
        const announcements = (announcementData.announcements || [])
          .filter(item => item.isActive)
          .map(item => ({ ...item, type: item.type || 'announcement' }))

        const tasks = (announcementData.currentTasks || [])
          .filter(task => task.status === 'in_progress' || task.status === 'todo')
          .map(task => ({ ...task, type: 'task' }))

        const combined = [...announcements, ...tasks]
          .sort((a, b) => {
            const dateA = new Date(a.createdAt || a.dueDate || '2024-01-01')
            const dateB = new Date(b.createdAt || b.dueDate || '2024-01-01')
            return dateB - dateA
          })

        setItems(combined)
      } catch (error) {
        console.error('Error fetching announcements:', error)
        setItems([])
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (!isAutoPlaying || items.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, items.length])


  if (items.length === 0) {
    return (
      <section className="w-full py-16 max-w-6xl mx-auto text-center">
        <p className="text-gray-600 dark:text-gray-400">No updates available at the moment.</p>
      </section>
    )
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center justify-center space-x-2 mb-6"
        >
          <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
          <span className="text-sm font-medium tracking-wide uppercase text-blue-600 dark:text-blue-400">
            Current Updates
          </span>
          <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
        >
          What's <span className="text-blue-600 dark:text-blue-400 relative">Happening<div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded" /></span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto"
        >
          Stay updated with my latest projects, announcements, and current tasks. Get real-time insights into my development journey and upcoming initiatives.
        </motion.p>
      </div>

      {/* Auto-rotating Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="relative"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Current Item */}
        <AnimatePresence mode="wait">
          <AnnouncementCard
            key={currentIndex}
            item={items[currentIndex]}
            index={currentIndex}
            isActive={true}
          />
        </AnimatePresence>

        {/* Navigation Dots */}
        {items.length > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-blue-600 scale-125'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.section>
  )
}