'use client'

import React, { useState, useMemo } from 'react'
import { PageSection } from '@/components/customUi/PageSection'
import ProjectCard from '@/components/customUi/ProjectCard'
import { Button } from '@/components/ui/button'
import projectsData from '@/data/projects.json'

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Get unique categories from projects data
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(projectsData.projects.map(project => project.category))]
    return ['All', ...uniqueCategories]
  }, [])

  // Filter projects based on selected category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') {
      return projectsData.projects
    }
    return projectsData.projects.filter(project => project.category === selectedCategory)
  }, [selectedCategory])

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProjects = filteredProjects.slice(startIndex, endIndex)

  // Reset to page 1 when category changes
  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  // Custom props for the PageSection header
  const headerProps = {
    portfolioLabel: "Portfolio",
    showBreadcrumb: true,
    breadcrumbItems: [
      { label: "Home", href: "/" },
      { label: "Projects", href: "/projects" }
    ],
    headline: ["My", "Creative", "Projects"],
    description: "Explore my portfolio of innovative web applications, e-commerce solutions, and digital experiences. Each project showcases cutting-edge technologies and creative problem-solving approaches.",
    centerTitle: "Innovative",
    centerSubtitle: "Solutions",
    technologies: ["React", "Node", "JS", "CSS", "MongoDB", "API"],
    stats: [
      { count: `${filteredProjects.length}`, label: `${selectedCategory === 'All' ? 'Total Projects' : selectedCategory + ' Projects'}`, color: "green" },
      { count: "15+", label: "Technologies", color: "blue" }
    ],
    centerIcon: (
      <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  };

  return (
    <PageSection {...headerProps}>
      <div className="space-y-8">
        {/* Filter Section */}
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Filter by Category</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => {
                const projectCount = category === 'All' 
                  ? projectsData.projects.length 
                  : projectsData.projects.filter(p => p.category === category).length
                
                return (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`group relative px-4 md:px-6 py-2 md:py-3 rounded-full transition-all duration-300 font-medium transform hover:scale-105 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="text-sm md:text-base">{category}</span>
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${
                      selectedCategory === category
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900'
                    }`}>
                      {projectCount}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Active Filter Indicator */}
        </div>

        {/* Projects Grid */}
        <div className="space-y-6">
          {currentProjects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {currentProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex items-center justify-center space-x-2">
                    {/* Previous Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous
                    </Button>

                    {/* Page Numbers */}
                    <div className="flex space-x-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 ${
                            currentPage === page
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-lg'
                              : 'border-2 border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
                          }`}
                        >
                          {page}
                        </Button>
                      ))}
                    </div>

                    {/* Next Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Button>
                  </div>

                  {/* Page Info */}
                  <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    Showing {startIndex + 1}-{Math.min(endIndex, filteredProjects.length)} of {filteredProjects.length} projects
                    {selectedCategory !== 'All' && (
                      <span className="ml-1">in {selectedCategory}</span>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* No Projects Found */
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47.828-6.145 2.209-1.007.83-1.855 1.851-1.855 3.291 0 .55.45 1 1 1h14c.55 0 1-.45 1-1 0-1.44-.848-2.461-1.855-3.291A7.962 7.962 0 0112 15z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No Projects Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No projects found in the "{selectedCategory}" category.
              </p>
              <Button
                onClick={() => handleCategoryChange('All')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                View All Projects
              </Button>
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">4+</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm md:text-base">Projects Completed</p>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400">15+</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm md:text-base">Technologies Used</p>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400">6.2K+</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm md:text-base">Total Downloads</p>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400">4.8</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm md:text-base">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </PageSection>
  )
}

export default ProjectsPage