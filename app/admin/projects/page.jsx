'use client';

import { useState, useEffect } from 'react';
import { AdminPageWrapper } from '@/components/customUi/AdminPageWrapper';
import { AdminTable } from '@/components/customUi/AdminTable';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { getProjects, deleteProject } from '@/app/actions/projects';
import { EmptyState } from '@/components/customUi/EmptyState';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProjectAdminPage() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch projects on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await getProjects();
      if (error) throw new Error(error);
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to fetch projects', {
        description: error.message || 'Please try again later'
      });
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
        error: 'Failed to delete project'
      }
    );
  };

  const columns = [
    {
      header: 'Title',
      accessorKey: 'title',
      cell: ({ row }) => (
        <div className="space-y-1">
          <p className="font-medium text-gray-900 dark:text-white">{row.original.title}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{row.original.description}</p>
        </div>
      )
    },
    {
      header: 'Category',
      accessorKey: 'category',
      cell: ({ row }) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          {row.original.category}
        </span>
      )
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          row.original.status === 'completed'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : row.original.status === 'in-progress'
            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
        }`}>
          {row.original.status}
        </span>
      )
    },
    {
      header: 'Rating',
      accessorKey: 'rating',
      cell: ({ row }) => (
        <span>{row.original.rating?.toFixed(1) || '0.0'}</span>
      )
    },
    {
      header: 'Downloads',
      accessorKey: 'downloads',
      cell: ({ row }) => (
        <span>{row.original.downloads?.toLocaleString() || '0'}</span>
      )
    },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Link href={`/projects/${row.original.slug}`} target="_blank">
            <Button variant="ghost" size="icon">
              <Eye className="h-4 w-4" />
              <span className="sr-only">View</span>
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(`/admin/projects/${row.original._id}`)}
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
      )
    }
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
          onClick={() => router.push('/admin/projects/new')}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {isLoading ? (
        <div className="w-full h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : projects.length === 0 ? (
        <EmptyState
          title="No Projects Yet"
          description="Get started by creating your first project"
          illustration="/projects-empty.svg"
          actionLabel="Create New Project"
          actionHref="/admin/projects/new"
        />
      ) : (
        <AdminTable
          data={projects}
          columns={columns}
          searchField="title"
          searchPlaceholder="Search projects..."
        />
      )}
    </AdminPageWrapper>
  );
} 