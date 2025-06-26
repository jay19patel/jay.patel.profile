'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/customUi/Button'
import { 
  Plus, 
  Minus, 
  Save, 
  Eye, 
  ArrowLeft, 
  FileText, 
  List, 
  Table, 
  AlertCircle, 
  ExternalLink,
  Loader,
  CheckCircle,
  XCircle
} from 'lucide-react'

const BlogAdminPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  const [blogData, setBlogData] = useState({
    title: '',
    subtitle: '',
    excerpt: '',
    author: 'Jay Patel',
    readTime: '',
    tags: [''],
    image: '/image-1.png',
    category: 'Web Development',
    featured: false,
    content: {
      introduction: '',
      sections: [],
      conclusion: ''
    }
  })

  const categories = [
    'Web Development',
    'Python',
    'React',
    'AI/ML',
    'JavaScript',
    'Node.js',
    'Database',
    'DevOps'
  ]

  const sectionTypes = [
    { value: 'text', label: 'Text Content', icon: <FileText className="w-4 h-4" /> },
    { value: 'bullets', label: 'Bullet Points', icon: <List className="w-4 h-4" /> },
    { value: 'table', label: 'Table', icon: <Table className="w-4 h-4" /> },
    { value: 'note', label: 'Important Note', icon: <AlertCircle className="w-4 h-4" /> },
    { value: 'links', label: 'External Links', icon: <ExternalLink className="w-4 h-4" /> }
  ]

  // Handle form input changes
  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setBlogData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setBlogData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  // Handle tags
  const addTag = () => {
    setBlogData(prev => ({
      ...prev,
      tags: [...prev.tags, '']
    }))
  }

  const updateTag = (index, value) => {
    setBlogData(prev => ({
      ...prev,
      tags: prev.tags.map((tag, i) => i === index ? value : tag)
    }))
  }

  const removeTag = (index) => {
    setBlogData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }))
  }

  // Handle sections
  const addSection = (type) => {
    let newSection = { type, title: '' }
    
    switch (type) {
      case 'text':
        newSection.content = ''
        break
      case 'bullets':
        newSection.items = ['']
        break
      case 'table':
        newSection.headers = ['']
        newSection.rows = [['']]
        break
      case 'note':
        newSection.content = ''
        break
      case 'links':
        newSection.links = [{ text: '', url: '', description: '' }]
        break
    }

    setBlogData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        sections: [...prev.content.sections, newSection]
      }
    }))
  }

  const updateSection = (index, field, value) => {
    setBlogData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        sections: prev.content.sections.map((section, i) => 
          i === index ? { ...section, [field]: value } : section
        )
      }
    }))
  }

  const removeSection = (index) => {
    setBlogData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        sections: prev.content.sections.filter((_, i) => i !== index)
      }
    }))
  }

  // Handle bullet points
  const addBulletPoint = (sectionIndex) => {
    setBlogData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        sections: prev.content.sections.map((section, i) => 
          i === sectionIndex ? { ...section, items: [...section.items, ''] } : section
        )
      }
    }))
  }

  const updateBulletPoint = (sectionIndex, itemIndex, value) => {
    setBlogData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        sections: prev.content.sections.map((section, i) => 
          i === sectionIndex ? {
            ...section,
            items: section.items.map((item, j) => j === itemIndex ? value : item)
          } : section
        )
      }
    }))
  }

  const removeBulletPoint = (sectionIndex, itemIndex) => {
    setBlogData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        sections: prev.content.sections.map((section, i) => 
          i === sectionIndex ? {
            ...section,
            items: section.items.filter((_, j) => j !== itemIndex)
          } : section
        )
      }
    }))
  }

  // Handle links
  const addLink = (sectionIndex) => {
    setBlogData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        sections: prev.content.sections.map((section, i) => 
          i === sectionIndex ? {
            ...section,
            links: [...section.links, { text: '', url: '', description: '' }]
          } : section
        )
      }
    }))
  }

  const updateLink = (sectionIndex, linkIndex, field, value) => {
    setBlogData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        sections: prev.content.sections.map((section, i) => 
          i === sectionIndex ? {
            ...section,
            links: section.links.map((link, j) => 
              j === linkIndex ? { ...link, [field]: value } : link
            )
          } : section
        )
      }
    }))
  }

  const removeLink = (sectionIndex, linkIndex) => {
    setBlogData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        sections: prev.content.sections.map((section, i) => 
          i === sectionIndex ? {
            ...section,
            links: section.links.filter((_, j) => j !== linkIndex)
          } : section
        )
      }
    }))
  }

  // Save blog post
  const handleSave = async () => {
    setIsLoading(true)
    setMessage('')

    try {
      // Validation
      if (!blogData.title.trim()) {
        throw new Error('Title is required')
      }
      if (!blogData.excerpt.trim()) {
        throw new Error('Excerpt is required')
      }
      if (!blogData.content.introduction.trim()) {
        throw new Error('Introduction is required')
      }

      // Filter out empty tags
      const cleanedData = {
        ...blogData,
        tags: blogData.tags.filter(tag => tag.trim() !== '')
      }

      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedData),
      })

      const result = await response.json()

      if (response.ok) {
        setMessage(result.message)
        setMessageType('success')
        // Reset form
        setBlogData({
          title: '',
          subtitle: '',
          excerpt: '',
          author: 'Jay Patel',
          readTime: '',
          tags: [''],
          image: '/image-1.png',
          category: 'Web Development',
          featured: false,
          content: {
            introduction: '',
            sections: [],
            conclusion: ''
          }
        })
      } else {
        throw new Error(result.error || 'Failed to save blog post')
      }
    } catch (error) {
      setMessage(error.message)
      setMessageType('error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Create New Blog Post
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Fill out the form below to create a comprehensive blog article
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Eye className="w-4 h-4" />
            View Blog
          </Link>
        </div>
      </div>

      {/* Message Display */}
      {message && (
        <div className={`p-4 rounded-lg border flex items-center gap-3 ${
          messageType === 'success' 
            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
            : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
        }`}>
          {messageType === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <XCircle className="w-5 h-5" />
          )}
          {message}
        </div>
      )}

      {/* Basic Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Basic Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={blogData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter blog title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Read Time
            </label>
            <input
              type="text"
              value={blogData.readTime}
              onChange={(e) => handleInputChange('readTime', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="e.g., 5 min read"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Subtitle
            </label>
            <input
              type="text"
              value={blogData.subtitle}
              onChange={(e) => handleInputChange('subtitle', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter blog subtitle"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Excerpt *
            </label>
            <textarea
              value={blogData.excerpt}
              onChange={(e) => handleInputChange('excerpt', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Brief description of the blog post"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={blogData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Author
            </label>
            <input
              type="text"
              value={blogData.author}
              onChange={(e) => handleInputChange('author', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={blogData.featured}
                onChange={(e) => handleInputChange('featured', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="featured" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Mark as Featured Post
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Tags</h2>
        
        <div className="space-y-3">
          {blogData.tags.map((tag, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="text"
                value={tag}
                onChange={(e) => updateTag(index, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter tag"
              />
              <button
                onClick={() => removeTag(index)}
                className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            onClick={addTag}
            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Tag
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Content</h2>
        
        {/* Introduction */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Introduction *
          </label>
          <textarea
            value={blogData.content.introduction}
            onChange={(e) => handleInputChange('content.introduction', e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Write the blog introduction"
          />
        </div>

        {/* Sections */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Content Sections</h3>
            <div className="flex flex-wrap gap-2">
              {sectionTypes.map(type => (
                <button
                  key={type.value}
                  onClick={() => addSection(type.value)}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  title={`Add ${type.label}`}
                >
                  {type.icon}
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {blogData.content.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {sectionTypes.find(t => t.value === section.type)?.label}
                </h4>
                <button
                  onClick={() => removeSection(sectionIndex)}
                  className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>

              {/* Section Title */}
              <div className="mb-4">
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => updateSection(sectionIndex, 'title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Section title"
                />
              </div>

              {/* Section Content Based on Type */}
              {section.type === 'text' && (
                <textarea
                  value={section.content}
                  onChange={(e) => updateSection(sectionIndex, 'content', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Section content"
                />
              )}

              {section.type === 'bullets' && (
                <div className="space-y-3">
                  {section.items?.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-3">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateBulletPoint(sectionIndex, itemIndex, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Bullet point"
                      />
                      <button
                        onClick={() => removeBulletPoint(sectionIndex, itemIndex)}
                        className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addBulletPoint(sectionIndex)}
                    className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Bullet Point
                  </button>
                </div>
              )}

              {section.type === 'note' && (
                <textarea
                  value={section.content}
                  onChange={(e) => updateSection(sectionIndex, 'content', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Important note content"
                />
              )}

              {section.type === 'links' && (
                <div className="space-y-4">
                  {section.links?.map((link, linkIndex) => (
                    <div key={linkIndex} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <input
                          type="text"
                          value={link.text}
                          onChange={(e) => updateLink(sectionIndex, linkIndex, 'text', e.target.value)}
                          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="Link text"
                        />
                        <input
                          type="url"
                          value={link.url}
                          onChange={(e) => updateLink(sectionIndex, linkIndex, 'url', e.target.value)}
                          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="Link URL"
                        />
                      </div>
                      <input
                        type="text"
                        value={link.description}
                        onChange={(e) => updateLink(sectionIndex, linkIndex, 'description', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white mb-3"
                        placeholder="Link description"
                      />
                      <button
                        onClick={() => removeLink(sectionIndex, linkIndex)}
                        className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addLink(sectionIndex)}
                    className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Link
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Conclusion */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Conclusion
          </label>
          <textarea
            value={blogData.content.conclusion}
            onChange={(e) => handleInputChange('content.conclusion', e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Write the blog conclusion"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-700">
        <Link
          href="/blog"
          className="flex items-center gap-2 px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="flex gap-4">
          <button
            type="button"
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>

          <button
            onClick={handleSave}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isLoading ? 'Saving...' : 'Save Blog Post'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlogAdminPage 