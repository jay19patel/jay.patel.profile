'use server';
import { promises as fs } from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'gallery.json');

export async function getGallery() {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error fetching gallery:', error);
    throw new Error('Failed to fetch gallery data');
  }
}

export async function updateGallery(galleryData) {
  try {
    await fs.writeFile(dataPath, JSON.stringify(galleryData, null, 2));
    return { success: true };
  } catch (error) {
    console.error('Error saving gallery:', error);
    throw new Error('Failed to update gallery data');
  }
}
