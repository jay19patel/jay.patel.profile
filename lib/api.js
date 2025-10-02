// API utility functions for fetching data from natkhatjay.com

const BASE_URL = 'https://blogs.natkhatjay.com/api/v1'
// const BASE_URL = 'http://localhost:8000/api/v1'

/**
 * Fetch blogs from the API
 * @param {number} limit - Number of blogs to fetch (optional)
 * @returns {Promise<Array>} Array of blog objects
 */
export async function fetchBlogs(limit = null) {
  try {
    const response = await fetch(`${BASE_URL}/blogs`)
    if (!response.ok) {
      console.log(`API not available: ${response.status} - ${response.statusText}`)
      return []
    }

    // Check if response is JSON
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      console.log('API returned non-JSON response')
      return []
    }

    const data = await response.json()
    const blogs = data.blogs || data || []

    // Ensure blogs is an array
    if (!Array.isArray(blogs)) {
      console.log('API returned invalid data format')
      return []
    }

    // Sort by published date (newest first)
    const sortedBlogs = blogs.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))

    // Apply limit if specified
    return limit ? sortedBlogs.slice(0, limit) : sortedBlogs
  } catch (error) {
    console.error('Error fetching blogs:', error.message)
    return []
  }
}

/**
 * Get blogs list with meta (blogs, total_count, limit)
 * @param {number|null} limit - Max number of blogs to return (optional)
 * @param {string|null} search - Search query (optional)
 * @param {string|null} category - Category filter (optional)
 * @returns {Promise<{blogs: Array, total_count: number, limit: number, query?: string, category_filter?: string, available_categories?: Array}>}
 */
export async function getBlogsList(limit = null, search = null, category = null) {
  try {
    const params = new URLSearchParams()
    if (limit) params.append('limit', limit)
    if (search && search.trim()) params.append('search', search.trim())
    if (category && category.trim() && category !== 'All') params.append('category', category.trim())
    
    const url = `${BASE_URL}/blogs` + (params.toString() ? `?${params.toString()}` : '')
    const response = await fetch(url)
    if (!response.ok) {
      console.log(`API not available: ${response.status} - ${response.statusText}`)
      return { blogs: [], total_count: 0, limit: limit || 0, query: search, category_filter: category, available_categories: [] }
    }

    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      console.log('API returned non-JSON response')
      return { blogs: [], total_count: 0, limit: limit || 0, query: search, category_filter: category, available_categories: [] }
    }

    const data = await response.json()
    const blogs = Array.isArray(data?.blogs) ? data.blogs : (Array.isArray(data) ? data : [])
    const computedLimit = typeof data?.limit === 'number' ? data.limit : (limit || blogs.length)
    const totalCount = typeof data?.total_count === 'number' ? data.total_count : (typeof data?.list_total === 'number' ? data.list_total : blogs.length)
    const query = data?.query || search
    const categoryFilter = data?.category_filter || category
    
    // Handle new available_categories structure with name and count
    const availableCategories = Array.isArray(data?.available_categories) 
      ? data.available_categories 
      : []

    return { 
      blogs, 
      total_count: totalCount, 
      limit: computedLimit, 
      query, 
      category_filter: categoryFilter,
      available_categories: availableCategories
    }
  } catch (error) {
    console.error('Error fetching blogs list:', error.message)
    return { blogs: [], total_count: 0, limit: limit || 0, query: search, category_filter: category, available_categories: [] }
  }
}

/**
 * Search blogs and content using the blogs endpoint
 * @param {string} query - Search query
 * @param {number} limit - Number of results to return (optional)
 * @param {string|null} category - Category filter (optional)
 * @returns {Promise<Array>} Array of search results
 */
export async function searchContent(query, limit = 10, category = null) {
  try {
    if (!query || query.trim() === '') {
      // If no query, return all blogs with limit and category
      const result = await getBlogsList(limit, null, category)
      return result.blogs || []
    }

    // Use the blogs endpoint with search parameter and category
    const result = await getBlogsList(limit, query.trim(), category)
    return result.blogs || []
  } catch (error) {
    console.error('Error searching content:', error.message)
    return []
  }
}

/**
 * Get a single blog by slug
 * @param {string} slug - Blog slug
 * @returns {Promise<Object|null>} Blog object or null if not found
 */
export async function getBlogBySlug(slug) {
  try {
    const response = await fetch(`${BASE_URL}/blogs/${slug}`)
    if (!response.ok) {
      if (response.status === 404) {
        console.log(`Blog not found: ${slug}`)
        return null
      }
      console.log(`Blog API not available: ${response.status} - ${response.statusText}`)
      return null
    }

    // Check if response is JSON
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      console.log('Blog API returned non-JSON response')
      return null
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching blog by slug:', error.message)
    return null
  }
}