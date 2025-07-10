'use client';

import BlogForm from '@/components/admin/BlogForm'
import { AdminPageWrapper } from '@/components/customUi/AdminPageWrapper'

const EditBlogPage = ({ params }) => {
  return (
    <AdminPageWrapper
      breadcrumbItems={[
        { label: 'Admin', href: '/admin' },
        { label: 'Blog Posts', href: '/admin/blog' },
        { label: 'Edit Blog Post' }
      ]}
      title="Edit Blog Post"
    >
      <BlogForm blogSlug={params.id} />
    </AdminPageWrapper>
  )
}

export default EditBlogPage 