'use server';

import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdir } from 'fs/promises';
// import Project from '@/models/Project';
// import connectDB from '@/lib/mongodb';
// import { revalidatePath } from 'next/cache';

function getBaseUrl() {
  if (typeof window === 'undefined') {
    // On server
    return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  }
  // On client
  return '';
}

function getApiUrl(path) {
  return getBaseUrl() + path;
}

// Helper function to serialize MongoDB documents (for compatibility)
function serializeDocument(doc) {
  if (!doc) return null;
  if (Array.isArray(doc)) return doc.map(serializeDocument);
  const serialized = JSON.parse(JSON.stringify(doc));
  if (serialized._id) serialized._id = serialized._id.toString();
  return serialized;
}

export async function getProjectById(id) {
  try {
    const res = await fetch(getApiUrl(`/api/projects?id=${encodeURIComponent(id)}`));
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getProjectBySlug(slug) {
  try {
    const res = await fetch(getApiUrl(`/api/projects?slug=${encodeURIComponent(slug)}`));
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getProjects() {
  try {
    const res = await fetch(getApiUrl('/api/projects'));
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function uploadProjectImage(formData) {
  // Keep as is (file upload logic)
  try {
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
    return { success: false, error: 'Failed to upload file' };
  }
}

// Helper function to generate a unique slug
async function generateUniqueSlug(title) {
  let slug = title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  // const existingProject = await Project.findOne({ slug }); // This line is removed as per the new_code
  
  // if (!existingProject) { // This line is removed as per the new_code
  //   return slug; // This line is removed as per the new_code
  // } // This line is removed as per the new_code

  // let counter = 1; // This line is removed as per the new_code
  // let newSlug = `${slug}-${counter}`; // This line is removed as per the new_code
  
  // while (await Project.findOne({ slug: newSlug })) { // This line is removed as per the new_code
  //   counter++; // This line is removed as per the new_code
  //   newSlug = `${slug}-${counter}`; // This line is removed as per the new_code
  // } // This line is removed as per the new_code
  
  // return newSlug; // This line is removed as per the new_code
}

export async function createProject(data) {
  try {
    const res = await fetch(getApiUrl('/api/projects'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function updateProject(id, data) {
  try {
    const res = await fetch(getApiUrl(`/api/projects?id=${encodeURIComponent(id)}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, error: 'Failed to update project: ' + error.message };
  }
}

export async function deleteProject(id) {
  try {
    const res = await fetch(getApiUrl(`/api/projects?id=${encodeURIComponent(id)}`), {
      method: 'DELETE' });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, error: 'Failed to delete project: ' + error.message };
  }
} 