'use server';
import { promises as fs } from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'announcements.json');

export async function getAnnouncements() {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error fetching announcements:', error);
    throw new Error('Failed to fetch announcements data');
  }
}

export async function updateAnnouncements(announcementsData) {
  try {
    await fs.writeFile(dataPath, JSON.stringify(announcementsData, null, 2));
    return { success: true };
  } catch (error) {
    console.error('Error saving announcements:', error);
    throw new Error('Failed to update announcements data');
  }
}