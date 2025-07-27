'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getBlogBySlug } from '@/app/actions/blogs';
import { PageSection } from '@/components/customUi/PageSection';
import { EmptyState } from '@/components/customUi/EmptyState';
import Image from 'next/image';
import Head from 'next/head';
import { toast } from 'sonner';
import { ExternalLink, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getBlogBySlug(slug);
        if (!response.success) {
          toast.error('Failed to fetch blog post', {
            description: response.error || 'Please try again later',
            duration: 5000,
          });
          return;
        }
        setBlog(response.data);
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

  // Parse content if it's a string
  const parseContent = (content) => {
    if (typeof content === 'string') {
      try {
        return JSON.parse(content);
      } catch (e) {
        return { introduction: content, sections: [], conclusion: '' };
      }
    }
    return content;
  };

  // Render section content based on type
  const renderSection = (section, index) => {
    switch (section.type) {
      case 'text':
        return (
          <div key={index} className="prose prose-lg dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {section.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {section.content}
            </p>
          </div>
        );

      case 'bullets':
        return (
          <div key={index} className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {section.title}
            </h3>
            <ul className="space-y-2">
              {section.items?.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'table':
        return (
          <div key={index} className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {section.title}
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    {section.headers?.map((header, headerIndex) => (
                      <th
                        key={headerIndex}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {section.rows?.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'note':
        return (
          <div key={index} className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {section.title}
            </h3>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-yellow-800 dark:text-yellow-200 whitespace-pre-wrap">
                  {section.content}
                </p>
              </div>
            </div>
          </div>
        );

      case 'links':
        return (
          <div key={index} className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {section.title}
            </h3>
            <div className="grid gap-4">
              {section.links?.map((link, linkIndex) => (
                <a
                  key={linkIndex}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1">
                        {link.text}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {link.description}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 ml-2 flex-shrink-0" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: blog.title }
  ];

  const parsedContent = parseContent(blog.content);

  // SEO Meta Data
  const blogMetadata = {
    title: blog.title,
    description: blog.description || blog.subtitle,
    image: blog.image,
    url: `https://jaypatel.dev/blog/${blog.slug}`,
    publishedDate: blog.publishedDate,
    author: blog.author,
    tags: blog.tags
  };

  return (
    <>
      <Head>
        <title>{blogMetadata.title} | Jay Patel Portfolio</title>
        <meta name="description" content={blogMetadata.description} />
        <meta name="keywords" content={blogMetadata.tags?.join(', ')} />
        <meta name="author" content={blogMetadata.author} />
        <meta name="article:published_time" content={blogMetadata.publishedDate} />
        
        {/* Open Graph */}
        <meta property="og:title" content={blogMetadata.title} />
        <meta property="og:description" content={blogMetadata.description} />
        <meta property="og:image" content={blogMetadata.image} />
        <meta property="og:url" content={blogMetadata.url} />
        <meta property="og:type" content="article" />
        <meta property="article:author" content={blogMetadata.author} />
        <meta property="article:published_time" content={blogMetadata.publishedDate} />
        {blogMetadata.tags?.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blogMetadata.title} />
        <meta name="twitter:description" content={blogMetadata.description} />
        <meta name="twitter:image" content={blogMetadata.image} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": blogMetadata.title,
              "description": blogMetadata.description,
              "image": blogMetadata.image,
              "author": {
                "@type": "Person",
                "name": blogMetadata.author
              },
              "publisher": {
                "@type": "Person",
                "name": "Jay Patel"
              },
              "datePublished": blogMetadata.publishedDate,
              "url": blogMetadata.url,
              "keywords": blogMetadata.tags?.join(', ')
            })
          }}
        />
      </Head>
      
      <PageSection 
        showHeader={false}
        showBreadcrumb={true}
        breadcrumbItems={breadcrumbItems}
      >
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto space-y-8"
        >
        {/* Featured Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[400px] rounded-2xl overflow-hidden"
        >
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Overlay Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute bottom-0 left-0 right-0 p-6 text-white"
          >
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
          </motion.div>
        </motion.div>

        {/* Meta Information */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-wrap gap-6 py-4 border-y border-gray-200 dark:border-gray-800"
        >
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
        </motion.div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-wrap gap-2"
          >
            {blog.tags.map((tag, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.9 + (index * 0.1) }}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
              >
                #{tag}
              </motion.span>
            ))}
          </motion.div>
        )}

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="space-y-8"
        >
          {/* Introduction */}
          {parsedContent?.introduction && (
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Introduction
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
                {parsedContent.introduction}
              </p>
            </div>
          )}

          {/* Sections */}
          {parsedContent?.sections?.map((section, index) => renderSection(section, index))}

          {/* Conclusion */}
          {parsedContent?.conclusion && (
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Conclusion
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
                {parsedContent.conclusion}
              </p>
            </div>
          )}
        </motion.div>

        </motion.article>
      </PageSection>
    </>
  );
} 