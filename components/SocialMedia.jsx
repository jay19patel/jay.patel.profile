"use client"

import { useState, useEffect } from "react"
import { Youtube, Instagram, Linkedin, Github, ExternalLink, Globe, Briefcase, Camera, Code } from "lucide-react"
import { motion } from "framer-motion"
import { getSocialMedia } from "@/app/actions/socialMedia"

const iconMap = {
  Youtube,
  Instagram, 
  Linkedin,
  Github,
  Globe,
  Briefcase,
  Camera,
  Code,
  ExternalLink
}

const SocialMedia = () => {
  const [socialPlatforms, setSocialPlatforms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        const data = await getSocialMedia()
        setSocialPlatforms(data)
      } catch (error) {
        console.error('Failed to fetch social media data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSocialMedia()
  }, [])

  if (loading) {
    return (
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full py-16 max-w-8xl mx-auto bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-lg relative overflow-hidden transition-colors duration-300"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </motion.section>
    )
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full py-16 max-w-8xl mx-auto bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-lg relative overflow-hidden transition-colors duration-300"
    >
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/10 rounded-full blur-xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center justify-center space-x-2 mb-6"
          >
            <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
            <span className="text-sm font-medium tracking-wide uppercase text-blue-600 dark:text-blue-400">Social Media</span>
            <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
          >
            Connect With Me <span className="text-blue-600 dark:text-blue-400 relative">Everywhere<div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded" /></span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto"
          >
            Follow my journey across different platforms for diverse content, tutorials, and behind-the-scenes insights into my development process.
          </motion.p>
        </div>

        {/* Social Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialPlatforms.map((platform, index) => {
            const IconComponent = iconMap[platform.icon] || Globe
            return (
              <motion.div 
                key={platform.id} 
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
                onClick={() => window.open(platform.link, '_blank')}
              >
                <article className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 h-full flex flex-col transition-colors duration-200 cursor-pointer">
                  {/* Platform Header */}
                  <section className={`${platform.bgColor} ${platform.darkBgColor} rounded-xl p-6 mb-4 text-center`}>
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-md">
                        <IconComponent className={`w-8 h-8 ${platform.iconColor}`} />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {platform.name}
                    </h3>
                    
                    {/* Username Pill */}
                    <div className="mb-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${platform.iconColor} bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-600`}>
                        {platform.username}
                      </span>
                    </div>
                    
                  </section>

                  {/* Platform Content */}
                  <div className="flex-grow space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {platform.description}
                    </p>
                  </div>
                </article>
              </motion.div>
            )
          })}
        </div>

      </div>
    </motion.section>
  )
}

export default SocialMedia 