'use server';
import { promises as fs } from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'experience.json');

export async function getExperience() {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error fetching experience:', error);
    throw new Error('Failed to fetch experience data');
  }
}

export async function updateExperience(experienceData) {
  try {
    await fs.writeFile(dataPath, JSON.stringify(experienceData, null, 2));
    return { success: true };
  } catch (error) {
    console.error('Error saving experience:', error);
    throw new Error('Failed to update experience data');
  }
}