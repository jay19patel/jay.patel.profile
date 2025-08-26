"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, ArrowUpRight } from "lucide-react"

function BlogCard({ blog, onClick, isActive }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
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
        // Import blogs from JSON file and get latest 5
        const blogsData = await import('@/data/blogs.json')
        const sortedBlogs = (blogsData.blogs || [])
          .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
          .slice(0, 5)
        setBlogs(sortedBlogs)
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
