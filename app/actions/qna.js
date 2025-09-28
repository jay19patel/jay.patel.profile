'use server';
import { promises as fs } from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'qna.json');

export async function getQnA() {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error fetching QNA:', error);
    throw new Error('Failed to fetch QnA data');
  }
}

export async function updateQnA(qnaData) {
  try {
    await fs.writeFile(dataPath, JSON.stringify(qnaData, null, 2));
    return { success: true };
  } catch (error) {
    console.error('Error saving QNA:', error);
    throw new Error('Failed to update QnA data');
  }
} 