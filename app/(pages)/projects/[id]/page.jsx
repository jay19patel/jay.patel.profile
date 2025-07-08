'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { PageSection } from '@/components/customUi/PageSection';
import { Star, ExternalLink, Github } from 'lucide-react';

export default function ProjectDetailPage() {
  const { id: slug } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects?slug=${slug}`);
        const data = await response.json();
        setProject(data.project);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching project:', error);
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (isLoading) {
    return (
      <PageSection
        showBreadcrumb
        breadcrumbItems={[
          { label: 'Home', href: '/' },
          { label: 'Projects', href: '/projects' },
          { label: '...' }
        ]}
      >
        <div className="w-full h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </PageSection>
    );
  }

  if (!project) {
    return (
      <PageSection
        showBreadcrumb
        breadcrumbItems={[
          { label: 'Home', href: '/' },
          { label: 'Projects', href: '/projects' },
          { label: 'Not Found' }
        ]}
      >
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Project Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400">The project you're looking for doesn't exist.</p>
        </div>
      </PageSection>
    );
  }

  return (
    <PageSection
      showBreadcrumb
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: 'Projects', href: '/projects' },
        { label: project.title }
      ]}
    >
      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="relative h-[400px] mb-6 rounded-2xl overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-gray-900/80 backdrop-blur-sm text-white text-sm font-medium rounded-full flex items-center gap-2">
              <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
              {project.rating} Rating
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1.5 text-sm font-medium rounded-full ${
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
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              {project.title}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {project.subtitle}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="flex gap-4 pt-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub Repository
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* Introduction */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
            <p className="text-gray-700 dark:text-gray-300">
              {project.introduction}
            </p>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-gray-700 dark:text-gray-300">
              {project.description}
            </p>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Key Features</h2>
            <ul className="list-disc pl-6 space-y-2">
              {project.features.map((feature, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Screenshots */}
          {project.screenshots && project.screenshots.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Screenshots</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.screenshots.map((screenshot, index) => (
                  <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src={screenshot}
                      alt={`${project.title} Screenshot ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Challenges */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Challenges & Solutions</h2>
            <ul className="list-disc pl-6 space-y-2">
              {project.challenges.map((challenge, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">
                  {challenge}
                </li>
              ))}
            </ul>
          </div>

          {/* Learnings */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Key Learnings</h2>
            <ul className="list-disc pl-6 space-y-2">
              {project.learnings.map((learning, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">
                  {learning}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </PageSection>
  );
} 