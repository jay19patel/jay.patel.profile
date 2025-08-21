'use server';
import fs from 'fs';
import path from 'path';

const messagesFilePath = path.join(process.cwd(), 'data', 'messages.json');

function readMessages() {
  try {
    const fileContents = fs.readFileSync(messagesFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    return { messages: [] };
  }
}

export async function getMessages() {
  try {
    const messagesData = readMessages();
    const messages = messagesData.messages || [];
    
    // Convert to expected format
    const plainMessages = messages.map(message => ({
      _id: message._id,
      name: message.name,
      email: message.email,
      subject: message.subject,
      message: message.message,
      is_read: message.isRead || false,
      createdAt: message.createdAt
    }));
    
    return { success: true, data: plainMessages };
  } catch (error) {
    console.error('Error fetching messages:', error);
    return { success: false, error: 'Failed to fetch messages' };
  }
} 