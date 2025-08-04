"use client"

import { Youtube, Instagram, Linkedin, Github, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

const SocialMedia = () => {
  const socialPlatforms = [
    {
      id: 1,
      name: "YouTube",
      username: "@YourChannel",
      description: "Tech tutorials, coding walkthroughs, and web development tips",
      icon: Youtube,
      bgColor: "bg-red-50",
      darkBgColor: "dark:bg-red-900/20",
      iconColor: "text-red-600 dark:text-red-400",
      buttonColor: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
      followers: "2.5K+ Subscribers",
      link: "#"
    },
    {
      id: 2,
      name: "Instagram",
      username: "@your_insta",
      description: "Behind-the-scenes coding, quick tips, and tech lifestyle content",
      icon: Instagram,
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      darkBgColor: "dark:bg-gradient-to-br dark:from-purple-900/20 dark:to-pink-900/20",
      iconColor: "text-purple-600 dark:text-purple-400",
      buttonColor: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600",
      followers: "1.8K+ Followers",
      link: "#"
    },
    {
      id: 3,
      name: "LinkedIn",
      username: "@yourname",
      description: "Professional insights, career tips, and industry discussions",
      icon: Linkedin,
      bgColor: "bg-blue-50",
      darkBgColor: "dark:bg-blue-900/20",
      iconColor: "text-blue-600 dark:text-blue-400",
      buttonColor: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
      followers: "3.2K+ Connections",
      link: "#"
    },
    {
      id: 4,
      name: "GitHub",
      username: "@yourusername",
      description: "Open source projects, code repositories, and development contributions",
      icon: Github,
      bgColor: "bg-gray-50",
      darkBgColor: "dark:bg-gray-900/20",
      iconColor: "text-gray-800 dark:text-gray-200",
      buttonColor: "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900",
      followers: "500+ Repositories",
      link: "#"
    }
  ]

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full py-16 max-w-7xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg relative overflow-hidden transition-colors duration-300"
    >
      {/* Decorative Circles */}
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/10 rounded-full blur-xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
            <span className="text-sm font-medium tracking-wide uppercase text-blue-600 dark:text-blue-400">Social Media</span>
            <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Connect With Me <span className="text-blue-600 dark:text-blue-400 relative">Everywhere<div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded" /></span>
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Follow my journey across different platforms for diverse content and updates
          </p>
        </div>

        {/* Social Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialPlatforms.map((platform, index) => {
            const IconComponent = platform.icon
            return (
              <motion.div 
                key={platform.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
                onClick={() => window.open(platform.link, '_blank')}
              >
                <article className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 h-full flex flex-col transition-colors duration-200">
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
                    
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-full">
                      {platform.followers}
                    </span>
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