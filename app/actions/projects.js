'use server';

import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdir } from 'fs/promises';
import Project from '@/models/Project';
import connectDB from '@/lib/mongodb';

// Helper function to convert MongoDB document to plain object
function serializeDocument(doc) {
  if (!doc) return null;
  return JSON.parse(JSON.stringify(doc));
}

export async function getProjectById(id) {
  try {
    await connectDB();
    
    const project = await Project.findById(id).lean();
    if (!project) {
      return { data: null, error: 'Project not found' };
    }
    return { data: serializeDocument(project), error: null };
  } catch (error) {
    console.error('Error fetching project:', error);
    return { 
      data: null, 
      error: error.message || 'Failed to fetch project'
    };
  }
}

export async function getProjectBySlug(slug) {
  try {
    await connectDB();
    
    const project = await Project.findOne({ slug }).lean();
    if (!project) {
      return { data: null, error: 'Project not found' };
    }
    return { data: serializeDocument(project), error: null };
  } catch (error) {
    console.error('Error fetching project:', error);
    return { 
      data: null, 
      error: error.message || 'Failed to fetch project'
    };
  }
}

export async function getProjects() {
  try {
    // Ensure database connection before querying
    await connectDB();
    
    const projects = await Project.find().sort({ createdAt: -1 }).lean();
    return { data: serializeDocument(projects), error: null };
  } catch (error) {
    console.error('Error fetching projects:', error);
    
    // Provide more specific error messages based on the error type
    let errorMessage = 'Failed to fetch projects';
    if (error.name === 'MongooseError' && error.message.includes('buffering timed out')) {
      errorMessage = 'Database connection timed out. Please try again.';
    } else if (error.name === 'MongoNetworkError') {
      errorMessage = 'Unable to connect to the database. Please check your connection.';
    }
    
    return { 
      data: null, 
      error: {
        message: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    };
  }
}

export async function uploadProjectImage(formData) {
  try {
    await connectDB(); // Ensure database connection
    
    const file = formData.get('image');
    if (!file) {
      return { success: false, error: 'No file uploaded' };
    }

    // Create uploads directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      if (error.code !== 'EEXIST') {
        throw error;
      }
    }

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.]/g, '');
    const filename = `${timestamp}-${originalName}`;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Write file to uploads directory
    const filepath = join(uploadDir, filename);
    await writeFile(filepath, buffer);

    // Return success with file path
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
  // Convert title to slug format
  let slug = title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  // Check if slug exists
  const existingProject = await Project.findOne({ slug });
  
  if (!existingProject) {
    return slug;
  }

  // If slug exists, add a number suffix
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
    
    // Generate unique slug if not provided or if it's "new"
    if (!data.slug || data.slug === 'new') {
      data.slug = await generateUniqueSlug(data.title);
    }
    
    // Validate required fields
    const requiredFields = ['title', 'description', 'technologies', 'category'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return { 
        success: false, 
        error: `Missing required fields: ${missingFields.join(', ')}` 
      };
    }
    
    // Ensure technologies is an array
    if (!Array.isArray(data.technologies) || data.technologies.length === 0) {
      return {
        success: false,
        error: 'At least one technology is required'
      };
    }
    
    const project = new Project(data);
    await project.save();
    return { success: true, data: project };
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
    await connectDB(); // Ensure database connection
    
    const project = await Project.findByIdAndUpdate(id, data, { 
      new: true,
      runValidators: true // Run validation on update
    });
    if (!project) {
      return { success: false, error: 'Project not found' };
    }
    return { success: true, data: project };
  } catch (error) {
    console.error('Error updating project:', error);
    return { success: false, error: 'Failed to update project' };
  }
}

export async function deleteProject(id) {
  try {
    await connectDB(); // Ensure database connection
    
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return { success: false, error: 'Project not found' };
    }
    return { success: true, data: project };
  } catch (error) {
    console.error('Error deleting project:', error);
    return { success: false, error: 'Failed to delete project' };
  }
} 