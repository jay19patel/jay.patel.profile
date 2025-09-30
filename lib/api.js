// API utility functions for fetching data from natkhatjay.com

const BASE_URL = 'https://www.natkhatjay.com'

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
 * Search blogs and content
 * @param {string} query - Search query
 * @param {number} limit - Number of results to return (optional)
 * @returns {Promise<Array>} Array of search results
 */
export async function searchContent(query, limit = 10) {
  try {
    if (!query || query.trim() === '') {
      return []
    }

    const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query.trim())}`)
    if (!response.ok) {
      console.log(`Search API not available: ${response.status} - ${response.statusText}`)
      return []
    }

    // Check if response is JSON
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      console.log('Search API returned non-JSON response')
      return []
    }

    const data = await response.json()
    const results = data.results || data || []

    // Ensure results is an array
    if (!Array.isArray(results)) {
      console.log('Search API returned invalid data format')
      return []
    }

    // Apply limit if specified
    return limit ? results.slice(0, limit) : results
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