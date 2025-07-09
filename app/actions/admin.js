'use server';
import Blog from '@/models/Blog';
import Project from '@/models/Project';

export async function getAdminBlogs() {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return { success: true, data: blogs };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return { success: false, error: 'Failed to fetch blogs' };
  }
}

export async function getAdminProjects() {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return { success: true, data: projects };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return { success: false, error: 'Failed to fetch projects' };
  }
} 