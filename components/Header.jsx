'use client';

import Link from 'next/link';
import { Search, User, Menu, X, Zap, Code2, Cpu } from 'lucide-react';
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

  const menuItems = [
    { name: 'Home', href: '/', icon: <Zap size={14} /> },
    { name: 'Services', href: '/services', icon: <Code2 size={14} /> },
    { name: 'Blog', href: '/blog', icon: <Cpu size={14} /> },
    { name: 'Contact', href: '/contact', icon: <User size={14} /> }
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
        className="max-w-7xl mx-auto bg-black/80 backdrop-blur-xl border border-gray-800/50 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex items-center justify-between px-6 py-3 relative overflow-hidden"
      >
        {/* Tech Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
        
        {/* Animated Tech Border */}
        <div className="absolute inset-0 rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-2xl opacity-50"></div>
        </div>
        
        {/* Logo Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center space-x-3 flex-shrink-0 relative z-10"
        >
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
              <Code2 size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              NextCodez
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation Menu */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="hidden lg:flex items-center bg-gray-900/50 backdrop-blur border border-gray-700/50 rounded-full p-1 relative z-10"
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
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 relative group
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                >
                  {item.icon}
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full -z-10"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
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
          className="flex items-center space-x-3 flex-shrink-0 relative z-10"
        >
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="w-11 h-11 bg-gray-800/80 border border-gray-700/50 rounded-lg flex items-center justify-center hover:bg-gray-700/80 transition-all duration-300 group backdrop-blur"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon size={18} className="text-gray-300 group-hover:text-white transition-colors" />
            ) : (
              <Sun size={18} className="text-yellow-400 group-hover:text-yellow-300 transition-colors" />
            )}
          </button>

          {/* CTA Button - Hidden on mobile */}
          <div className="hidden lg:block">
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-lg font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <button 
                className="lg:hidden w-11 h-11 bg-gray-800/80 border border-gray-700/50 rounded-lg flex items-center justify-center hover:bg-gray-700/80 transition-all duration-300 group backdrop-blur"
                aria-label="Open menu"
              >
                <Menu size={18} className="text-gray-300 group-hover:text-white transition-colors" />
              </button>
            </SheetTrigger>
            
            <SheetContent 
              side="right" 
              className="w-[80%] max-w-sm bg-gray-900 border-l border-gray-800 text-white"
            >
              {/* Mobile Logo Header */}
              <SheetHeader className="border-b border-gray-800 pb-4 mb-6 pt-2">
                <div className="flex items-center justify-center w-full">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                      <Code2 size={20} className="text-white" />
                    </div>
                    <span className="text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      NextCodez
                    </span>
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
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 font-medium text-sm relative group
                            ${isActive 
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                            }`}
                        >
                          {item.icon}
                          {item.name}
                        </Link>
                      </SheetClose>
                    );
                  })}
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-800 mx-4"></div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {/* Theme Toggle */}
                  <button 
                    onClick={toggleTheme}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300 font-medium text-sm border border-gray-800/50"
                  >
                    {theme === 'light' ? (
                      <Moon size={16} className="text-gray-400" />
                    ) : (
                      <Sun size={16} className="text-yellow-400" />
                    )}
                    <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                  </button>

                  {/* CTA Button */}
                  <div className="pt-2 pb-6">
                    <div className="w-full">
                      <Link href="/contact" className="w-full">
                        <Button className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'>Get Started</Button>
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