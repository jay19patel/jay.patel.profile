import React from 'react'
import { PageSection } from '@/components/customUi/PageSection'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

import projectsData from '@/data/projects.json'

// Get project data by slug or id
const getProjectData = (slugOrId) => {
  const project = projectsData.projects.find(p => 
    p.slug === slugOrId || p.id.toString() === slugOrId
  );
  return project || projectsData.projects[0]; // Default to first project if not found
}

const ProjectDetail = async ({ params }) => {
  const { id } = await params;
  const project = getProjectData(id);

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: project.title }
  ];

  return (
    <PageSection 
      showHeader={false}
      showBreadcrumb={true}
      breadcrumbItems={breadcrumbItems}
    >
      <div className="space-y-12">
        {/* Project Header */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                {project.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                project.status === 'Completed' 
                  ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' 
                  : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400'
              }`}>
                {project.status}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              {project.title}
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
              {project.subtitle}
            </p>
            
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {project.description}
            </p>

            {/* Project Stats */}
            <div className="flex flex-wrap gap-4 md:gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {'★'.repeat(Math.floor(project.rating))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {project.rating} ({project.downloads} downloads)
                </span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Updated: {new Date(project.updatedAt).toLocaleDateString()}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              {project.githubUrl && (
                <Link href={project.githubUrl} target="_blank" className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span className="text-sm font-medium">GitHub</span>
                </Link>
              )}
              {project.liveUrl && (
                <Link href={project.liveUrl} target="_blank" className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-600 dark:text-blue-400 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span className="text-sm font-medium">Live Demo</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Main Project Image */}
        <div className="relative h-60 sm:h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-600 shadow-lg">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {/* Introduction Section */}
        <div className="space-y-4 md:space-y-6 p-6 md:p-8 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            Introduction:
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {project.introduction}
          </p>
        </div>

        {/* Project Screenshots */}
        <div className="space-y-4 md:space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-blue-500 rounded-full"></div>
            Project Screenshots:
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {project.screenshots.map((screenshot, index) => (
              <div key={index} className="relative h-48 sm:h-56 md:h-64 lg:h-80 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-600 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 bg-white dark:bg-gray-800">
                <Image
                  src={screenshot}
                  alt={`${project.title} screenshot ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="space-y-4 md:space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
            Key Features:
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {project.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-3 md:p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-400 transition-all duration-300">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-1.5 flex-shrink-0 shadow-sm"></div>
                <span className="text-sm md:text-base text-gray-700 dark:text-gray-200 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Used */}
        <div className="space-y-4 md:space-y-6 p-6 md:p-8 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-2xl border border-gray-200 dark:border-gray-600">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
            Technologies Used:
          </h2>
          <div className="flex flex-wrap gap-3 md:gap-4">
            {project.technologies.map((tech, index) => {
              const colors = [
                'from-blue-500 to-cyan-500',
                'from-purple-500 to-pink-500', 
                'from-green-500 to-emerald-500',
                'from-orange-500 to-red-500',
                'from-indigo-500 to-purple-500',
                'from-teal-500 to-green-500',
                'from-rose-500 to-pink-500',
                'from-amber-500 to-orange-500'
              ];
              const colorClass = colors[index % colors.length];
              
              return (
                <span
                  key={index}
                  className={`px-4 py-2 md:px-5 md:py-2.5 bg-gradient-to-r ${colorClass} text-white rounded-full text-sm md:text-base font-semibold hover:scale-110 hover:shadow-lg transform transition-all duration-300 cursor-pointer border-2 border-white dark:border-gray-700`}
                >
                  {tech}
                </span>
              );
            })}
          </div>
        </div>

            
        {/* Challenges & Learnings */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-orange-500 rounded-full"></div>
              Challenges Faced:
            </h2>
            <div className="space-y-3">
              {project.challenges?.map((challenge, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/30 rounded-xl border-2 border-red-200 dark:border-red-700 hover:shadow-lg transition-all duration-300 hover:border-red-300 dark:hover:border-red-600">
                  <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mt-1.5 flex-shrink-0 shadow-sm"></div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium leading-relaxed">{challenge}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
              Key Learnings:
            </h2>
            <div className="space-y-3">
              {project.learnings?.map((learning, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/30 rounded-xl border-2 border-green-200 dark:border-green-700 hover:shadow-lg transition-all duration-300 hover:border-green-300 dark:hover:border-green-600">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-1.5 flex-shrink-0 shadow-sm"></div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium leading-relaxed">{learning}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

       
      </div>
    </PageSection>
  )
}

export default ProjectDetail 