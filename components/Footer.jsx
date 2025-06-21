'use client';

import Link from 'next/link';
import { Github, Twitter, Instagram, ArrowUp } from 'lucide-react';

const Footer = () => {
  // Footer sections data
  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '/features' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Integrations', href: '/integrations' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Blog', href: '/blog' },
        { name: 'Careers', href: '/careers' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '/docs' },
        { name: 'Support', href: '/support' },
        { name: 'Contact', href: '/contact' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy', href: '/privacy' },
        { name: 'Terms', href: '/terms' },
        { name: 'Cookies', href: '/cookies' }
      ]
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='w-full px-4 py-6'>
      <footer className="max-w-7xl mx-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-3xl shadow-[0_5px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_5px_20px_rgba(0,0,0,0.3)] p-12 transition-colors duration-300">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 mb-12">
          
          {/* Company Info Section */}
          <div className="lg:col-span-2">
            {/* Company Name & Logo */}
            <div className="mb-6">
              <Link href="/" className="flex items-center space-x-3 mb-4 hover:opacity-90 transition-opacity duration-200">
                {/* Logo */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-0.5">
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500"></div>
                  </div>
                </div>
                
                {/* Brand Text */}
                <div className="flex items-center space-x-1">
                  <h5 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Jay</h5>
                  <h5 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                    Patel
                  </h5>
                </div>
              </Link>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed transition-colors duration-300">
                Simplifying complexity, one interface at a time.
              </p>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex items-center space-x-3">
              <Link 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-white border border-gray-200/50 rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition-all duration-200 group"
                aria-label="Follow us on Twitter"
              >
                <Twitter size={18} className="text-gray-600 group-hover:text-gray-800 transition-colors" />
              </Link>
              
              <Link 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-white border border-gray-200/50 rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition-all duration-200 group"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={18} className="text-gray-600 group-hover:text-gray-800 transition-colors" />
              </Link>
              
              <Link 
                href="https://github.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-white border border-gray-200/50 rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition-all duration-200 group"
                aria-label="Follow us on GitHub"
              >
                <Github size={18} className="text-gray-600 group-hover:text-gray-800 transition-colors" />
              </Link>
            </div>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section, index) => (
            <div key={index} className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href}
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm font-medium relative group"
                    >
                      {link.name}
                      <span className="absolute inset-x-0 bottom-[-2px] h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 dark:bg-gray-700 mb-8 transition-colors duration-300"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          
          {/* Copyright */}
          <div className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
            © 2025 Jay Patel. All rights reserved.
          </div>

          {/* Developed by & Back to top */}
          <div className="flex items-center space-x-6">
            {/* Developed by */}
            <div className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
              Developed by{' '}
              <Link 
                href="https://github.com/jaypatel" 
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-300 dark:hover:to-purple-300 transition-all duration-200"
              >
                Jay Patel
              </Link>
            </div>
            
            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200 group font-medium"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp size={16} className="group-hover:translate-y-[-2px] transition-transform duration-200" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer; 