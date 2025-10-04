'use server';
import { readJsonFile, writeJsonFile } from '@/lib/server-utils';

export async function getServices() {
  try {
    return await readJsonFile('services.json');
  } catch (error) {
    console.error('Error fetching services:', error);
    return { services: [] };
  }
}

export async function updateServices(servicesData) {
  try {
    return await writeJsonFile('services.json', servicesData);
  } catch (error) {
    console.error('Error saving services:', error);
    throw new Error('Failed to update services data');
  }
}
