"use client"
import { useState, useEffect } from 'react'
import { MagicCard } from "@/components/ui/magic-card"
import { PixelImage } from "@/components/ui/pixel-image"
import { NumberTicker } from "@/components/ui/number-ticker"
import {
  Code2,
  Camera,
  Users,
  Youtube,
  Instagram,
  Linkedin,
  Github,
  BookOpen,
  Coffee,
  Zap,
  Heart,
  MapPin,
  Calendar,
  Building2,
  Clock,
  Award,
  ExternalLink,
  CheckCircle
} from "lucide-react"

import { getTools } from '@/app/actions/tools'
import { getSocialMedia } from '@/app/actions/socialMedia'

const AboutSection = () => {
  const [skills, setSkills] = useState([])
  const [contentCreatorStats, setContentCreatorStats] = useState([])
  const [experiences, setExperiences] = useState([])

  useEffect(() => {
    getTools().then(setSkills)
    getSocialMedia().then(setContentCreatorStats)

    // Fetch experiences from JSON file
    const fetchExperiences = async () => {
      try {
        const experienceData = await import('@/data/experience.json')
        setExperiences(experienceData.experiences || [])
      } catch (error) {
        console.error('Error loading experiences:', error)
        setExperiences([])
      }
    }

    fetchExperiences()
  }, [])


  return (
    <section
      className="w-full max-w-7xl mx-auto py-8 lg:py-12"
      id="about"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {/* About Me Header Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400 mb-6">
              <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
              <span className="text-sm font-medium tracking-wide uppercase">About Me</span>
              <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
            </div>

            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4"
            >
              Developer &{" "}
              <span className="text-blue-600 dark:text-blue-400 relative">
                Content Creator
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded" />
              </span>
            </h2>

            <p
              className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto"
            >
              My journey in technology is driven by a passion for building innovative web applications and sharing knowledge. Explore the two sides of my professional life: development and content creation.
            </p>

            {/* Stats */}
            <div
              className="flex flex-wrap justify-center gap-8 mt-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  <NumberTicker
                    value={20}
                    startValue={0}
                    className="text-2xl font-bold text-blue-600 dark:text-blue-400"
                  />+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Projects Built</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  <NumberTicker
                    value={24}
                    startValue={0}
                    className="text-2xl font-bold text-purple-600 dark:text-purple-400"
                  />/7
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Learning</div>
              </div>
            </div>
          </div>

          {/* Personal Intro Section */}
          <section
            className="grid lg:grid-cols-3 gap-12 items-center"
          >
            <div className="flex justify-center items-center lg:col-span-1">
              <div className="relative">
                <div className="relative w-72 h-72 bg-white dark:bg-gray-800 shadow-xl overflow-hidden">
                  {/* Corner borders */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-600 dark:border-blue-400"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-600 dark:border-blue-400"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-600 dark:border-blue-400"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-600 dark:border-blue-400"></div>

                  <PixelImage
                    src="/developer-image.jpg"
                    customGrid={{ rows: 8, cols: 8 }}
                    grayscaleAnimation={true}
                    pixelFadeInDuration={1200}
                    maxAnimationDelay={1200}
                    colorRevealDelay={1800}
                  />
                </div>
              </div>
            </div>
            <div              className="lg:col-span-2 space-y-6 text-center lg:text-left"
            >
              <h2                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white"
              >
                Hello, I'm{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Jay Patel
                </span>
              </h2>
              <div                className="flex flex-wrap justify-center lg:justify-start gap-3"
              >
                  <span className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium">
                      <MapPin className="w-4 h-4" />
                      Valsad, Gujarat
                  </span>
                  <span className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-2 rounded-full text-sm font-medium">
                      <Calendar className="w-4 h-4" />
                      Graduated 2023
                  </span>
              </div>
              <p                className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
              >
                  A passionate developer and content creator who bridges the gap between technical expertise and creative storytelling.
                  I build innovative web applications and share knowledge to inspire the next generation of developers.
              </p>
            </div>
          </section>

          {/* Two Sides Section */}
          <div
            className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          >
            {/* Header */}
            <div className="text-center mb-16">
              <div                className="flex items-center justify-center space-x-2 mb-6"
              >
                <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
                <span className="text-sm font-medium tracking-wide uppercase text-blue-600 dark:text-blue-400">My Two Sides</span>
                <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
              </div>

              <h2                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
              >
                Developer &{" "}
                <span className="text-blue-600 dark:text-blue-400 relative">
                  Creator
                  <div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded" />
                </span>
              </h2>

              <p                className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto"
              >
                Bridging the gap between technical expertise and creative storytelling through innovative solutions and engaging content.
              </p>
            </div>
            <div              className="grid md:grid-cols-2 gap-8"
            >
              {/* Developer Side */}
              <div className="flex">
                <MagicCard
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 h-full flex flex-col w-full"
                  gradientColor="#1e40af"
                  gradientOpacity={0.1}
                  gradientFrom="#3b82f6"
                  gradientTo="#8b5cf6"
                >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">The Developer</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  I craft digital experiences with clean, efficient code. My expertise spans full-stack development,
                  from responsive frontends to robust backend systems. I believe in writing code that not only works
                  but is maintainable and scalable.
                </p>
                <div className="mb-6 flex-grow">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Core Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((tool, index) => (
                      <span key={index} className="flex items-center gap-2 bg-gray-200/50  dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-1 rounded-full text-xs text-gray-700 dark:text-gray-300">
                        {tool.icon && (
                          <img src={tool.icon} alt={tool.name} className="w-4 h-4" />
                        )}
                        {tool.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mt-auto">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-medium">Always learning, always coding</span>
                </div>
                </MagicCard>
              </div>
              {/* Content Creator Side */}
              <div className="flex">
                <MagicCard
                  className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 h-full flex flex-col w-full"
                  gradientColor="#7c3aed"
                  gradientOpacity={0.1}
                  gradientFrom="#8b5cf6"
                  gradientTo="#ec4899"
                >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">The Creator</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  I share my coding journey through tutorials, tips, and behind-the-scenes content.
                  My goal is to make programming accessible and inspire others to start their tech careers.
                  From quick tips to detailed walkthroughs, I love teaching through content.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6 flex-grow">
                  {contentCreatorStats.map((stat, index) => {
                    // Lucide icon mapping
                    const iconMap = { Youtube, Instagram, Linkedin, Github };
                    const IconComponent = iconMap[stat.icon] || Users;
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-200/50 dark:bg-gray-800/50 rounded-lg cursor-pointer hover:bg-white/70 dark:hover:bg-gray-800/70"
                        onClick={() => window.open(stat.link, '_blank', 'noopener,noreferrer')}
                      >
                        <IconComponent className={`w-5 h-5 ${stat.iconColor || ''}`} />
                        <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">{stat.name}</span>
                      </div>
                    )
                  })}
                </div>
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mt-auto">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm font-medium">Building community through content</span>
                </div>
                </MagicCard>
              </div>
            </div>
          </div>


          {/* Professional Experience Section */}
          <div
            className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          >
            {/* Header */}
            <div className="text-center mb-16">
              <div                className="flex items-center justify-center space-x-2 mb-6"
              >
                <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
                <span className="text-sm font-medium tracking-wide uppercase text-blue-600 dark:text-blue-400">Professional Journey</span>
                <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
              </div>

              <h2                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
              >
                Work{" "}
                <span className="text-blue-600 dark:text-blue-400 relative">
                  Experience
                  <div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded" />
                </span>
              </h2>

              <p                className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto"
              >
                Building innovative solutions and growing through challenging projects with cutting-edge technologies and passionate teams.
              </p>
            </div>

            {/* Experience Cards */}
            <div className="space-y-6">
              {experiences.map((experience, index) => (
                <div
                  key={experience.id}
                  className="w-full"
                >
                  {/* Experience Card */}
                  <MagicCard
                    className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                    gradientColor="#64748b"
                    gradientOpacity={0.1}
                    gradientFrom="#3b82f6"
                    gradientTo="#8b5cf6"
                  >
                      {/* Header */}
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                              {experience.position}
                            </h3>
                            {experience.isCurrentJob && (
                              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
                                Current
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-4 mb-3">
                            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                              <Building2 className="w-4 h-4" />
                              <span className="font-medium">{experience.company}</span>
                              <ExternalLink className="w-3 h-3 opacity-60" />
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm">{experience.location} • {experience.workType}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">
                              {new Date(experience.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} -
                              {experience.isCurrentJob ? ' Present' : ` ${new Date(experience.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
                              <span className="ml-2 font-medium">({experience.duration})</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                        {experience.description}
                      </p>

                      {/* Key Responsibilities */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          Key Responsibilities
                        </h4>
                        <div className="grid md:grid-cols-2 gap-2">
                          {experience.responsibilities.slice(0, 6).map((responsibility, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-gray-600 dark:text-gray-400">{responsibility}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {experience.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gray-200/50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Key Achievements */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                          <Award className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                          Key Achievements
                        </h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          {experience.achievements.map((achievement, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-3 bg-white/60 dark:bg-gray-700/60 rounded-lg">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{achievement}</span>
                            </div>
                          ))}
                        </div>
                    </div>
                  </MagicCard>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default AboutSection