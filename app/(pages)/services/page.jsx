'use client'

import React from 'react'
import { PageSection } from '@/components/customUi/PageSection'
import { Button } from '@/components/ui/button'
import servicesData from '@/data/services.json'
import { Button as CButton }     from '@/components/customUi/Button'
const ServicesPage = () => {
  // Handle contact click
  const handleContactClick = () => {
    window.open('mailto:your-email@example.com', '_blank', 'noopener,noreferrer')
  }


  // Custom props for the PageSection header
  const headerProps = {
    portfolioLabel: "Professional Services",
    showBreadcrumb: true,
    breadcrumbItems: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" }
    ],
    headline: ["Professional", "Development", "Services"],
    description: "Transform your ideas into reality with my comprehensive development services. From stunning websites to intelligent automation solutions, I deliver high-quality digital solutions tailored to your needs.",
    stats: [
      { count: "50+", label: "Projects Delivered", color: "green" },
      { count: "6+", label: "Service Categories", color: "blue" },
      { count: "24/7", label: "Support Available", color: "purple" }
    ]
  };

  return (
    <PageSection {...headerProps}>
      <div className="space-y-12">
        {/* Services Introduction */}
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            What I Can Do For You
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            I specialize in creating digital solutions that drive results. Whether you need a stunning website, 
            powerful automation, or cutting-edge AI integration, I'm here to bring your vision to life with 
            professional expertise and attention to detail.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesData.services.map((service) => (
            <article 
              key={service.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
            >
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

                <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 dark:text-white leading-tight pr-4">
                  {service.title}
                </h3>
                
                <div className="mt-4">
                  <span className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 shadow-sm">
                    {service.category}
                  </span>
                </div>
              </section>

              {/* Card Footer */}
              <footer className="px-3 pb-3 space-y-4">
                {/* Service Summary */}
                <div className="space-y-3">
                  <div>
                    <p className="text-base font-semibold text-gray-900 dark:text-white leading-tight">
                      {service.title}
                    </p>
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
                  <span className="text-base font-medium text-gray-700 dark:text-gray-300">
                    Delivery: {service.deliveryTime}
                  </span>
                </div>

                {/* Key Features */}
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Key Features
                  </h4>
                  <div className="space-y-1">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </footer>
            </article>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-gray-700 mt-16">
          <div className="text-center space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Ready to Start Your Project?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Let's discuss your requirements and bring your ideas to life. I'm here to provide 
              professional development services tailored to your specific needs.
            </p>
            
            <div className="flex items-center justify-center pt-6">
            <CButton>Contact Me</CButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  100%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Client Satisfaction
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  24/7
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Support Available
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  Fast
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Delivery Guaranteed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageSection>
  )
}

export default ServicesPage 