import { NextResponse } from 'next/server';
import Project from '@/models/Project';

export async function GET(request, { params }) {
  try {
    const project = await Project.findOne({ slug: params.slug });
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ project });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Error fetching project' },
      { status: 500 }
    );
  }
} 