'use server';

import Project from '@/models/Project';

// Helper function to convert MongoDB document to plain object
function serializeDocument(doc) {
  if (!doc) return null;
  return JSON.parse(JSON.stringify(doc));
}

export async function getProjects() {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    return { data: serializeDocument(projects), error: null };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return { data: null, error: 'Failed to fetch projects' };
  }
}

export async function createProject(data) {
  try {
    const project = new Project({
      title: data.title,
      subtitle: data.subtitle,
      slug: data.slug,
      description: data.description,
      introduction: data.introduction,
      content: data.content,
      technologies: data.technologies,
      category: data.category,
      status: data.status,
      rating: data.rating || 0,
      downloads: data.downloads || 0,
      image: data.image,
      screenshots: data.screenshots || [],
      features: data.features || [],
      challenges: data.challenges || [],
      learnings: data.learnings || [],
      author: data.author,
      demoUrl: data.demoUrl,
      githubUrl: data.githubUrl,
      liveUrl: data.liveUrl,
      featured: data.featured || false,
    });

    await project.save();
    return { data: serializeDocument(project), error: null };
  } catch (error) {
    console.error('Error creating project:', error);
    return { data: null, error: 'Failed to create project' };
  }
}

export async function updateProject(id, data) {
  try {
    const project = await Project.findByIdAndUpdate(
      id,
      {
        ...data,
        rating: data.rating || 0,
        downloads: data.downloads || 0,
        screenshots: data.screenshots || [],
        features: data.features || [],
        challenges: data.challenges || [],
        learnings: data.learnings || [],
        featured: data.featured || false,
      },
      { new: true }
    );

    if (!project) {
      return { data: null, error: 'Project not found' };
    }

    return { data: serializeDocument(project), error: null };
  } catch (error) {
    console.error('Error updating project:', error);
    return { data: null, error: 'Failed to update project' };
  }
}

export async function deleteProject(id) {
  try {
    const project = await Project.findByIdAndDelete(id);
    
    if (!project) {
      return { error: 'Project not found' };
    }
    
    return { error: null };
  } catch (error) {
    console.error('Error deleting project:', error);
    return { error: 'Failed to delete project' };
  }
} 