'use client'

export function HeroSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="text-center space-y-6">
        {/* Profile Image Skeleton */}
        <div className="w-32 h-32 bg-gray-300/20 rounded-full mx-auto animate-pulse" />
        
        {/* Name Skeleton */}
        <div className="space-y-3">
          <div className="h-8 bg-gray-300/20 rounded-lg w-3/4 mx-auto animate-pulse" />
          <div className="h-6 bg-gray-300/20 rounded-lg w-1/2 mx-auto animate-pulse" />
        </div>
        
        {/* Description Skeleton */}
        <div className="space-y-2 max-w-2xl mx-auto">
          <div className="h-4 bg-gray-300/20 rounded w-full animate-pulse" />
          <div className="h-4 bg-gray-300/20 rounded w-5/6 animate-pulse" />
          <div className="h-4 bg-gray-300/20 rounded w-4/5 animate-pulse" />
        </div>
        
        {/* Buttons Skeleton */}
        <div className="flex justify-center space-x-4">
          <div className="h-12 bg-gray-300/20 rounded-lg w-32 animate-pulse" />
          <div className="h-12 bg-gray-300/20 rounded-lg w-32 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export function AboutSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="space-y-6">
          <div className="h-10 bg-gray-300/20 rounded-lg w-3/4 animate-pulse" />
          <div className="space-y-3">
            <div className="h-4 bg-gray-300/20 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-300/20 rounded w-5/6 animate-pulse" />
            <div className="h-4 bg-gray-300/20 rounded w-4/5 animate-pulse" />
            <div className="h-4 bg-gray-300/20 rounded w-full animate-pulse" />
          </div>
          <div className="h-12 bg-gray-300/20 rounded-lg w-40 animate-pulse" />
        </div>
        
        {/* Image */}
        <div className="w-full h-96 bg-gray-300/20 rounded-2xl animate-pulse" />
      </div>
    </div>
  )
}

export function ServicesSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12 space-y-4">
        <div className="h-10 bg-gray-300/20 rounded-lg w-1/2 mx-auto animate-pulse" />
        <div className="h-4 bg-gray-300/20 rounded w-3/4 mx-auto animate-pulse" />
      </div>
      
      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-4">
            <div className="w-16 h-16 bg-gray-300/20 rounded-2xl animate-pulse" />
            <div className="h-6 bg-gray-300/20 rounded w-3/4 animate-pulse" />
            <div className="space-y-2">
              <div className="h-3 bg-gray-300/20 rounded w-full animate-pulse" />
              <div className="h-3 bg-gray-300/20 rounded w-5/6 animate-pulse" />
              <div className="h-3 bg-gray-300/20 rounded w-4/5 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function BlogsSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12 space-y-4">
        <div className="h-10 bg-gray-300/20 rounded-lg w-1/3 mx-auto animate-pulse" />
        <div className="h-4 bg-gray-300/20 rounded w-2/3 mx-auto animate-pulse" />
      </div>
      
      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4">
            <div className="w-full h-48 bg-gray-300/20 rounded-xl animate-pulse" />
            <div className="space-y-3">
              <div className="h-6 bg-gray-300/20 rounded w-5/6 animate-pulse" />
              <div className="space-y-2">
                <div className="h-3 bg-gray-300/20 rounded w-full animate-pulse" />
                <div className="h-3 bg-gray-300/20 rounded w-4/5 animate-pulse" />
              </div>
              <div className="flex justify-between items-center">
                <div className="h-3 bg-gray-300/20 rounded w-20 animate-pulse" />
                <div className="h-3 bg-gray-300/20 rounded w-24 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function GallerySkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12 space-y-4">
        <div className="h-10 bg-gray-300/20 rounded-lg w-1/4 mx-auto animate-pulse" />
        <div className="h-4 bg-gray-300/20 rounded w-1/2 mx-auto animate-pulse" />
      </div>
      
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div 
            key={i} 
            className={`bg-gray-300/20 rounded-xl animate-pulse ${
              i % 3 === 0 ? 'h-64' : 'h-48'
            }`} 
          />
        ))}
      </div>
    </div>
  )
}

export function SocialMediaSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12 space-y-4">
        <div className="h-10 bg-gray-300/20 rounded-lg w-1/3 mx-auto animate-pulse" />
        <div className="h-4 bg-gray-300/20 rounded w-2/3 mx-auto animate-pulse" />
      </div>
      
      {/* Social Links */}
      <div className="flex justify-center space-x-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-16 h-16 bg-gray-300/20 rounded-full animate-pulse" />
        ))}
      </div>
    </div>
  )
}

export function ToolsSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12 space-y-4">
        <div className="h-10 bg-gray-300/20 rounded-lg w-2/5 mx-auto animate-pulse" />
        <div className="h-4 bg-gray-300/20 rounded w-3/5 mx-auto animate-pulse" />
      </div>
      
      {/* Tools Grid */}
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-6">
        {Array.from({ length: 16 }, (_, i) => (
          <div key={i} className="flex flex-col items-center space-y-3">
            <div className="w-16 h-16 bg-gray-300/20 rounded-xl animate-pulse" />
            <div className="h-3 bg-gray-300/20 rounded w-12 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}