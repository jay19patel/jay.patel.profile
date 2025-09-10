'use client'

export default function AnimatedLoader({ size = "3rem" }) {
  return (
    <div className="relative flex items-center justify-center w-full h-full overflow-hidden">
      {/* Blurred Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/path-to-your-background-image.jpg")',
          filter: 'blur(10px)',
          transform: 'scale(1.1)'
        }}
      />
      
      {/* Grid Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          opacity: 0.3
        }}
      />
      
      {/* Full Width Text */}
      <div className="absolute top-1/2 left-0 w-full overflow-hidden z-10">
        <div className="text-marquee">
          <span className="text-4xl md:text-6xl font-bold text-white whitespace-nowrap">
            Developer • Content Creator • Problem Solver • Developer • Content Creator • Problem Solver • Developer • Content Creator • Problem Solver
          </span>
        </div>
      </div>

      {/* Loader Content */}
      <div className="relative z-20">
      <svg 
        className="loader" 
        width="120" 
        height="120" 
        style={{ width: size, height: size }}
        viewBox="0 0 120 120"
      >
        <style>{`
          .text-marquee {
            animation: marquee 20s linear infinite;
            transform: translateX(100%);
          }

          @keyframes marquee {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }

          .loader {
            width: 3em;
            height: 3em;
          }

          .loader-ring {
            animation: ringA 2s linear infinite;
          }

          .loader-ring-a {
            stroke: #9708F4;
          }

          .loader-ring-b {
            animation-name: ringB;
            stroke: #5E14E4;
          }

          .loader-ring-c {
            animation-name: ringC;
            stroke: #9708F4;
          }

          .loader-ring-d {
            animation-name: ringD;
            stroke: #5E14E4;
          }

          @keyframes ringA {
            from, 4% {
              stroke-dasharray: 0 660;
              stroke-width: 20;
              stroke-dashoffset: -330;
            }

            12% {
              stroke-dasharray: 60 600;
              stroke-width: 30;
              stroke-dashoffset: -335;
            }

            32% {
              stroke-dasharray: 60 600;
              stroke-width: 30;
              stroke-dashoffset: -595;
            }

            40%, 54% {
              stroke-dasharray: 0 660;
              stroke-width: 20;
              stroke-dashoffset: -660;
            }

            62% {
              stroke-dasharray: 60 600;
              stroke-width: 30;
              stroke-dashoffset: -665;
            }

            82% {
              stroke-dasharray: 60 600;
              stroke-width: 30;
              stroke-dashoffset: -925;
            }

            90%, to {
              stroke-dasharray: 0 660;
              stroke-width: 20;
              stroke-dashoffset: -990;
            }
          }

          @keyframes ringB {
            from, 12% {
              stroke-dasharray: 0 220;
              stroke-width: 20;
              stroke-dashoffset: -110;
            }

            20% {
              stroke-dasharray: 20 200;
              stroke-width: 30;
              stroke-dashoffset: -115;
            }

            40% {
              stroke-dasharray: 20 200;
              stroke-width: 30;
              stroke-dashoffset: -195;
            }

            48%, 62% {
              stroke-dasharray: 0 220;
              stroke-width: 20;
              stroke-dashoffset: -220;
            }

            70% {
              stroke-dasharray: 20 200;
              stroke-width: 30;
              stroke-dashoffset: -225;
            }

            90% {
              stroke-dasharray: 20 200;
              stroke-width: 30;
              stroke-dashoffset: -305;
            }

            98%, to {
              stroke-dasharray: 0 220;
              stroke-width: 20;
              stroke-dashoffset: -330;
            }
          }

          @keyframes ringC {
            from {
              stroke-dasharray: 0 440;
              stroke-width: 20;
              stroke-dashoffset: 0;
            }

            8% {
              stroke-dasharray: 40 400;
              stroke-width: 30;
              stroke-dashoffset: -5;
            }

            28% {
              stroke-dasharray: 40 400;
              stroke-width: 30;
              stroke-dashoffset: -175;
            }

            36%, 58% {
              stroke-dasharray: 0 440;
              stroke-width: 20;
              stroke-dashoffset: -220;
            }

            66% {
              stroke-dasharray: 40 400;
              stroke-width: 30;
              stroke-dashoffset: -225;
            }

            86% {
              stroke-dasharray: 40 400;
              stroke-width: 30;
              stroke-dashoffset: -395;
            }

            94%, to {
              stroke-dasharray: 0 440;
              stroke-width: 20;
              stroke-dashoffset: -440;
            }
          }

          @keyframes ringD {
            from, 8% {
              stroke-dasharray: 0 440;
              stroke-width: 20;
              stroke-dashoffset: 0;
            }

            16% {
              stroke-dasharray: 40 400;
              stroke-width: 30;
              stroke-dashoffset: -5;
            }

            36% {
              stroke-dasharray: 40 400;
              stroke-width: 30;
              stroke-dashoffset: -175;
            }

            44%, 50% {
              stroke-dasharray: 0 440;
              stroke-width: 20;
              stroke-dashoffset: -220;
            }

            58% {
              stroke-dasharray: 40 400;
              stroke-width: 30;
              stroke-dashoffset: -225;
            }

            78% {
              stroke-dasharray: 40 400;
              stroke-width: 30;
              stroke-dashoffset: -395;
            }

            86%, to {
              stroke-dasharray: 0 440;
              stroke-width: 20;
              stroke-dashoffset: -440;
            }
          }
        `}</style>
        
        <circle className="loader-ring loader-ring-a" cx="60" cy="60" r="50" fill="none" stroke="#9708F4" strokeWidth="8" strokeDasharray="0 314" strokeDashoffset="-157" strokeLinecap="round"/>
        <circle className="loader-ring loader-ring-b" cx="60" cy="60" r="20" fill="none" stroke="#5E14E4" strokeWidth="6" strokeDasharray="0 126" strokeDashoffset="-63" strokeLinecap="round"/>
        <circle className="loader-ring loader-ring-c" cx="45" cy="60" r="35" fill="none" stroke="#9708F4" strokeWidth="4" strokeDasharray="0 220" strokeLinecap="round"/>
        <circle className="loader-ring loader-ring-d" cx="75" cy="60" r="35" fill="none" stroke="#5E14E4" strokeWidth="4" strokeDasharray="0 220" strokeLinecap="round"/>
      </svg>
      </div>
    </div>
  )
}