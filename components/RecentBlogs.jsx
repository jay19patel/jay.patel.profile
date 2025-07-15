"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getFeaturedBlogs } from "@/app/actions/blogs"

function BlogCard({ blog, onClick }) {
  return (
    <div
      className="group cursor-pointer min-w-[320px] max-w-[320px] mx-3 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 flex flex-col hover:-translate-y-3 hover:scale-105 relative overflow-hidden"
      onClick={onClick}
    >
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/20 dark:to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Category pill */}
      <div className="absolute -top-0 -right-0 z-20 p-1">
        <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border-2 border-white dark:border-gray-800 rotate-12 transform group-hover:rotate-6 transition-transform duration-300">
          {blog.category}
        </span>
      </div>

      {/* Blog Image */}
      {blog.image && (
        <div className="w-full h-40 mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 relative">
          <img
            src={blog.image || "/placeholder.svg"}
            alt={blog.title}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      {/* Blog Title */}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
        {blog.title}
      </h3>

      {/* Blog Excerpt */}
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 line-clamp-3 flex-grow">
        {blog.excerpt || blog.description || "No description available."}
      </p>

      {/* Tags */}
      {Array.isArray(blog.tags) && blog.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={tag + idx}
              className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium px-3 py-1 rounded-full border border-blue-200 dark:border-blue-700 hover:shadow-md transition-shadow duration-200"
            >
              #{tag}
            </span>
          ))}
          {blog.tags.length > 3 && (
            <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">+{blog.tags.length - 3} more</span>
          )}
        </div>
      )}

      {/* Publish Date */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
          {blog.publishedDate
            ? new Date(blog.publishedDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : ""}
        </span>
        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default function RecentBlogs() {
  const [blogs, setBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
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

  if (isLoading) {
    return (
      <section className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
            <span className="text-sm font-medium tracking-wide uppercase text-blue-600 dark:text-blue-400">
              Recent Blogs
            </span>
            <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
          </div>
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Latest <span className="text-blue-600 dark:text-blue-400 relative">Posts</span>
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
      <section className="w-full py-16 max-w-7xl mx-auto text-center">
        <p className="text-gray-600 dark:text-gray-400">No blogs available at the moment.</p>
      </section>
    )
  }

  return (
    <section className="w-full py-16 max-w-7xl mx-auto bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl relative overflow-hidden transition-colors duration-300 mt-12">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/10 rounded-full blur-xl animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <div className="text-center mb-12 relative z-10">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-8 h-px bg-gradient-to-r from-blue-600 to-purple-600" />
          <span className="text-sm font-bold tracking-wide uppercase bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Recent Blogs
          </span>
          <div className="w-8 h-px bg-gradient-to-r from-purple-600 to-blue-600" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Latest <span className="text-blue-600 dark:text-blue-400 relative">Posts<div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded" /></span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Discover my latest insights, tutorials, and thoughts on technology and development.
        </p>
      </div>

      {/* Infinite Marquee */}
      <div className="marquee-container p-8">
        <div className="marquee-track animate-marquee hover:pause-marquee">
          {/* First set of cards */}
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} onClick={() => router.push(`/blog/${blog.slug || blog._id}`)} />
          ))}
          {/* Duplicate set for seamless loop */}
          {blogs.map((blog) => (
            <BlogCard
              key={`duplicate-${blog._id}`}
              blog={blog}
              onClick={() => router.push(`/blog/${blog.slug || blog._id}`)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
