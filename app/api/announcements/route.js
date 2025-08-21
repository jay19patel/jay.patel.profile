import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const announcementsFilePath = path.join(process.cwd(), 'data', 'announcements.json')

function readAnnouncements() {
  try {
    const fileContents = fs.readFileSync(announcementsFilePath, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    return { announcements: [] }
  }
}

function writeAnnouncements(data) {
  try {
    fs.writeFileSync(announcementsFilePath, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error('Error writing announcements file:', error)
    return false
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    const { announcements } = body
    
    if (!announcements) {
      return NextResponse.json({ success: false, error: 'Announcements data is required.' }, { status: 400 })
    }
    
    const data = { announcements }
    
    if (writeAnnouncements(data)) {
      return NextResponse.json({ success: true, message: 'Announcements saved successfully' })
    } else {
      return NextResponse.json({ success: false, error: 'Failed to save announcements' }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function GET(req) {
  try {
    const data = readAnnouncements()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}