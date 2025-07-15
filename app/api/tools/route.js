import { promises as fs } from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'tools.json');

export async function GET() {
  const data = await fs.readFile(dataPath, 'utf-8');
  return new Response(data, { status: 200, headers: { 'Content-Type': 'application/json' } });
}

export async function PUT(req) {
  const body = await req.json();
  await fs.writeFile(dataPath, JSON.stringify(body, null, 2));
  return new Response(JSON.stringify({ success: true }), { status: 200 });
} 