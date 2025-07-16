import { promises as fs } from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'experience.json');

export async function GET() {
  const data = await fs.readFile(dataPath, 'utf-8');
  return new Response(data, { status: 200, headers: { 'Content-Type': 'application/json' } });
}

export async function POST(req) {
  const body = await req.json();
  const data = JSON.parse(await fs.readFile(dataPath, 'utf-8'));
  data.experiences.push(body);
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
  return new Response(JSON.stringify({ success: true, data: body }), { status: 201 });
}

export async function PUT(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return new Response(JSON.stringify({ error: 'Missing id' }), { status: 400 });
  const body = await req.json();
  const data = JSON.parse(await fs.readFile(dataPath, 'utf-8'));
  const idx = data.experiences.findIndex(e => e.id === id);
  if (idx === -1) return new Response(JSON.stringify({ error: 'Experience not found' }), { status: 404 });
  data.experiences[idx] = { ...data.experiences[idx], ...body };
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
  return new Response(JSON.stringify({ success: true, data: data.experiences[idx] }), { status: 200 });
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return new Response(JSON.stringify({ error: 'Missing id' }), { status: 400 });
  const data = JSON.parse(await fs.readFile(dataPath, 'utf-8'));
  data.experiences = data.experiences.filter(e => e.id !== id);
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
  return new Response(JSON.stringify({ success: true }), { status: 200 });
} 