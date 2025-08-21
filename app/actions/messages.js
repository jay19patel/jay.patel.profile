// Message actions

export async function createMessage({ name, email, subject, message }) {
  try {
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message })
    })
    return await res.json()
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export async function getMessages(page = 1, limit = 10) {
  try {
    const res = await fetch(`/api/messages?page=${page}&limit=${limit}`)
    return await res.json()
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export async function toggleMessageRead(id, updateData) {
  try {
    const res = await fetch(`/api/messages?id=${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    });
    return await res.json();
  } catch (error) {
    return { success: false, error: error.message };
  }
} 