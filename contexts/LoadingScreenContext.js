"use client"

import { createContext, useContext, useState, useEffect } from 'react'

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

  useEffect(() => {
    // Check if we've already shown the loading screen in this session
    const hasShown = sessionStorage.getItem('hasShownLoadingScreen')
    if (hasShown) {
      setIsLoading(false)
      setHasShownLoading(true)
    }
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setHasShownLoading(true)
    // Remember that we've shown the loading screen for this session
    sessionStorage.setItem('hasShownLoadingScreen', 'true')
  }

  return (
    <LoadingScreenContext.Provider
      value={{
        isLoading,
        hasShownLoading,
        handleLoadingComplete,
      }}
    >
      {children}
    </LoadingScreenContext.Provider>
  )
}