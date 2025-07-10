'use server';

import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdir } from 'fs/promises';
import Project from '@/models/Project';
import connectDB from '@/lib/mongodb';
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

export async function getProjectById(id) {
  try {
    await connectDB();
    
    const project = await Project.findById(id).lean();
    if (!project) {
      return { success: false, error: 'Project not found' };
    }
    return { success: true, data: serializeDocument(project) };
  } catch (error) {
    console.error('Error fetching project:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to fetch project'
    };
  }
}

export async function getProjectBySlug(slug) {
  try {
    await connectDB();
    
    const project = await Project.findOne({ slug }).lean();
    if (!project) {
      return { success: false, error: 'Project not found' };
    }
    return { success: true, data: serializeDocument(project) };
  } catch (error) {
    console.error('Error fetching project:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to fetch project'
    };
  }
}

export async function getProjects() {
  try {
    await connectDB();
    
    const projects = await Project.find().sort({ createdAt: -1 }).lean();
    return { success: true, data: serializeDocument(projects) };
  } catch (error) {
    console.error('Error fetching projects:', error);
    
    let errorMessage = 'Failed to fetch projects';
    if (error.name === 'MongooseError' && error.message.includes('buffering timed out')) {
      errorMessage = 'Database connection timed out. Please try again.';
    } else if (error.name === 'MongoNetworkError') {
      errorMessage = 'Unable to connect to the database. Please check your connection.';
    }
    
    return { 
      success: false, 
      error: errorMessage
    };
  }
}

export async function uploadProjectImage(formData) {
  try {
    await connectDB();
    
    const file = formData.get('image');
    if (!file) {
      return { success: false, error: 'No file uploaded' };
    }

    const uploadDir = join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      if (error.code !== 'EEXIST') {
        throw error;
      }
    }

    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.]/g, '');
    const filename = `${timestamp}-${originalName}`;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filepath = join(uploadDir, filename);
    await writeFile(filepath, buffer);

    return {
      success: true,
      data: {
        url: `/uploads/${filename}`
      }
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { success: false, error: 'Failed to upload file' };
  }
}

// Helper function to generate a unique slug
async function generateUniqueSlug(title) {
  let slug = title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const existingProject = await Project.findOne({ slug });
  
  if (!existingProject) {
    return slug;
  }

  let counter = 1;
  let newSlug = `${slug}-${counter}`;
  
  while (await Project.findOne({ slug: newSlug })) {
    counter++;
    newSlug = `${slug}-${counter}`;
  }
  
  return newSlug;
}

export async function createProject(data) {
  try {
    await connectDB();
    
    if (!data.slug || data.slug === 'new') {
      data.slug = await generateUniqueSlug(data.title);
    }
    
    const requiredFields = ['title', 'description', 'technologies', 'category'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return { 
        success: false, 
        error: `Missing required fields: ${missingFields.join(', ')}` 
      };
    }
    
    if (!Array.isArray(data.technologies) || data.technologies.length === 0) {
      return {
        success: false,
        error: 'At least one technology is required'
      };
    }
    
    const project = new Project(data);
    const savedProject = await project.save();
    
    revalidatePath('/projects');
    revalidatePath('/admin/projects');
    
    return { success: true, data: serializeDocument(savedProject.toObject()) };
  } catch (error) {
    console.error('Error creating project:', error);
    return { 
      success: false, 
      error: error.code === 11000 ? 'Slug already exists' : 'Failed to create project' 
    };
  }
}

export async function updateProject(id, data) {
  try {
    await connectDB();
    
    const project = await Project.findByIdAndUpdate(id, data, { 
      new: true,
      runValidators: true
    }).lean();
    
    if (!project) {
      return { success: false, error: 'Project not found' };
    }
    
    revalidatePath('/projects');
    revalidatePath(`/projects/${project.slug}`);
    revalidatePath('/admin/projects');
    
    return { success: true, data: serializeDocument(project) };
  } catch (error) {
    console.error('Error updating project:', error);
    return { success: false, error: 'Failed to update project' };
  }
}

export async function deleteProject(id) {
  try {
    await connectDB();
    
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return { success: false, error: 'Project not found' };
    }
    
    revalidatePath('/projects');
    revalidatePath('/admin/projects');
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting project:', error);
    return { success: false, error: 'Failed to delete project' };
  }
} 