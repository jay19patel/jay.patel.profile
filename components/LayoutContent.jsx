"use client"

import { useLoadingScreen } from '@/contexts/LoadingScreenContext'
import LoadingScreen from '@/components/LoadingScreen'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AnimatedBlobBackground from '@/components/AnimatedBlobBackground'
import ChatBot from '@/components/ChatBot'
import { Toaster } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

const LayoutContent = ({ children }) => {
  const { isLoading, handleLoadingComplete } = useLoadingScreen()

  return (
    <>
      {/* Loading Screen */}
      {isLoading && (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      )}

      {/* Main Content */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col"
          >
            <AnimatedBlobBackground />
            <Header />
            <main className="flex-grow w-full pt-20 pb-6">
              {children}
            </main>
            <Footer />
            <ChatBot />
            <Toaster richColors closeButton position="top-right" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default LayoutContent