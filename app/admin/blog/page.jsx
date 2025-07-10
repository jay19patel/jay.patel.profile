'use client';

import { useState, useEffect } from 'react';
import { AdminPageWrapper } from '@/components/customUi/AdminPageWrapper';
import { AdminTable } from '@/components/customUi/AdminTable';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { getBlogs, deleteBlog } from '@/app/actions/blogs';
import Image from 'next/image';
import { EmptyState } from '@/components/customUi/EmptyState';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BlogAdminPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch blogs on mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await getBlogs();
      if (!response.success) throw new Error(response.error);
      setBlogs(response.data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to fetch blogs', {
        description: error.message || 'Please try again later'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (blog) => {
    toast.promise(
      async () => {
        const { success, error } = await deleteBlog(blog._id);
        if (!success) throw new Error(error || 'Failed to delete blog');
        await fetchBlogs();
      },
      {
        loading: 'Deleting blog post...',
        success: 'Blog post deleted successfully',
        error: 'Failed to delete blog post'
      }
    );
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
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Link href={`/blog/${row.original.slug}`} target="_blank">
            <Button variant="ghost" size="icon">
              <Eye className="h-4 w-4" />
              <span className="sr-only">View</span>
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(`/admin/blog/${row.original.slug}`)}
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
        { label: 'Blog Posts' }
      ]}
      title="Manage Blog Posts"
    >
      <div className="flex justify-end mb-6">
        <Button
          onClick={() => router.push('/admin/blog/new')}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Blog Post
        </Button>
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
        <AdminTable
          data={blogs}
          columns={columns}
          searchField="title"
          searchPlaceholder="Search blog posts..."
        />
      )}
    </AdminPageWrapper>
  );
} 