import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  subtitle: {
    type: String,
    required: [true, 'Subtitle is required'],
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
  },
  tags: {
    type: [String],
    default: [],
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  readTime: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true
});

// Function to generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/-+/g, '-') // Replace multiple - with single -
    .trim(); // Trim - from start and end
}

// Pre-save hook to generate slug if not provided
blogSchema.pre('save', async function(next) {
  if (!this.slug) {
    let baseSlug = generateSlug(this.title);
    let slug = baseSlug;
    let counter = 1;
    
    // Check if slug exists, if yes, append counter until unique
    while (true) {
      const existingBlog = await this.constructor.findOne({ slug });
      if (!existingBlog) {
        this.slug = slug;
        break;
      }
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
  }
  next();
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog; 