import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import SocialMedia from '@/components/SocialMedia'
import ToolsTechnologiesShowcase from '@/components/ToolsTechnologiesShowcase'
import RecentBlogs from '@/components/RecentBlogs'
import AnnouncementDisplay from '@/components/AnnouncementDisplay'

export default function Home() {
  return (
    <main className='w-full flex flex-col items-center justify-center gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-6 lg:px-8 py-4'>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ToolsTechnologiesShowcase />
      <AnnouncementDisplay />
      <SocialMedia />
      <RecentBlogs />
    </main>
  )
}
