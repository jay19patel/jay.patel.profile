'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const LoadingContext = createContext()

export function LoadingProvider({ children }) {
  const [loadingStates, setLoadingStates] = useState({
    hero: true,
    about: true,
    services: true,
    tools: true,
    announcements: true,
    social: true,
    blogs: true,
    gallery: true,
    global: true
  })

  const setComponentLoading = (component, isLoading) => {
    setLoadingStates(prev => ({
      ...prev,
      [component]: isLoading
    }))
  }

  const simulateLoading = (component, duration = 1000) => {
    setComponentLoading(component, true)
    setTimeout(() => {
      setComponentLoading(component, false)
    }, duration)
  }

  useEffect(() => {
    // Simulate initial page load
    const timer = setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, global: false }))
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Simulate component loading with staggered delays
    const components = ['hero', 'about', 'services', 'tools', 'announcements', 'social', 'blogs', 'gallery']
    
    components.forEach((component, index) => {
      const delay = 800 + (index * 200) // Staggered loading
      setTimeout(() => {
        setComponentLoading(component, false)
      }, delay)
    })
  }, [])

  return (
    <LoadingContext.Provider value={{ 
      loadingStates, 
      setComponentLoading, 
      simulateLoading 
    }}>
      {children}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}