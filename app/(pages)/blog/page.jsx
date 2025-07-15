'use client';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PageSection } from '@/components/customUi/PageSection';
import { EmptyState } from '@/components/customUi/EmptyState';
import { Button } from '@/components/ui/button';
import { getBlogs } from '@/app/actions/blogs';
import { toast } from 'sonner';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data, error } = await getBlogs();
        if (error) {
          const errorMessage = typeof error === 'object' ? error.message : error;
          toast.error('Failed to fetch blog posts', {
            description: errorMessage || 'Please try again later',
            duration: 5000,
          });
        }
        setBlogs(data || []);
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

  // Filter blogs based on selected category
  const filteredBlogs = useMemo(() => {
    if (selectedCategory === 'All') {
      return blogs;
    }
    return blogs.filter(blog => blog.category === selectedCategory);
  }, [selectedCategory, blogs]);

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
      <div className="space-y-12">
        {/* Filter Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Blog Categories</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Filter articles by topic or category</p>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => {
                const postCount = category === 'All' 
                  ? blogs.length 
                  : blogs.filter(p => p.category === category).length;
                
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
                      {postCount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Blog Posts List - Alternating Layout */}
        <div className="space-y-16">
          {filteredBlogs.length > 0 ? (
            <>
              {filteredBlogs.map((blog, index) => (
                <div 
                  key={blog._id} 
                  onClick={() => handleCardClick(blog.slug)}
                  className={`grid lg:grid-cols-2 gap-6 lg:gap-8 items-center p-4 md:p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-gray-800 hover:shadow-2xl transition-all duration-300 cursor-pointer group ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  {/* Blog Content */}
                  <div className={`space-y-4 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    {/* Blog Header */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-semibold border border-blue-200 dark:border-blue-700">
                          {blog.category}
                        </span>
                        <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 text-green-600 dark:text-green-400 rounded-lg text-sm font-semibold border border-green-200 dark:border-green-700">
                          {new Date(blog.publishedDate).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {blog.title}
                      </h2>
                      
                      <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                        {blog.subtitle}
                      </p>
                    </div>

                    {/* Blog Description */}
                    <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                      {blog.description}
                    </p>

                    {/* Blog Meta */}
                    <div className="flex flex-wrap gap-4 py-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                          By {blog.author}
                        </span>
                      </div>
                      {blog.readTime && (
                        <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                          {blog.readTime} min read
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Tags
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {blog.tags?.slice(0, 6).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2.5 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                          >
                            {tag}
                          </span>
                        ))}
                        {blog.tags?.length > 6 && (
                          <span className="px-2.5 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-sm font-medium">
                            +{blog.tags.length - 6} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Read More Button */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      <Button
                        variant="outline"
                        className="px-4 py-2 rounded-lg font-semibold border-2 border-blue-300 dark:border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                      >
                        Read More
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Button>
                    </div>
                  </div>

                  {/* Blog Image */}
                  <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <div className="relative group">
                      {/* Background gradient effect */}
                      <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-lg"></div>
                      
                      {/* Main image container */}
                      <div className="relative h-48 sm:h-56 md:h-64 lg:h-[320px] rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl group-hover:shadow-3xl transition-all duration-300">
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                        />
                        
                        {/* Always visible overlay gradients */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10" />
                        
                        {/* Featured badge if blog is featured */}
                        {blog.featured && (
                          <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1.5 rounded-lg font-bold text-sm shadow-lg">
                            Featured
                          </div>
                        )}
                        
                        {/* Read time badge */}
                        {blog.readTime && (
                          <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-2.5 py-1.5 rounded-lg shadow-lg">
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4 text-gray-800 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{blog.readTime} min</span>
                            </div>
                          </div>
                        )}
                        
                        {/* Always visible blog info overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
                          <div className="p-4 text-white w-full">
                            <h3 className="text-lg md:text-xl font-bold mb-1 drop-shadow-lg">{blog.title}</h3>
                            <p className="text-sm text-gray-200 drop-shadow-md line-clamp-2">{blog.subtitle}</p>
                            <div className="mt-2 flex items-center gap-2">
                              <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                                {blog.category}
                              </span>
                              <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                                {new Date(blog.publishedDate).toLocaleDateString()}
                              </span>
                            </div>
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
              illustration="/blog-empty.svg"
              title="No Posts Found"
              description={`No blog posts found in the '${selectedCategory}' category.`}
              buttonText="View All Posts"
              buttonOnClick={() => setSelectedCategory('All')}
            />
          )}
        </div>

        {/* Summary Stats Section */}
        <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          <div className="text-center space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Blog Statistics
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our growing collection of articles, tutorials, and insights
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {filteredBlogs.length}
                </div>
                <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
                  {selectedCategory === 'All' ? 'Total Posts' : `${selectedCategory} Posts`}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {categories.length - 1}
                </div>
                <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
                  Categories
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {filteredBlogs.filter(blog => blog.featured).length}
                </div>
                <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
                  Featured Posts
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  {Math.round(filteredBlogs.reduce((sum, blog) => sum + (blog.readTime || 0), 0) / filteredBlogs.length)}
                </div>
                <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
                  Avg Read Time
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageSection>
  );
} 