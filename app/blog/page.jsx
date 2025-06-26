'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PageSection } from '@/components/customUi/PageSection'
import { Button } from '@/components/customUi/Button'
import blogData from '@/data/blogs.json'
import { Calendar, Clock, User, Tag, ArrowRight, Search } from 'lucide-react'

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const blogsPerPage = 6

  // Get unique categories
  const categories = ['All', ...new Set(blogData.blogs.map(blog => blog.category))]
  
  // Filter blogs by category and search query
  const filteredBlogs = blogData.blogs.filter(blog => {
    const categoryMatch = selectedCategory === 'All' || blog.category === selectedCategory
    const searchMatch = searchQuery === '' ||
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return categoryMatch && searchMatch
  })

  const featuredBlog = filteredBlogs.find(blog => blog.featured)
  const regularBlogs = filteredBlogs.filter(blog => !blog.featured)

  // Pagination logic
  const totalPages = Math.ceil(regularBlogs.length / blogsPerPage)
  const paginatedBlogs = regularBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  )

  // Custom props for the PageSection header
  const headerProps = {
    portfolioLabel: "Development Blog",
    showBreadcrumb: true,
    breadcrumbItems: [
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" }
    ],
    headline: ["Development", "Insights &", "Tutorials"],
    description: "Explore in-depth articles about web development, programming languages, automation, and the latest trends in technology. Learn from practical examples and industry best practices.",
    stats: [
      { count: `${blogData.blogs.length}+`, label: "Articles Published", color: "green" },
      { count: "5+", label: "Categories Covered", color: "blue" },
      { count: "1000+", label: "Readers Monthly", color: "purple" }
    ]
  }

  return (
    <PageSection {...headerProps}>
      <div className="space-y-12">
        {/* Category Filter & Search */}
        <div className="flex flex-wrap justify-center items-center gap-4">
          <div className="relative flex-grow md:flex-grow-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1) // Reset to first page
              }}
              className="w-full md:w-64 pl-12 pr-4 py-2.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
            />
          </div>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category)
                setCurrentPage(1) // Reset to first page
              }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Blog */}
        {featuredBlog && (
          <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <div className="px-3 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full">
                FEATURED
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Latest Article</span>
            </div>
            
            {(() => {
              return (
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(featuredBlog.publishedDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {featuredBlog.readTime}
                        </span>
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                        {featuredBlog.title}
                      </h2>
                      
                      <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                        {featuredBlog.excerpt}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {featuredBlog.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 text-sm rounded-full border border-gray-200 dark:border-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link href={`/blog/${featuredBlog.slug}`}>
                      <Button>Read Full Article</Button>
                    </Link>
                  </div>

                  <div className="relative">
                    <Image
                      src={featuredBlog.image}
                      alt={featuredBlog.title}
                      width={500}
                      height={300}
                      className="rounded-2xl shadow-lg"
                    />
                  </div>
                </div>
              )
            })()}
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {paginatedBlogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
            >
              {/* Blog Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 text-xs font-medium rounded-full">
                    {blog.category}
                  </span>
                </div>
              </div>

              {/* Blog Content */}
              <div className="p-6 space-y-4">
                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(blog.publishedDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {blog.readTime}
                  </span>
                </div>

                {/* Title and Excerpt */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {blog.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                  {blog.tags.length > 3 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 self-center">
                      +{blog.tags.length - 3} more
                    </span>
                  )}
                </div>

                {/* Read More Link */}
                <Link
                  href={`/blog/${blog.slug}`}
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium text-sm hover:gap-3 transition-all duration-300"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 pt-8">
            <Button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-gray-700 dark:text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-600 text-lg">
              No articles found in this category.
            </div>
          </div>
        )}

      </div>
    </PageSection>
  )
}

export default BlogPage 