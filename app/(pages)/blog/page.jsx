'use client';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { PageSection } from '@/components/customUi/PageSection';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Search, Calendar, ChevronLeft, ChevronRight, ArrowUpRight, Menu, Filter } from 'lucide-react';
import { MagicCard } from '@/components/ui/magic-card';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(10);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
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
        blog.subtitle?.toLowerCase().includes(searchLower) ||
        blog.excerpt.toLowerCase().includes(searchLower) ||
        blog.tags?.some(tag => tag.toLowerCase().includes(searchLower)) ||
        blog.author.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [selectedCategory, searchTerm, blogs]);

  // Pagination logic
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;
  const currentBlogs = filteredBlogs.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  // Save scroll position before sheet opens
  const handleSheetOpen = () => {
    setScrollPosition(window.pageYOffset || document.documentElement.scrollTop);
    setIsSheetOpen(true);
  };

  // Restore scroll position after sheet closes
  const handleSheetClose = () => {
    setIsSheetOpen(false);
    // Use requestAnimationFrame to ensure DOM is updated before scrolling
    requestAnimationFrame(() => {
      setTimeout(() => {
        window.scrollTo({
          top: scrollPosition,
          left: 0,
          behavior: 'instant'
        });
      }, 100);
    });
  };

  // Handle category selection with scroll preservation
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    // Close sheet immediately when category is selected
    if (isSheetOpen) {
      handleSheetClose();
    }
  };

  // Handle search with scroll preservation
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  // Handle card click to navigate to blog detail
  const handleCardClick = (blogSlug) => {
    router.push(`/blog/${blogSlug}`);
  };

  // Search and Filter Sidebar Component
  const SearchFilterSidebar = ({ mobile = false }) => (
    <div className={`${mobile ? 'p-6' : 'sticky top-24 h-fit max-h-[calc(100vh-6rem)] overflow-y-auto'} space-y-6`}>
      <div className="space-y-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Search className="w-5 h-5" />
          Search & Filter
        </h3>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
          />
        </div>

        {/* Search Results Info */}
        {searchTerm && (
          <div className="text-sm text-gray-600 dark:text-gray-400 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
            {filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''} found for "{searchTerm}"
          </div>
        )}
      </div>

      {/* Category Filters */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Categories
        </h4>
        <div className="space-y-2">
          {categories.map((category) => {
            const postCount = category === 'All'
              ? blogs.length
              : blogs.filter(p => p.category === category).length;

            return (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 underline border-l-4 border-purple-500'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{category}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedCategory === category
                      ? 'bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-300'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}>
                    {postCount}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 dark:text-white">Quick Actions</h4>
        <div className="space-y-2">
          <Button
            onClick={() => {
              handleSearchChange('');
              handleCategorySelect('All');
            }}
            variant="outline"
            size="sm"
            className="w-full text-sm"
          >
            Clear All Filters
          </Button>
          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <div>Showing {currentBlogs.length} of {filteredBlogs.length} articles</div>
            <div>Page {currentPage} of {totalPages}</div>
          </div>
        </div>
      </div>
    </div>
  );

  // BlogCard component matching RecentBlogs design
  function BlogCard({ blog, onClick }) {
    return (
      <div
        className="cursor-pointer w-full max-w-5xl mx-auto"
        onClick={onClick}
      >
        <MagicCard
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-6 shadow-lg transition-all duration-200"
          gradientColor="#3b82f6"
          gradientOpacity={0.1}
          gradientFrom="#3b82f6"
          gradientTo="#8b5cf6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
            {/* Blog Image */}
            <div className="order-2 lg:order-1 lg:col-span-2">
              {blog.image && (
                <div className="relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 aspect-[4/3]">
                  <img
                    src={blog.image || "/placeholder.svg"}
                    alt={blog.title}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-500 text-white text-xs font-medium px-2.5 py-1 rounded-lg shadow-lg">
                      {blog.category}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2 lg:col-span-3 space-y-4">
              {/* Date */}
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Calendar className="w-3 h-3" />
                <span>
                  {blog.publishedDate
                    ? new Date(blog.publishedDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : ""}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                {blog.title}
              </h3>

              {/* Excerpt */}
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm line-clamp-2">
                {blog.excerpt || blog.description || "No description available."}
              </p>

              {/* Tags */}
              {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {blog.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={tag + idx}
                      className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium px-2 py-1 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                  {blog.tags.length > 3 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                      +{blog.tags.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Read More Button */}
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium group transition-colors text-sm">
                <span>Read Article</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>
          </div>
        </MagicCard>
      </div>
    );
  }

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
      { count: `${currentPage}/${totalPages}`, label: "Page", color: "purple" },
      { count: `${currentBlogs.length}`, label: "Showing", color: "green" }
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
        <div className="w-full h-64 flex flex-col items-center justify-center text-center space-y-4">
          <div className="text-6xl">🚀</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            We Are Creating Amazing Stuff!
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md">
            Our team is working hard to bring you incredible content. Check back soon for exciting articles and insights!
          </p>
        </div>
      </PageSection>
    );
  }

  // If blogs are available
  return (
    <PageSection {...headerProps}>
      <div className="max-w-7xl mx-auto">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <Sheet open={isSheetOpen} onOpenChange={(open) => open ? handleSheetOpen() : handleSheetClose()}>
            <SheetTrigger asChild>
              <button className="flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
                <Filter className="w-3 h-3" />
                Filter
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle>Search & Filter</SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-auto">
                <SearchFilterSidebar mobile={true} />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - 25% */}
          <div className="hidden lg:block lg:col-span-1 lg:order-1">
            <SearchFilterSidebar />
          </div>

          {/* Main Content - 75% */}
          <div className="lg:col-span-3 lg:order-2 space-y-8 min-h-screen">

        {/* Blog Cards Vertical Layout */}
        <div className="space-y-8">
          {currentBlogs.length > 0 ? (
            currentBlogs.map((blog, index) => (
              <BlogCard
                key={blog.id || index}
                blog={blog}
                onClick={() => handleCardClick(blog.slug)}
              />
            ))
          ) : (
            <div className="w-full h-64 flex flex-col items-center justify-center text-center space-y-4">
              <div className="text-6xl">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                No Posts Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md">
                {searchTerm
                  ? `No blog posts found matching "${searchTerm}"`
                  : `No blog posts found in the '${selectedCategory}' category.`
                }
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="mt-4"
              >
                {searchTerm ? "Clear Search" : "View All Posts"}
              </Button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredBlogs.length > blogsPerPage && (
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentPage === 1
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-lg'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                    currentPage === page
                      ? 'bg-blue-600 text-white shadow-lg scale-110'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentPage === totalPages
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-lg'
              }`}
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

          </div>
        </div>
      </div>
    </PageSection>
  );
} 