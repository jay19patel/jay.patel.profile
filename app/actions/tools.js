'use server';
import { readJsonFile, writeJsonFile } from '@/lib/server-utils';

export async function getTools() {
  try {
    return await readJsonFile('tools.json');
  } catch (error) {
    console.error('Error fetching tools:', error);
    return [];
  }
}

export async function updateTools(toolsData) {
  try {
    return await writeJsonFile('tools.json', toolsData);
  } catch (error) {
    console.error('Error saving tools:', error);
    throw new Error('Failed to update tools data');
  }
}