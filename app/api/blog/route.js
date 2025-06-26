import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const blogsFilePath = path.join(process.cwd(), 'data', 'blogs.json')

// GET - Fetch all blogs
export async function GET() {
  try {
    const fileContents = fs.readFileSync(blogsFilePath, 'utf8')
    const blogs = JSON.parse(fileContents)
    return NextResponse.json(blogs)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read blogs' }, { status: 500 })
  }
}

// POST - Add new blog
export async function POST(request) {
  try {
    const newBlog = await request.json()
    
    // Read existing blogs
    const fileContents = fs.readFileSync(blogsFilePath, 'utf8')
    const blogsData = JSON.parse(fileContents)
    
    // Generate new ID
    const maxId = Math.max(...blogsData.blogs.map(blog => blog.id), 0)
    newBlog.id = maxId + 1
    
    // Generate slug from title
    newBlog.slug = newBlog.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    
    // Add timestamps
    newBlog.publishedDate = new Date().toISOString().split('T')[0]
    
    // Add to blogs array
    blogsData.blogs.unshift(newBlog) // Add to beginning
    
    // Write back to file
    fs.writeFileSync(blogsFilePath, JSON.stringify(blogsData, null, 2))
    
    return NextResponse.json({ 
      success: true, 
      blog: newBlog,
      message: 'Blog post created successfully!' 
    })
  } catch (error) {
    console.error('Error creating blog:', error)
    return NextResponse.json({ 
      error: 'Failed to create blog post',
      details: error.message 
    }, { status: 500 })
  }
} 