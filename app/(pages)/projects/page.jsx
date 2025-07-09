'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PageSection } from '@/components/customUi/PageSection';
import { EmptyState } from '@/components/customUi/EmptyState';
import { Button } from '@/components/ui/button';
import { getProjects } from '@/app/actions/projects';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await getProjects();
        if (error) throw new Error(error);
        setProjects(data || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Get unique categories from projects data
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(projects.map(project => project.category))];
    return ['All', ...uniqueCategories];
  }, [projects]);

  // Filter projects based on selected category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') {
      return projects;
    }
    return projects.filter(project => project.category === selectedCategory);
  }, [selectedCategory, projects]);

  // Handle card click to navigate to project detail
  const handleCardClick = (projectSlug) => {
    router.push(`/projects/${projectSlug}`);
  };

  // Handle external link click
  const handleExternalLink = (url, e) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Custom props for the PageSection header
  const headerProps = {
    portfolioLabel: "Professional Work",
    showBreadcrumb: true,
    breadcrumbItems: [
      { label: "Home", href: "/" },
      { label: "Projects", href: "/projects" }
    ],
    headline: ["Professional", "Portfolio", "Showcase"],
    description: "Explore my comprehensive collection of professional projects featuring cutting-edge technologies, innovative solutions, and impactful results across various domains.",
    centerTitle: "Expert",
    centerSubtitle: "Solutions",
    technologies: ["React", "Django", "Next.js", "Python", "AI/ML", "Data Science"],
    stats: [
      { count: `${filteredProjects.length}`, label: `${selectedCategory === 'All' ? 'Total Projects' : selectedCategory + ' Projects'}`, color: "green" },
      { count: "15+", label: "Technologies", color: "blue" },
      { count: "4.8", label: "Avg Rating", color: "purple" }
    ],
    centerIcon: (
      <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  };

  if (isLoading) {
    return (
      <PageSection {...headerProps}>
        <div className="w-full h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </PageSection>
    );
  }

  return (
    <PageSection {...headerProps}>
      <div className="space-y-12">
        {/* Filter Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Project Categories</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Filter projects by technology or domain</p>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => {
                const projectCount = category === 'All' 
                  ? projects.length 
                  : projects.filter(p => p.category === category).length;
                
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`group relative px-6 md:px-8 py-3 md:py-4 rounded-xl transition-all duration-300 font-semibold transform hover:scale-105 hover:shadow-lg ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white shadow-xl shadow-blue-500/25'
                        : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 shadow-md'
                    }`}
                  >
                    <span className="text-sm md:text-base">{category}</span>
                    <span className={`ml-3 px-2.5 py-1 rounded-full text-xs font-bold ${
                      selectedCategory === category
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900'
                    }`}>
                      {projectCount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Professional Projects List - Alternating Layout */}
        <div className="space-y-16">
          {filteredProjects.length > 0 ? (
            <>
              {filteredProjects.map((project, index) => (
                <div 
                  key={project._id} 
                  onClick={() => handleCardClick(project.slug)}
                  className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center p-6 md:p-8 rounded-3xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-gray-800 hover:shadow-2xl transition-all duration-300 cursor-pointer group ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  {/* Project Content */}
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    {/* Project Header */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold border border-blue-200 dark:border-blue-700">
                          {project.category}
                        </span>
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                          project.status === 'Completed' 
                            ? 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 text-green-600 dark:text-green-400 border-green-200 dark:border-green-700' 
                            : 'bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700'
                        }`}>
                          ✓ {project.status}
                        </span>
                      </div>
                      
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {project.title}
                      </h2>
                      
                      <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Project Description */}
                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Project Stats */}
                    <div className="flex flex-wrap gap-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex text-yellow-400 text-lg">
                          {'★'.repeat(Math.floor(project.rating))}
                        </div>
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                          {project.rating} Rating
                        </span>
                      </div>
                      {project.downloads && (
                        <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                          {project.downloads} Downloads
                        </div>
                      )}
                    </div>

                    {/* Technologies */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 6).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 6 && (
                          <span className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-sm font-medium">
                            +{project.technologies.length - 6} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* External Links Only */}
                    <div className="flex flex-wrap gap-4 pt-4">
                      {project.githubUrl && (
                        <Button
                          variant="outline"
                          onClick={(e) => handleExternalLink(project.githubUrl, e)}
                          className="px-6 py-3 rounded-xl font-semibold border-2 border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 dark:bg-gray-200 dark:text-gray-900"
                        >
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                          GitHub
                        </Button>
                      )}

                      {project.liveUrl && (
                        <Button
                          variant="outline" 
                          onClick={(e) => handleExternalLink(project.liveUrl, e)}
                          className="px-6 py-3 rounded-xl font-semibold border-2 border-green-300 dark:border-green-600 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 dark:bg-gray-200 dark:text-gray-900"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Live Demo
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Project Image */}
                  <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <div className="relative group">
                      {/* Background gradient effect */}
                      <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-lg"></div>
                      
                      {/* Main image container */}
                      <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl group-hover:shadow-3xl transition-all duration-300">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                        />
                        
                        {/* Always visible overlay gradients */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10" />
                        
                        {/* Project number indicator */}
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-bold text-lg shadow-lg">
                          #{index + 1}
                        </div>
                        
                        {/* Rating badge */}
                        <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg">
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{project.rating}</span>
                          </div>
                        </div>
                        
                        {/* Always visible project info overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
                          <div className="p-6 text-white w-full">
                            <h3 className="text-xl md:text-2xl font-bold mb-2 drop-shadow-lg">{project.title}</h3>
                            <p className="text-sm md:text-base text-gray-200 drop-shadow-md">{project.subtitle}</p>
                            <div className="mt-3 flex items-center gap-2">
                              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                                {project.category}
                              </span>
                              <span className="px-3 py-1 bg-green-500/80 backdrop-blur-sm rounded-full text-xs font-medium">
                                {project.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            /* No Projects Found */
            <EmptyState
              icon={<FaProjectDiagram />}
              title="No Projects Found"
              description="No projects found in the '{selectedCategory}' category."
              buttonText="View All Projects"
              buttonOnClick={() => setSelectedCategory('All')}
            />
          )}
        </div>

        {/* Summary Stats Section */}
        <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          <div className="text-center space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Professional Portfolio Summary
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A comprehensive showcase of my technical expertise and professional achievements across various domains
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {filteredProjects.length}
                </div>
                <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
                  {selectedCategory === 'All' ? 'Total Projects' : `${selectedCategory} Projects`}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {Array.from(new Set(filteredProjects.flatMap(p => p.technologies))).length}
                </div>
                <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
                  Technologies
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {filteredProjects.length > 0 ? (filteredProjects.reduce((sum, p) => sum + (p.rating || 0), 0) / filteredProjects.length).toFixed(1) : '0.0'}
                </div>
                <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
                  Avg Rating
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  {filteredProjects.reduce((sum, p) => sum + (p.downloads ? parseFloat(p.downloads.replace(/[^0-9.]/g, '')) : 0), 0).toFixed(1)}K+
                </div>
                <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
                  Total Downloads
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageSection>
  );
}