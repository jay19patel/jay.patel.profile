'use server';
import fs from 'fs';
import path from 'path';

const announcementsFilePath = path.join(process.cwd(), 'data', 'announcements.json');

function readAnnouncements() {
  try {
    const fileContents = fs.readFileSync(announcementsFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    return { announcements: [] };
  }
}

function writeAnnouncements(data) {
  try {
    fs.writeFileSync(announcementsFilePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing announcements file:', error);
    return false;
  }
}

export async function getAnnouncements() {
  try {
    const data = readAnnouncements();
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return { success: false, error: 'Failed to fetch announcements' };
  }
}

export async function saveAnnouncements(announcements) {
  try {
    if (!announcements) {
      return { success: false, error: 'Announcements data is required.' };
    }

    const data = { announcements };

    if (writeAnnouncements(data)) {
      return { success: true, message: 'Announcements saved successfully' };
    } else {
      return { success: false, error: 'Failed to save announcements' };
    }
  } catch (error) {
    console.error('Error saving announcements:', error);
    return { success: false, error: error.message };
  }
}