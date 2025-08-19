'use server';
import Message from '@/models/Message'; 


export async function getMessages() {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    // Convert Mongoose documents to plain objects
    const plainMessages = messages.map(message => ({
      _id: message._id.toString(),
      name: message.name,
      email: message.email,
      subject: message.subject,
      message: message.message,
      is_read: message.is_read || false,
      createdAt: message.createdAt.toISOString()
    }));
    return { success: true, data: plainMessages };
  } catch (error) {
    console.error('Error fetching messages:', error);
    return { success: false, error: 'Failed to fetch messages' };
  }
} 