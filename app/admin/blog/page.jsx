'use client';

import { useState, useEffect } from 'react';
import { AdminPageWrapper } from '@/components/customUi/AdminPageWrapper';
import { AdminTable } from '@/components/customUi/AdminTable';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Eye, Power, PowerOff } from 'lucide-react';
import { toast } from 'sonner';
import { getBlogs, toggleBlogActive } from '@/app/actions/blogs';
import Image from 'next/image';
import { EmptyState } from '@/components/customUi/EmptyState';
import { Pagination } from '@/components/ui/pagination';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BlogAdminPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  });

  // Fetch blogs on mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async (page = pagination.page) => {
    try {
      setIsLoading(true);
      const response = await getBlogs(page, pagination.limit);
      if (!response.success) throw new Error(response.error);
      setBlogs(response.data || []);
      if (response.pagination) {
        setPagination(response.pagination);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to fetch blogs', {
        description: error.message || 'Please try again later'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleActive = async (blog) => {
    const newStatus = !blog.isActive;
    toast.promise(
      async () => {
        const { success, error } = await toggleBlogActive(blog._id, newStatus);
        if (!success) throw new Error(error || 'Failed to update blog status');
        await fetchBlogs(pagination.page);
      },
      {
        loading: `${newStatus ? 'Activating' : 'Deactivating'} blog post...`,
        success: `Blog post ${newStatus ? 'activated' : 'deactivated'} successfully`,
        error: 'Failed to update blog status'
      }
    );
  };

  const handlePageChange = (newPage) => {
    fetchBlogs(newPage);
  };

  const columns = [
    {
      header: 'Image',
      cell: ({ row }) => (
        <div className="relative w-16 h-16 rounded-md overflow-hidden">
          <Image
            src={row.original.image}
            alt={row.original.title}
            fill
            className="object-cover"
          />
        </div>
      )
    },
    {
      header: 'Title',
      accessorKey: 'title',
      cell: ({ row }) => (
        <div className="space-y-1">
          <p className="font-medium text-gray-900 dark:text-white">{row.original.title}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{row.original.subtitle}</p>
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
      header: 'Author',
      accessorKey: 'author'
    },
    {
      header: 'Published',
      accessorKey: 'publishedDate',
      cell: ({ row }) => new Date(row.original.publishedDate).toLocaleDateString()
    },
    {
      header: 'Featured',
      accessorKey: 'featured',
      cell: ({ row }) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          row.original.featured 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
        }`}>
          {row.original.featured ? 'Yes' : 'No'}
        </span>
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
        <div className="flex gap-1">
          <Link href={`/blog/${row.original.slug}`} target="_blank">
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <Eye className="h-4 w-4" />
              <span className="sr-only">View</span>
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
            onClick={() => router.push(`/admin/blog/${row.original.slug}`)}
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 text-gray-600 dark:text-gray-400 ${
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
        { label: 'Blog Posts' }
      ]}
      title="Manage Blog Posts"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Blog Posts</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your blog content and articles</p>
          </div>
          <Button
            onClick={() => router.push('/admin/blog/new')}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Blog Post
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="w-full h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : blogs.length === 0 ? (
        <EmptyState
          title="No Blog Posts Yet"
          description="Get started by creating your first blog post"
          illustration="/blog-empty.svg"
          actionLabel="Create New Post"
          actionHref="/admin/blog/new"
        />
      ) : (
        <>
          <AdminTable
            data={blogs}
            columns={columns}
            searchField="title"
            searchPlaceholder="Search blog posts..."
          />
          {pagination.totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </AdminPageWrapper>
  );
} 