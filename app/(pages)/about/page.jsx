"use client"

import { useState, useEffect } from 'react'
import Image from "next/image"
import { motion } from 'framer-motion'
import { PageSection } from '@/components/customUi/PageSection'
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



export default function AboutPage() {

  const [skills, setTools] = useState([])
  const [contentCreatorStats, setSocialMedia] = useState([])
  const [experiences, setExperiences] = useState([])

  useEffect(() => {
    getTools().then(setTools)
    getSocialMedia().then(setSocialMedia)
    
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

  const interests = [
    { icon: Code2, title: "Clean Code", desc: "Writing maintainable and scalable code" },
    { icon: Camera, title: "Tech Photography", desc: "Capturing behind-the-scenes coding moments" },
    { icon: BookOpen, title: "Learning", desc: "Continuously exploring new technologies" },
    { icon: Coffee, title: "Coffee & Code", desc: "Best combination for productivity" }
  ]

  // Custom props for the PageSection header
  const headerProps = {
    portfolioLabel: "About Me",
    showBreadcrumb: true,
    breadcrumbItems: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" }
    ],
    headline: ["Developer &", "Content", "Creator"],
    description: "My journey in technology is driven by a passion for building innovative web applications and sharing knowledge. Explore the two sides of my professional life: development and content creation.",
    stats: [
      { count: "2023", label: "Graduated", color: "green" },
      { count: "50+", label: "Projects Built", color: "blue" },
      { count: "7K+", label: "Total Followers", color: "purple" }
    ]
  }

  return (
    <PageSection {...headerProps}>
      <div className="space-y-12">
        {/* Personal Intro Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-3 gap-12 items-center"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center items-center lg:col-span-1"
          >
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/developer-image.jpg"
                  alt="Jay Patel"
                  width={280}
                  height={280}
                  className="rounded-full shadow-xl border-4 border-white dark:border-gray-700"
                />
              </motion.div>
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full border-4 border-white dark:border-gray-700 flex items-center justify-center"
              >
                  <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
              </motion.div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 space-y-6 text-center lg:text-left"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white"
            >
              Hello, I'm{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Jay Patel
              </span>
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3"
            >
                <span className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium">
                    <MapPin className="w-4 h-4" />
                    Valsad, Gujarat
                </span>
                <span className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-2 rounded-full text-sm font-medium">
                    <Calendar className="w-4 h-4" />
                    Graduated 2023
                </span>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
            >
                A passionate developer and content creator who bridges the gap between technical expertise and creative storytelling. 
                I build innovative web applications and share knowledge to inspire the next generation of developers.
            </motion.p>
          </motion.div>
        </motion.section>

        {/* Divider */}
        <div className="w-full h-px bg-gray-200 dark:bg-gray-700"></div>

        {/* Two Sides Section */}
        <div className="container mx-auto px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
              <span className="text-sm font-medium tracking-wide uppercase text-blue-600 dark:text-blue-400">My Two Sides</span>
              <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Developer &{" "}
              <span className="text-blue-600 dark:text-blue-400 relative">
                Creator
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded" />
              </span>
            </h2>

            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Bridging the gap between technical expertise and creative storytelling
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Developer Side */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-8">
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
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Core Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((tool, index) => (
                    <span key={index} className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-1 rounded-full text-xs text-gray-700 dark:text-gray-300">
                      {tool.icon && (
                        <img src={tool.icon} alt={tool.name} className="w-4 h-4" />
                      )}
                      {tool.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">Always learning, always coding</span>
              </div>
            </div>
            {/* Content Creator Side */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-2xl p-8">
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
              <div className="space-y-3 mb-6">
                {contentCreatorStats.map((stat, index) => {
                  // Lucide icon mapping
                  const iconMap = { Youtube, Instagram, Linkedin, Github };
                  const IconComponent = iconMap[stat.icon] || Users;
                  return (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <IconComponent className={`w-5 h-5 ${stat.iconColor || ''}`} />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{stat.name}</span>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">{stat.followers}</span>
                    </div>
                  )
                })}
              </div>
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                <Heart className="w-4 h-4" />
                <span className="text-sm font-medium">Building community through content</span>
              </div>
            </div>
          </div>
        </div>

        {/* My Journey Section */}
        <div className="container mx-auto px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
              <span className="text-sm font-medium tracking-wide uppercase text-blue-600 dark:text-blue-400">My Journey</span>
              <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              From Beginner To{" "}
              <span className="text-blue-600 dark:text-blue-400 relative">
                Educator
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded" />
              </span>
            </h2>

            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              From curious beginner to passionate developer and educator
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 text-center border border-green-200 dark:border-green-800">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Learning Phase
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Started with curiosity about how websites work. Spent countless hours learning HTML, CSS, and JavaScript fundamentals.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 text-center border border-blue-200 dark:border-blue-800">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Building Phase
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Graduated in 2023 and started building real projects. Mastered modern frameworks and began creating professional applications.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 text-center border border-purple-200 dark:border-purple-800">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Sharing Phase
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Now I share my knowledge through content creation, helping others learn and grow in their coding journey.
              </p>
            </div>
          </div>
        </div>

        {/* Professional Experience Section */}
        <div className="container mx-auto px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
              <span className="text-sm font-medium tracking-wide uppercase text-blue-600 dark:text-blue-400">Professional Journey</span>
              <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Work{" "}
              <span className="text-blue-600 dark:text-blue-400 relative">
                Experience
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded" />
              </span>
            </h2>

            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Building innovative solutions and growing through challenging projects
            </p>
          </div>

          {/* Experience Timeline */}
          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline Line */}
                {index < experiences.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-32 bg-gray-200 dark:bg-gray-700"></div>
                )}
                
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                  {/* Company Logo & Timeline Dot */}
                  <div className="flex-shrink-0 relative">
                    <div className="w-16 h-16 bg-white dark:bg-gray-800 border-4 border-blue-200 dark:border-blue-800 rounded-full overflow-hidden flex items-center justify-center relative z-10">
                      <Image
                        src={experience.companyLogo}
                        alt={experience.company}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    {experience.isCurrentJob && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>

                  {/* Experience Content */}
                  <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 rounded-2xl p-6 lg:p-8 border border-gray-200 dark:border-gray-700">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                            {experience.position}
                          </h3>
                          {experience.isCurrentJob && (
                            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-xs font-medium">
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
                            className="px-3 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300"
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
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interests & Hobbies */}
        <div className="container mx-auto px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
              <span className="text-sm font-medium tracking-wide uppercase text-blue-600 dark:text-blue-400">What I Love</span>
              <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Beyond{" "}
              <span className="text-blue-600 dark:text-blue-400 relative">
                Coding
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded" />
              </span>
            </h2>

            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Beyond coding, here's what drives my passion
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {interests.map((interest, index) => {
              const IconComponent = interest.icon
              return (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {interest.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {interest.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </PageSection>
  )
} 