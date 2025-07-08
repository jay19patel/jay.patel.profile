import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';

export async function GET(request) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        { error: 'MongoDB connection string is not configured' },
        { status: 500 }
      );
    }

    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const status = searchParams.get('status');
    
    let query = {};
    
    // If slug is provided, fetch single project
    if (slug) {
      query.slug = slug;
      const project = await Project.findOne(query);
      
      if (!project) {
        return NextResponse.json(
          { error: 'Project not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({ project });
    }
    
    // If status is provided, filter by status
    if (status) {
      query.status = status;
    }
    
    // Fetch projects with query
    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .select('slug title subtitle description category status rating downloads image technologies');
      
    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Error in /api/projects:', error);
    return NextResponse.json(
      { error: 'Internal server error occurred while fetching projects' },
      { status: 500 }
    );
  }
} 