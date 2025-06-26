'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import blogData from '@/data/blogs.json'
import { Button } from '@/components/customUi/Button'
import { Calendar, Clock, User, Tag, ArrowLeft, ArrowRight, ExternalLink, AlertCircle } from 'lucide-react'

// Content renderer component
const ContentRenderer = ({ section }) => {
  switch (section.type) {
    case 'text':
      return (
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {section.content}
          </p>
        </div>
      )

    case 'bullets':
      return (
        <div className="my-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {section.title}
          </h3>
          <ul className="space-y-3">
            {section.items.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )

    case 'table':
      return (
        <div className="my-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {section.title}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  {section.headers.map((header, index) => (
                    <th
                      key={index}
                      className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )

    case 'note':
      return (
        <div className="my-6">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                  {section.title}
                </h4>
                <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                  {section.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      )

    case 'links':
      return (
        <div className="my-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {section.title}
          </h3>
          <div className="space-y-3">
            {section.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {link.text}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {link.description}
                    </p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </div>
              </a>
            ))}
          </div>
        </div>
      )

    default:
      return null
  }
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params
  
  // Find the current blog post
  const currentBlog = blogData.blogs.find(blog => blog.slug === slug)
  
  if (!currentBlog) {
    notFound()
  }

  // Find previous and next blog posts
  const currentIndex = blogData.blogs.findIndex(blog => blog.slug === slug)
  const previousBlog = currentIndex > 0 ? blogData.blogs[currentIndex - 1] : null
  const nextBlog = currentIndex < blogData.blogs.length - 1 ? blogData.blogs[currentIndex + 1] : null

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <Image
          src={currentBlog.image}
          alt={currentBlog.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Back Button */}
        <div className="absolute top-8 left-8">
          <Link
            href="/blog"
            className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4">
              <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                {currentBlog.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              {currentBlog.title}
            </h1>
            <p className="text-xl text-gray-200 mb-6 max-w-3xl">
              {currentBlog.subtitle}
            </p>
            
            {/* Meta Information */}
            <div className="flex items-center gap-6 text-sm">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {currentBlog.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(currentBlog.publishedDate).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {currentBlog.readTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {currentBlog.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Blog Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          {/* Introduction */}
          <div className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            {currentBlog.content.introduction}
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {currentBlog.content.sections.map((section, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                {section.title && section.type !== 'bullets' && section.type !== 'table' && section.type !== 'note' && section.type !== 'links' && (
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    {section.title}
                  </h2>
                )}
                <ContentRenderer section={section} />
              </div>
            ))}
          </div>

          {/* Conclusion */}
          {currentBlog.content.conclusion && (
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Conclusion
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {currentBlog.content.conclusion}
              </p>
            </div>
          )}
        </article>

        {/* Author Section */}
        <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {currentBlog.author.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {currentBlog.author}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Software Developer & Technology Enthusiast
              </p>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Previous Post */}
          {previousBlog && (
            <Link
              href={`/blog/${previousBlog.slug}`}
              className="group p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <ArrowLeft className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">Previous Post</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                {previousBlog.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {previousBlog.readTime}
              </p>
            </Link>
          )}

          {/* Next Post */}
          {nextBlog && (
            <Link
              href={`/blog/${nextBlog.slug}`}
              className="group p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors md:text-right"
            >
              <div className="flex items-center justify-end gap-3 mb-3">
                <span className="text-sm text-gray-500 dark:text-gray-400">Next Post</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                {nextBlog.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {nextBlog.readTime}
              </p>
            </Link>
          )}
        </div>

        {/* Back to Blog CTA */}
        <div className="mt-16 text-center">
          <Link href="/blog">
            <Button>View All Articles</Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 