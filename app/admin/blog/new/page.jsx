import BlogForm from '@/components/admin/BlogForm'
import { AdminPageWrapper } from '@/components/customUi/AdminPageWrapper'

const NewBlogPage = () => {
  return (
    <AdminPageWrapper
      breadcrumbItems={[
        { label: 'Admin', href: '/admin' },
        { label: 'Blog Posts', href: '/admin/blog' },
        { label: 'New Blog Post' }
      ]}
      title="Create New Blog Post"
    >
      <BlogForm />
    </AdminPageWrapper>
  )
}

export default NewBlogPage 