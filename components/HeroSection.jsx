'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './customUi/Button';
import { NumberTicker } from '@/components/ui/number-ticker';

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
    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};
const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);


  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full pt-4 max-w-8xl mx-auto bg-gray-800 border border-gray-700 rounded-2xl shadow-lg relative overflow-hidden h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] flex items-center"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero-intro.mp4" type="video/mp4" />
        </video>
        {/* Black tint overlay with reduced opacity */}
        <div className="absolute inset-0 bg-black/20"></div>
        {/* Color blend overlay for proper text visibility */}
        <div className="absolute inset-0 bg-gray-800/10"></div>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-10">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-xl" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-xl" 
        />
      </div>

      {/* Main Content - Positioned to the left */}
      <div className="relative z-20 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-3 sm:mb-4 md:mb-6"
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
              className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 md:mb-8 leading-relaxed max-w-2xl"
            >
              Full-Stack Developer specializing in modern web technologies, creating scalable applications, 
              and sharing knowledge through engaging content creation.
            </motion.p>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8"
            >
              <div className="text-left">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-400">
                  <NumberTicker
                    value={50}
                    startValue={0}
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-400"
                    delay={0.5}
                  />+
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-400">Projects</div>
              </div>
              <div className="text-left">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-400">
                  <NumberTicker
                    value={3}
                    startValue={0}
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-400"
                    delay={0.8}
                  />+
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-400">Years Exp</div>
              </div>
              <div className="text-left">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-pink-400">
                  <NumberTicker
                    value={10}
                    startValue={0}
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-pink-400"
                    delay={1.1}
                  />K+
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-400">Views</div>
              </div>
            </motion.div>

            {/* Call to Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
            
              <Link href="/contact">
                <Button variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-gray-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base">
                  Get In Touch
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection; 