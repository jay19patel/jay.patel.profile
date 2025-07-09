import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  subtitle: {
    type: String,
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  introduction: {
    type: String,
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  technologies: {
    type: [String],
    required: [true, 'At least one technology is required'],
    validate: {
      validator: function(v) {
        return Array.isArray(v) && v.length > 0;
      },
      message: 'At least one technology must be specified'
    }
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['Completed', 'In Progress', 'Planned'],
    default: 'In Progress'
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  downloads: {
    type: String,
    default: '0'
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true
  },
  screenshots: {
    type: [String],
    default: []
  },
  features: {
    type: [String],
    default: []
  },
  challenges: {
    type: [String],
    default: []
  },
  learnings: {
    type: [String],
    default: []
  },
  author: {
    type: String,
    trim: true
  },
  demoUrl: {
    type: String,
    trim: true
  },
  githubUrl: {
    type: String,
    trim: true
  },
  liveUrl: {
    type: String,
    trim: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Add pre-save middleware to update the updatedAt timestamp
ProjectSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Handle the case where the model might already be compiled
const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

export default Project; 