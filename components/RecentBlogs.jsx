"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getFeaturedBlogs } from "@/app/actions/blogs"

function BlogCard({ blog, onClick }) {
  return (
    <div
      className="cursor-pointer min-w-[320px] max-w-[320px] mx-3 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 flex flex-col transition-colors duration-200 relative"
      onClick={onClick}
    >

      {/* Category pill */}
      <div className="absolute top-2 right-2 z-20">
        <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-lg">
          {blog.category}
        </span>
      </div>

      {/* Blog Image */}
      {blog.image && (
        <div className="w-full h-40 mb-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 relative">
          <img
            src={blog.image || "/placeholder.svg"}
            alt={blog.title}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
      )}

      {/* Blog Title */}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
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
              className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium px-2 py-1 rounded-lg"
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
        <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
          <svg className="w-3 h-3 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    <section className="w-full py-16 max-w-7xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg relative transition-colors duration-300">

      {/* Header */}
      <div className="text-center mb-12 relative z-10">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
          <span className="text-sm font-medium tracking-wide uppercase text-blue-600 dark:text-blue-400">
            Recent Blogs
          </span>
          <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Latest <span className="text-blue-600 dark:text-blue-400">Posts</span>
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
