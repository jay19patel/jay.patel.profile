'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Eye, EyeOff, Save, X } from 'lucide-react'
import { toast } from 'sonner'

const GalleryTab = () => {
  const [galleryImages, setGalleryImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    src: '',
    title: '',
    description: '',
    url: '',
    visible: true
  })

  // Load gallery data
  useEffect(() => {
    loadGalleryData()
  }, [])

  const loadGalleryData = async () => {
    try {
      const galleryData = await import('@/data/gallery.json')
      setGalleryImages(galleryData.images)
      setLoading(false)
    } catch (error) {
      console.error('Error loading gallery:', error)
      toast.error('Failed to load gallery data')
      setLoading(false)
    }
  }

  const saveGalleryData = async (updatedImages) => {
    try {
      // In a real app, you'd save to an API/database
      // For now, we'll just update the state
      setGalleryImages(updatedImages)
      toast.success('Gallery updated successfully!')
    } catch (error) {
      console.error('Error saving gallery:', error)
      toast.error('Failed to save gallery data')
    }
  }

  const handleAddImage = () => {
    if (!formData.src || !formData.title || !formData.description) {
      toast.error('Please fill in all required fields')
      return
    }

    const newImage = {
      id: Date.now(),
      ...formData
    }

    const updatedImages = [...galleryImages, newImage]
    saveGalleryData(updatedImages)
    
    setShowAddForm(false)
    setFormData({ src: '', title: '', description: '', url: '', visible: true })
  }

  const handleEditImage = (id, updatedData) => {
    const updatedImages = galleryImages.map(img => 
      img.id === id ? { ...img, ...updatedData } : img
    )
    saveGalleryData(updatedImages)
    setEditingId(null)
  }

  const handleDeleteImage = (id) => {
    if (confirm('Are you sure you want to delete this image?')) {
      const updatedImages = galleryImages.filter(img => img.id !== id)
      saveGalleryData(updatedImages)
    }
  }

  const toggleVisibility = (id) => {
    const updatedImages = galleryImages.map(img => 
      img.id === id ? { ...img, visible: !img.visible } : img
    )
    saveGalleryData(updatedImages)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Add Image Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Gallery Images ({galleryImages.filter(img => img.visible).length} visible)
        </h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Image
        </button>
      </div>

      {/* Add Image Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                value={formData.src}
                onChange={(e) => setFormData({...formData, src: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Image title"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Image description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                URL (Optional)
              </label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({...formData, url: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="https://example.com"
              />
            </div>
            <div className="flex items-center">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={formData.visible}
                  onChange={(e) => setFormData({...formData, visible: e.target.checked})}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                Visible in gallery
              </label>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleAddImage}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              Add Image
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Gallery Images List */}
      <div className="space-y-4">
        {galleryImages.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white dark:bg-gray-800 p-4 rounded-lg border ${
              image.visible ? 'border-green-200 dark:border-green-700' : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Image Preview */}
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjRkJGOUY5Ii8+CjxwYXRoIGQ9Ik0xMCAxNUM3LjIzODU4IDE1IDUgMTIuNzYxNCA1IDEwQzUgNy4yMzg1OCA3LjIzODU4IDUgMTAgNUMxMi43NjE0IDUgMTUgNy4yMzg1OCAxNSAxMEMxNSAxMi43NjE0IDEyLjc2MTQgMTUgMTAgMTVaIiBzdHJva2U9IiM5Q0E0QUYiIHN0cm9rZS13aWR0aD0iMS41Ii8+CjxwYXRoIGQ9Ik0xMCAxMC41QzEwLjI3NjEgMTAuNSAxMC41IDEwLjI3NjEgMTAuNSAxMEMxMC41IDkuNzIzODggMTAuMjc2MSA5LjUgMTAgOS41QzkuNzIzODggOS41IDkuNSA5LjcyMzg4IDkuNSAxMEM5LjUgMTAuMjc2MSA5LjcyMzg4IDEwLjUgMTAgMTAuNVoiIGZpbGw9IiM5Q0E0QUYiLz4KPC9zdmc+'
                  }}
                />
              </div>

              {/* Image Details */}
              <div className="flex-1 min-w-0">
                {editingId === image.id ? (
                  <EditImageForm 
                    image={image} 
                    onSave={(updatedData) => handleEditImage(image.id, updatedData)}
                    onCancel={() => setEditingId(null)}
                  />
                ) : (
                  <>
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                          {image.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                          {image.description}
                        </p>
                        {image.url && (
                          <a 
                            href={image.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mt-2 inline-block"
                          >
                            {image.url}
                          </a>
                        )}
                      </div>
                      
                      {/* Status Badge */}
                      <div className="flex items-center gap-2 ml-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          image.visible 
                            ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200' 
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {image.visible ? 'Visible' : 'Hidden'}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 mt-4">
                      <button
                        onClick={() => toggleVisibility(image.id)}
                        className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm transition-colors ${
                          image.visible 
                            ? 'bg-orange-100 hover:bg-orange-200 text-orange-800 dark:bg-orange-800 dark:hover:bg-orange-700 dark:text-orange-200'
                            : 'bg-green-100 hover:bg-green-200 text-green-800 dark:bg-green-800 dark:hover:bg-green-700 dark:text-green-200'
                        }`}
                      >
                        {image.visible ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        {image.visible ? 'Hide' : 'Show'}
                      </button>
                      <button
                        onClick={() => setEditingId(image.id)}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 dark:bg-blue-800 dark:hover:bg-blue-700 dark:text-blue-200 rounded-lg text-sm transition-colors"
                      >
                        <Edit className="w-3 h-3" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteImage(image.id)}
                        className="flex items-center gap-1 px-3 py-1 bg-red-100 hover:bg-red-200 text-red-800 dark:bg-red-800 dark:hover:bg-red-700 dark:text-red-200 rounded-lg text-sm transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {galleryImages.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <Images className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No images in gallery yet. Add your first image!</p>
        </div>
      )}
    </div>
  )
}

// Edit Image Form Component
const EditImageForm = ({ image, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    src: image.src,
    title: image.title,
    description: image.description,
    url: image.url || '',
    visible: image.visible
  })

  const handleSubmit = () => {
    if (!formData.src || !formData.title || !formData.description) {
      toast.error('Please fill in all required fields')
      return
    }
    onSave(formData)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Image URL *
          </label>
          <input
            type="url"
            value={formData.src}
            onChange={(e) => setFormData({...formData, src: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            URL (Optional)
          </label>
          <input
            type="url"
            value={formData.url}
            onChange={(e) => setFormData({...formData, url: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          />
        </div>
        <div className="flex items-center">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={formData.visible}
              onChange={(e) => setFormData({...formData, visible: e.target.checked})}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            Visible in gallery
          </label>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
        >
          <Save className="w-3 h-3" />
          Save
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
        >
          <X className="w-3 h-3" />
          Cancel
        </button>
      </div>
    </div>
  )
}

export default GalleryTab