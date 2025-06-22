"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const ServicesSection = ({ services }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 3

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      (prev + 1) >= services.length - (itemsPerView - 1) ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? services.length - itemsPerView : prev - 1
    )
  }

  return (
    <section className="w-full py-16 max-w-7xl mx-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-3xl shadow-[0_5px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_5px_20px_rgba(0,0,0,0.3)] relative overflow-hidden transition-colors duration-300">
      {/* Decorative Circles */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-blue-500/20 rounded-full" />
        <div className="absolute bottom-10 right-10 w-24 h-24 border border-blue-500/20 rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-blue-500/20 rounded-full" />
      </div>

      <div className="container mx-auto px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
            <span className="text-sm font-medium tracking-wide uppercase text-blue-600 dark:text-blue-400">Services Provided</span>
            <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            What I Can{" "}
            <span className="text-blue-600 dark:text-blue-400 relative">
              Build For You
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded" />
            </span>
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Professional development services to bring your ideas to life
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative px-12">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {services.map((service) => (
                <div 
                  key={service.id} 
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                  style={{ flex: `0 0 ${100 / itemsPerView}%` }}
                >
                  <article className="bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 h-[420px] flex flex-col">
                    {/* Card Hero Section */}
                    <section className={`${service.bgColor} ${service.darkBgColor} rounded-xl p-6 mb-4`}>
                      <header className="flex justify-between items-center mb-6">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {service.pricing}<span className="text-sm font-normal text-gray-600 dark:text-gray-400">{service.pricingUnit}</span>
                        </span>
                        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white dark:bg-gray-800 shadow-md group-hover:shadow-lg transition-all duration-300">
                          <svg
                            height="20"
                            width="20"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            className={`${service.iconColor} dark:text-blue-400`}
                          >
                            <path
                              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                              strokeLinejoin="round"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      </header>

                      <h3 className="text-xl md:text-2xl lg:text-2xl font-semibold text-gray-900 dark:text-white leading-tight pr-4">
                        {service.title}
                      </h3>
                      
                      <div className="mt-4">
                        <span className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 shadow-sm">
                          {service.category}
                        </span>
                      </div>
                    </section>

                    {/* Card Footer */}
                    <footer className="px-3 pb-3 space-y-4 flex-grow flex flex-col">
                      {/* Service Summary */}
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                            {service.description}
                          </p>
                        </div>
                      </div>

                      {/* Delivery Time */}
                      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <svg className="w-4 h-4 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Delivery: {service.deliveryTime}
                        </span>
                      </div>

                      {/* Key Features */}
                      <div className="space-y-2 flex-grow">
                        <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Key Features
                        </h4>
                        <div className="space-y-1">
                          {service.features.slice(0, 3).map((feature, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </footer>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-700 backdrop-blur-sm rounded-full p-3 transition-colors shadow-lg"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-700 backdrop-blur-sm rounded-full p-3 transition-colors shadow-lg"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: Math.max(1, services.length - (itemsPerView - 1)) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentIndex === index 
                    ? "bg-blue-600 dark:bg-blue-400" 
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection 