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
  const [isLoading, setIsLoading] = useState(true)
  const [hasShownLoading, setHasShownLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Show loading animation on every page load/route change
    setIsLoading(true)
    setHasShownLoading(false)
  }, [pathname])

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