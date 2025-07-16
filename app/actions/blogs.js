'use server';

function getBaseUrl() {
  if (typeof window === 'undefined') {
    // On server
    return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  }
  // On client
  return '';
}

function getApiUrl(path) {
  return getBaseUrl() + path;
}

function serializeDocument(doc) {
  if (!doc) return null;
  if (Array.isArray(doc)) return doc.map(serializeDocument);
  const serialized = JSON.parse(JSON.stringify(doc));
  if (serialized._id) serialized._id = serialized._id.toString();
  return serialized;
}

export async function getBlogs() {
  try {
    const res = await fetch(getApiUrl('/api/blogs'));
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getBlogBySlug(slug) {
  try {
    const res = await fetch(getApiUrl(`/api/blogs?slug=${encodeURIComponent(slug)}`));
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function createBlog(blogData) {
  try {
    const res = await fetch(getApiUrl('/api/blogs'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blogData)
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function updateBlog(id, blogData) {
  try {
    const res = await fetch(getApiUrl(`/api/blogs?id=${encodeURIComponent(id)}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blogData)
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteBlog(id) {
  try {
    const res = await fetch(getApiUrl(`/api/blogs?id=${encodeURIComponent(id)}`), {
      method: 'DELETE' });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getFeaturedBlogs() {
  const all = await getBlogs();
  if (!all.success) return { data: null, error: { message: 'Failed to fetch featured blogs' } };
  const blogs = all.data.filter(b => b.featured);
  return { data: blogs, error: null };
}

export async function getBlogsByCategory(category) {
  const all = await getBlogs();
  if (!all.success) return { data: null, error: { message: 'Failed to fetch blogs by category' } };
  const blogs = all.data.filter(b => b.category === category);
  return { data: blogs, error: null };
} 