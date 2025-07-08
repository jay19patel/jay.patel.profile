import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

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
    const featured = searchParams.get('featured');
    
    let query = {};
    
    // If slug is provided, fetch single blog
    if (slug) {
      query.slug = slug;
      const blog = await Blog.findOne(query);
      
      if (!blog) {
        return NextResponse.json(
          { error: 'Blog not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({ blog });
    }
    
    // If featured is provided, filter by featured
    if (featured === 'true') {
      query.featured = true;
    }
    
    // Fetch blogs with query
    const blogs = await Blog.find(query)
      .sort({ publishedDate: -1 })
      .select('slug title subtitle excerpt author publishedDate readTime tags image category featured');
      
    return NextResponse.json({ blogs });
  } catch (error) {
    console.error('Error in /api/blog:', error);
    return NextResponse.json(
      { error: 'Internal server error occurred while fetching blogs' },
      { status: 500 }
    );
  }
} 