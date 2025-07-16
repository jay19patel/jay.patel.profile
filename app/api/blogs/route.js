import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Blog from '@/models/Blog'

function serializeDocument(doc) {
  if (!doc) return null;
  if (Array.isArray(doc)) return doc.map(serializeDocument);
  const serialized = JSON.parse(JSON.stringify(doc));
  if (serialized._id) serialized._id = serialized._id.toString();
  return serialized;
}

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  try {
    if (slug) {
      const blog = await Blog.findOne({ slug }).lean();
      if (!blog) return NextResponse.json({ success: false, error: 'Blog post not found' }, { status: 404 });
      return NextResponse.json({ success: true, data: serializeDocument(blog) });
    }
    const blogs = await Blog.find().sort({ publishedDate: -1 }).lean();
    return NextResponse.json({ success: true, data: serializeDocument(blogs) });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const blog = new Blog(body);
    const savedBlog = await blog.save();
    return NextResponse.json({ success: true, data: serializeDocument(savedBlog.toObject()) });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });
  try {
    const body = await req.json();
    const blog = await Blog.findByIdAndUpdate(id, { ...body }, { new: true, runValidators: true }).lean();
    if (!blog) return NextResponse.json({ success: false, error: 'Blog post not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: serializeDocument(blog) });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });
  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) return NextResponse.json({ success: false, error: 'Blog post not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
} 