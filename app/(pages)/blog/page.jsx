'use client';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PageSection } from '@/components/customUi/PageSection';
import { EmptyState } from '@/components/customUi/EmptyState';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Search, Calendar, Clock, Tag, Star } from 'lucide-react';
import { MagicCard } from '@/components/ui/magic-card';

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

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-fr">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog, index) => (
              <div
                key={blog.id}
                onClick={() => handleCardClick(blog.slug)}
                className="group cursor-pointer"
              >
                <MagicCard
                  className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl p-2 shadow-lg transition-shadow duration-300 relative overflow-hidden h-full flex flex-col"
                  gradientColor="#3b82f6"
                  gradientOpacity={0.1}
                  gradientFrom="#3b82f6"
                  gradientTo="#8b5cf6"
                >
                  {/* Featured Badge - Sticky Overlay */}
                  {blog.featured && (
                    <div className="absolute top-4 right-4 z-30">
                      <div className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 text-white rounded-full text-xs font-bold shadow-xl backdrop-blur-sm border border-white/20">
                        <Star className="w-3.5 h-3.5 fill-current drop-shadow-sm" />
                        <span className="drop-shadow-sm">Featured</span>
                      </div>
                    </div>
                  )}

                  {/* Card Hero Section */}
                  <div className="relative rounded-xl overflow-hidden mb-4">
                    <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20">
                      {blog.image && (
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={index < 3}
                        />
                      )}

                      {/* Category Badge on Image */}
                      <div className="absolute top-3 left-3 z-10">
                        <div className="flex items-center gap-1 px-3 py-1.5 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800 dark:text-gray-200 border border-gray-200/50 dark:border-gray-600/50 shadow-lg">
                          <Tag className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                          {blog.category}
                        </div>
                      </div>

                      {/* Read Time Badge */}
                      <div className="absolute bottom-3 right-3 z-10">
                        <div className="flex items-center gap-1 px-2.5 py-1.5 bg-black/80 text-white rounded-lg text-xs font-medium shadow-lg">
                          <Clock className="w-3 h-3" />
                          {blog.readTime}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-4 pb-4 space-y-4 flex-grow">
                    {/* Article Summary */}
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {blog.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 line-clamp-2 leading-relaxed">
                          {blog.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Meta Information */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(blog.publishedDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}</span>
                        </div>
                        <div className="text-xs font-medium text-gray-600 dark:text-gray-300 truncate ml-2">
                          By {blog.author}
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Topics
                        </h4>
                        <div className="space-y-1">
                          {blog.tags.slice(0, 3).map((tag, tagIndex) => (
                            <div key={tagIndex} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                {tag}
                              </span>
                            </div>
                          ))}
                          {blog.tags.length > 3 && (
                            <div className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-xs text-gray-500 dark:text-gray-500 leading-relaxed">
                                +{blog.tags.length - 3} more topics
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </MagicCard>
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
          <MagicCard
            className="bg-gradient-to-br from-blue-50/90 to-indigo-50/90 dark:from-blue-900/30 dark:to-indigo-900/30 backdrop-blur-md rounded-2xl p-8 shadow-lg"
            gradientColor="#3b82f6"
            gradientOpacity={0.06}
            gradientFrom="#3b82f6"
            gradientTo="#8b5cf6"
          >
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
          </MagicCard>
        )}
      </div>
    </PageSection>
  );
} 