'use client';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { PageSection } from '@/components/customUi/PageSection';
import { EmptyState } from '@/components/customUi/EmptyState';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Search, Calendar, Clock, Tag, BookOpen, Zap, TrendingUp } from 'lucide-react';

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

  // Modern Header Section
  const ModernHeader = () => (
    <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-20 px-6 rounded-3xl mb-12 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:60px_60px] opacity-20"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 right-10 w-20 h-20 border border-blue-400/30 rounded-lg"
        />
        <motion.div
          animate={{ y: [-10, 10, -10], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-10 w-6 h-6 bg-purple-400/40 rounded-full blur-sm"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur border border-gray-600/30 rounded-full text-sm"
          >
            <BookOpen size={16} className="text-blue-400" />
            Knowledge Hub
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold"
          >
            Latest{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Insights
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Explore cutting-edge technologies, development insights, and industry trends that shape the digital landscape.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-3 gap-8 max-w-md mx-auto"
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {filteredBlogs.length}
              </div>
              <div className="text-sm text-gray-400">Articles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {categories.length - 1}
              </div>
              <div className="text-sm text-gray-400">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                5K+
              </div>
              <div className="text-sm text-gray-400">Readers</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-12">
        <ModernHeader />
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
            />
          </div>
        </div>
      </div>
    );
  }

  // If no blogs are available
  if (blogs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-12">
        <ModernHeader />
        <div className="max-w-7xl mx-auto">
          <EmptyState
            illustration="/blog-empty.svg"
            title="No Blog Posts Available"
            description="Check back later for new articles and insights."
            buttonText="Refresh Posts"
            buttonOnClick={() => window.location.reload()}
          />
        </div>
      </div>
    );
  }

  // If blogs are available
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-12">
      <ModernHeader />
      
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Modern Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50"
        >
          <div className="space-y-8">
            {/* Modern Search Bar */}
            <div className="relative max-w-lg mx-auto">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for insights and articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-gray-100 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            
            {/* Modern Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category, index) => {
                const postCount = category === 'All' 
                  ? blogs.length 
                  : blogs.filter(p => p.category === category).length;
                
                return (
                  <motion.button
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                        : 'bg-gray-200 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 hover:scale-105'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {category === 'All' && <Zap size={14} />}
                      {category === 'Tech' && <TrendingUp size={14} />}
                      {category !== 'All' && category !== 'Tech' && <Tag size={14} />}
                      {category}
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        selectedCategory === category 
                          ? 'bg-white/20 text-white' 
                          : 'bg-gray-400/20 text-gray-600 dark:text-gray-400'
                      }`}>
                        {postCount}
                      </span>
                    </span>
                  </motion.button>
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
        </motion.div>

        {/* Modern Blog Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleCardClick(blog.slug)}
                className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 cursor-pointer hover:-translate-y-2 overflow-hidden"
              >
                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

                {/* Featured Badge */}
                {blog.featured && (
                  <div className="relative z-10 flex justify-end mb-3">
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full text-xs font-bold shadow-lg">
                      ⭐ Featured
                    </span>
                  </div>
                )}
                
                {/* Blog Image */}
                <div className="relative h-48 rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="relative z-10 space-y-4">
                  {/* Category */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <Tag className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                    <span className="text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wide">
                      {blog.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>

                  {/* Meta Information */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(blog.publishedDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                      By {blog.author}
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {blog.tags?.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      {blog.tags?.length > 3 && (
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-bold">
                          +{blog.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
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
        </motion.div>

        {/* Modern Stats Section */}
        {filteredBlogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 backdrop-blur-xl rounded-3xl p-8 border border-blue-200/50 dark:border-blue-800/50"
          >
            <div className="text-center space-y-8">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
              >
                Blog Analytics
              </motion.h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="text-center bg-white/50 dark:bg-gray-800/50 rounded-2xl p-4"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-2">
                    {filteredBlogs.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {searchTerm || selectedCategory !== 'All' ? 'Found' : 'Total'} Posts
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="text-center bg-white/50 dark:bg-gray-800/50 rounded-2xl p-4"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent mb-2">
                    {filteredBlogs.filter(blog => blog.featured).length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Featured
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  className="text-center bg-white/50 dark:bg-gray-800/50 rounded-2xl p-4"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent mb-2">
                    {categories.length - 1}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Categories
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  className="text-center bg-white/50 dark:bg-gray-800/50 rounded-2xl p-4"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mb-2">
                    {filteredBlogs.length > 0 ? Math.round(filteredBlogs.reduce((sum, blog) => {
                      const timeMatch = blog.readTime?.match(/\d+/);
                      return sum + (timeMatch ? parseInt(timeMatch[0]) : 0);
                    }, 0) / filteredBlogs.length) : 0}m
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Avg Read Time
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 