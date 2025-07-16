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

export async function getMessages() {
  try {
    const res = await fetch('/api/messages')
    return await res.json()
  } catch (error) {
    return { success: false, error: error.message }
  }
} 