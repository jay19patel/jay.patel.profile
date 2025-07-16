import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'experience.json')

export async function getExperiences() {
  const res = await fetch('/api/experience', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch experience data');
  return res.json();
}

export async function addExperience(data) {
  const res = await fetch('/api/experience', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to add experience');
  return res.json();
}

export async function updateExperience(id, data) {
  const res = await fetch(`/api/experience?id=${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update experience');
  return res.json();
}

export async function deleteExperience(id) {
  const res = await fetch(`/api/experience?id=${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete experience');
  return res.json();
} 