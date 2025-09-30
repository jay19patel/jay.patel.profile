"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, ArrowUpRight } from "lucide-react"
import { MagicCard } from "@/components/ui/magic-card"

function BlogCard({ blog, onClick, isActive }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="cursor-pointer w-full max-w-5xl mx-auto"
      onClick={onClick}
    >
      <MagicCard
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-6 shadow-lg transition-all duration-500"
        gradientColor="#3b82f6"
        gradientOpacity={0.1}
        gradientFrom="#3b82f6"
        gradientTo="#8b5cf6"
      >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
        {/* Blog Image */}
        <div className="order-2 lg:order-1 lg:col-span-2">
          {blog.image && (
            <div className="relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 aspect-[4/3]">
              <img
                src={blog.image || "/placeholder.svg"}
                alt={blog.title}
                className="object-cover w-full h-full"
                loading="lazy"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-blue-500 text-white text-xs font-medium px-2.5 py-1 rounded-lg shadow-lg">
                  {blog.category}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="order-1 lg:order-2 lg:col-span-3 space-y-4">
          {/* Date */}
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Calendar className="w-3 h-3" />
            <span>
              {blog.publishedDate
                ? new Date(blog.publishedDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : ""}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
            {blog.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm line-clamp-2">
            {blog.excerpt || blog.description || "No description available."}
          </p>

          {/* Tags */}
          {Array.isArray(blog.tags) && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {blog.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={tag + idx}
                  className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium px-2 py-1 rounded-md"
                >
                  #{tag}
                </span>
              ))}
              {blog.tags.length > 3 && (
                <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                  +{blog.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Read More Button */}
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium group transition-colors text-sm">
            <span>Read Article</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </div>
      </div>
      </MagicCard>
    </motion.div>
  )
}

export default function RecentBlogs() {
  const [blogs, setBlogs] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadBlogs() {
      try {
        // Import API utility
        const { fetchBlogs } = await import('@/lib/api')
        // Fetch latest 5 blogs
        const blogs = await fetchBlogs(5)
        setBlogs(blogs)
      } catch (e) {
        console.error("Failed to fetch blogs:", e.message)
        setBlogs([])
      }
    }
    loadBlogs()
  }, [])

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || blogs.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % blogs.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, blogs.length])

  // Function to navigate to specific slide
  const goToSlide = (index) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    // Resume autoplay after 3 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 3000)
  }


  if (blogs.length === 0) {
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
            <span className="text-sm font-medium tracking-wide uppercase text-blue-600 dark:text-blue-400">Latest Articles</span>
            <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
          >
            My <span className="text-blue-600 dark:text-blue-400 relative">Insights<div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded" /></span>
          </motion.h2>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Something Is Building For You! 🚀
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
            I'm crafting some amazing articles and insights to share with you.
            Come back soon for exciting content about development, tech trends, and more!
          </p>
          <div className="mt-6 text-sm text-blue-600 dark:text-blue-400 font-medium">
            Coming Soon...
          </div>
        </div>
      </motion.section>
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
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
            <span className="text-sm font-medium tracking-wide uppercase text-blue-600 dark:text-blue-400">Latest Articles</span>
            <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
          >
            My <span className="text-blue-600 dark:text-blue-400 relative">Insights<div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded" /></span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto"
          >
            Insights, tutorials, and thoughts on technology, development best practices, and the latest trends in software engineering.
          </motion.p>
        </div>

        {/* Main Carousel */}
        <div className="relative">
          {/* Current Blog Card */}
          <AnimatePresence mode="wait">
            <BlogCard
              key={currentIndex}
              blog={blogs[currentIndex]}
              onClick={() => router.push(`/blog/${blogs[currentIndex].slug}`)}
              isActive={true}
            />
          </AnimatePresence>

        </div>

        {/* Indicators */}
        {blogs.length > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            {blogs.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
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
