'use server';
import { readJsonFile, writeJsonFile } from '@/lib/server-utils';

export async function getExperience() {
  try {
    return await readJsonFile('experience.json');
  } catch (error) {
    console.error('Error fetching experience:', error);
    return [];
  }
}

export async function updateExperience(experienceData) {
  try {
    return await writeJsonFile('experience.json', experienceData);
  } catch (error) {
    console.error('Error saving experience:', error);
    throw new Error('Failed to update experience data');
  }
}