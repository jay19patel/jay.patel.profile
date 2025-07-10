'use server';
import Blog from '@/models/Blog';
import Project from '@/models/Project';

export async function getAdminBlogs() {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    // Convert Mongoose documents to plain objects
    const plainBlogs = blogs.map(blog => ({
      _id: blog._id.toString(),
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      author: blog.author,
      category: blog.category,
      tags: blog.tags,
      image: blog.image,
      featured: blog.featured,
      createdAt: blog.createdAt.toISOString(),
      updatedAt: blog.updatedAt.toISOString(),
      publishedDate: blog.publishedDate ? blog.publishedDate.toISOString() : null
    }));
    return { success: true, data: plainBlogs };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return { success: false, error: 'Failed to fetch blogs' };
  }
}

export async function getAdminProjects() {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    // Convert Mongoose documents to plain objects
    const plainProjects = projects.map(project => ({
      _id: project._id.toString(),
      title: project.title,
      subtitle: project.subtitle,
      slug: project.slug,
      description: project.description,
      introduction: project.introduction,
      category: project.category,
      status: project.status,
      rating: project.rating,
      downloads: project.downloads,
      image: project.image,
      technologies: project.technologies,
      features: project.features,
      screenshots: project.screenshots,
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      challenges: project.challenges,
      learnings: project.learnings,
      featured: project.featured,
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
      author: project.author
    }));
    return { success: true, data: plainProjects };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return { success: false, error: 'Failed to fetch projects' };
  }
} 