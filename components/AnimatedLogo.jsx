'use client';

const AnimatedLogo = ({ className = "" }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* NJ - Extra Bold */}
      <span 
        className="text-gray-900 dark:text-white transition-colors duration-300 tracking-wide"
        style={{ 
          fontFamily: 'Arial, sans-serif',
          fontSize: '24px',
          fontWeight: '900' // Extra bold
        }}
      >
        NJ
      </span>
      
      {/* STUDIO - Medium Bold */}
      <span 
        className="text-gray-900 dark:text-white transition-colors duration-300 tracking-wide"
        style={{ 
          fontFamily: 'Arial, sans-serif',
          fontSize: '18px',
          fontWeight: '600' // Semi-bold, less than NJ
        }}
      >
        STUDIO
      </span>
    </div>
  );
};

export default AnimatedLogo;