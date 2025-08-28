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
      { count: "24/7", label: "Learning", color: "purple" }
    ]
  }

  return (
    <PageSection {...headerProps}>
      <div className="space-y-12">
        {/* Personal Intro Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 gap-12 items-center"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
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
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                viewport={{ once: true }}
                className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full border-4 border-white dark:border-gray-700 flex items-center justify-center"
              >
                  <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
              </motion.div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6 text-center lg:text-left"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white"
            >
              Hello, I'm{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Jay Patel
              </span>
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
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
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true }}
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
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="container mx-auto px-8 relative z-10"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center justify-center space-x-2 mb-6"
            >
              <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
              <span className="text-sm font-medium tracking-wide uppercase text-blue-600 dark:text-blue-400">My Two Sides</span>
              <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
            >
              Developer &{" "}
              <span className="text-blue-600 dark:text-blue-400 relative">
                Creator
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded" />
              </span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto"
            >
              Bridging the gap between technical expertise and creative storytelling through innovative solutions and engaging content.
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* Developer Side */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-8"
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
            </motion.div>
            {/* Content Creator Side */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-2xl p-8"
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
              <div className="grid grid-cols-2 gap-3 mb-6">
                {contentCreatorStats.map((stat, index) => {
                  // Lucide icon mapping
                  const iconMap = { Youtube, Instagram, Linkedin, Github };
                  const IconComponent = iconMap[stat.icon] || Users;
                  return (
                    <div 
                      key={index} 
                      className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg cursor-pointer hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-200 hover:scale-105 group"
                      onClick={() => window.open(stat.link, '_blank', 'noopener,noreferrer')}
                    >
                      <IconComponent className={`w-5 h-5 ${stat.iconColor || ''} group-hover:scale-110 transition-transform duration-200`} />
                      <span className="text-sm text-gray-600 dark:text-gray-300 font-medium group-hover:text-gray-800 dark:group-hover:text-white transition-colors duration-200">{stat.name}</span>
                    </div>
                  )
                })}
              </div>
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                <Heart className="w-4 h-4" />
                <span className="text-sm font-medium">Building community through content</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* My Journey Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="container mx-auto px-8 relative z-10"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center justify-center space-x-2 mb-6"
            >
              <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
              <span className="text-sm font-medium tracking-wide uppercase text-blue-600 dark:text-blue-400">My Journey</span>
              <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
            >
              From Beginner To{" "}
              <span className="text-blue-600 dark:text-blue-400 relative">
                Educator
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded" />
              </span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto"
            >
              From curious beginner to passionate developer and educator, my journey has been filled with continuous learning and growth.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 text-center border border-green-200 dark:border-green-800"
            >
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Learning Phase
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Started with curiosity about how websites work. Spent countless hours learning HTML, CSS, and JavaScript fundamentals.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 text-center border border-blue-200 dark:border-blue-800"
            >
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Building Phase
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Graduated in 2023 and started building real projects. Mastered modern frameworks and began creating professional applications.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 text-center border border-purple-200 dark:border-purple-800"
            >
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Sharing Phase
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Now I share my knowledge through content creation, helping others learn and grow in their coding journey.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Professional Experience Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="container mx-auto px-8 relative z-10"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center justify-center space-x-2 mb-6"
            >
              <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
              <span className="text-sm font-medium tracking-wide uppercase text-blue-600 dark:text-blue-400">Professional Journey</span>
              <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
            >
              Work{" "}
              <span className="text-blue-600 dark:text-blue-400 relative">
                Experience
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded" />
              </span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto"
            >
              Building innovative solutions and growing through challenging projects with cutting-edge technologies and passionate teams.
            </motion.p>
          </div>

          {/* Experience Cards */}
          <div className="space-y-6">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="w-full"
              >
                {/* Experience Card */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 rounded-2xl p-6 lg:p-8 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
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
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Interests & Hobbies */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="container mx-auto px-8 relative z-10"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center justify-center space-x-2 mb-6"
            >
              <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
              <span className="text-sm font-medium tracking-wide uppercase text-blue-600 dark:text-blue-400">What I Love</span>
              <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
            >
              Beyond{" "}
              <span className="text-blue-600 dark:text-blue-400 relative">
                Coding
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded" />
              </span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto"
            >
              When I'm not coding, I explore various interests that fuel my creativity and keep me motivated. 
              Each of these areas contributes to my growth as both a developer and content creator.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-3"
            >
              {interests.map((interest, index) => {
                const IconComponent = interest.icon
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 + (index * 0.1) }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="group flex items-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {interest.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                        {interest.desc}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              viewport={{ once: true }}
              className="mt-8 text-center"
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 px-4 py-2 rounded-full border border-blue-200 dark:border-blue-800">
                <Coffee className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Always learning, always creating</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </PageSection>
  )
} 