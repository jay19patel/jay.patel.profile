import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Project from '@/models/Project'

function serializeDocument(doc) {
  if (!doc) return null;
  if (Array.isArray(doc)) return doc.map(serializeDocument);
  const serialized = JSON.parse(JSON.stringify(doc));
  if (serialized._id) serialized._id = serialized._id.toString();
  return serialized;
}

async function generateUniqueSlug(title) {
  let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const existingProject = await Project.findOne({ slug });
  if (!existingProject) return slug;
  let counter = 1;
  let newSlug = `${slug}-${counter}`;
  while (await Project.findOne({ slug: newSlug })) {
    counter++;
    newSlug = `${slug}-${counter}`;
  }
  return newSlug;
}

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const slug = searchParams.get('slug');
  try {
    if (id) {
      const project = await Project.findById(id).lean();
      if (!project) return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
      return NextResponse.json({ success: true, data: serializeDocument(project) });
    }
    if (slug) {
      const project = await Project.findOne({ slug }).lean();
      if (!project) return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
      return NextResponse.json({ success: true, data: serializeDocument(project) });
    }
    const projects = await Project.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: serializeDocument(projects) });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    if (!body.slug || body.slug === 'new') {
      body.slug = await generateUniqueSlug(body.title);
    }
    const requiredFields = ['title', 'description', 'technologies', 'category'];
    const missingFields = requiredFields.filter(field => !body[field]);
    if (missingFields.length > 0) {
      return NextResponse.json({ success: false, error: `Missing required fields: ${missingFields.join(', ')}` }, { status: 400 });
    }
    if (!Array.isArray(body.technologies) || body.technologies.length === 0) {
      return NextResponse.json({ success: false, error: 'At least one technology is required' }, { status: 400 });
    }
    const project = new Project(body);
    const savedProject = await project.save();
    return NextResponse.json({ success: true, data: serializeDocument(savedProject.toObject()) });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.code === 11000 ? 'Slug already exists' : error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });
  try {
    const body = await req.json();
    const project = await Project.findByIdAndUpdate(id, body, { new: true, runValidators: true }).lean();
    if (!project) return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: serializeDocument(project) });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });
  try {
    const body = await req.json();
    const project = await Project.findByIdAndUpdate(id, body, { new: true, runValidators: true }).lean();
    if (!project) return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: serializeDocument(project) });
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
    const project = await Project.findByIdAndDelete(id);
    if (!project) return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
} 