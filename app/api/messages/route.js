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

export async function GET() {
  await dbConnect()
  try {
    const messages = await Message.find().sort({ createdAt: -1 })
    return NextResponse.json({ success: true, data: messages })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
} 