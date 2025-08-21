import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const messagesFilePath = path.join(process.cwd(), 'data', 'messages.json')

function readMessages() {
  try {
    const fileContents = fs.readFileSync(messagesFilePath, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    return { messages: [] }
  }
}

function writeMessages(data) {
  try {
    fs.writeFileSync(messagesFilePath, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error('Error writing messages file:', error)
    return false
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body
    
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: 'All fields are required.' }, { status: 400 })
    }
    
    const messagesData = readMessages()
    const newMessage = {
      _id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      isRead: false,
      createdAt: new Date().toISOString()
    }
    
    messagesData.messages.unshift(newMessage)
    
    if (writeMessages(messagesData)) {
      return NextResponse.json({ success: true, data: newMessage })
    } else {
      return NextResponse.json({ success: false, error: 'Failed to save message' }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;
  const skip = (page - 1) * limit;
  
  try {
    const messagesData = readMessages()
    const allMessages = messagesData.messages || []
    
    const totalMessages = allMessages.length
    const messages = allMessages.slice(skip, skip + limit)
    const totalPages = Math.ceil(totalMessages / limit)
    
    return NextResponse.json({ 
      success: true, 
      data: messages,
      pagination: {
        page,
        limit,
        total: totalMessages,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function PATCH(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });
  }
  
  try {
    const body = await req.json();
    const messagesData = readMessages()
    
    const messageIndex = messagesData.messages.findIndex(msg => msg._id === id)
    
    if (messageIndex === -1) {
      return NextResponse.json({ success: false, error: 'Message not found' }, { status: 404 });
    }
    
    messagesData.messages[messageIndex] = {
      ...messagesData.messages[messageIndex],
      ...body,
      updatedAt: new Date().toISOString()
    }
    
    if (writeMessages(messagesData)) {
      return NextResponse.json({ success: true, data: messagesData.messages[messageIndex] });
    } else {
      return NextResponse.json({ success: false, error: 'Failed to update message' }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
} 