export async function getQnA() {
  const res = await fetch('/api/qna', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch QnA data');
  return res.json();
}

export async function updateQnA(data) {
  const res = await fetch('/api/qna', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update QnA data');
  return res.json();
} 