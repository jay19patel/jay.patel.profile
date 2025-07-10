'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
  XCircle,
  Database,
  Image as ImageIcon
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getBlogBySlug, createBlog, updateBlog } from '@/app/actions/blogs'
import { generateSlug } from '@/lib/utils'

const BlogForm = ({ blogSlug }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [isEditing, setIsEditing] = useState(false)

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
    slug: '',
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

  // Demo data
  const demoData = {
    title: "Complete Guide to Next.js 14: Features and Best Practices",
    subtitle: "Master the latest features of Next.js 14 including App Router, Server Components, and more",
    excerpt: "Explore the powerful features of Next.js 14 including the new App Router, Server Components, improved performance, and best practices for modern web development.",
    author: "Jay Patel",
    readTime: "8",
    tags: ["Next.js", "React", "Web Development", "JavaScript"],
    image: "/image-1.png",
    category: "Web Development",
    featured: true,
    content: {
      introduction: "Next.js 14 brings revolutionary changes to React development with enhanced performance, better developer experience, and powerful new features. In this comprehensive guide, we'll explore everything you need to know about Next.js 14.",
      sections: [
        {
          title: "Key Features of Next.js 14",
          type: "text",
          content: "Next.js 14 introduces several groundbreaking features that revolutionize how we build React applications. Let's dive into the most important ones."
        },
        {
          title: "New Features Overview",
          type: "bullets",
          items: [
            "App Router with enhanced file-based routing",
            "Server Components for better performance",
            "Improved Image Optimization",
            "Enhanced TypeScript support",
            "Better SEO optimization tools",
            "Streamlined API routes"
          ]
        },
        {
          title: "Performance Comparison",
          type: "table",
          headers: ["Feature", "Next.js 13", "Next.js 14", "Improvement"],
          rows: [
            ["Initial Load Time", "2.3s", "1.8s", "22% faster"],
            ["Bundle Size", "245KB", "198KB", "19% smaller"],
            ["Time to Interactive", "3.1s", "2.4s", "23% faster"],
            ["SEO Score", "85/100", "94/100", "11% better"]
          ]
        },
        {
          title: "Important Note",
          type: "note",
          content: "Always ensure you're using the latest version of Next.js to get the best performance and security updates. Some features may require specific Node.js versions."
        },
        {
          title: "Getting Started with App Router",
          type: "text",
          content: "The App Router is one of the most significant changes in Next.js 14. It provides a more intuitive way to organize your application structure and enables powerful features like layout persistence and nested routing."
        },
        {
          title: "Useful Resources",
          type: "links",
          links: [
            {
              text: "Official Next.js 14 Documentation",
              url: "https://nextjs.org/docs",
              description: "Complete documentation for Next.js 14"
            },
            {
              text: "Next.js GitHub Repository",
              url: "https://github.com/vercel/next.js",
              description: "Source code and latest updates"
            },
            {
              text: "Vercel Deployment Guide",
              url: "https://vercel.com/docs",
              description: "Deploy your Next.js app easily"
            }
          ]
        }
      ],
      conclusion: "Next.js 14 represents a major leap forward in React development. With its powerful features and improved performance, it's the perfect choice for building modern web applications. Start experimenting with these features today and elevate your development workflow."
    }
  }

  // Generate slug from title - using useCallback to prevent recreation
  const updateSlug = useCallback((title) => {
    if (!isEditing && title) {
      const newSlug = generateSlug(title)
      setBlogData(prev => {
        if (prev.slug !== newSlug) {
          return { ...prev, slug: newSlug }
        }
        return prev
      })
    }
  }, [isEditing])

  // Update slug when title changes - removed updateSlug from dependencies
  useEffect(() => {
    if (!isEditing && blogData.title) {
      const newSlug = generateSlug(blogData.title)
      if (blogData.slug !== newSlug) {
        setBlogData(prev => ({ ...prev, slug: newSlug }))
      }
    }
  }, [blogData.title, isEditing])

  // Load demo data
  const loadDemoData = () => {
    setBlogData({
      ...demoData,
      slug: generateSlug(demoData.title)
    })
  }

  // Fetch blog data if editing
  useEffect(() => {
    const fetchBlog = async () => {
      if (blogSlug) {
        setIsLoading(true)
        try {
          const response = await getBlogBySlug(blogSlug)
          if (response.success) {
            // Parse content if it's a string
            let contentData = response.data.content
            if (typeof contentData === 'string') {
              try {
                contentData = JSON.parse(contentData)
              } catch (e) {
                contentData = { introduction: contentData, sections: [], conclusion: '' }
              }
            }
            setBlogData({
              ...response.data,
              content: contentData
            })
            setIsEditing(true)
          } else {
            setMessage('Failed to fetch blog data')
            setMessageType('error')
          }
        } catch (error) {
          setMessage('Error fetching blog data')
          setMessageType('error')
        }
        setIsLoading(false)
      }
    }

    fetchBlog()
  }, [blogSlug])

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

  // Handle table headers
  const addTableHeader = (sectionIndex) => {
    setBlogData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        sections: prev.content.sections.map((section, i) => 
          i === sectionIndex ? { ...section, headers: [...section.headers, ''] } : section
        )
      }
    }))
  }

  const updateTableHeader = (sectionIndex, headerIndex, value) => {
    setBlogData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        sections: prev.content.sections.map((section, i) => 
          i === sectionIndex ? {
            ...section,
            headers: section.headers.map((header, j) => j === headerIndex ? value : header)
          } : section
        )
      }
    }))
  }

  const removeTableHeader = (sectionIndex, headerIndex) => {
    setBlogData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        sections: prev.content.sections.map((section, i) => 
          i === sectionIndex ? {
            ...section,
            headers: section.headers.filter((_, j) => j !== headerIndex),
            rows: section.rows.map(row => row.filter((_, j) => j !== headerIndex))
          } : section
        )
      }
    }))
  }

  // Handle table rows
  const addTableRow = (sectionIndex) => {
    setBlogData(prev => {
      const section = prev.content.sections[sectionIndex]
      const newRow = new Array(section.headers.length).fill('')
      
      return {
        ...prev,
        content: {
          ...prev.content,
          sections: prev.content.sections.map((section, i) => 
            i === sectionIndex ? { ...section, rows: [...section.rows, newRow] } : section
          )
        }
      }
    })
  }

  const updateTableCell = (sectionIndex, rowIndex, cellIndex, value) => {
    setBlogData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        sections: prev.content.sections.map((section, i) => 
          i === sectionIndex ? {
            ...section,
            rows: section.rows.map((row, j) => 
              j === rowIndex ? row.map((cell, k) => k === cellIndex ? value : cell) : row
            )
          } : section
        )
      }
    }))
  }

  const removeTableRow = (sectionIndex, rowIndex) => {
    setBlogData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        sections: prev.content.sections.map((section, i) => 
          i === sectionIndex ? {
            ...section,
            rows: section.rows.filter((_, j) => j !== rowIndex)
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

  // Save or update blog
  const handleSave = async () => {
    setIsLoading(true)
    setMessage('')

    try {
      // Validation
      const requiredFields = {
        title: 'Title',
        subtitle: 'Subtitle',
        excerpt: 'Excerpt',
        'content.introduction': 'Introduction'
      }

      const missingFields = []
      for (const [field, label] of Object.entries(requiredFields)) {
        const value = field.includes('.') 
          ? blogData.content.introduction 
          : blogData[field]
        if (!value?.trim()) {
          missingFields.push(label)
        }
      }

      if (missingFields.length > 0) {
        throw new Error(`Required fields missing: ${missingFields.join(', ')}`)
      }

      // Format content as a string
      const formattedContent = JSON.stringify(blogData.content)

      // Prepare data for submission
      const formattedData = {
        ...blogData,
        content: formattedContent,
        readTime: parseInt(blogData.readTime) || 5,
        description: blogData.excerpt,
        tags: blogData.tags.filter(tag => tag.trim())
      }

      let response
      if (isEditing) {
        response = await updateBlog(blogData._id, formattedData)
      } else {
        response = await createBlog(formattedData)
      }

      if (response.success) {
        setMessage(isEditing ? 'Blog post updated successfully' : 'Blog post created successfully')
        setMessageType('success')
        
        // Redirect after a short delay
        setTimeout(() => {
          router.push(`/blog/${blogData.slug}`)
        }, 1500)
      } else {
        throw new Error(response.error || 'Failed to save blog post')
      }
    } catch (error) {
      console.error('Blog save error:', error)
      setMessage(error.message)
      setMessageType('error')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading && !blogData.title) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
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

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => router.push('/admin/blog')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog Posts
        </Button>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={loadDemoData}
            className="flex items-center gap-2"
            disabled={isLoading}
          >
            <Database className="w-4 h-4" />
            Load Demo Data
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push(`/blog/${blogData.slug}`)}
            disabled={!blogData.slug}
            className="flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Preview
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isEditing ? 'Update Blog Post' : 'Create Blog Post'}
          </Button>
        </div>
      </div>

      {/* Basic Information */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Basic Information</h2>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={blogData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter blog title"
                className="border-gray-200 dark:border-gray-800"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={blogData.slug}
                readOnly
                className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle *</Label>
              <Input
                id="subtitle"
                value={blogData.subtitle}
                onChange={(e) => handleInputChange('subtitle', e.target.value)}
                placeholder="Enter blog subtitle"
                className="border-gray-200 dark:border-gray-800"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={blogData.category}
                  onValueChange={(value) => handleInputChange('category', value)}
                >
                  <SelectTrigger className="border-gray-200 dark:border-gray-800">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="readTime">Read Time (minutes) *</Label>
                <Input
                  id="readTime"
                  type="number"
                  min="1"
                  value={blogData.readTime}
                  onChange={(e) => handleInputChange('readTime', e.target.value)}
                  placeholder="e.g., 5"
                  className="border-gray-200 dark:border-gray-800"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Banner Image URL *</Label>
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                <Input
                  id="image"
                  value={blogData.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  placeholder="Enter banner image URL"
                  className="border-gray-200 dark:border-gray-800"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt *</Label>
              <Textarea
                id="excerpt"
                value={blogData.excerpt}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                placeholder="Enter blog excerpt"
                className="min-h-[100px] border-gray-200 dark:border-gray-800"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={blogData.featured}
                onCheckedChange={(checked) => handleInputChange('featured', checked)}
              />
              <Label htmlFor="featured">Featured Blog Post</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tags</h2>
            <Button
              onClick={addTag}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Tag
            </Button>
          </div>

          <div className="space-y-4">
            {blogData.tags.map((tag, index) => (
              <div key={index} className="flex items-center gap-3">
                <Input
                  value={tag}
                  onChange={(e) => updateTag(index, e.target.value)}
                  placeholder="Enter tag"
                  className="border-gray-200 dark:border-gray-800"
                />
                <Button
                  onClick={() => removeTag(index)}
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-600"
                  disabled={blogData.tags.length === 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Content</h2>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="introduction">Introduction *</Label>
              <Textarea
                id="introduction"
                value={blogData.content.introduction}
                onChange={(e) => handleInputChange('content.introduction', e.target.value)}
                placeholder="Enter blog introduction"
                className="min-h-[150px] border-gray-200 dark:border-gray-800"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Content Sections</h3>
                <div className="flex gap-2">
                  {sectionTypes.map(type => (
                    <Button
                      key={type.value}
                      onClick={() => addSection(type.value)}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      {type.icon}
                      {type.label}
                    </Button>
                  ))}
                </div>
              </div>

              {blogData.content.sections.map((section, index) => (
                <Card key={index} className="border border-gray-200 dark:border-gray-800">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <Input
                        value={section.title}
                        onChange={(e) => updateSection(index, 'title', e.target.value)}
                        placeholder="Section Title"
                        className="border-gray-200 dark:border-gray-800"
                      />
                      <Button
                        onClick={() => removeSection(index)}
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Section content based on type */}
                    {section.type === 'text' && (
                      <Textarea
                        value={section.content || ''}
                        onChange={(e) => updateSection(index, 'content', e.target.value)}
                        placeholder="Enter text content"
                        className="min-h-[150px] border-gray-200 dark:border-gray-800"
                      />
                    )}

                    {section.type === 'bullets' && (
                      <div className="space-y-3">
                        {section.items?.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center gap-3">
                            <Input
                              value={item}
                              onChange={(e) => updateBulletPoint(index, itemIndex, e.target.value)}
                              placeholder="Bullet point"
                              className="border-gray-200 dark:border-gray-800"
                            />
                            <Button
                              onClick={() => removeBulletPoint(index, itemIndex)}
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-600"
                              disabled={section.items.length === 1}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          onClick={() => addBulletPoint(index)}
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Add Bullet Point
                        </Button>
                      </div>
                    )}

                    {section.type === 'table' && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Table Headers</Label>
                          {section.headers?.map((header, headerIndex) => (
                            <div key={headerIndex} className="flex items-center gap-3">
                              <Input
                                value={header}
                                onChange={(e) => updateTableHeader(index, headerIndex, e.target.value)}
                                placeholder="Header name"
                                className="border-gray-200 dark:border-gray-800"
                              />
                              <Button
                                onClick={() => removeTableHeader(index, headerIndex)}
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-600"
                                disabled={section.headers.length === 1}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            onClick={() => addTableHeader(index)}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Add Header
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <Label>Table Rows</Label>
                          {section.rows?.map((row, rowIndex) => (
                            <div key={rowIndex} className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Row {rowIndex + 1}</span>
                                <Button
                                  onClick={() => removeTableRow(index, rowIndex)}
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-500 hover:text-red-600"
                                  disabled={section.rows.length === 1}
                                >
                                  <Minus className="w-4 h-4" />
                                  Remove Row
                                </Button>
                              </div>
                              <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${section.headers?.length || 1}, 1fr)` }}>
                                {row.map((cell, cellIndex) => (
                                  <Input
                                    key={cellIndex}
                                    value={cell}
                                    onChange={(e) => updateTableCell(index, rowIndex, cellIndex, e.target.value)}
                                    placeholder={section.headers?.[cellIndex] || `Cell ${cellIndex + 1}`}
                                    className="border-gray-200 dark:border-gray-800"
                                  />
                                ))}
                              </div>
                            </div>
                          ))}
                          <Button
                            onClick={() => addTableRow(index)}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Add Row
                          </Button>
                        </div>
                      </div>
                    )}

                    {section.type === 'links' && (
                      <div className="space-y-4">
                        {section.links?.map((link, linkIndex) => (
                          <div key={linkIndex} className="space-y-3 p-4 border rounded-lg">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">Link {linkIndex + 1}</h4>
                              <Button
                                onClick={() => removeLink(index, linkIndex)}
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-600"
                              >
                                <Minus className="w-4 h-4" />
                                Remove
                              </Button>
                            </div>
                            <Input
                              value={link.text}
                              onChange={(e) => updateLink(index, linkIndex, 'text', e.target.value)}
                              placeholder="Link Text"
                              className="border-gray-200 dark:border-gray-800"
                            />
                            <Input
                              value={link.url}
                              onChange={(e) => updateLink(index, linkIndex, 'url', e.target.value)}
                              placeholder="Link URL"
                              className="border-gray-200 dark:border-gray-800"
                            />
                            <Textarea
                              value={link.description}
                              onChange={(e) => updateLink(index, linkIndex, 'description', e.target.value)}
                              placeholder="Link Description"
                              className="border-gray-200 dark:border-gray-800"
                            />
                          </div>
                        ))}
                        <Button
                          onClick={() => addLink(index)}
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Add Link
                        </Button>
                      </div>
                    )}

                    {section.type === 'note' && (
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <Textarea
                          value={section.content || ''}
                          onChange={(e) => updateSection(index, 'content', e.target.value)}
                          placeholder="Enter important note"
                          className="bg-transparent border-none focus:ring-0 min-h-[100px]"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="conclusion">Conclusion *</Label>
              <Textarea
                id="conclusion"
                value={blogData.content.conclusion}
                onChange={(e) => handleInputChange('content.conclusion', e.target.value)}
                placeholder="Enter blog conclusion"
                className="min-h-[150px] border-gray-200 dark:border-gray-800"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default BlogForm 