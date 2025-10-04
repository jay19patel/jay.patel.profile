'use server';
import { promises as fs } from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'services.json');

export async function getServices() {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error fetching services:', error);
    throw new Error('Failed to fetch services data');
  }
}

export async function updateServices(servicesData) {
  try {
    await fs.writeFile(dataPath, JSON.stringify(servicesData, null, 2));
    return { success: true };
  } catch (error) {
    console.error('Error saving services:', error);
    throw new Error('Failed to update services data');
  }
}
