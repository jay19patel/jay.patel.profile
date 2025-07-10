'use client';

import ProjectForm from '@/components/admin/ProjectForm'
import { AdminPageWrapper } from '@/components/customUi/AdminPageWrapper'

const EditProjectPage = ({ params }) => {
  return (
    <AdminPageWrapper
      breadcrumbItems={[
        { label: 'Admin', href: '/admin' },
        { label: 'Projects', href: '/admin/projects' },
        { label: 'Edit Project' }
      ]}
      title="Edit Project"
    >
      <ProjectForm projectSlug={params.id} />
    </AdminPageWrapper>
  )
}

export default EditProjectPage 