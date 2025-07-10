import ProjectForm from '@/components/admin/ProjectForm'
import { AdminPageWrapper } from '@/components/customUi/AdminPageWrapper'

const NewProjectPage = () => {
  return (
    <AdminPageWrapper
      breadcrumbItems={[
        { label: 'Admin', href: '/admin' },
        { label: 'Projects', href: '/admin/projects' },
        { label: 'New Project' }
      ]}
      title="Create New Project"
    >
      <ProjectForm />
    </AdminPageWrapper>
  )
}

export default NewProjectPage 