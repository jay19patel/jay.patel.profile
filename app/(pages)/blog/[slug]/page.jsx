'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { PageSection } from '@/components/customUi/PageSection';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blog?slug=${slug}`);
        const data = await response.json();
        setBlog(data.blog);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (isLoading) {
    return (
      <PageSection
        showBreadcrumb
        breadcrumbItems={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: '...' }
        ]}
      >
        <div className="w-full h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </PageSection>
    );
  }

  if (!blog) {
    return (
      <PageSection
        showBreadcrumb
        breadcrumbItems={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: 'Not Found' }
        ]}
      >
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Blog Post Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400">The blog post you're looking for doesn't exist.</p>
        </div>
      </PageSection>
    );
  }

  return (
    <PageSection
      showBreadcrumb
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: blog.title }
      ]}
    >
      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="relative h-[400px] mb-6 rounded-2xl overflow-hidden">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span>{new Date(blog.publishedDate).toLocaleDateString()}</span>
              <span>•</span>
              <span>{blog.readTime}</span>
              <span>•</span>
              <span>By {blog.author}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              {blog.title}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {blog.subtitle}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* Introduction */}
          <div className="mb-8">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {blog.content.introduction}
            </p>
          </div>

          {/* Sections */}
          {blog.content.sections.map((section, index) => (
            <section key={index} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
              
              {section.type === 'text' && (
                <p className="text-gray-700 dark:text-gray-300">{section.content}</p>
              )}
              
              {section.type === 'bullets' && (
                <ul className="list-disc pl-6 space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-700 dark:text-gray-300">{item}</li>
                  ))}
                </ul>
              )}
              
              {section.type === 'table' && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        {section.headers.map((header, headerIndex) => (
                          <th
                            key={headerIndex}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {section.rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              
              {section.type === 'note' && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 p-4 rounded">
                  <p className="text-yellow-700 dark:text-yellow-300">{section.content}</p>
                </div>
              )}
              
              {section.type === 'links' && (
                <div className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-1">
                        {link.text}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {link.description}
                      </p>
                    </a>
                  ))}
                </div>
              )}
            </section>
          ))}

          {/* Conclusion */}
          {blog.content.conclusion && (
            <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
              <p className="text-gray-700 dark:text-gray-300">{blog.content.conclusion}</p>
            </div>
          )}
        </div>
      </article>
    </PageSection>
  );
} 