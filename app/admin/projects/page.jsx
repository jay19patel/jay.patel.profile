'use client';

import { useState, useEffect } from 'react';
import { AdminPageWrapper } from '@/components/customUi/AdminPageWrapper';
import { AdminTable } from '@/components/customUi/AdminTable';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Eye, Power, PowerOff } from 'lucide-react';
import { toast } from 'sonner';
import { getProjects, toggleProjectActive } from '@/app/actions/projects';
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
      const response = await getProjects();
      if (!response.success) throw new Error(response.error);
      setProjects(response.data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to fetch projects', {
        description: error.message || 'Please try again later'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleActive = async (project) => {
    const newStatus = !project.isActive;
    toast.promise(
      async () => {
        const { success, error } = await toggleProjectActive(project._id, newStatus);
        if (!success) throw new Error(error || 'Failed to update project status');
        await fetchProjects();
      },
      {
        loading: `${newStatus ? 'Activating' : 'Deactivating'} project...`,
        success: `Project ${newStatus ? 'activated' : 'deactivated'} successfully`,
        error: 'Failed to update project status'
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
      header: 'Status',
      accessorKey: 'isActive',
      cell: ({ row }) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          row.original.isActive 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {row.original.isActive ? 'Active' : 'Inactive'}
        </span>
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
            onClick={() => router.push(`/admin/projects/${row.original.slug}`)}
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`text-gray-600 dark:text-gray-400 ${
              row.original.isActive 
                ? 'hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                : 'hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20'
            }`}
            onClick={() => handleToggleActive(row.original)}
            title={row.original.isActive ? 'Deactivate' : 'Activate'}
          >
            {row.original.isActive ? (
              <PowerOff className="h-4 w-4" />
            ) : (
              <Power className="h-4 w-4" />
            )}
            <span className="sr-only">{row.original.isActive ? 'Deactivate' : 'Activate'}</span>
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
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Projects</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your portfolio projects and showcase</p>
          </div>
          <Button
            onClick={() => router.push('/admin/projects/new')}
            className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
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