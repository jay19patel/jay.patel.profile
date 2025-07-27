'use client';

import Link from 'next/link';
import { Github, Twitter, Instagram, ArrowUp, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import footerData from '@/data/footer.json';

const Footer = () => {
  const [data, setData] = useState(footerData);

  // Icon mapping
  const iconMap = {
    Github,
    Twitter, 
    Instagram,
    Linkedin
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
      className='w-full px-4 py-6'
    >
      <motion.footer 
        initial={{ scale: 0.95 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-3xl shadow-[0_5px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_5px_20px_rgba(0,0,0,0.3)] p-12 transition-colors duration-300"
      >
        
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
                  <h5 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                    {data.company.name.split(' ')[0]}
                  </h5>
                  <h5 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                    {data.company.name.split(' ')[1]}
                  </h5>
                </div>
              </Link>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed transition-colors duration-300">
                {data.company.description}
              </p>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex items-center space-x-3">
              {data.socialMedia.map((social, index) => {
                const IconComponent = iconMap[social.icon];
                return (
                  <motion.div
                    key={social.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                    viewport={{ once: true }}
                  >
                    <Link 
                      href={social.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 bg-white border border-gray-200/50 rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition-all duration-200 group"
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <IconComponent size={18} className="text-gray-600 group-hover:text-gray-800 transition-colors" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Navigation Sections */}
          {data.sections.map((section, index) => (
            <motion.div 
              key={index} 
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <motion.li 
                    key={linkIndex}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + (linkIndex * 0.1) }}
                    viewport={{ once: true }}
                  >
                    <Link 
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm font-medium relative group"
                    >
                      {link.name}
                      <span className="absolute inset-x-0 bottom-[-2px] h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 dark:bg-gray-700 mb-8 transition-colors duration-300"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          
          {/* Copyright */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300"
          >
            {data.company.copyright}
          </motion.div>

          {/* Developed by & Back to top */}
          <div className="flex items-center space-x-6">
            {/* Developed by */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.9 }}
              viewport={{ once: true }}
              className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300"
            >
              Developed by{' '}
              <Link 
                href={data.developer.url} 
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-300 dark:hover:to-purple-300 transition-all duration-200"
              >
                {data.developer.name}
              </Link>
            </motion.div>
            
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
      </motion.footer>
    </motion.div>
  );
};

export default Footer; 