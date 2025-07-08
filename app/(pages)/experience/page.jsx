'use client'

import React, { useMemo } from 'react'
import { PageSection } from '@/components/customUi/PageSection'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import experienceData from '@/data/experience.json'

const ExperiencePage = () => {
  // Calculate total experience
  const totalExperience = useMemo(() => {
    const totalMonths = experienceData.experiences.reduce((total, exp) => {
      const start = new Date(exp.startDate)
      const end = exp.endDate ? new Date(exp.endDate) : new Date()
      const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
      return total + months
    }, 0)
    const years = Math.floor(totalMonths / 12)
    const months = totalMonths % 12
    return `${years}+ years`
  }, [])

  // Handle external link click
  const handleExternalLink = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  // Format date range
  const formatDateRange = (startDate, endDate, isCurrentJob) => {
    const start = new Date(startDate).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    })
    if (isCurrentJob) {
      return `${start} - Present`
    }
    const end = new Date(endDate).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    })
    return `${start} - ${end}`
  }

  // Custom props for the PageSection header
  const headerProps = {
    portfolioLabel: "Professional Experience",
    showBreadcrumb: true,
    breadcrumbItems: [
      { label: "Home", href: "/" },
      { label: "Experience", href: "/experience" }
    ],
    headline: ["Professional", "Work", "Experience"],
    description: "Explore my professional journey showcasing expertise across various technologies, industries, and roles. From freelance projects to enterprise solutions, each experience has contributed to my growth as a developer.",
    centerTitle: "Career",
    centerSubtitle: "Journey",
    technologies: ["React", "Next.js", "Frappe", "Python", "C#", "AI/ML"],
    stats: [
      { count: `${experienceData.experiences.length}`, label: "Total Positions", color: "green" },
      { count: totalExperience, label: "Experience", color: "blue" },
      { count: "20+", label: "Technologies", color: "purple" }
    ],
    centerIcon: (
      <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V4.01M8 6V4.01m8 0A2.989 2.989 0 0118 7v2a2.989 2.989 0 01-3 3h-6a2.989 2.989 0 01-3-3V7a2.989 2.989 0 013-3z" />
      </svg>
    )
  };

  return (
    <PageSection {...headerProps}>
      <div className="space-y-16">
        {/* Professional Experience List - Alternating Layout */}
        {experienceData.experiences.map((experience, index) => (
          <div 
            key={experience.id}
            className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center p-6 md:p-8 rounded-3xl border-2 border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-400 bg-white dark:bg-gray-900/50 hover:shadow-2xl dark:hover:shadow-2xl dark:hover:shadow-blue-500/10 transition-all duration-300 group backdrop-blur-sm ${
              index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
            }`}
          >
            {/* Experience Content */}
            <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
              {/* Experience Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800/80 dark:to-purple-800/80 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold border border-blue-200 dark:border-blue-600/50 shadow-sm dark:shadow-blue-500/20">
                    {experience.category}
                  </span>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold border shadow-sm ${
                    experience.isCurrentJob
                      ? 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-800/80 dark:to-emerald-800/80 text-green-700 dark:text-green-300 border-green-200 dark:border-green-600/50 dark:shadow-green-500/20' 
                      : 'bg-gradient-to-r from-gray-100 to-slate-100 dark:from-gray-700/80 dark:to-slate-700/80 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600/50 dark:shadow-gray-500/20'
                  }`}>
                    {experience.isCurrentJob ? '🟢 Current' : '✓ Completed'}
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {experience.company}
                </h2>
                
                <div className="space-y-2">
                  <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 font-medium">
                    {experience.position}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-medium">{experience.location} • {experience.workType}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-purple-500 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4M5 21h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium">{experience.employmentType}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Duration & Description */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-700/50 shadow-sm dark:shadow-blue-500/10">
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold">{experience.duration}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                    {formatDateRange(experience.startDate, experience.endDate, experience.isCurrentJob)}
                  </div>
                </div>
                
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {experience.description}
                </p>
              </div>

              {/* Key Responsibilities */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Key Responsibilities
                </h4>
                <div className="space-y-3">
                  {experience.responsibilities.map((responsibility, respIndex) => (
                    <div key={respIndex} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-colors duration-200">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2.5 flex-shrink-0 shadow-sm"></div>
                      <span className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                        {responsibility}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Technologies & Tools
                </h4>
                <div className="flex flex-wrap gap-3">
                  {experience.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-600 dark:to-purple-600 text-white rounded-lg text-sm font-medium shadow-lg dark:shadow-indigo-500/20 hover:shadow-xl dark:hover:shadow-indigo-500/30 transform hover:scale-105 transition-all duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Key Achievements
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {experience.achievements.map((achievement, achIndex) => (
                    <div key={achIndex} className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg border border-purple-200 dark:border-purple-700/50 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors duration-200 shadow-sm dark:shadow-purple-500/10">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2.5 flex-shrink-0 shadow-sm"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                        {achievement}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Company Website Link */}
              <div className="flex flex-wrap gap-4 pt-4">
                {experience.companyWebsite && (
                  <Button 
                    variant="outline" 
                    onClick={() => handleExternalLink(experience.companyWebsite)}
                    className="px-6 py-3 rounded-xl font-semibold border-2 border-blue-300 dark:border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 shadow-md dark:shadow-blue-500/20 hover:shadow-lg dark:hover:shadow-blue-500/30 transform hover:scale-105 transition-all duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Company Website
                  </Button>
                )}
              </div>
            </div>

            {/* Company Image/Logo */}
            <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
              <div className="relative group">
                {/* Background gradient effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-3xl opacity-20 dark:opacity-30 group-hover:opacity-30 dark:group-hover:opacity-40 transition-opacity duration-300 blur-lg"></div>
                
                {/* Main image container */}
                <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden border-4 border-white dark:border-gray-700 shadow-2xl dark:shadow-2xl dark:shadow-blue-500/10 group-hover:shadow-3xl dark:group-hover:shadow-blue-500/20 transition-all duration-300">
                  <Image
                    src={experience.companyLogo}
                    alt={`${experience.company} logo`}
                    fill
                    className="object-cover transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                  />
                  
                  {/* Always visible overlay gradients */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/50 dark:from-black/60 via-transparent to-white/10 dark:to-white/5" />
                  
                  {/* Experience number indicator */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-bold text-lg shadow-lg dark:shadow-blue-500/30">
                    #{index + 1}
                  </div>
                  
                  {/* Duration badge */}
                  <div className="absolute top-4 right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg dark:shadow-blue-500/20 border dark:border-gray-600">
                    <div className="flex items-center gap-1">
                      <span className="text-blue-500 dark:text-blue-400">⏱</span>
                      <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{experience.duration}</span>
                    </div>
                  </div>
                  
                  {/* Always visible company info overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 dark:from-black/90 via-transparent to-transparent flex items-end">
                    <div className="p-6 text-white w-full">
                      <h3 className="text-xl md:text-2xl font-bold mb-2 drop-shadow-lg">{experience.company}</h3>
                      <p className="text-sm md:text-base text-gray-200 dark:text-gray-100 drop-shadow-md font-medium">{experience.position}</p>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="px-3 py-1 bg-white/25 dark:bg-white/30 backdrop-blur-sm rounded-full text-xs font-medium border border-white/20">
                          {experience.location}
                        </span>
                        <span className={`px-3 py-1 backdrop-blur-sm rounded-full text-xs font-medium border border-white/20 ${
                          experience.isCurrentJob 
                            ? 'bg-green-500/80 dark:bg-green-500/90' 
                            : 'bg-gray-500/80 dark:bg-gray-500/90'
                        }`}>
                          {experience.isCurrentJob ? 'Current' : 'Past'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>
    </PageSection>
  )
}

export default ExperiencePage 