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
          <Card key={experience.id} className="max-w-4xl mx-auto border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-200">
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-100 dark:border-gray-700 pb-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-sm font-medium">
                    {experience.category}
                  </span>
                  <span className={`px-3 py-1 rounded text-sm font-medium ${experience.isCurrentJob ? 'bg-gray-100 dark:bg-gray-800 text-green-600 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}> 
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
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center min-w-[180px]">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Duration</div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">{experience.duration}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{formatDateRange(experience.startDate, experience.endDate, experience.isCurrentJob)}</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-8 pt-4">
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-base mb-2">{experience.description}</div>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Responsibilities */}
                <div className="col-span-1 bg-gray-50 dark:bg-gray-800 rounded-lg p-5 flex flex-col gap-3">
                  <h4 className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white mb-2">
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Key Responsibilities
                  </h4>
                  <ul className="space-y-2 pl-1">
                    {experience.responsibilities.map((responsibility, respIndex) => (
                      <li key={respIndex} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <span className="mt-1 w-2 h-2 rounded-full bg-gray-500 flex-shrink-0" />
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Technologies */}
                <div className="col-span-1 bg-gray-50 dark:bg-gray-800 rounded-lg p-5 flex flex-col gap-3">
                  <h4 className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white mb-2">
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                    Technologies & Tools
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {experience.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Achievements */}
                <div className="col-span-1 bg-gray-50 dark:bg-gray-800 rounded-lg p-5 flex flex-col gap-3">
                  <h4 className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white mb-2">
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                    Key Achievements
                  </h4>
                  <ul className="space-y-2 pl-1">
                    {experience.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <span className="mt-1 w-2 h-2 rounded-full bg-gray-500 flex-shrink-0" />
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
                  className="px-6 py-2 rounded-lg font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
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