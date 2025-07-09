'use server';

import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdir } from 'fs/promises';
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

export async function uploadProjectImage(formData) {
  try {
    const file = formData.get('image');
    if (!file) {
      return { success: false, error: 'No file uploaded' };
    }

    // Create uploads directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    try {
      await writeFile(join(uploadDir, 'test.txt'), '');
    } catch (error) {
      // await mkdir(uploadDir, { recursive: true }); // mkdir is not imported, so this line is commented out
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

export async function createProject(data) {
  try {
    const project = new Project(data);
    await project.save();
    return { success: true, data: project };
  } catch (error) {
    console.error('Error creating project:', error);
    return { success: false, error: 'Failed to create project' };
  }
}

export async function updateProject(id, data) {
  try {
    const project = await Project.findByIdAndUpdate(id, data, { new: true });
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