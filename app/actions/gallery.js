'use server';
import { readJsonFile, writeJsonFile } from '@/lib/server-utils';

export async function getGallery() {
  try {
    return await readJsonFile('gallery.json');
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return { images: [] };
  }
}

export async function updateGallery(galleryData) {
  try {
    return await writeJsonFile('gallery.json', galleryData);
  } catch (error) {
    console.error('Error saving gallery:', error);
    throw new Error('Failed to update gallery data');
  }
}
