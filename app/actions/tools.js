'use server';
import { promises as fs } from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'tools.json');

export async function getTools() {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error fetching tools:', error);
    throw new Error('Failed to fetch tools data');
  }
}

export async function updateTools(toolsData) {
  try {
    await fs.writeFile(dataPath, JSON.stringify(toolsData, null, 2));
    return { success: true };
  } catch (error) {
    console.error('Error saving tools:', error);
    throw new Error('Failed to update tools data');
  }
} 