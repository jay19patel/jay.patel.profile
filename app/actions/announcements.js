'use server';
import { readJsonFile, writeJsonFile } from '@/lib/server-utils';

export async function getAnnouncements() {
  try {
    return await readJsonFile('announcements.json');
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return [];
  }
}

export async function updateAnnouncements(announcementsData) {
  try {
    return await writeJsonFile('announcements.json', announcementsData);
  } catch (error) {
    console.error('Error saving announcements:', error);
    throw new Error('Failed to update announcements data');
  }
}