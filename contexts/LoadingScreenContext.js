"use client"

import { createContext, useContext, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const LoadingScreenContext = createContext()

export const useLoadingScreen = () => {
  const context = useContext(LoadingScreenContext)
  if (!context) {
    throw new Error('useLoadingScreen must be used within a LoadingScreenProvider')
  }
  return context
}

export const LoadingScreenProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [hasShownLoading, setHasShownLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Check if this is the first visit (no session storage flag)
    const hasVisitedBefore = sessionStorage.getItem('hasVisitedWebsite')

    if (!hasVisitedBefore) {
      // First time visitor - show loading screen
      setIsLoading(true)
      setHasShownLoading(false)
      sessionStorage.setItem('hasVisitedWebsite', 'true')
    }
  }, []) // Remove pathname dependency to only run once

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setHasShownLoading(true)
  }

  const triggerLoading = () => {
    setIsLoading(true)
    setHasShownLoading(false)
  }

  return (
    <LoadingScreenContext.Provider
      value={{
        isLoading,
        hasShownLoading,
        handleLoadingComplete,
        triggerLoading,
      }}
    >
      {children}
    </LoadingScreenContext.Provider>
  )
}