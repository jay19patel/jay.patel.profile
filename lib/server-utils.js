'use server';

import { promises as fs } from 'fs';
import path from 'path';

// Server-side utility function to read JSON data files
export async function readJsonFile(filename) {
  try {
    // Use process.cwd() which works in both development and production on Vercel
    const dataPath = path.join(process.cwd(), 'data', filename);
    console.log(`[readJsonFile] Reading file: ${dataPath}`);

    const data = await fs.readFile(dataPath, 'utf-8');
    const parsedData = JSON.parse(data);

    console.log(`[readJsonFile] Successfully read ${filename}`);
    return parsedData;
  } catch (error) {
    console.error(`[readJsonFile] Error reading ${filename}:`, error.message);
    console.error(`[readJsonFile] CWD: ${process.cwd()}`);
    console.error(`[readJsonFile] Error stack:`, error.stack);

    // Return empty default data based on filename
    if (filename === 'socialMedia.json') return [];
    if (filename === 'services.json') return { services: [] };
    if (filename === 'gallery.json') return { images: [] };
    if (filename === 'announcements.json') return [];
    if (filename === 'tools.json') return [];
    if (filename === 'footer.json') return { company: { copyright: "© 2025 Jay Patel" }, sections: [{ title: "Legal", links: [] }], socialMedia: [] };
    if (filename === 'qna.json') return [];
    if (filename === 'experience.json') return [];
    if (filename === 'blogs.json') return { blogs: [] };
    if (filename === 'messages.json') return { messages: [] };

    // Default fallback
    return {};
  }
}

// Server-side utility function to write JSON data files
export async function writeJsonFile(filename, data) {
  try {
    const dataPath = path.join(process.cwd(), 'data', filename);
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
    return { success: true };
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    throw new Error(`Failed to write ${filename}`);
  }
}