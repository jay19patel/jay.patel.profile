import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import SocialMedia from '@/components/SocialMedia'
import ToolsTechnologiesShowcase from '@/components/ToolsTechnologiesShowcase'
import RecentBlogs from '@/components/RecentBlogs'
import TodoDisplay from '@/components/TodoDisplay'
export default function Home() {
  return (
    <main className='w-full flex flex-col items-center justify-center gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-6 lg:px-8 py-4'>
      <HeroSection />
      <AboutSection />
      <ToolsTechnologiesShowcase />
      <TodoDisplay />
      <SocialMedia />
      <RecentBlogs />
    </main>
  )
}
