'use client';

import Link from 'next/link';
import { Search, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/customUi/Button';
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

  // Navigation menu items
  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Experience', href: '/experience' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header className="w-full px-4 py-6">
      <nav className="max-w-7xl mx-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full shadow-[0_5px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_5px_20px_rgba(0,0,0,0.3)] flex items-center justify-between px-8 py-4 relative transition-colors duration-300">
        
        {/* Logo Section */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity duration-200">
            {/* Logo with gradient */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-0.5">
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
        </div>

        {/* Desktop Navigation Menu */}
        <div className="hidden lg:flex items-center bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full px-3 py-2 shadow-[0_3px_10px_rgba(0,0,0,0.05)] dark:shadow-[0_3px_10px_rgba(0,0,0,0.2)] transition-colors duration-300">
          {menuItems.map((item, index) => (
            <Link 
              key={index}
              href={item.href} 
              className="px-5 py-2.5 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white transition-all duration-200 relative group"
            >
              {item.name}
              <span className="absolute inset-x-2 bottom-1 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
            </Link>
          ))}
        </div>

        {/* Right Section - Icons and CTA */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          {/* Search Button - Hidden on mobile */}
          <button 
            className="hidden lg:flex w-11 h-11 bg-white border border-gray-200/50 rounded-full items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition-all duration-200 group"
            aria-label="Search"
          >
            <Search size={18} className="text-gray-600 group-hover:text-gray-800 transition-colors" />
          </button>

          {/* User Button - Hidden on mobile */}
          <button 
            className="hidden lg:flex w-11 h-11 bg-white border border-gray-200/50 rounded-full items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition-all duration-200 group"
            aria-label="User Profile"
          >
            <User size={18} className="text-gray-600 group-hover:text-gray-800 transition-colors" />
          </button>

          {/* CTA Button - Hidden on mobile */}
          <div className="hidden lg:block">
          <Button>Explore Our Templates</Button>
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-0.5">
                      <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500"></div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <h5 className="text-lg font-bold text-gray-900">Jay</h5>
                      <h5 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Patel
                      </h5>
                    </div>
                  </div>
                </div>
              </SheetHeader>

              {/* Mobile Navigation */}
              <div className="px-4 space-y-6 h-full overflow-y-auto">
                {/* Navigation Links */}
                <div className="space-y-2">
                  {menuItems.map((item, index) => (
                    <SheetClose asChild key={index}>
                      <Link 
                        href={item.href} 
                        className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 font-medium text-sm relative group"
                      >
                        {item.name}
                        <span className="absolute left-4 right-4 bottom-1 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                      </Link>
                    </SheetClose>
                  ))}
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

                  {/* Profile */}
                  <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium text-sm border border-gray-200/50">
                    <User size={16} className="text-gray-500" />
                    <span>Profile</span>
                  </button>

                  {/* CTA Button */}
                  <div className="pt-2 pb-6">
                    <div className="w-full">
                      <Button className='items-center'>Explore Our Templates</Button>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </nav>
    </header>
  );
};

export default Header;