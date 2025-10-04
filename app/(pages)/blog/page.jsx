'use client';
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { PageSection } from '@/components/customUi/PageSection';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Search, Calendar, ChevronLeft, ChevronRight, ArrowUpRight, Menu, Filter, X, Loader2 } from 'lucide-react';
import { MagicCard } from '@/components/ui/magic-card';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { getBlogsList, searchContent } from '@/lib/api';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [availableCategories, setAvailableCategories] = useState(['All']);
  const [originalCategoryCounts, setOriginalCategoryCounts] = useState([]); // Store original counts permanently
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState(''); // Separate input state for typing
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(10);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const router = useRouter();
  
  const searchInputRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Initial load - fetch all blogs and store original category counts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { blogs: apiBlogs, available_categories } = await getBlogsList(50);
        setBlogs(Array.isArray(apiBlogs) ? apiBlogs : []);
        
        // Store original category counts - NEVER change these
        if (Array.isArray(available_categories) && available_categories.length > 0) {
          const categoryNames = available_categories.map(cat => cat.name || cat);
          setAvailableCategories(['All', ...categoryNames]);
          setOriginalCategoryCounts(available_categories);
        }
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

  // Handle search with button click - Manual search trigger
  const handleSearchClick = async () => {
    // Validate search input
    if (searchInput.trim().length > 0 && searchInput.trim().length < 2) {
      toast.error('Please enter at least 2 characters to search', {
        duration: 3000,
      });
      return;
    }

    // Cancel previous request if exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setIsSearching(true);
    setSearchTerm(searchInput.trim()); // Set actual search term

    try {
      abortControllerRef.current = new AbortController();
      
      const categoryFilter = selectedCategory === 'All' ? null : selectedCategory;
      const searchFilter = searchInput.trim() || null;
      
      const { blogs: results } = await getBlogsList(
        50, 
        searchFilter,
        categoryFilter
      );
      
      if (Array.isArray(results)) {
        setBlogs(results);
      }
      
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Search error:', error);
        toast.error('Search failed', {
          description: 'Please try again later',
          duration: 3000,
        });
      }
    } finally {
      setIsSearching(false);
    }
  };

  // Handle category change - triggers immediate API call
  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setIsSearching(true);

    try {
      abortControllerRef.current = new AbortController();
      
      const categoryFilter = category === 'All' ? null : category;
      const searchFilter = searchTerm || null;
      
      const { blogs: results } = await getBlogsList(
        50,
        searchFilter,
        categoryFilter
      );
      
      if (Array.isArray(results)) {
        setBlogs(results);
      }
      
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Category filter error:', error);
        toast.error('Filter failed', {
          description: 'Please try again later',
          duration: 3000,
        });
      }
    } finally {
      setIsSearching(false);
    }

    // Close sheet if open
    if (isSheetOpen) {
      handleSheetClose();
    }
  };

  // Clear all filters and reset
  const handleClearFilters = async () => {
    setSearchInput('');
    setSearchTerm('');
    setSelectedCategory('All');
    setIsSearching(true);

    try {
      const { blogs: apiBlogs } = await getBlogsList(50);
      setBlogs(Array.isArray(apiBlogs) ? apiBlogs : []);
    } catch (error) {
      console.error('Error resetting data:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle Enter key press in search input (composition-safe)
  const isComposingRef = useRef(false);
  const handleCompositionStart = () => {
    isComposingRef.current = true;
  };
  const handleCompositionEnd = () => {
    isComposingRef.current = false;
  };
  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && !isComposingRef.current) {
      e.preventDefault();
      handleSearchClick();
    }
  };

  // Auto-focus functionality - focus search input when user types any character
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      // Skip if user is already typing in an input, textarea, or contenteditable element
      const activeElement = document.activeElement;
      const isTypingInInput = activeElement && (
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.contentEditable === 'true' ||
        activeElement.isContentEditable
      );

      // Skip if user is pressing modifier keys (Ctrl, Alt, Meta, Shift)
      const isModifierKey = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey;

      // Skip special keys that shouldn't trigger auto-focus
      const specialKeys = [
        'Escape', 'Enter', 'Tab', 'Backspace', 'Delete', 'ArrowUp', 'ArrowDown', 
        'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown',
        'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'
      ];

      // Only auto-focus if:
      // 1. User is not typing in an input field
      // 2. User is not pressing modifier keys
      // 3. The key is not a special key
      // 4. The key is a printable character (length 1 and not a control character)
      if (!isTypingInInput && 
          !isModifierKey && 
          !specialKeys.includes(e.key) &&
          e.key.length === 1 && 
          e.key.charCodeAt(0) >= 32 &&
          searchInputRef.current) {
        
        e.preventDefault();
        searchInputRef.current.focus();
        // Add the typed character to the search input
        setSearchInput(prev => prev + e.key);
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Get category count - always show original counts
  const getCategoryCount = (categoryName) => {
    if (categoryName === 'All') {
      return originalCategoryCounts.reduce((sum, cat) => sum + (cat.count || 0), 0);
    }
    const categoryData = originalCategoryCounts.find(cat => cat.name === categoryName);
    return categoryData ? categoryData.count : 0;
  };

  // Use available categories from API response
  const categories = availableCategories;

  // No need to filter blogs as API handles all filtering
  const filteredBlogs = blogs;

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

        {/* Search Bar with Button */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search articles..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
              inputMode="text"
              autoComplete="off"
              spellCheck={false}
              className="w-full min-w-0 pl-10 pr-10 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
            />
            {searchInput && (
              <button
                onClick={() => {
                  setSearchInput('');
                  if (searchTerm) {
                    handleClearFilters();
                  }
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {/* Search Button */}
          <Button
            onClick={handleSearchClick}
            disabled={isSearching}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            {isSearching ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Searching...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Search
              </span>
            )}
          </Button>
        </div>

        {/* Search Results Info */}
        {searchTerm && !isSearching && (
          <div className="text-sm text-gray-600 dark:text-gray-400 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
            <span>{filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''} found for "{searchTerm}"</span>
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
            const postCount = getCategoryCount(category);

            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                disabled={isSearching}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 underline border-l-4 border-purple-500'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                } ${isSearching ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span>{category}</span>
                  <span className={`text-xs px-2 py-1 rounded-full transition-colors ${
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
            onClick={handleClearFilters}
            disabled={isSearching}
            variant="outline"
            size="sm"
            className="w-full text-sm"
          >
            Clear All Filters
          </Button>
          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <div>Showing {currentBlogs.length} of {filteredBlogs.length} articles</div>
            <div>Page {currentPage} of {totalPages || 1}</div>
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
              <div className="relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 aspect-[4/3]">
                {blog.image ? (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                ) : null}
                <div className="absolute top-3 left-3">
                  <span className="bg-blue-500 text-white text-xs font-medium px-2.5 py-1 rounded-lg shadow-lg">
                    {blog.category || 'General'}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2 lg:col-span-3 space-y-4">
              {/* Date */}
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Calendar className="w-3 h-3" />
                <span>
                  {blog.publishedDate || blog.created_at || blog.date
                    ? new Date(blog.publishedDate || blog.created_at || blog.date).toLocaleDateString("en-US", {
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
      { count: `${currentPage}/${totalPages || 1}`, label: "Page", color: "purple" },
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
  if (blogs.length === 0 && !searchTerm && selectedCategory === 'All') {
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
        <div className="space-y-8 relative">
          {/* Loading overlay */}
          {isSearching && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse rounded-full opacity-60 z-10"></div>
          )}
          
          {currentBlogs.length > 0 ? (
            currentBlogs.map((blog, index) => (
              <BlogCard
                key={blog._id || blog.id || index}
                blog={blog}
                onClick={() => handleCardClick(blog.slug || blog._id)}
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
                onClick={handleClearFilters}
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