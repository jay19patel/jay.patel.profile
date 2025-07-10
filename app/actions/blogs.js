'use server';
import Blog from '@/models/Blog';
import { revalidatePath } from 'next/cache';

// Helper function to serialize MongoDB documents
function serializeDocument(doc) {
  if (!doc) return null;
  
  if (Array.isArray(doc)) {
    return doc.map(serializeDocument);
  }
  
  const serialized = JSON.parse(JSON.stringify(doc));
  
  // Convert ObjectId to string
  if (serialized._id) {
    serialized._id = serialized._id.toString();
  }
  
  return serialized;
}

// Get all blogs
export async function getBlogs() {
  try {
    const blogs = await Blog.find().sort({ publishedDate: -1 }).lean();
    return { success: true, data: serializeDocument(blogs) };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return { success: false, error: error.message };
  }
}

// Get blog by slug
export async function getBlogBySlug(slug) {
  try {
    const blog = await Blog.findOne({ slug }).lean();
    
    if (!blog) {
      return { success: false, error: 'Blog post not found' };
    }

    return { success: true, data: serializeDocument(blog) };
  } catch (error) {
    console.error('Error fetching blog:', error);
    return { success: false, error: error.message };
  }
}

// Create new blog
export async function createBlog(blogData) {
  try {
    const blog = new Blog(blogData);
    const savedBlog = await blog.save();
    revalidatePath('/blog');
    revalidatePath('/admin/blog');
    return { success: true, data: serializeDocument(savedBlog.toObject()) };
  } catch (error) {
    console.error('Error creating blog:', error);
    return { success: false, error: error.message };
  }
}

// Update blog
export async function updateBlog(id, blogData) {
  try {
    const blog = await Blog.findByIdAndUpdate(
      id,
      { ...blogData },
      { new: true, runValidators: true }
    ).lean();
    
    if (!blog) {
      return { success: false, error: 'Blog post not found' };
    }

    revalidatePath('/blog');
    revalidatePath(`/blog/${blog.slug}`);
    revalidatePath('/admin/blog');
    return { success: true, data: serializeDocument(blog) };
  } catch (error) {
    console.error('Error updating blog:', error);
    return { success: false, error: error.message };
  }
}

// Delete blog
export async function deleteBlog(id) {
  try {
    const blog = await Blog.findByIdAndDelete(id);
    
    if (!blog) {
      return { success: false, error: 'Blog post not found' };
    }

    revalidatePath('/blog');
    revalidatePath('/admin/blog');
    return { success: true };
  } catch (error) {
    console.error('Error deleting blog:', error);
    return { success: false, error: error.message };
  }
}

// Additional helper functions for blog management

export async function getFeaturedBlogs() {
  try {
    const blogs = await Blog.find({ featured: true })
      .sort({ publishedDate: -1 })
      .limit(3)
      .lean();
    return { data: serializeDocument(blogs), error: null };
  } catch (error) {
    console.error('Error fetching featured blogs:', error);
    return { 
      data: null, 
      error: { message: 'Failed to fetch featured blogs' }
    };
  }
}

export async function getBlogsByCategory(category) {
  try {
    const blogs = await Blog.find({ category })
      .sort({ publishedDate: -1 })
      .lean();
    return { data: serializeDocument(blogs), error: null };
  } catch (error) {
    console.error('Error fetching blogs by category:', error);
    return { 
      data: null, 
      error: { message: 'Failed to fetch blogs by category' }
    };
  }
} 