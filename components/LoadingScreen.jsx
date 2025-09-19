"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LoadingScreen = ({ onLoadingComplete }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      // Wait for exit animation to complete before calling onLoadingComplete
      setTimeout(() => {
        onLoadingComplete()
      }, 800) // Match exit animation duration
    }, 3000) // Show loading screen for 3 seconds

    return () => clearTimeout(timer)
  }, [onLoadingComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            transition: {
              duration: 0.8,
              ease: "easeInOut"
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        >
          {/* Animated Background Blobs */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
            />
            <motion.div
              animate={{
                x: [0, -100, 0],
                y: [0, 100, 0],
                rotate: [0, -180, -360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-1/3 right-10 w-24 h-24 bg-white/20 rounded-full blur-xl"
            />
            <motion.div
              animate={{
                x: [0, 150, 0],
                y: [0, 50, 0],
                rotate: [0, 90, 180],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute bottom-20 left-1/4 w-40 h-40 bg-white/5 rounded-full blur-xl"
            />
            <motion.div
              animate={{
                x: [0, -80, 0],
                y: [0, -80, 0],
                rotate: [0, -90, -180],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute bottom-10 right-1/3 w-28 h-28 bg-white/15 rounded-full blur-xl"
            />
          </div>

          {/* Central Content */}
          <div className="relative z-10 text-center">
            {/* Main Name */}
            <motion.h1
              initial={{
                opacity: 0,
                y: 50,
                scale: 0.8
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1
              }}
              transition={{
                duration: 1,
                delay: 0.5,
                ease: "easeOut"
              }}
              className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-4"
              style={{
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Jay Patel
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 1.2,
                ease: "easeOut"
              }}
              className="text-xl md:text-2xl text-white/90 font-light tracking-wide"
            >
              Full-Stack Developer & Content Creator
            </motion.p>

            {/* Loading Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="mt-8 flex justify-center"
            >
              <div className="flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [-10, 10, -10],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                    className="w-3 h-3 bg-white/70 rounded-full"
                  />
                ))}
              </div>
            </motion.div>

            {/* Progress indicator */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{
                opacity: 1,
                width: "100%"
              }}
              transition={{
                duration: 3,
                delay: 0.5,
                ease: "linear"
              }}
              className="mt-12 mx-auto max-w-xs"
            >
              <div className="w-full bg-white/20 rounded-full h-1">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 3,
                    ease: "linear"
                  }}
                  className="bg-white h-1 rounded-full"
                />
              </div>
            </motion.div>
          </div>

          {/* Corner decorations */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="absolute top-8 left-8"
          >
            <div className="w-2 h-2 bg-white/50 rounded-full" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.2, duration: 0.5 }}
            className="absolute top-8 right-8"
          >
            <div className="w-2 h-2 bg-white/50 rounded-full" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.4, duration: 0.5 }}
            className="absolute bottom-8 left-8"
          >
            <div className="w-2 h-2 bg-white/50 rounded-full" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.6, duration: 0.5 }}
            className="absolute bottom-8 right-8"
          >
            <div className="w-2 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen