'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getBlogBySlug } from '@/app/actions/blogs';
import { PageSection } from '@/components/customUi/PageSection';
import { EmptyState } from '@/components/customUi/EmptyState';
import Image from 'next/image';
import { toast } from 'sonner';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data, error } = await getBlogBySlug(slug);
        if (error) {
          toast.error('Failed to fetch blog post', {
            description: error || 'Please try again later',
            duration: 5000,
          });
          return;
        }
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog:', error);
        toast.error('Failed to fetch blog post', {
          description: error.message || 'Please try again later',
          duration: 5000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <EmptyState
        title="Blog Post Not Found"
        description="The blog post you're looking for doesn't exist or has been removed."
        buttonText="Back to Blog"
        buttonHref="/blog"
        illustration="/blog-empty.svg"
      />
    );
  }

  const headerProps = {
    showBreadcrumb: true,
    breadcrumbItems: [
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
      { label: blog.title }
    ],
    headline: ["Blog", "Post", "Details"],
    description: blog.subtitle,
    centerTitle: blog.category,
    centerSubtitle: "Article",
    stats: [
      { count: new Date(blog.publishedDate).toLocaleDateString(), label: "Published", color: "blue" },
      { count: `${blog.readTime}min`, label: "Read Time", color: "purple" },
      { count: blog.author, label: "Author", color: "green" }
    ],
    centerIcon: (
      <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
      </svg>
    )
  };

  return (
    <PageSection {...headerProps}>
      <article className="max-w-4xl mx-auto space-y-8">
        {/* Featured Image */}
        <div className="relative h-[400px] rounded-2xl overflow-hidden">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Overlay Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-600/80 backdrop-blur-sm rounded-lg text-sm font-medium">
                {blog.category}
              </span>
              {blog.featured && (
                <span className="px-3 py-1 bg-yellow-500/80 backdrop-blur-sm rounded-lg text-sm font-medium">
                  Featured Post
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 drop-shadow-lg">
              {blog.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 drop-shadow-md">
              {blog.subtitle}
            </p>
          </div>
        </div>

        {/* Meta Information */}
        <div className="flex flex-wrap gap-6 py-4 border-y border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-600 dark:text-gray-400">
              {new Date(blog.publishedDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-600 dark:text-gray-400">
              {blog.readTime} min read
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-gray-600 dark:text-gray-400">
              By {blog.author}
            </span>
          </div>
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {blog.content}
        </div>
      </article>
    </PageSection>
  );
} 