'use client';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PageSection } from '@/components/customUi/PageSection';
import { EmptyState } from '@/components/customUi/EmptyState';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Search, Calendar, Clock, Tag } from 'lucide-react';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Import blogs from JSON file
        const blogsData = await import('@/data/blogs.json');
        setBlogs(blogsData.blogs || []);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        toast.error('Failed to fetch blog posts', {
          description: error.message || 'Please try again later',
          duration: 5000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Get unique categories from blogs data
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(blogs.map(blog => blog.category))];
    return ['All', ...uniqueCategories];
  }, [blogs]);

  // Filter blogs based on selected category and search term
  const filteredBlogs = useMemo(() => {
    let filtered = blogs;
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(blog => blog.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(searchLower) ||
        blog.subtitle.toLowerCase().includes(searchLower) ||
        blog.excerpt.toLowerCase().includes(searchLower) ||
        blog.tags?.some(tag => tag.toLowerCase().includes(searchLower)) ||
        blog.author.toLowerCase().includes(searchLower)
      );
    }
    
    return filtered;
  }, [selectedCategory, searchTerm, blogs]);

  // Handle card click to navigate to blog detail
  const handleCardClick = (blogSlug) => {
    router.push(`/blog/${blogSlug}`);
  };

  // Custom props for the PageSection header
  const headerProps = {
    portfolioLabel: "Blog & Articles",
    showBreadcrumb: true,
    breadcrumbItems: [
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" }
    ],
    headline: ["Insights", "Articles", "& Updates"],
    description: "Explore our collection of in-depth articles, tutorials, and insights on technology, development, and industry trends.",
    centerTitle: "Latest",
    centerSubtitle: "Articles",
    technologies: ["Tech", "Development", "AI/ML", "Web Dev", "Mobile", "Cloud"],
    stats: [
      { count: `${filteredBlogs.length}`, label: `${selectedCategory === 'All' ? 'Total Posts' : selectedCategory + ' Posts'}`, color: "blue" },
      { count: categories.length - 1, label: "Categories", color: "purple" },
      { count: "Weekly", label: "Updates", color: "green" }
    ],
    centerIcon: (
      <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
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

  // If no blogs are available
  if (blogs.length === 0) {
    return (
      <PageSection {...headerProps}>
        <EmptyState
          illustration="/blog-empty.svg"
          title="No Blog Posts Available"
          description="Check back later for new articles and insights."
          buttonText="Refresh Posts"
          buttonOnClick={() => window.location.reload()}
        />
      </PageSection>
    );
  }

  // If blogs are available
  return (
    <PageSection {...headerProps}>
      <div className="space-y-8">
        {/* Search and Filter Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => {
                const postCount = category === 'All' 
                  ? blogs.length 
                  : blogs.filter(p => p.category === category).length;
                
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category}
                    <span className={`ml-1 text-xs ${
                      selectedCategory === category ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      ({postCount})
                    </span>
                  </button>
                );
              })}
            </div>
            
            {/* Search Results Info */}
            {searchTerm && (
              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                {filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''} found for "{searchTerm}"
              </div>
            )}
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog, index) => (
              <div 
                key={blog.id} 
                onClick={() => handleCardClick(blog.slug)}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer group hover:-translate-y-1"
              >
                {/* Featured Badge */}
                {blog.featured && (
                  <div className="flex justify-end mb-2">
                    <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  </div>
                )}
                
                {/* Blog Image */}
                <div className="relative h-40 rounded-xl overflow-hidden mb-4 bg-gray-100 dark:bg-gray-700">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Category */}
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                    {blog.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {blog.excerpt}
                </p>

                {/* Meta Information */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(blog.publishedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    By {blog.author}
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {blog.tags?.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {blog.tags?.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs">
                        +{blog.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <EmptyState
                illustration="/blog-empty.svg"
                title="No Posts Found"
                description={searchTerm 
                  ? `No blog posts found matching "${searchTerm}"`
                  : `No blog posts found in the '${selectedCategory}' category.`
                }
                buttonText={searchTerm ? "Clear Search" : "View All Posts"}
                buttonOnClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
              />
            </div>
          )}
        </div>

        {/* Stats Section */}
        {filteredBlogs.length > 0 && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Blog Overview
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    {filteredBlogs.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {searchTerm || selectedCategory !== 'All' ? 'Found' : 'Total'} Posts
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                    {filteredBlogs.filter(blog => blog.featured).length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Featured
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                    {categories.length - 1}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Categories
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                    {filteredBlogs.length > 0 ? Math.round(filteredBlogs.reduce((sum, blog) => {
                      const timeMatch = blog.readTime?.match(/\d+/);
                      return sum + (timeMatch ? parseInt(timeMatch[0]) : 0);
                    }, 0) / filteredBlogs.length) : 0}m
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Avg Read Time
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageSection>
  );
} 