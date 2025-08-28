'use client'

import { useLoading } from '@/contexts/LoadingContext'
import AnimatedLoader from './AnimatedLoader'
import * as Skeletons from './SkeletonLoader'

const skeletonMap = {
  hero: Skeletons.HeroSkeleton,
  about: Skeletons.AboutSkeleton,
  services: Skeletons.ServicesSkeleton,
  tools: Skeletons.ToolsSkeleton,
  blogs: Skeletons.BlogsSkeleton,
  gallery: Skeletons.GallerySkeleton,
  social: Skeletons.SocialMediaSkeleton,
  announcements: Skeletons.ServicesSkeleton // Reusing services skeleton
}

export default function LoadingWrapper({ 
  children, 
  componentName, 
  showGlobalLoader = false,
  className = "" 
}) {
  const { loadingStates } = useLoading()
  
  const isLoading = loadingStates[componentName]
  const isGlobalLoading = loadingStates.global
  
  if (showGlobalLoader && isGlobalLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center">
        <div className="text-center space-y-4">
          <AnimatedLoader size="8rem" />
          <div className="text-white text-lg font-medium">Loading...</div>
        </div>
      </div>
    )
  }
  
  if (isLoading && skeletonMap[componentName]) {
    const SkeletonComponent = skeletonMap[componentName]
    return (
      <div className={`w-full ${className}`}>
        <SkeletonComponent />
      </div>
    )
  }
  
  return (
    <div className={className}>
      {children}
    </div>
  )
}