import React from 'react'

export const TitleCard = ({
  cardTitle = "QUOTE OF THE MONTH",
  quote = "Fortune favors the bold.",
  author = "Virgil",
  authorDescription = "Latin poet",
  showHeart = true
}) => {
  return (
    <div className={`relative w-56 h-80 md:w-64 md:h-96 lg:w-72 lg:h-[400px] bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 font-sans overflow-hidden group`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-24 h-24 lg:w-28 lg:h-28 bg-white rounded-full"></div>
        <div className="absolute bottom-8 left-4 w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-full"></div>
      </div>
      
      {/* Card Title */}
      <div className={`text-blue-900 font-bold text-xs md:text-sm uppercase tracking-wider p-6 md:p-8 pb-2 leading-tight`}>
        {cardTitle}
      </div>
      
      {/* Quote Icon */}
      <div className="px-6 md:px-8 pb-4 md:pb-6">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 330 307" 
          className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-green-200 opacity-60"
        >
          <path 
            fill="currentColor" 
            d="M302.258 176.221C320.678 176.221 329.889 185.432 329.889 203.853V278.764C329.889 297.185 320.678 306.395 302.258 306.395H231.031C212.61 306.395 203.399 297.185 203.399 278.764V203.853C203.399 160.871 207.902 123.415 216.908 91.4858C226.323 59.1472 244.539 30.902 271.556 6.75027C280.562 -1.02739 288.135 -2.05076 294.275 3.68014L321.906 29.4692C328.047 35.2001 326.614 42.1591 317.608 50.3461C303.69 62.6266 292.228 80.4334 283.223 103.766C274.626 126.69 270.328 150.842 270.328 176.221H302.258ZM99.629 176.221C118.05 176.221 127.26 185.432 127.26 203.853V278.764C127.26 297.185 118.05 306.395 99.629 306.395H28.402C9.98126 306.395 0.770874 297.185 0.770874 278.764V203.853C0.770874 160.871 5.27373 123.415 14.2794 91.4858C23.6945 59.1472 41.9106 30.902 68.9277 6.75027C77.9335 -1.02739 85.5064 -2.05076 91.6467 3.68014L119.278 29.4692C125.418 35.2001 123.985 42.1591 114.98 50.3461C101.062 62.6266 89.6 80.4334 80.5942 103.766C71.9979 126.69 67.6997 150.842 67.6997 176.221H99.629Z"
          />
        </svg>
      </div>
      
      {/* Quote Text */}
      <div className={`text-blue-950 font-black text-lg md:text-xl lg:text-2xl px-6 md:px-8 leading-tight absolute top-28 md:top-32 lg:top-36`}>
        {quote}
      </div>
    </div>
  )
}

// Preset color variations
export const QuoteCardVariants = {
  green: {
    bgColor: "bg-gradient-to-br from-lime-400 to-green-500",
    titleColor: "text-green-800",
    quoteColor: "text-green-900",
    authorColor: "text-green-700"
  },
  blue: {
    bgColor: "bg-gradient-to-br from-blue-400 to-blue-600",
    titleColor: "text-blue-900",
    quoteColor: "text-blue-950",
    authorColor: "text-blue-800"
  },
  purple: {
    bgColor: "bg-gradient-to-br from-purple-400 to-purple-600",
    titleColor: "text-purple-900",
    quoteColor: "text-purple-950",
    authorColor: "text-purple-800"
  },
  orange: {
    bgColor: "bg-gradient-to-br from-orange-400 to-orange-600",
    titleColor: "text-orange-900",
    quoteColor: "text-orange-950",
    authorColor: "text-orange-800"
  },
  pink: {
    bgColor: "bg-gradient-to-br from-pink-400 to-pink-600",
    titleColor: "text-pink-900",
    quoteColor: "text-pink-950",
    authorColor: "text-pink-800"
  }
} 