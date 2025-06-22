import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import servicesData from '@/data/services.json'

export default function Home() {
  return (
    <main className='w-full flex flex-col items-center justify-center gap-10'>
      <HeroSection />
      <AboutSection />
      <ServicesSection services={servicesData.services} />
    </main>
  )
}
