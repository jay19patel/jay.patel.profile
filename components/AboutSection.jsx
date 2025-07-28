"use client"
import Image from "next/image"
import { Button } from "@/components/customUi/Button"
import { Check } from "lucide-react"
import { useRouter } from "next/navigation"

const AboutSection = () => {
  const router = useRouter()
  
  return (
    <section className="w-full py-16 max-w-7xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg relative overflow-hidden transition-colors duration-300">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/10 rounded-full blur-xl animate-pulse delay-1000" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <div className="flex justify-center order-2 lg:order-1">
            <div className="relative">
              <Image
                src="/developer-image.jpg"
                alt="Jay Patel - Software Developer"
                width={350}
                height={400}
                className="rounded-2xl shadow-lg object-cover w-full max-w-sm lg:max-w-none"
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4 order-1 lg:order-2 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2 text-blue-600 dark:text-blue-400">
              <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
              <span className="text-sm font-medium tracking-wide uppercase">About Me</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              Hi, I'm{" "}
              <span className="text-blue-600 dark:text-blue-400 relative">
                Jay Patel
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded" />
              </span>
            </h2>

            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
              <strong>Software Developer</strong> from Valsad, Gujarat
            </p>

            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              I'm a passionate software developer who graduated in 2023. I specialize in creating modern web applications and digital solutions that solve real-world problems. My journey in tech started with curiosity and has evolved into a career focused on building innovative software.
            </p>

            {/* Key Points */}
            <div className="space-y-2">
              {[
                "🎓 Graduated in 2023 with strong technical foundation",
                "💻 Experienced in full-stack web development",
                "🌍 Based in Valsad, Gujarat, India",
                "🚀 Passionate about modern technologies and clean code",
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm pt-2">
              I believe in continuous learning and staying updated with the latest technologies. My goal is to create software that makes a positive impact and provides excellent user experiences.
            </p>

            {/* CTA */}
            <div className="pt-4 flex justify-center lg:justify-start">
              <Button>More About Me</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection 