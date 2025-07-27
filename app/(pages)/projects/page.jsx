'use client';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PageSection } from '@/components/customUi/PageSection';
import { EmptyState } from '@/components/customUi/EmptyState';
import { Button } from '@/components/ui/button';
import { getProjects } from '@/app/actions/projects';
import { toast } from 'sonner';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await getProjects();
        if (error) {
          const errorMessage = typeof error === 'object' ? error.message : error;
          toast.error('Failed to fetch projects', {
            description: errorMessage || 'Please try again later',
            duration: 5000,
          });
          // throw new Error(errorMessage);
        }
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast.error('Failed to fetch projects', {
          description: error.message || 'Please try again later',
          duration: 5000,
        });
      } finally {
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

  // If no projects are available
  if (projects.length === 0) {
    return (
      <PageSection {...headerProps}>
        <EmptyState
          illustration="/projects-empty.svg"
          title="No Projects Available"
          description="Currently, there are no projects to display."
          buttonText="Refresh Projects"
          buttonOnClick={() => window.location.reload()}
        />
      </PageSection>
    );
  }

  // If projects are available
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
                    className={`group relative px-6 md:px-8 py-3 md:py-4 rounded-xl transition-all duration-300 font-semibold transform hover:scale-105 hover:shadow-lg bg-white dark:bg-gray-800 border-2 text-gray-700 dark:text-gray-300 shadow-md
                      ${selectedCategory === category
                        ? 'border-blue-500 dark:border-blue-400'
                        : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700'}
                    `}
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
                  className={`grid lg:grid-cols-2 gap-6 lg:gap-8 items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800 transition-colors duration-200 cursor-pointer group ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  {/* Project Content */}
                  <div className={`space-y-4 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    {/* Project Header */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium">
                          {project.category}
                        </span>
                        <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                          project.status === 'Completed' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                        }`}>
                          ✓ {project.status}
                        </span>
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                        {project.title}
                      </h2>
                      
                      <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Project Description */}
                    <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Project Stats */}
                    <div className="flex flex-wrap gap-4 py-2">
                      <div className="flex items-center gap-1.5">
                        <div className="flex text-yellow-400 text-base">
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
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 6).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 6 && (
                          <span className="px-2.5 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-sm font-medium">
                            +{project.technologies.length - 6} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* External Links Only */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      {project.githubUrl && (
                        <Button
                          variant="outline"
                          onClick={(e) => handleExternalLink(project.githubUrl, e)}
                          className="px-4 py-2 rounded-lg font-medium border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-200"
                        >
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                          GitHub
                        </Button>
                      )}

                      {project.liveUrl && (
                        <Button
                          variant="outline" 
                          onClick={(e) => handleExternalLink(project.liveUrl, e)}
                          className="px-4 py-2 rounded-lg font-medium border border-green-300 dark:border-green-600 text-green-600 dark:text-green-400 transition-colors duration-200"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      {/* Clean image container */}
                      <div className="relative h-48 sm:h-56 md:h-64 lg:h-[280px] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                        />
                        
                        {/* Simple project number badge */}
                        <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-lg font-medium text-sm">
                          #{index + 1}
                        </div>
                        
                        {/* Simple rating badge */}
                        <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 px-2 py-1 rounded-lg">
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500 text-sm">★</span>
                            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{project.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <EmptyState
              illustration="/projects-empty.svg"
              title="No Projects Found"
              description={`No projects found in the '${selectedCategory}' category.`}
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