export async function getSocialMedia() {
  const res = await fetch('/api/socialMedia', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch social media data');
  return res.json();
}

export async function updateSocialMedia(data) {
  const res = await fetch('/api/socialMedia', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update social media data');
  return res.json();
} 