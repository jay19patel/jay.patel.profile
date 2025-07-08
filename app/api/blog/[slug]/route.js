import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { slug } = params;
    
    const blog = await Blog.findOne({ slug });
    
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    return NextResponse.json({ blog });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 