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
import LoadingWrapper from '@/components/LoadingWrapper'

export default function Home() {
  return (
    <>
      <LoadingWrapper showGlobalLoader={true} />
      <main className='w-full flex flex-col items-center justify-center gap-12 px-4 sm:px-4 lg:px-4 py-8'>
        <LoadingWrapper componentName="hero" className="w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <HeroSection />
          </motion.div>
        </LoadingWrapper>
        
        <LoadingWrapper componentName="about" className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <AboutSection />
          </motion.div>
        </LoadingWrapper>
        
        <LoadingWrapper componentName="services" className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <ServicesSection />
          </motion.div>
        </LoadingWrapper>
        
        <LoadingWrapper componentName="tools" className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <ToolsTechnologiesShowcase />
          </motion.div>
        </LoadingWrapper>
        
        <LoadingWrapper componentName="announcements" className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <AnnouncementDisplay />
          </motion.div>
        </LoadingWrapper>
        
        <LoadingWrapper componentName="social" className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <SocialMedia />
          </motion.div>
        </LoadingWrapper>
        
        <LoadingWrapper componentName="blogs" className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <RecentBlogs />
          </motion.div>
        </LoadingWrapper>
        
        <LoadingWrapper componentName="gallery" className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <Gallery />
          </motion.div>
        </LoadingWrapper>
      </main>
    </>
  )
}
