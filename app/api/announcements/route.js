import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'announcements.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    return NextResponse.json({
      success: true,
      announcements: data.announcements || [],
      currentTasks: data.currentTasks || []
    });
  } catch (error) {
    console.error('Error reading announcements:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to read announcements' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { announcements, currentTasks } = await request.json();
    
    const filePath = path.join(process.cwd(), 'data', 'announcements.json');
    
    // Read current data
    let currentData = {};
    try {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      currentData = JSON.parse(fileContents);
    } catch (error) {
      // File doesn't exist or is invalid, start with empty structure
      currentData = { announcements: [], currentTasks: [] };
    }
    
    // Update with new data
    const updatedData = {
      announcements: announcements || currentData.announcements || [],
      currentTasks: currentTasks || currentData.currentTasks || []
    };
    
    // Write to file
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
    
    return NextResponse.json({
      success: true,
      message: 'Announcements updated successfully',
      announcements: updatedData.announcements,
      currentTasks: updatedData.currentTasks
    });
  } catch (error) {
    console.error('Error updating announcements:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update announcements' },
      { status: 500 }
    );
  }
}