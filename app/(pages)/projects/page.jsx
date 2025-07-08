'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PageSection } from '@/components/customUi/PageSection';
import { EmptyState } from '@/components/customUi/EmptyState';
import { Star } from 'lucide-react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data.projects || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <PageSection
        showBreadcrumb
        breadcrumbItems={[
          { label: 'Home', href: '/' },
          { label: 'Projects' }
        ]}
        portfolioLabel="Portfolio"
        headline={['My', 'Featured', 'Projects']}
      >
        <div className="w-full h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </PageSection>
    );
  }

  return (
    <PageSection
      showBreadcrumb
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: 'Projects' }
      ]}
      portfolioLabel="Portfolio"
      headline={['My', 'Featured', 'Projects']}
    >
      {projects.length === 0 ? (
        <EmptyState
          title="No Projects Available"
          description="I'm currently working on some exciting projects. Check back soon to see my latest work and innovations!"
          illustration="/projects-empty.svg"
          actionLabel="Return Home"
          actionHref="/"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((project) => (
            <Link
              key={project._id}
              href={`/projects/${project.slug}`}
              className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 px-2 py-1 bg-gray-900/80 backdrop-blur-sm text-white text-xs font-medium rounded flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 stroke-yellow-400" />
                  {project.rating}
                </div>
              </div>
              
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    project.status === 'Completed'
                      ? 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20'
                      : 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20'
                  }`}>
                    {project.status}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {project.downloads} Downloads
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="pt-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </PageSection>
  );
}