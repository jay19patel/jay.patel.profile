'use server';
import { readJsonFile, writeJsonFile } from '@/lib/server-utils';

export async function getFooter() {
  try {
    return await readJsonFile('footer.json');
  } catch (error) {
    console.error('Error fetching footer:', error);
    return { company: {}, sections: [], socialMedia: [] };
  }
}

export async function updateFooter(footerData) {
  try {
    return await writeJsonFile('footer.json', footerData);
  } catch (error) {
    console.error('Error saving footer:', error);
    throw new Error('Failed to update footer data');
  }
}
