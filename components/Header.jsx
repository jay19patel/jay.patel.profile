'use client';

import Link from 'next/link';
import { Search, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/customUi/Button';
import { useTheme } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';
import Image from 'next/image';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  // Navigation menu items
  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <motion.header 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 w-full px-4 py-3 z-50"
    >
      <motion.nav 
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="max-w-8xl mx-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full shadow-[0_3px_15px_rgba(0,0,0,0.03)] dark:shadow-[0_3px_15px_rgba(0,0,0,0.2)] flex items-center justify-between px-6 py-2.5 relative transition-colors duration-300"
      >
        
        {/* Logo Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center space-x-3 flex-shrink-0 ml-4"
        >
          <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity duration-200">
            {/* Logo Image */}
            <div className="relative desktop-logo">
              <Image 
                src="/images/Logo-Main.png" 
                alt="Logo" 
                width={120} 
                height={120}
                className="h-10 w-auto object-contain"
                style={{
                  backgroundColor: 'transparent',
                }}
                priority
              />
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation Menu */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="hidden lg:flex items-center bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full p-2 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-colors duration-300"
        >
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
              >
                <Link 
                  href={item.href} 
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 relative group
                    ${isActive 
                      ? 'bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white'
                    }`}
                >
                {item.name}
                <span className={`absolute inset-x-2 bottom-1 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 rounded-full transition-transform duration-200
                  ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}>
                </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Right Section - Icons and CTA */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex items-center space-x-3 flex-shrink-0"
        >
          {/* Search Button - Hidden on mobile */}
          <button 
            className="hidden lg:flex w-11 h-11 bg-white border border-gray-200/50 rounded-full items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition-all duration-200 group"
            aria-label="Search"
          >
            <Search size={18} className="text-gray-600 group-hover:text-gray-800 transition-colors" />
          </button>

          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="w-11 h-11 bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition-all duration-200 group"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon size={18} className="text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors" />
            ) : (
              <Sun size={18} className="text-yellow-500 group-hover:text-yellow-600 transition-colors" />
            )}
          </button>

          {/* CTA Button - Hidden on mobile */}
          <div className="hidden lg:block">
          <Link href="/#about">
            <Button>About Me</Button>
          </Link>
          </div>

          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <button 
                className="lg:hidden w-11 h-11 bg-white border border-gray-200/50 rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition-all duration-200 group"
                aria-label="Open menu"
              >
                <Menu size={18} className="text-gray-600 group-hover:text-gray-800 transition-colors" />
              </button>
            </SheetTrigger>
            
            <SheetContent 
              side="right" 
              className="w-[80%] max-w-sm bg-white border-l border-gray-200"
            >
              {/* Mobile Logo Header */}
              <SheetHeader className="border-b border-gray-200 pb-4 mb-6 pt-2">
                <div className="flex items-center justify-center w-full">
                  <div className="relative">
                    <Image 
                      src="/images/Logo-Main-1.png" 
                      alt="Logo" 
                      width={120} 
                      height={40}
                      className="h-8 w-auto object-contain"
                      style={{
                        backgroundColor: 'transparent',
                        mixBlendMode: 'normal',
                        filter: 'none',
                        maskImage: 'linear-gradient(to right, black, black)',
                        WebkitMaskImage: 'linear-gradient(to right, black, black)'
                      }}
                    />
                  </div>
                </div>
              </SheetHeader>

              {/* Mobile Navigation */}
              <div className="px-4 space-y-6 h-full overflow-y-auto">
                {/* Navigation Links */}
                <div className="space-y-2">
                  {menuItems.map((item, index) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                    return (
                      <SheetClose asChild key={index}>
                        <Link 
                          href={item.href} 
                          className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 font-medium text-sm relative group
                            ${isActive 
                              ? 'bg-gray-50 text-gray-900' 
                              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                        >
                          {item.name}
                          <span className={`absolute left-4 right-4 bottom-1 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full transition-transform duration-200
                            ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}>
                          </span>
                        </Link>
                      </SheetClose>
                    );
                  })}
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-200 mx-4"></div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {/* Search */}
                  <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium text-sm border border-gray-200/50">
                    <Search size={16} className="text-gray-500" />
                    <span>Search</span>
                  </button>

                  {/* Theme Toggle */}
                  <button 
                    onClick={toggleTheme}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium text-sm border border-gray-200/50 dark:border-gray-600/50"
                  >
                    {theme === 'light' ? (
                      <Moon size={16} className="text-gray-500 dark:text-gray-400" />
                    ) : (
                      <Sun size={16} className="text-yellow-500" />
                    )}
                    <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                  </button>

                  {/* CTA Button */}
                  <div className="pt-2 pb-6">
                    <div className="w-full">
                      <Link href="/#about" className="w-full">
                        <Button className='w-full items-center'>About Me</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </motion.div>

      </motion.nav>
    </motion.header>
  );
};

export default Header;