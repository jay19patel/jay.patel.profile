'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { PageSection } from '@/components/customUi/PageSection';
import { EmptyState } from '@/components/customUi/EmptyState';
import Image from 'next/image';
import Head from 'next/head';
import { toast } from 'sonner';
import { ExternalLink, AlertCircle, Copy, Check, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [activeSection, setActiveSection] = useState('');
  const [tableOfContents, setTableOfContents] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [shouldPreserveScroll, setShouldPreserveScroll] = useState(true);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // Import blogs from JSON file
        const blogsData = await import('@/data/blogs.json');
        const foundBlog = blogsData.blogs.find(b => b.slug === slug);
        
        if (!foundBlog) {
          toast.error('Blog post not found', {
            description: 'The requested blog post does not exist',
            duration: 5000,
          });
          setBlog(null);
          return;
        }
        
        setBlog(foundBlog);

        // Generate table of contents
        const parsedContent = parseContent(foundBlog.content);
        const toc = [];

        if (parsedContent?.introduction) {
          toc.push({ id: 'introduction', title: 'Introduction' });
        }

        if (parsedContent?.sections) {
          parsedContent.sections.forEach((section, index) => {
            if (section.title) {
              const id = `section-${index}`;
              toc.push({ id, title: section.title });
            }
          });
        }

        if (parsedContent?.conclusion) {
          toc.push({ id: 'conclusion', title: 'Conclusion' });
        }

        setTableOfContents(toc);
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

  // Save scroll position before sheet opens
  const handleSheetOpen = () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    setScrollPosition(currentScroll);
    setIsSheetOpen(true);
    setShouldPreserveScroll(true);

    // Prevent any body scroll behavior
    document.body.style.overflow = 'hidden';
    console.log('Sheet opened, saved scroll position:', currentScroll);
  };

  // Restore scroll position after sheet closes (only if no TOC selection was made)
  const handleSheetClose = () => {
    setIsSheetOpen(false);

    // Restore body scroll
    document.body.style.overflow = 'unset';

    if (shouldPreserveScroll) {
      console.log('Restoring scroll position to:', scrollPosition);
      // Multiple attempts to ensure scroll position is restored
      const restoreScroll = () => {
        window.scrollTo({
          top: scrollPosition,
          left: 0,
          behavior: 'instant'
        });
      };

      // Immediate restore
      restoreScroll();

      // Backup restore after animation
      requestAnimationFrame(() => {
        restoreScroll();
        setTimeout(restoreScroll, 50);
        setTimeout(restoreScroll, 150);
        setTimeout(restoreScroll, 300);
      });
    } else {
      console.log('Not preserving scroll, TOC selection was made');
    }

    // Reset for next time
    setShouldPreserveScroll(true);
  };

  // Handle TOC selection with navigation to section (close sheet and scroll)
  const handleTOCSelect = (sectionId) => {
    console.log('TOC item selected:', sectionId);
    // Close the sheet first
    setIsSheetOpen(false);
    // Restore body scroll
    document.body.style.overflow = 'unset';
    // Scroll to section after sheet closes
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 300); // Wait for sheet close animation
  };

  // Scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Account for fixed header
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  // Track active section on scroll and show floating button
  useEffect(() => {
    const handleScroll = () => {
      const sections = tableOfContents.map(item => document.getElementById(item.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 150;

      // Show floating button when content is loaded and has TOC
      setShowFloatingButton(tableOfContents.length > 0);

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    // Also set initial visibility
    setShowFloatingButton(tableOfContents.length > 0);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tableOfContents]);

  // Copy code function
  const copyCode = async (code, index) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(index);
      toast.success('Code copied to clipboard!');
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      toast.error('Failed to copy code');
    }
  };

  // Format and clean code content
  const formatCode = (code) => {
    // Remove extra whitespace from beginning and end
    let formattedCode = code.trim();
    
    // Normalize line endings
    formattedCode = formattedCode.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    
    // Remove common leading whitespace while preserving relative indentation
    const lines = formattedCode.split('\n');
    if (lines.length > 1) {
      const nonEmptyLines = lines.filter(line => line.trim().length > 0);
      if (nonEmptyLines.length > 0) {
        const minIndent = Math.min(...nonEmptyLines.map(line => {
          const match = line.match(/^(\s*)/);
          return match ? match[1].length : 0;
        }));
        
        if (minIndent > 0) {
          formattedCode = lines.map(line => {
            if (line.trim().length === 0) return '';
            return line.substring(minIndent);
          }).join('\n');
        }
      }
    }
    
    return formattedCode;
  };


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

  // Table of Contents Component
  const TableOfContents = ({ mobile = false }) => (
    <div className={`${mobile ? 'p-6' : 'sticky top-24 h-fit max-h-[calc(100vh-6rem)] overflow-y-auto'}`}>
      <div className="space-y-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          Table of Contents
        </h3>
        <nav className="space-y-2">
          {tableOfContents.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleTOCSelect(item.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                activeSection === item.id
                  ? 'text-purple-600 dark:text-purple-400 underline bg-purple-50 dark:bg-purple-900/20 border-l-2 border-purple-500'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <div className="flex items-start gap-2">
                <span className="text-xs font-mono text-gray-400 mt-0.5 flex-shrink-0">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                <span className="line-clamp-2">{item.title}</span>
              </div>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );

  // Render section content based on type
  const renderSection = (section, index) => {
    switch (section.type) {
      case 'text':
        return (
          <div key={index} id={`section-${index}`} className="prose prose-lg dark:prose-invert max-w-none">
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
          <div key={index} id={`section-${index}`} className="space-y-4">
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
          <div key={index} id={`section-${index}`} className="space-y-4">
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
          <div key={index} id={`section-${index}`} className="space-y-4">
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
          <div key={index} id={`section-${index}`} className="space-y-4">
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

      case 'image':
        return (
          <div key={index} id={`section-${index}`} className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {section.title}
            </h3>
            <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <img
                src={section.url}
                alt={section.alt || section.title}
                className="w-full h-auto"
                loading="lazy"
              />
              {section.caption && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center italic">
                    {section.caption}
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 'code':
        const codeIndex = `code-${index}`;
        const isCopied = copiedIndex === codeIndex;
        return (
          <div key={index} id={`section-${index}`} className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {section.title}
            </h3>
            <div className="relative group">
              {/* VS Code-like header */}
              <div className="absolute top-0 left-0 right-0 bg-[#2d2d30] border-b border-[#3e3e42] px-4 py-2 rounded-t-lg flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#28ca42]"></div>
                  </div>
                  <span className="ml-2 text-[#cccccc] text-xs font-mono">
                    {section.language}
                  </span>
                </div>
                <button
                  onClick={() => copyCode(formatCode(section.content), codeIndex)}
                  className="flex items-center gap-1 px-2 py-1 bg-[#0e639c] hover:bg-[#1177bb] text-white text-xs rounded font-mono transition-all duration-200 opacity-0 group-hover:opacity-100"
                  title="Copy code"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              
              {/* Code block with professional syntax highlighting - no line numbers */}
              <div className="bg-[#1e1e1e] rounded-lg overflow-hidden border border-[#333] shadow-2xl pt-12">
                <SyntaxHighlighter
                  language={section.language}
                  style={vscDarkPlus}
                  showLineNumbers={false}
                  wrapLines={true}
                  customStyle={{
                    margin: 0,
                    padding: '1rem',
                    background: '#1e1e1e',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    fontFamily: "'Fira Code', 'JetBrains Mono', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace"
                  }}
                >
                  {formatCode(section.content)}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        );

      case 'youtube':
        return (
          <div key={index} id={`section-${index}`} className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {section.title}
            </h3>
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${section.videoId}`}
                title={section.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg"
              />
            </div>
            {section.description && (
              <p className="text-gray-600 dark:text-gray-400 text-sm italic">
                {section.description}
              </p>
            )}
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
    description: blog.excerpt || blog.subtitle,
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
        <div className="max-w-4xl mx-auto">
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
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
              {blog.readTime}
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
            <div id="introduction" className="prose prose-lg dark:prose-invert max-w-none">
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
            <div id="conclusion" className="prose prose-lg dark:prose-invert max-w-none">
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
        </div>

        {/* Floating TOC Button with Text - Left Side (Blog Detail Only) */}
        {showFloatingButton && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="fixed bottom-6 left-6 z-50"
          >
            <Sheet open={isSheetOpen} onOpenChange={(open) => open ? handleSheetOpen() : handleSheetClose()}>
              <SheetTrigger asChild>
                <button className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group flex items-center gap-2">
                  <Menu className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Table of Content</span>
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Table of Contents</SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-auto">
                  <TableOfContents mobile={true} />
                </div>
              </SheetContent>
            </Sheet>
          </motion.div>
        )}
      </PageSection>
    </>
  );
} 