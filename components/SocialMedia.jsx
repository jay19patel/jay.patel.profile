"use client"

import { useState, useEffect } from "react"
import { Youtube, Instagram, Linkedin, Github, ExternalLink, Globe, Briefcase, Camera, Code } from "lucide-react"
import { getSocialMedia } from "@/app/actions/socialMedia"
import { MagicCard } from "@/components/ui/magic-card"

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

  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        const data = await getSocialMedia()
        setSocialPlatforms(data)
      } catch (error) {
        console.error('Failed to fetch social media data:', error)
      }
    }

    fetchSocialMedia()
  }, [])

  return (
    <section className="w-full py-8 sm:py-16 max-w-8xl mx-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-16">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
            <span className="text-sm font-medium tracking-wide uppercase text-blue-600 dark:text-blue-400">Social Media</span>
            <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Connect With Me <span className="text-blue-600 dark:text-blue-400 relative">Everywhere<div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded" /></span>
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
            Follow my journey across different platforms for diverse content, tutorials, and behind-the-scenes insights into my development process.
          </p>
        </div>

        {/* Social Media Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {socialPlatforms.map((platform, index) => {
            const IconComponent = iconMap[platform.icon] || Globe
            return (
              <div
                key={platform.id}
                className="group cursor-pointer hover:scale-105 transition-transform duration-200"
                onClick={() => window.open(platform.link, '_blank')}
              >
                <MagicCard
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-lg p-4 lg:p-6 shadow-lg h-full flex flex-col transition-colors duration-200"
                  gradientColor="#3b82f6"
                  gradientOpacity={0.08}
                  gradientFrom="#3b82f6"
                  gradientTo="#8b5cf6"
                >
                  {/* Desktop/Web - Compact Layout */}
                  <section className={`mb-4 hidden sm:block ${platform.bgColor} ${platform.darkBgColor} rounded-xl p-4`}>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm flex-shrink-0">
                        <IconComponent className={`w-6 h-6 ${platform.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate">
                          {platform.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {platform.username}
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Mobile - Original Layout */}
                  <section className={`sm:hidden mb-4 ${platform.bgColor} ${platform.darkBgColor} rounded-lg p-3`}>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm">
                        <IconComponent className={`w-5 h-5 ${platform.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {platform.name}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                          {platform.username}
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Platform Content */}
                  <div className="flex-grow space-y-4">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed sm:line-clamp-3 overflow-hidden">
                      {platform.description}
                    </p>
                  </div>
                </MagicCard>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default SocialMedia 