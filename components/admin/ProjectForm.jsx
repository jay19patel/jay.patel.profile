import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Loader } from 'lucide-react';

export function ProjectForm({ project = null, onSubmit, isLoading = false }) {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    slug: project?.slug || '',
    description: project?.description || '',
    content: project?.content || '',
    technologies: project?.technologies?.join(', ') || '',
    category: project?.category || '',
    image: project?.image || '',
    demoUrl: project?.demoUrl || '',
    githubUrl: project?.githubUrl || '',
    featured: project?.featured || false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Convert technologies string to array
    const processedData = {
      ...formData,
      technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(Boolean),
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
      </div>

      {/* Image URL */}
      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Enter image URL"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <Button type="submit" className="w-full" disabled={isLoading}>
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