import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import SocialMedia from '@/components/SocialMedia'
import ToolsTechnologiesShowcase from '@/components/ToolsTechnologiesShowcase'
import RecentBlogs from '@/components/RecentBlogs'
export default function Home() {
  return (
    <main className='w-full flex flex-col items-center justify-center gap-10'>
      <HeroSection />
      <AboutSection />
      <ToolsTechnologiesShowcase />
      <RecentBlogs />
      <SocialMedia />
    </main>
  )
}
