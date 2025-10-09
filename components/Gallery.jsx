"use client"
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MagicCard } from '@/components/ui/magic-card'
import { PixelImage } from '@/components/ui/pixel-image'
import { getGallery } from '@/app/actions/gallery'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [galleryImages, setGalleryImages] = useState([])

  // Load gallery images from JSON file
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const galleryData = await getGallery()
        // Filter only visible images
        const visibleImages = galleryData?.images?.filter(image => image.visible) || []
        setGalleryImages(visibleImages)
      } catch (error) {
        console.error('Error loading gallery:', error)
        setGalleryImages([])
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
          {galleryImages.length > 0 ? (
            /* Simple Gallery Container */
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
                      <div className="w-full">
                        <div className="mb-2">
                          <h3 className="text-white font-semibold text-sm mb-1">
                            {image.title}
                          </h3>
                        </div>
                        <div className="mb-2">
                          <p className="text-gray-200 text-xs leading-relaxed">
                            {image.description}
                          </p>
                        </div>
                        {image.url && (
                          <div className="mt-2">
                            <span className="text-blue-300 text-xs underline cursor-pointer hover:text-blue-200 transition-colors">
                              View Project →
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </MagicCard>
              </motion.div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Something Amazing is Cooking! 🍳
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
                I'm working on some incredible visual content to showcase here.
                Stay tuned for an amazing collection of projects and creative work!
              </p>
            </div>
          )}
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
              <div className="w-full h-auto max-h-[70vh] flex items-center justify-center">
                <PixelImage
                  src={selectedImage.src}
                  customGrid={{ rows: 8, cols: 8 }}
                  grayscaleAnimation={true}
                  pixelFadeInDuration={600}
                  maxAnimationDelay={800}
                  colorRevealDelay={1200}
                />
              </div>
              
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
              <div className="mb-4">
                <div className="mb-3">
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
                <div className="mb-4">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base">
                    {selectedImage.description}
                  </p>
                </div>
                {selectedImage.url && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => window.open(selectedImage.url, '_blank')}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      Visit Project
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.section>
  )
}

export default Gallery