'use client'

import { motion } from 'framer-motion'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import SocialMedia from '@/components/SocialMedia'
import ToolsTechnologiesShowcase from '@/components/ToolsTechnologiesShowcase'
import RecentBlogs from '@/components/RecentBlogs'
import AnnouncementDisplay from '@/components/AnnouncementDisplay'
import Gallery from '@/components/Gallery'
import TextMarque from '@/components/TextMarque'

export default function Home() {
  return (
    <main className='w-full flex flex-col items-center justify-center gap-16 px-4 sm:px-6 lg:px-8 py-8'>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full"
      >
        <HeroSection />
      </motion.div>
      
      {/* About Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="w-full"
      >
        <TextMarque text="Developer • Content Creator • Problem Solver • Tech Enthusiast • " />
        <AboutSection />
      </motion.div>
      
      {/* Services Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="w-full"
      >
        <ServicesSection />
      </motion.div>
      
      {/* Tools Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="w-full"
      >
        <ToolsTechnologiesShowcase />
      </motion.div>
      
      {/* Announcements */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="w-full"
      >
        <AnnouncementDisplay />
      </motion.div>
      
      {/* Social Media */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="w-full"
      >
        <SocialMedia />
      </motion.div>
      
      {/* Blogs */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="w-full"
      >
        <RecentBlogs />
      </motion.div>
      
      {/* Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="w-full"
      >
        <Gallery />
      </motion.div>
    </main>
  )
}
