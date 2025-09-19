"use client"
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MagicCard } from '@/components/ui/magic-card'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [galleryImages, setGalleryImages] = useState([])

  // Load gallery images from JSON file
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const galleryData = await import('@/data/gallery.json')
        // Filter only visible images
        const visibleImages = galleryData.images.filter(image => image.visible)
        setGalleryImages(visibleImages)
      } catch (error) {
        console.error('Error loading gallery:', error)
      }
    }

    fetchGalleryImages()
  }, [])

  // Auto-detect type based on keywords in title/description
  const getAutoType = (title, description) => {
    const text = (title + " " + description).toLowerCase()
    if (text.includes('web') || text.includes('analytics') || text.includes('dashboard') || text.includes('business')) return 'website'
    if (text.includes('design') || text.includes('ui') || text.includes('ux')) return 'design'
    if (text.includes('team') || text.includes('collaboration') || text.includes('community') || text.includes('life')) return 'lifestyle'
    return 'tech' // default
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'website': return 'bg-blue-500'
      case 'tech': return 'bg-green-500'
      case 'design': return 'bg-purple-500'
      case 'lifestyle': return 'bg-orange-500'
      default: return 'bg-gray-500'
    }
  }


  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full max-w-7xl mx-auto py-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Gallery Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400 mb-6">
            <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
            <span className="text-sm font-medium tracking-wide uppercase">Gallery</span>
            <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
            Visual{" "}
            <span className="text-blue-600 dark:text-blue-400 relative">
              Showcase
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded" />
            </span>
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            A collection of inspiring visuals from web development, technology, and creative design
          </p>
        </motion.div>

        {/* Fixed Height Gallery Container with Scroll */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Simple Gallery Container */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.05 
                }}
                viewport={{ once: true }}
                className="relative group cursor-pointer mb-4 break-inside-avoid"
                onClick={() => setSelectedImage(image)}
              >
                <MagicCard
                  className="relative overflow-hidden rounded-lg bg-gray-200/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300"
                  gradientColor="#3b82f6"
                  gradientOpacity={0.06}
                  gradientFrom="#3b82f6"
                  gradientTo="#8b5cf6"
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-auto object-cover transition-all duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-semibold text-sm mb-1">
                            {image.title}
                          </h3>
                          <p className="text-gray-200 text-xs line-clamp-2">
                            {image.description}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs text-white font-medium ${getTypeColor(getAutoType(image.title, image.description))} ml-2 flex-shrink-0`}>
                          {getAutoType(image.title, image.description)}
                        </span>
                      </div>
                    </div>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto object-contain max-h-[70vh]"
              />
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors text-xl"
              >
                ×
              </button>
            </div>
            
            {/* Image Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {selectedImage.url ? (
                      <h3 
                        onClick={() => window.open(selectedImage.url, '_blank')}
                        className="text-xl font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer transition-colors underline-offset-2 hover:underline"
                      >
                        {selectedImage.title}
                      </h3>
                    ) : (
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {selectedImage.title}
                      </h3>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {selectedImage.description}
                  </p>
                </div>
              </div>
              
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.section>
  )
}

export default Gallery