import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import SocialMedia from '@/components/SocialMedia'
export default function Home() {
  return (
    <main className='w-full flex flex-col items-center justify-center gap-10'>
      <HeroSection />
      <AboutSection />
      <SocialMedia />
    </main>
  )
}
