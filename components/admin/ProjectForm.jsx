'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { uploadProjectImage, createProject, updateProject } from '@/app/actions/projects';

export default function ProjectForm({ project = null }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: project?.title || '',
    subtitle: project?.subtitle || '',
    slug: project?.slug || '',
    description: project?.description || '',
    introduction: project?.introduction || '',
    content: project?.content || '',
    technologies: project?.technologies || [],
    category: project?.category || '',
    status: project?.status || 'In Progress',
    rating: project?.rating || 0,
    downloads: project?.downloads || '0',
    image: project?.image || '',
    screenshots: project?.screenshots || [],
    features: project?.features || [],
    challenges: project?.challenges || [],
    learnings: project?.learnings || [],
    author: project?.author || '',
    demoUrl: project?.demoUrl || '',
    githubUrl: project?.githubUrl || '',
    liveUrl: project?.liveUrl || '',
    featured: project?.featured || false,
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('image', file);

      const result = await uploadProjectImage(formData);
      
      if (!result.success) {
        throw new Error(result.error);
      }

      setFormData(prev => ({
        ...prev,
        image: result.data.url
      }));
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);

      const result = project?._id 
        ? await updateProject(project._id, formData)
        : await createProject(formData);

      if (!result.success) {
        throw new Error(result.error);
      }

      toast.success(`Project ${project?._id ? 'updated' : 'created'} successfully`);
      router.push('/admin/projects');
      router.refresh();
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error(`Failed to ${project?._id ? 'update' : 'create'} project`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayInput = (e, field) => {
    const value = e.target.value.split(',').map(item => item.trim());
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="title"
            label="Title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          
          <Input
            name="subtitle"
            label="Subtitle"
            value={formData.subtitle}
            onChange={handleInputChange}
          />
          
          <Input
            name="slug"
            label="Slug"
            value={formData.slug}
            onChange={handleInputChange}
            required
          />
          
          <Input
            name="category"
            label="Category"
            value={formData.category}
            onChange={handleInputChange}
            required
          />
        </div>

        <Select
          name="status"
          label="Status"
          value={formData.status}
          onChange={handleInputChange}
          options={[
            { value: 'In Progress', label: 'In Progress' },
            { value: 'Completed', label: 'Completed' },
            { value: 'Planned', label: 'Planned' }
          ]}
        />
      </div>

      {/* Content */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Content</h3>
        
        <Textarea
          name="description"
          label="Short Description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
        
        <Textarea
          name="introduction"
          label="Introduction"
          value={formData.introduction}
          onChange={handleInputChange}
          rows={4}
        />
        
        <Textarea
          name="content"
          label="Detailed Content"
          value={formData.content}
          onChange={handleInputChange}
          rows={8}
        />
      </div>

      {/* Technologies and Features */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Technologies and Features</h3>
        
        <Textarea
          name="technologies"
          label="Technologies (comma-separated)"
          value={formData.technologies.join(', ')}
          onChange={(e) => handleArrayInput(e, 'technologies')}
          placeholder="React, Next.js, TailwindCSS"
        />
        
        <Textarea
          name="features"
          label="Features (comma-separated)"
          value={formData.features.join(', ')}
          onChange={(e) => handleArrayInput(e, 'features')}
          placeholder="Feature 1, Feature 2, Feature 3"
        />
      </div>

      {/* Images */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Images</h3>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">Main Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {formData.image && (
            <div className="mt-2">
              <img
                src={formData.image}
                alt="Project preview"
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>
          )}
        </div>
        
        <Textarea
          name="screenshots"
          label="Screenshot URLs (comma-separated)"
          value={formData.screenshots.join(', ')}
          onChange={(e) => handleArrayInput(e, 'screenshots')}
          placeholder="https://example.com/screenshot1.jpg, https://example.com/screenshot2.jpg"
        />
      </div>

      {/* Links */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Links</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="demoUrl"
            label="Demo URL"
            value={formData.demoUrl}
            onChange={handleInputChange}
          />
          
          <Input
            name="githubUrl"
            label="GitHub URL"
            value={formData.githubUrl}
            onChange={handleInputChange}
          />
          
          <Input
            name="liveUrl"
            label="Live URL"
            value={formData.liveUrl}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Additional Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Additional Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="rating"
            type="number"
            label="Rating"
            value={formData.rating}
            onChange={handleInputChange}
            min="0"
            max="5"
            step="0.1"
          />
          
          <Input
            name="downloads"
            label="Downloads"
            value={formData.downloads}
            onChange={handleInputChange}
          />
        </div>
        
        <Textarea
          name="challenges"
          label="Challenges (comma-separated)"
          value={formData.challenges.join(', ')}
          onChange={(e) => handleArrayInput(e, 'challenges')}
          placeholder="Challenge 1, Challenge 2, Challenge 3"
        />
        
        <Textarea
          name="learnings"
          label="Learnings (comma-separated)"
          value={formData.learnings.join(', ')}
          onChange={(e) => handleArrayInput(e, 'learnings')}
          placeholder="Learning 1, Learning 2, Learning 3"
        />
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="featured"
            id="featured"
            checked={formData.featured}
            onChange={handleInputChange}
            className="rounded border-gray-300"
          />
          <label htmlFor="featured" className="text-sm font-medium">
            Featured Project
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6"
        >
          {isLoading ? 'Saving...' : project?._id ? 'Update Project' : 'Create Project'}
        </Button>
      </div>
    </form>
  );
} 