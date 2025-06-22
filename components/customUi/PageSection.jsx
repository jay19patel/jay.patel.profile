import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from 'next/link'

export const PageSection = ({
  children,
  showHeader = true,
  showBreadcrumb = false,
  breadcrumbItems = [],
  portfolioLabel = "Portfolio",
  headline = ["My", "Creative", "Projects"],
  description = "Explore my portfolio of innovative web applications, e-commerce solutions, and digital experiences. Each project showcases cutting-edge technologies and creative problem-solving approaches.",
  stats = [
    { count: "6+", label: "Projects Completed", color: "green" },
    { count: "10+", label: "Technologies", color: "blue" }
  ]
}) => {
  return (
    <section className='w-full px-4 py-6'>
      <div className="space-y-8 max-w-7xl mx-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-3xl shadow-[0_5px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_5px_20px_rgba(0,0,0,0.3)] p-6 md:p-12 transition-colors duration-300 overflow-hidden">
        
        {showBreadcrumb && breadcrumbItems.length > 0 && (
          <div className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full shadow-inner border border-gray-200 dark:border-gray-600">
            <Breadcrumb>
              <BreadcrumbList className="flex items-center space-x-1">
                {breadcrumbItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbItem>
                      {item.href ? (
                        <BreadcrumbLink asChild>
                          <Link href={item.href} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition-colors">
                            {item.label}
                          </Link>
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage className="text-gray-900 dark:text-white text-sm font-semibold">
                          {item.label}
                        </BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumbItems.length - 1 && (
                      <BreadcrumbSeparator className="text-gray-400 dark:text-gray-500">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="m9 18 6-6-6-6"/>
                        </svg>
                      </BreadcrumbSeparator>
                    )}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        )}

        {showHeader && (
          <div className="relative py-4 md:py-8">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/5 dark:to-purple-900/5 rounded-full blur-2xl opacity-40"></div>
            </div>
            
            <div className="relative grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Side - Text Content */}
              <div className="space-y-4 md:space-y-6 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-4">
                  <div className="w-8 md:w-12 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-widest text-xs md:text-sm">
                    {portfolioLabel}
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  {headline.map((word, index) => (
                    <React.Fragment key={index}>
                      <span className={`${
                        index === 0 ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent' :
                        index === headline.length - 1 ? 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent' :
                        'text-gray-900 dark:text-white'
                      }`}>
                        {word}
                      </span>
                      {index < headline.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </h1>
                
              
              </div>
              
              {/* Right Side - Card Container */}
              <div className="hidden lg:flex justify-center lg:justify-center items-center min-h-[320px] lg:min-h-[400px] p-4">
                <div className="flex flex-col gap-4">
                  <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed max-w-xl lg:max-w-none">
                    {description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-6">
                    {stats.map((stat, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className={`w-2 h-2 bg-${stat.color}-500 rounded-full animate-pulse`}></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{stat.count} {stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <div className="w-72 h-72 lg:w-80 lg:h-80 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-3xl"></div>
                </div>
                
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-300 dark:via-blue-600 to-transparent transform -translate-y-1/2 lg:hidden"></div>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 md:w-32 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
          </div>
        )}

        {children}
      </div>
    </section>
  )
}


