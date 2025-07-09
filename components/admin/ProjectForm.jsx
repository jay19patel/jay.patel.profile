import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select } from '@/components/ui/select';
import { Loader, Upload, X } from 'lucide-react';
import Image from 'next/image';

export function ProjectForm({ project = null, onSubmit, isLoading = false }) {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    subtitle: project?.subtitle || '',
    slug: project?.slug || '',
    description: project?.description || '',
    introduction: project?.introduction || '',
    content: project?.content || '',
    technologies: project?.technologies?.join(', ') || '',
    category: project?.category || '',
    status: project?.status || 'In Progress',
    rating: project?.rating || 0,
    downloads: project?.downloads || '0',
    image: project?.image || '',
    screenshots: project?.screenshots?.join('\n') || '',
    features: project?.features?.join('\n') || '',
    challenges: project?.challenges?.join('\n') || '',
    learnings: project?.learnings?.join('\n') || '',
    author: project?.author || '',
    demoUrl: project?.demoUrl || '',
    githubUrl: project?.githubUrl || '',
    liveUrl: project?.liveUrl || '',
    featured: project?.featured || false,
  });

  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(project?.image || '');

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/projects/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.url) {
        setFormData(prev => ({ ...prev, image: data.url }));
        setPreviewImage(data.url);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Process arrays from newline-separated strings
    const processedData = {
      ...formData,
      technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(Boolean),
      screenshots: formData.screenshots.split('\n').map(url => url.trim()).filter(Boolean),
      features: formData.features.split('\n').map(feature => feature.trim()).filter(Boolean),
      challenges: formData.challenges.split('\n').map(challenge => challenge.trim()).filter(Boolean),
      learnings: formData.learnings.split('\n').map(learning => learning.trim()).filter(Boolean),
    };
    
    await onSubmit(processedData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 min-h-[calc(100vh-20rem)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter project title"
            required
          />
        </div>

        {/* Subtitle */}
        <div className="space-y-2">
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input
            id="subtitle"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            placeholder="Enter project subtitle"
          />
        </div>
      </div>

      {/* Slug */}
      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder="Enter URL slug"
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter project description"
          required
        />
      </div>

      {/* Introduction */}
      <div className="space-y-2">
        <Label htmlFor="introduction">Introduction</Label>
        <Textarea
          id="introduction"
          name="introduction"
          value={formData.introduction}
          onChange={handleChange}
          placeholder="Enter project introduction"
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Enter project content"
          className="min-h-[200px]"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter project category"
            required
          />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Planned">Planned</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Rating */}
        <div className="space-y-2">
          <Label htmlFor="rating">Rating</Label>
          <Input
            id="rating"
            name="rating"
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Enter project rating"
          />
        </div>

        {/* Downloads */}
        <div className="space-y-2">
          <Label htmlFor="downloads">Downloads</Label>
          <Input
            id="downloads"
            name="downloads"
            value={formData.downloads}
            onChange={handleChange}
            placeholder="Enter download count (e.g., 1.2K+)"
          />
        </div>
      </div>

      {/* Technologies */}
      <div className="space-y-2">
        <Label htmlFor="technologies">Technologies (comma-separated)</Label>
        <Input
          id="technologies"
          name="technologies"
          value={formData.technologies}
          onChange={handleChange}
          placeholder="Enter technologies, separated by commas"
          required
        />
      </div>

      {/* Image Upload */}
      <div className="space-y-2">
        <Label htmlFor="image">Project Image</Label>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image URL or upload"
              required
            />
          </div>
          <div className="relative">
            <input
              type="file"
              id="imageUpload"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('imageUpload').click()}
              disabled={uploading}
            >
              {uploading ? <Loader className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        {previewImage && (
          <div className="relative w-32 h-32 mt-2">
            <Image
              src={previewImage}
              alt="Preview"
              fill
              className="object-cover rounded-lg"
            />
            <button
              type="button"
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full"
              onClick={() => {
                setPreviewImage('');
                setFormData(prev => ({ ...prev, image: '' }));
              }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Screenshots */}
      <div className="space-y-2">
        <Label htmlFor="screenshots">Screenshots (one URL per line)</Label>
        <Textarea
          id="screenshots"
          name="screenshots"
          value={formData.screenshots}
          onChange={handleChange}
          placeholder="Enter screenshot URLs, one per line"
        />
      </div>

      {/* Features */}
      <div className="space-y-2">
        <Label htmlFor="features">Features (one per line)</Label>
        <Textarea
          id="features"
          name="features"
          value={formData.features}
          onChange={handleChange}
          placeholder="Enter features, one per line"
        />
      </div>

      {/* Challenges */}
      <div className="space-y-2">
        <Label htmlFor="challenges">Challenges (one per line)</Label>
        <Textarea
          id="challenges"
          name="challenges"
          value={formData.challenges}
          onChange={handleChange}
          placeholder="Enter challenges, one per line"
        />
      </div>

      {/* Learnings */}
      <div className="space-y-2">
        <Label htmlFor="learnings">Learnings (one per line)</Label>
        <Textarea
          id="learnings"
          name="learnings"
          value={formData.learnings}
          onChange={handleChange}
          placeholder="Enter learnings, one per line"
        />
      </div>

      {/* Author */}
      <div className="space-y-2">
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Enter author name"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Demo URL */}
        <div className="space-y-2">
          <Label htmlFor="demoUrl">Demo URL</Label>
          <Input
            id="demoUrl"
            name="demoUrl"
            value={formData.demoUrl}
            onChange={handleChange}
            placeholder="Enter demo URL"
          />
        </div>

        {/* GitHub URL */}
        <div className="space-y-2">
          <Label htmlFor="githubUrl">GitHub URL</Label>
          <Input
            id="githubUrl"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            placeholder="Enter GitHub URL"
          />
        </div>

        {/* Live URL */}
        <div className="space-y-2">
          <Label htmlFor="liveUrl">Live URL</Label>
          <Input
            id="liveUrl"
            name="liveUrl"
            value={formData.liveUrl}
            onChange={handleChange}
            placeholder="Enter live URL"
          />
        </div>
      </div>

      {/* Featured Switch */}
      <div className="flex items-center justify-between py-4 border-t">
        <Label htmlFor="featured" className="cursor-pointer">Featured Project</Label>
        <Switch
          id="featured"
          name="featured"
          checked={formData.featured}
          onCheckedChange={(checked) => 
            handleChange({ target: { name: 'featured', type: 'checkbox', checked } })
          }
        />
      </div>

      {/* Submit Button */}
      <div className="sticky bottom-0 bg-background pt-4 border-t">
        <Button type="submit" className="w-full" disabled={isLoading || uploading}>
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              {project ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            project ? 'Update Project' : 'Create Project'
          )}
        </Button>
      </div>
    </form>
  );
} 