'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PageSection } from '@/components/customUi/PageSection';
import { EmptyState } from '@/components/customUi/EmptyState';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blog');
        const data = await response.json();
        setBlogs(data.blogs || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (isLoading) {
    return (
      <PageSection
        showBreadcrumb
        breadcrumbItems={[
          { label: 'Home', href: '/' },
          { label: 'Blog' }
        ]}
        portfolioLabel="My Blog"
        headline={['Latest', 'Blog', 'Posts']}
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
        { label: 'Blog' }
      ]}
      portfolioLabel="My Blog"
      headline={['Latest', 'Blog', 'Posts']}
    >
      {blogs.length === 0 ? (
        <EmptyState
          title="No Blog Posts Yet"
          description="Stay tuned! I'm working on creating interesting and informative blog posts to share my knowledge and experiences with you."
          illustration="/blog-empty.svg"
          actionLabel="Return Home"
          actionHref="/"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs?.map((blog) => (
            <Link
              key={blog._id}
              href={`/blog/${blog.slug}`}
              className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {blog.featured && (
                  <div className="absolute top-2 right-2 px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded">
                    Featured
                  </div>
                )}
              </div>
              
              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>{new Date(blog.publishedDate).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {blog.title}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {blog.excerpt}
                </p>
                
                <div className="pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20 rounded">
                      {blog.category}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    By {blog.author}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </PageSection>
  );
} 