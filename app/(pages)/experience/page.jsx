'use client'

import React, { useMemo } from 'react'
import { PageSection } from '@/components/customUi/PageSection'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
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
      <div className="space-y-8">
        {/* Professional Experience List - Unified Card Layout */}
        {experienceData.experiences.map((experience, index) => (
          <Card key={experience.id} className="max-w-4xl mx-auto border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300">
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-100 dark:border-gray-700 pb-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-700">
                    {experience.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${experience.isCurrentJob ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 border-green-200 dark:border-green-700' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700'}`}> 
                    {experience.isCurrentJob ? '🟢 Current Role' : '✓ Completed'}
                  </span>
                </div>
                <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                  {experience.company}
                </CardTitle>
                <div className="text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-300">{experience.position}</div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{experience.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V4.01M8 6V4.01m8 0A2.989 2.989 0 0118 7v2a2.989 2.989 0 01-3 3h-6a2.989 2.989 0 01-3-3V7a2.989 2.989 0 013-3z" />
                    </svg>
                    <span>{experience.workType}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{experience.employmentType}</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center min-w-[180px] border border-gray-200 dark:border-gray-700">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Duration</div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">{experience.duration}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{formatDateRange(experience.startDate, experience.endDate, experience.isCurrentJob)}</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-8 pt-4">
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-base mb-2">{experience.description}</div>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Responsibilities */}
                <div className="col-span-1 bg-blue-50 dark:bg-blue-900/10 rounded-lg p-5 border border-blue-100 dark:border-blue-800 flex flex-col gap-3">
                  <h4 className="flex items-center gap-2 text-base font-semibold text-blue-700 dark:text-blue-300 mb-2">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Key Responsibilities
                  </h4>
                  <ul className="space-y-2 pl-1">
                    {experience.responsibilities.map((responsibility, respIndex) => (
                      <li key={respIndex} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <span className="mt-1 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Technologies */}
                <div className="col-span-1 bg-purple-50 dark:bg-purple-900/10 rounded-lg p-5 border border-purple-100 dark:border-purple-800 flex flex-col gap-3">
                  <h4 className="flex items-center gap-2 text-base font-semibold text-purple-700 dark:text-purple-300 mb-2">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                    Technologies & Tools
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {experience.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-xs font-medium shadow hover:shadow-md transition-all duration-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Achievements */}
                <div className="col-span-1 bg-green-50 dark:bg-green-900/10 rounded-lg p-5 border border-green-100 dark:border-green-800 flex flex-col gap-3">
                  <h4 className="flex items-center gap-2 text-base font-semibold text-green-700 dark:text-green-300 mb-2">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                    Key Achievements
                  </h4>
                  <ul className="space-y-2 pl-1">
                    {experience.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <span className="mt-1 w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
            {experience.companyWebsite && (
              <CardFooter className="pt-4 flex justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => handleExternalLink(experience.companyWebsite)}
                  className="px-6 py-2 rounded-lg font-semibold border-2 border-blue-300 dark:border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Visit Company Website
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </PageSection>
  )
}

export default ExperiencePage