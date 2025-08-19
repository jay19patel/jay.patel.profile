'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './customUi/Button';

const TypewriterEffect = ({ words, loop = true, delayBetweenWords = 2000 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    
    const handleTyping = () => {
      if (isPaused) {
        setTimeout(() => setIsPaused(false), delayBetweenWords);
        return;
      }

      if (!isDeleting) {
        // Typing effect
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          // Word complete, pause before deleting
          setIsPaused(true);
          setIsDeleting(true);
        }
      } else {
        // Deleting effect
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          // Deletion complete, move to next word
          setIsDeleting(false);
          setCurrentWordIndex((prev) => 
            loop ? (prev + 1) % words.length : Math.min(prev + 1, words.length - 1)
          );
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? 100 : 150);
    return () => clearTimeout(timer);
  }, [currentText, currentWordIndex, isDeleting, isPaused, words, loop, delayBetweenWords]);

  return (
    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};
const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Dynamic Image Array - Developer Technologies
  const carouselImages = [
    {
      id: 1,
      title: 'React.js',
      category: '⚛️ Frontend',
      url: 'image-1.png',
      gradient: 'from-blue-600 to-blue-800',
      overlayColor: 'bg-blue-600/80 dark:bg-blue-700/90'
    },
    {
      id: 2,
      title: 'Next.js',
      category: '🚀 Full-Stack',
      url: 'image-1.png',
      gradient: 'from-gray-800 to-gray-900',
      overlayColor: 'bg-gray-900/80 dark:bg-gray-800/90'
    },
    {
      id: 3,
      title: 'Node.js',
      category: '🔧 Backend',
      url: 'image-1.png',
      gradient: 'from-green-600 to-green-800',
      overlayColor: 'bg-green-600/80 dark:bg-green-700/90'
    },
    {
      id: 4,
      title: 'Python',
      category: '🐍 Programming',
      url: 'image-1.png',
      gradient: 'from-yellow-600 to-yellow-800',
      overlayColor: 'bg-yellow-600/80 dark:bg-yellow-700/90'
    },
    {
      id: 5,
      title: 'MongoDB',
      category: '📊 Database',
      url: 'image-1.png',
      gradient: 'from-green-500 to-green-700',
      overlayColor: 'bg-green-600/80 dark:bg-green-700/90'
    },
    {
      id: 6,
      title: 'Django',
      category: '🎯 Framework',
      url: 'image-1.png',
      gradient: 'from-emerald-600 to-emerald-800',
      overlayColor: 'bg-emerald-600/80 dark:bg-emerald-700/90'
    }
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Floating brand icons data - Left Side
  const leftBrandIcons = [
    { 
      id: 1, 
      element: <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg"><div className="w-6 h-6 bg-white rounded-md"></div></div>,
      position: 'top-8 left-8', 
      delay: '0s' 
    },
    { 
      id: 2, 
      element: <div className="w-10 h-10 bg-blue-600 rounded-lg transform rotate-12 shadow-lg"></div>,
      position: 'top-16 left-32', 
      delay: '0.5s' 
    },
    { 
      id: 3, 
      element: <div className="w-8 h-8 bg-green-500 rounded-full shadow-lg"></div>,
      position: 'top-12 left-56', 
      delay: '1s' 
    },
    { 
      id: 4, 
      element: <div className="w-14 h-14 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-6"><div className="w-6 h-6 bg-white rounded-lg"></div></div>,
      position: 'top-24 left-16', 
      delay: '1.5s' 
    },
    { 
      id: 5, 
      element: <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-full shadow-lg"></div>,
      position: 'top-36 left-40', 
      delay: '2s' 
    },
  ];

  // Floating brand icons data - Right Side (Mirrored)
  const rightBrandIcons = [
    { 
      id: 6, 
      element: <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg"><div className="w-6 h-6 bg-white rounded-md"></div></div>,
      position: 'top-8 right-8', 
      delay: '0s' 
    },
    { 
      id: 7, 
      element: <div className="w-10 h-10 bg-blue-600 rounded-lg transform -rotate-12 shadow-lg"></div>,
      position: 'top-16 right-32', 
      delay: '0.5s' 
    },
    { 
      id: 8, 
      element: <div className="w-8 h-8 bg-green-500 rounded-full shadow-lg"></div>,
      position: 'top-12 right-56', 
      delay: '1s' 
    },
    { 
      id: 9, 
      element: <div className="w-14 h-14 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6"><div className="w-6 h-6 bg-white rounded-lg"></div></div>,
      position: 'top-24 right-16', 
      delay: '1.5s' 
    },
    { 
      id: 10, 
      element: <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-full shadow-lg"></div>,
      position: 'top-36 right-40', 
      delay: '2s' 
    },
  ];

  // Combine both sides
  const brandIcons = [...leftBrandIcons, ...rightBrandIcons];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full pt-6 max-w-9xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg relative overflow-hidden transition-colors duration-300"
    >
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 left-10 w-20 h-20 bg-blue-400/10 rounded-full blur-xl" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/10 rounded-full blur-xl" 
        />
      </div>

      
      {/* Floating Brand Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {brandIcons.map((brand, index) => (
          <motion.div
            key={brand.id}
            initial={{ opacity: 0, y: 100, scale: 0 }}
            animate={{ 
              opacity: 0.6, 
              y: 0, 
              scale: 1,
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 0.8,
              delay: index * 0.1,
              y: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2
              }
            }}
            className={`absolute ${brand.position}`}
          >
            {brand.element}
          </motion.div>
        ))}
      </div>

        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >

             {/* Main Heading */}
             <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
            >
              Building{" "}
              <span className="relative">
                <TypewriterEffect 
                  words={['Amazing', 'Scalable', 'Modern', 'Beautiful']} 
                  loop={true}
                  delayBetweenWords={2000}
                />
              </span>
              <br />
              Digital Experiences
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl mb-8 max-w-4xl mx-auto leading-relaxed transition-colors duration-300 px-2"
            >
              Full-Stack Developer specializing in modern web technologies, creating scalable applications, 
              <br className="hidden md:block" />
              and sharing knowledge through engaging content creation and technical tutorials.
            </motion.p>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8 px-2"
            >
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">50+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400">3+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-pink-600 dark:text-pink-400">10K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Content Views</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Continuous Left to Right Infinite Carousel */}
        
          <div className="infinite-scroll-container mb-8 overflow-hidden">
            {/* First Set */}
            <div className="infinite-scroll-track">
              {carouselImages.map((image) => (
                <div key={`first-${image.id}`} className={`carousel-item w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br ${image.gradient} rounded-2xl overflow-hidden flex-shrink-0 relative transform hover:scale-105 transition-transform duration-300`}>
                  <img 
                    src={image.url}
                    alt={`${image.title} Technology`}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 ${image.overlayColor} flex items-end p-4 md:p-6`}>
                    <div className="text-white">
                      <div className="text-xs md:text-sm opacity-80 mb-1">{image.category}</div>
                      <div className="font-bold text-lg md:text-xl">{image.title}</div>
                    </div>
                  </div>
                </div>
              ))}
              {/* Duplicate Set for Infinite Effect */}
              {carouselImages.map((image) => (
                <div key={`second-${image.id}`} className={`carousel-item w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br ${image.gradient} rounded-2xl overflow-hidden flex-shrink-0 relative transform hover:scale-105 transition-transform duration-300`}>
                  <img 
                    src={image.url}
                    alt={`${image.title} Technology`}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 ${image.overlayColor} flex items-end p-4 md:p-6`}>
                    <div className="text-white">
                      <div className="text-xs md:text-sm opacity-80 mb-1">{image.category}</div>
                      <div className="font-bold text-lg md:text-xl">{image.title}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-8px) rotate(1deg);
          }
          50% {
            transform: translateY(-15px) rotate(0deg);
          }
          75% {
            transform: translateY(-8px) rotate(-1deg);
          }
        }
        
        @keyframes infiniteScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${(carouselImages.length * (120 + 24))}px);
          }
        }
        
        .infinite-scroll-container {
          overflow: hidden;
          width: 100%;
        }
        
        .infinite-scroll-track {
          display: flex;
          gap: 24px;
          animation: infiniteScroll ${carouselImages.length * 3}s linear infinite;
          width: fit-content;
        }
        
        .carousel-item {
          pointer-events: none; /* No click/hover effects */
        }
        
        .carousel-item img {
          pointer-events: none; /* No click/hover effects */
        }
      `}</style>
    </motion.section>
  );
};

export default HeroSection; 