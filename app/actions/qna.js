'use server';
import { readJsonFile, writeJsonFile } from '@/lib/server-utils';

export async function getQna() {
  try {
    return await readJsonFile('qna.json');
  } catch (error) {
    console.error('Error fetching QnA:', error);
    return [];
  }
}

export async function updateQna(qnaData) {
  try {
    return await writeJsonFile('qna.json', qnaData);
  } catch (error) {
    console.error('Error saving QnA:', error);
    throw new Error('Failed to update QnA data');
  }
}