'use server';
import { promises as fs } from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'footer.json');

export async function getFooter() {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error fetching footer:', error);
    throw new Error('Failed to fetch footer data');
  }
}

export async function updateFooter(footerData) {
  try {
    await fs.writeFile(dataPath, JSON.stringify(footerData, null, 2));
    return { success: true };
  } catch (error) {
    console.error('Error saving footer:', error);
    throw new Error('Failed to update footer data');
  }
}
