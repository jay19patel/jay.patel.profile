import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
const Message = require('@/models/Message')

export async function POST(req) {
  await dbConnect()
  try {
    const body = await req.json()
    const { name, email, subject, message } = body
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: 'All fields are required.' }, { status: 400 })
    }
    const newMessage = await Message.create({ name, email, subject, message })
    return NextResponse.json({ success: true, data: newMessage })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function GET(req) {
  await dbConnect()
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;
  const skip = (page - 1) * limit;
  
  try {
    const totalMessages = await Message.countDocuments();
    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const totalPages = Math.ceil(totalMessages / limit);
    
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
  await dbConnect()
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });
  try {
    const body = await req.json();
    const message = await Message.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!message) return NextResponse.json({ success: false, error: 'Message not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: message });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
} 