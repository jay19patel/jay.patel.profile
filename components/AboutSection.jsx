"use client"
import Image from "next/image"
import { Button } from "@/components/customUi/Button"
import { Check } from "lucide-react"
import { useRouter } from "next/navigation"

const AboutSection = () => {
  const router = useRouter()
  
  return (
    <section className="w-full py-16 max-w-7xl mx-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-3xl shadow-[0_5px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_5px_20px_rgba(0,0,0,0.3)] relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <div className="relative">
              <Image
                src="/developer-image.jpg"
                alt="Jay Patel - Software Developer"
                width={350}
                height={400}
                className="rounded-2xl shadow-lg object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
              <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
              <span className="text-sm font-medium tracking-wide uppercase">About Me</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              Hi, I'm{" "}
              <span className="text-blue-600 dark:text-blue-400 relative">
                Jay Patel
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded" />
              </span>
            </h2>

            <p className="text-gray-600 dark:text-gray-300 text-lg">
              <strong>Software Developer</strong> from Valsad, Gujarat
            </p>

            <p className="text-gray-600 dark:text-gray-300 text-base">
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
            <div className="pt-4">
              <Button>More About Me</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection 