"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { getFeaturedBlogs } from "@/app/actions/blogs"
import { ChevronLeft, ChevronRight, Calendar, ArrowUpRight } from "lucide-react"

function BlogCard({ blog, onClick, isActive }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`cursor-pointer w-full max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 transition-all duration-500 hover:border-blue-300 dark:hover:border-blue-600 ${
        isActive 
          ? 'border-gray-200 dark:border-gray-700' 
          : 'border-gray-200 dark:border-gray-700'
      }`}
      onClick={onClick}
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
    </motion.div>
  )
}

export default function RecentBlogs() {
  const [blogs, setBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setIsLoading(true)
        const recent = await getFeaturedBlogs()
        setBlogs(recent.data || [])
      } catch (e) {
        console.error("Failed to fetch blogs:", e)
        setBlogs([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || blogs.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % blogs.length)
    }, 3000) // 3 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, blogs.length])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % blogs.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + blogs.length) % blogs.length)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  if (isLoading) {
    return (
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Latest Articles
          </h2>
        </div>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </section>
    )
  }

  if (blogs.length === 0) {
    return (
      <section className="w-full py-16 max-w-6xl mx-auto text-center">
        <p className="text-gray-600 dark:text-gray-400">No articles available at the moment.</p>
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
            <span className="text-sm font-medium tracking-wide uppercase text-blue-600 dark:text-blue-400">Latest Articles</span>
            <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            My <span className="text-blue-600 dark:text-blue-400 relative">Insights<div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded" /></span>
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on technology and development.
          </p>
        </div>

        {/* Main Carousel */}
        <div className="relative">
          {/* Current Blog Card */}
          <AnimatePresence mode="wait">
            <BlogCard
              key={currentIndex}
              blog={blogs[currentIndex]}
              onClick={() => router.push(`/blog/${blogs[currentIndex].slug || blogs[currentIndex]._id}`)}
              isActive={true}
            />
          </AnimatePresence>

          {/* Navigation Arrows */}
          {blogs.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-200 z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-200 z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
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

        {/* Progress Bar */}
        {blogs.length > 1 && isAutoPlaying && (
          <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 overflow-hidden">
            <motion.div
              className="h-full bg-blue-600 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "linear" }}
              key={currentIndex}
            />
          </div>
        )}
      </motion.div>
    </motion.section>
  )
}
