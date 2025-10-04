'use server';
import { readJsonFile, writeJsonFile } from '@/lib/server-utils';

export async function getSocialMedia() {
  try {
    return await readJsonFile('socialMedia.json');
  } catch (error) {
    console.error('Error fetching social media:', error);
    return [];
  }
}

export async function updateSocialMedia(socialMediaData) {
  try {
    return await writeJsonFile('socialMedia.json', socialMediaData);
  } catch (error) {
    console.error('Error saving social media:', error);
    throw new Error('Failed to update social media data');
  }
}