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
        className="max-w-8xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-4 md:p-6 transition-colors duration-300"
      >
        
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Social Media Icons */}
          <div className="flex items-center space-x-3">
            {data.socialMedia.map((social, index) => {
              const IconComponent = iconMap[social.icon];
              return (
                <motion.div
                  key={social.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link 
                    href={social.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 group"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <IconComponent size={16} className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Legal Links */}
          <div className="flex items-center space-x-6">
            {data.sections[0].links.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
                viewport={{ once: true }}
              >
                <Link 
                  href={link.href}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 font-medium"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300"
          >
            {data.company.copyright}
          </motion.div>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default Footer;