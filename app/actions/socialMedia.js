'use server';
import { promises as fs } from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'socialMedia.json');

export async function getSocialMedia() {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error fetching social media:', error);
    throw new Error('Failed to fetch social media data');
  }
}

export async function updateSocialMedia(socialMediaData) {
  try {
    await fs.writeFile(dataPath, JSON.stringify(socialMediaData, null, 2));
    return { success: true };
  } catch (error) {
    console.error('Error saving social media:', error);
    throw new Error('Failed to update social media data');
  }
} 