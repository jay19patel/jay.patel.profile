import React from 'react'
import { PageSection } from '@/components/customUi/PageSection'

const ProjectDetail = async ({ params }) => {
  const { id } = await params;
  return (
    // <PageSection>
      <h1>Project Detail {id}</h1>
    // </PageSection>
  )
}

export default ProjectDetail 