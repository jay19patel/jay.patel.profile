export async function getTools() {
  const res = await fetch('/api/tools', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch tools data');
  return res.json();
}

export async function updateTools(data) {
  const res = await fetch('/api/tools', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update tools data');
  return res.json();
} 