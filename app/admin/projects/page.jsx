'use client';

import { useState, useEffect } from 'react';
import { AdminPageWrapper } from '@/components/customUi/AdminPageWrapper';
import { AdminTable } from '@/components/customUi/AdminTable';
import { AdminFormDialog } from '@/components/customUi/AdminFormDialog';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { getProjects, createProject, updateProject, deleteProject } from '@/app/actions/projects';

export default function ProjectAdminPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Fetch projects on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await getProjects();
      if (error) throw new Error(error);
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to fetch projects');
    }
  };

  const handleCreate = async (data) => {
    setIsLoading(true);
    try {
      const result = await createProject(data);
      if (result.error) throw new Error(result.error);
      
      await fetchProjects();
      setIsDialogOpen(false);
      toast.success('Project created successfully');
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (data) => {
    setIsLoading(true);
    try {
      const result = await updateProject(selectedProject._id, data);
      if (result.error) throw new Error(result.error);
      
      await fetchProjects();
      setIsDialogOpen(false);
      setSelectedProject(null);
      toast.success('Project updated successfully');
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (project) => {
    toast.promise(
      async () => {
        const result = await deleteProject(project._id);
        if (result.error) throw new Error(result.error);
        await fetchProjects();
      },
      {
        loading: 'Deleting project...',
        success: 'Project deleted successfully',
        error: 'Failed to delete project',
      }
    );
  };

  const columns = [
    {
      header: 'Title',
      accessorKey: 'title',
    },
    {
      header: 'Category',
      accessorKey: 'category',
    },
    {
      header: 'Status',
      accessorKey: 'status',
    },
    {
      header: 'Rating',
      accessorKey: 'rating',
      cell: ({ row }) => (
        <span>{row.original.rating?.toFixed(1) || '0.0'}</span>
      ),
    },
    {
      header: 'Downloads',
      accessorKey: 'downloads',
      cell: ({ row }) => (
        <span>{row.original.downloads?.toLocaleString() || '0'}</span>
      ),
    },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setSelectedProject(row.original);
              setIsDialogOpen(true);
            }}
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(row.original)}
          >
            <Trash className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <AdminPageWrapper
      breadcrumbItems={[
        { label: 'Admin', href: '/admin' },
        { label: 'Projects' }
      ]}
      title="Manage Projects"
    >
      <div className="flex justify-end mb-6">
        <Button
          onClick={() => {
            setSelectedProject(null);
            setIsDialogOpen(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      <AdminTable
        data={projects}
        columns={columns}
      />

      <AdminFormDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedProject(null);
        }}
        title={selectedProject ? 'Edit Project' : 'Create New Project'}
      >
        <ProjectForm
          project={selectedProject}
          onSubmit={selectedProject ? handleUpdate : handleCreate}
          isLoading={isLoading}
        />
      </AdminFormDialog>
    </AdminPageWrapper>
  );
} 