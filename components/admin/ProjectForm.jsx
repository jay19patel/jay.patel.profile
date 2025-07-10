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
  Github,
  Globe,
  Play,
  Star,
  Download,
  Image as ImageIcon,
  Loader,
  CheckCircle,
  XCircle,
  Database
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getProjectBySlug, createProject, updateProject } from '@/app/actions/projects'
import { generateSlug } from '@/lib/utils'

const ProjectForm = ({ projectSlug }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const [projectData, setProjectData] = useState({
    title: '',
    subtitle: '',
    description: '',
    introduction: '',
    category: 'Web Development',
    status: 'In Progress',
    rating: 0,
    downloads: '0',
    image: '/image-1.png',
    technologies: [''],
    features: [''],
    screenshots: ['/image-1.png'],
    challenges: [''],
    learnings: [''],
    author: 'Jay Patel',
    demoUrl: '',
    githubUrl: '',
    liveUrl: '',
    featured: false,
    slug: ''
  })

  const categories = [
    'Web Development',
    'Mobile Development',
    'E-Commerce',
    'FinTech',
    'Data Science',
    'AI/ML',
    'DevOps',
    'Blockchain',
    'IoT',
    'Game Development'
  ]

  const statusOptions = ['Completed', 'In Progress', 'Planned']

  // Demo data
  const demoData = {
    title: "E-Commerce Django Store",
    subtitle: "Full-Stack E-Commerce Website",
    description: "A complete e-commerce platform built with Django framework during my final semester college project. Features include product catalog, shopping cart, user authentication, order management, and payment integration.",
    introduction: "This e-commerce platform was developed as my final semester college project using Django framework with HTML templates and Jinja templating engine. The project demonstrates a complete online shopping experience with modern web development practices. Built with focus on user experience, security, and scalability.",
    category: "E-Commerce",
    status: "Completed",
    rating: 4.8,
    downloads: "1.2K+",
    image: "/image-1.png",
    technologies: ["Django", "Python", "HTML", "CSS", "JavaScript", "Jinja2", "SQLite", "Bootstrap"],
    features: [
      "User Registration & Authentication",
      "Product Catalog with Categories",
      "Shopping Cart & Wishlist",
      "Order Management System",
      "Payment Gateway Integration",
      "Admin Dashboard",
      "Search & Filter Functionality",
      "Responsive Design"
    ],
    screenshots: [
      "/image-1.png",
      "/man.png"
    ],
    author: "Jay Patel",
    githubUrl: "https://github.com/yourusername/django-ecommerce",
    liveUrl: "https://django-ecommerce-demo.com",
    demoUrl: "https://django-ecommerce-demo.com",
    challenges: [
      "Implementing secure payment gateway",
      "Optimizing database queries for better performance",
      "Creating responsive design for all devices",
      "Managing user sessions and authentication"
    ],
    learnings: [
      "Django framework architecture",
      "Database modeling and relationships",
      "Template inheritance with Jinja2",
      "User authentication and authorization"
    ],
    featured: true
  }

  // Generate slug from title - using useCallback to prevent recreation
  const updateSlug = useCallback((title) => {
    if (!isEditing && title) {
      const newSlug = generateSlug(title)
      setProjectData(prev => {
        if (prev.slug !== newSlug) {
          return { ...prev, slug: newSlug }
        }
        return prev
      })
    }
  }, [isEditing])

  // Update slug when title changes - removed updateSlug from dependencies
  useEffect(() => {
    if (!isEditing && projectData.title) {
      const newSlug = generateSlug(projectData.title)
      if (projectData.slug !== newSlug) {
        setProjectData(prev => ({ ...prev, slug: newSlug }))
      }
    }
  }, [projectData.title, isEditing])

  // Load demo data
  const loadDemoData = () => {
    setProjectData({
      ...demoData,
      slug: generateSlug(demoData.title)
    })
  }

  // Fetch project data if editing
  useEffect(() => {
    const fetchProject = async () => {
      if (projectSlug) {
        setIsLoading(true)
        try {
          const response = await getProjectBySlug(projectSlug)
          if (response.success) {
            setProjectData(response.data)
            setIsEditing(true)
          } else {
            setMessage('Failed to fetch project data')
            setMessageType('error')
          }
        } catch (error) {
          setMessage('Error fetching project data')
          setMessageType('error')
        }
        setIsLoading(false)
      }
    }

    fetchProject()
  }, [projectSlug])

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setProjectData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Handle array fields
  const handleArrayFieldAdd = (field) => {
    setProjectData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }))
  }

  const handleArrayFieldUpdate = (field, index, value) => {
    setProjectData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }))
  }

  const handleArrayFieldRemove = (field, index) => {
    setProjectData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  // Save or update project
  const handleSave = async () => {
    setIsLoading(true)
    setMessage('')

    try {
      // Validation
      const requiredFields = {
        title: 'Title',
        description: 'Description',
        category: 'Category'
      }

      const missingFields = []
      for (const [field, label] of Object.entries(requiredFields)) {
        if (!projectData[field]?.trim()) {
          missingFields.push(label)
        }
      }

      // Check arrays
      if (!projectData.technologies.some(tech => tech.trim())) {
        missingFields.push('At least one technology')
      }

      if (missingFields.length > 0) {
        throw new Error(`Required fields missing: ${missingFields.join(', ')}`)
      }

      // Clean up arrays by removing empty items
      const cleanedData = {
        ...projectData,
        technologies: projectData.technologies.filter(tech => tech.trim()),
        features: projectData.features.filter(feature => feature.trim()),
        challenges: projectData.challenges.filter(challenge => challenge.trim()),
        learnings: projectData.learnings.filter(learning => learning.trim()),
        screenshots: projectData.screenshots.filter(screenshot => screenshot.trim()),
        // Add a default content if not provided
        content: projectData.description,
        // Ensure image has a value
        image: projectData.image || '/image-1.png',
        // Ensure numeric fields are numbers
        rating: parseFloat(projectData.rating) || 0,
        downloads: projectData.downloads?.toString() || '0'
      }

      let response
      if (isEditing) {
        response = await updateProject(projectData._id, cleanedData)
      } else {
        response = await createProject(cleanedData)
      }

      if (response.success) {
        setMessage(isEditing ? 'Project updated successfully' : 'Project created successfully')
        setMessageType('success')
        
        // Redirect after a short delay
        setTimeout(() => {
          router.push(`/projects/${projectData.slug}`)
        }, 1500)
      } else {
        throw new Error(response.error || 'Failed to save project')
      }
    } catch (error) {
      console.error('Project save error:', error)
      setMessage(error.message)
      setMessageType('error')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading && !projectData.title) {
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
          onClick={() => router.push('/admin/projects')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
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
            onClick={() => router.push(`/projects/${projectData.slug}`)}
            disabled={!projectData.slug}
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
            {isEditing ? 'Update Project' : 'Create Project'}
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
                value={projectData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter project title"
                className="border-gray-200 dark:border-gray-800"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={projectData.slug}
                readOnly
                className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={projectData.subtitle}
                onChange={(e) => handleInputChange('subtitle', e.target.value)}
                placeholder="Enter project subtitle"
                className="border-gray-200 dark:border-gray-800"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={projectData.category}
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
                <Label htmlFor="status">Status</Label>
                <Select
                  value={projectData.status}
                  onValueChange={(value) => handleInputChange('status', value)}
                >
                  <SelectTrigger className="border-gray-200 dark:border-gray-800">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(status => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={projectData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter project description"
                className="min-h-[120px] border-gray-200 dark:border-gray-800"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="introduction">Introduction</Label>
              <Textarea
                id="introduction"
                value={projectData.introduction}
                onChange={(e) => handleInputChange('introduction', e.target.value)}
                placeholder="Enter detailed project introduction"
                className="min-h-[120px] border-gray-200 dark:border-gray-800"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="rating">Rating (0-5)</Label>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  <Input
                    id="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={projectData.rating}
                    onChange={(e) => handleInputChange('rating', parseFloat(e.target.value))}
                    placeholder="Enter rating"
                    className="border-gray-200 dark:border-gray-800"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="downloads">Downloads</Label>
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <Input
                    id="downloads"
                    value={projectData.downloads}
                    onChange={(e) => handleInputChange('downloads', e.target.value)}
                    placeholder="e.g., 1.2K+"
                    className="border-gray-200 dark:border-gray-800"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Main Image URL</Label>
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                <Input
                  id="image"
                  value={projectData.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  placeholder="Enter main image URL"
                  className="border-gray-200 dark:border-gray-800"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={projectData.featured}
                onCheckedChange={(checked) => handleInputChange('featured', checked)}
              />
              <Label htmlFor="featured">Featured Project</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Links */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Project Links</h2>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4" />
                <Input
                  id="githubUrl"
                  value={projectData.githubUrl}
                  onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                  placeholder="https://github.com/username/repo"
                  className="border-gray-200 dark:border-gray-800"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="liveUrl">Live URL</Label>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <Input
                  id="liveUrl"
                  value={projectData.liveUrl}
                  onChange={(e) => handleInputChange('liveUrl', e.target.value)}
                  placeholder="https://yourproject.com"
                  className="border-gray-200 dark:border-gray-800"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="demoUrl">Demo URL</Label>
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                <Input
                  id="demoUrl"
                  value={projectData.demoUrl}
                  onChange={(e) => handleInputChange('demoUrl', e.target.value)}
                  placeholder="https://demo.yourproject.com"
                  className="border-gray-200 dark:border-gray-800"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technologies */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Technologies *</h2>
            <Button
              onClick={() => handleArrayFieldAdd('technologies')}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Technology
            </Button>
          </div>

          <div className="space-y-4">
            {projectData.technologies.map((tech, index) => (
              <div key={index} className="flex items-center gap-3">
                <Input
                  value={tech}
                  onChange={(e) => handleArrayFieldUpdate('technologies', index, e.target.value)}
                  placeholder="Enter technology"
                  className="border-gray-200 dark:border-gray-800"
                />
                <Button
                  onClick={() => handleArrayFieldRemove('technologies', index)}
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-600"
                  disabled={projectData.technologies.length === 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Features</h2>
            <Button
              onClick={() => handleArrayFieldAdd('features')}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Feature
            </Button>
          </div>

          <div className="space-y-4">
            {projectData.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <Input
                  value={feature}
                  onChange={(e) => handleArrayFieldUpdate('features', index, e.target.value)}
                  placeholder="Enter feature"
                  className="border-gray-200 dark:border-gray-800"
                />
                <Button
                  onClick={() => handleArrayFieldRemove('features', index)}
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-600"
                  disabled={projectData.features.length === 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Screenshots */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Screenshots</h2>
            <Button
              onClick={() => handleArrayFieldAdd('screenshots')}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Screenshot
            </Button>
          </div>

          <div className="space-y-4">
            {projectData.screenshots.map((screenshot, index) => (
              <div key={index} className="flex items-center gap-3">
                <Input
                  value={screenshot}
                  onChange={(e) => handleArrayFieldUpdate('screenshots', index, e.target.value)}
                  placeholder="Enter screenshot URL"
                  className="border-gray-200 dark:border-gray-800"
                />
                <Button
                  onClick={() => handleArrayFieldRemove('screenshots', index)}
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-600"
                  disabled={projectData.screenshots.length === 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Challenges */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Challenges</h2>
            <Button
              onClick={() => handleArrayFieldAdd('challenges')}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Challenge
            </Button>
          </div>

          <div className="space-y-4">
            {projectData.challenges.map((challenge, index) => (
              <div key={index} className="flex items-center gap-3">
                <Textarea
                  value={challenge}
                  onChange={(e) => handleArrayFieldUpdate('challenges', index, e.target.value)}
                  placeholder="Describe a challenge you faced"
                  className="min-h-[80px] border-gray-200 dark:border-gray-800"
                />
                <Button
                  onClick={() => handleArrayFieldRemove('challenges', index)}
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-600"
                  disabled={projectData.challenges.length === 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learnings */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Key Learnings</h2>
            <Button
              onClick={() => handleArrayFieldAdd('learnings')}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Learning
            </Button>
          </div>

          <div className="space-y-4">
            {projectData.learnings.map((learning, index) => (
              <div key={index} className="flex items-center gap-3">
                <Textarea
                  value={learning}
                  onChange={(e) => handleArrayFieldUpdate('learnings', index, e.target.value)}
                  placeholder="Describe what you learned"
                  className="min-h-[80px] border-gray-200 dark:border-gray-800"
                />
                <Button
                  onClick={() => handleArrayFieldRemove('learnings', index)}
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-600"
                  disabled={projectData.learnings.length === 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProjectForm 