'use client'

import React, { useState, useEffect } from 'react'
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
  XCircle
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

  // Update slug when title changes
  useEffect(() => {
    if (!isEditing) {
      const newSlug = generateSlug(projectData.title)
      setProjectData(prev => ({ ...prev, slug: newSlug }))
    }
  }, [projectData.title, isEditing])

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
      if (!projectData.title.trim()) {
        throw new Error('Title is required')
      }
      if (!projectData.description.trim()) {
        throw new Error('Description is required')
      }
      if (!projectData.technologies.some(tech => tech.trim())) {
        throw new Error('At least one technology is required')
      }

      // Filter out empty array items
      const cleanedData = {
        ...projectData,
        technologies: projectData.technologies.filter(tech => tech.trim()),
        features: projectData.features.filter(feature => feature.trim()),
        challenges: projectData.challenges.filter(challenge => challenge.trim()),
        learnings: projectData.learnings.filter(learning => learning.trim()),
        screenshots: projectData.screenshots.filter(screenshot => screenshot.trim())
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
          router.push('/admin/projects')
        }, 1500)
      } else {
        throw new Error(response.error || 'Failed to save project')
      }
    } catch (error) {
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
                <Label htmlFor="category">Category</Label>
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
                className="min-h-[100px] border-gray-200 dark:border-gray-800"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="introduction">Introduction</Label>
              <Textarea
                id="introduction"
                value={projectData.introduction}
                onChange={(e) => handleInputChange('introduction', e.target.value)}
                placeholder="Enter project introduction"
                className="min-h-[150px] border-gray-200 dark:border-gray-800"
              />
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

      {/* Technologies */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Technologies</h2>
          
          <div className="space-y-3">
            {projectData.technologies.map((tech, index) => (
              <div key={index} className="flex items-center gap-3">
                <Input
                  value={tech}
                  onChange={(e) => handleArrayFieldUpdate('technologies', index, e.target.value)}
                  placeholder="Enter technology"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleArrayFieldRemove('technologies', index)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => handleArrayFieldAdd('technologies')}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Technology
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Features</h2>
          
          <div className="space-y-3">
            {projectData.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <Input
                  value={feature}
                  onChange={(e) => handleArrayFieldUpdate('features', index, e.target.value)}
                  placeholder="Enter feature"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleArrayFieldRemove('features', index)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => handleArrayFieldAdd('features')}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Feature
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Challenges & Learnings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Challenges</h2>
            
            <div className="space-y-3">
              {projectData.challenges.map((challenge, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Input
                    value={challenge}
                    onChange={(e) => handleArrayFieldUpdate('challenges', index, e.target.value)}
                    placeholder="Enter challenge"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleArrayFieldRemove('challenges', index)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => handleArrayFieldAdd('challenges')}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Challenge
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Learnings</h2>
            
            <div className="space-y-3">
              {projectData.learnings.map((learning, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Input
                    value={learning}
                    onChange={(e) => handleArrayFieldUpdate('learnings', index, e.target.value)}
                    placeholder="Enter learning"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleArrayFieldRemove('learnings', index)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => handleArrayFieldAdd('learnings')}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Learning
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* URLs & Stats */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">URLs & Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4" />
                <Input
                  id="githubUrl"
                  value={projectData.githubUrl}
                  onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                  placeholder="Enter GitHub repository URL"
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
                  placeholder="Enter live project URL"
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
                  placeholder="Enter demo URL"
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
                />
              </div>
            </div>

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
                />
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
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Screenshots */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Screenshots</h2>
          
          <div className="space-y-3">
            {projectData.screenshots.map((screenshot, index) => (
              <div key={index} className="flex items-center gap-3">
                <Input
                  value={screenshot}
                  onChange={(e) => handleArrayFieldUpdate('screenshots', index, e.target.value)}
                  placeholder="Enter screenshot URL"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleArrayFieldRemove('screenshots', index)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => handleArrayFieldAdd('screenshots')}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Screenshot
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProjectForm 