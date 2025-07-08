const fs = require('fs').promises;
const path = require('path');
const mongoose = require('mongoose');

// Import models
const Blog = require('../models/Blog');
const Project = require('../models/Project');

async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return null;
  }
}

async function migrateData() {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('Please define the MONGODB_URI environment variable');
    }

    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Read JSON files
    const blogsData = await readJsonFile(path.join(__dirname, '../data/blogs.json'));
    const projectsData = await readJsonFile(path.join(__dirname, '../data/projects.json'));

    if (blogsData) {
      // Clear existing blogs
      await Blog.deleteMany({});
      console.log('Cleared existing blogs');

      // Insert new blogs
      await Blog.insertMany(blogsData.blogs);
      console.log(`Migrated ${blogsData.blogs.length} blogs`);
    }

    if (projectsData) {
      // Clear existing projects
      await Project.deleteMany({});
      console.log('Cleared existing projects');

      // Insert new projects
      await Project.insertMany(projectsData.projects);
      console.log(`Migrated ${projectsData.projects.length} projects`);
    }

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

// Run migration
migrateData(); 