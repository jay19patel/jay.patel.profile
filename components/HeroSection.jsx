'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './customUi/Button';
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
    <section className="w-full pt-10 max-w-7xl mx-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-3xl shadow-[0_5px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_5px_20px_rgba(0,0,0,0.3)] relative overflow-hidden transition-colors duration-300">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/10 rounded-full blur-xl animate-pulse delay-1000" />
      </div>

      
      {/* Floating Brand Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {brandIcons.map((brand) => (
          <div
            key={brand.id}
            className={`absolute ${brand.position} opacity-60`}
            style={{
              animation: `float 6s ease-in-out infinite`,
              animationDelay: brand.delay,
              transform: isVisible ? 'translateY(0)' : 'translateY(100px)',
            }}
          >
            {brand.element}
          </div>
        ))}
      </div>

        {/* Header Section */}
        <div className="text-center mb-16">
          <div 
            className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight transition-colors duration-300">
              Full-Stack{' '}
              <span className="text-blue-600 dark:text-blue-400">
                Developer
              </span>
              <br />
              & Problem Solver
            </h1>
            
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-3xl mx-auto leading-relaxed transition-colors duration-300">
              Passionate about creating innovative web applications and digital solutions
              <br />
              that solve real-world problems with modern technologies.
            </p>
            
            <div className='flex justify-center'>
              <Button className='items-center'>View My Projects</Button>
            </div>
          </div>
        </div>

        {/* Continuous Left to Right Infinite Carousel */}
        
          <div className="infinite-scroll-container">
            {/* First Set */}
            <div className="infinite-scroll-track">
              {carouselImages.map((image) => (
                <div key={`first-${image.id}`} className={`carousel-item w-80 h-80 bg-gradient-to-br ${image.gradient} rounded-t-2xl overflow-hidden shadow-lg flex-shrink-0 relative`}>
                  <img 
                    src={image.url}
                    alt={`${image.title} Technology`}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 ${image.overlayColor} flex items-end p-6`}>
                    <div className="text-white">
                      <div className="text-sm opacity-80 mb-1">{image.category}</div>
                      <div className="font-bold text-xl">{image.title}</div>
                    </div>
                  </div>
                </div>
              ))}
              {/* Duplicate Set for Infinite Effect */}
              {carouselImages.map((image) => (
                <div key={`second-${image.id}`} className={`carousel-item w-80 h-80 bg-gradient-to-br ${image.gradient} rounded-t-2xl overflow-hidden shadow-lg flex-shrink-0 relative`}>
                  <img 
                    src={image.url}
                    alt={`${image.title} Technology`}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 ${image.overlayColor} flex items-end p-6`}>
                    <div className="text-white">
                      <div className="text-sm opacity-80 mb-1">{image.category}</div>
                      <div className="font-bold text-xl">{image.title}</div>
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
    </section>
  );
};

export default HeroSection; 