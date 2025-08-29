"use client"
import Image from "next/image"
import { Button } from "@/components/customUi/Button"
import { ArrowRight, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import CodeTerminal from "./CodeTerminal"

const AboutSection = () => {
  const router = useRouter()
  
  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full max-w-7xl mx-auto py-8 lg:py-12"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Me Header Section */}
        <div className="text-center mb-16">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400 mb-6"
          >
            <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
            <span className="text-sm font-medium tracking-wide uppercase">About Me</span>
            <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4"
          >
            Hi, I'm{" "}
            <span className="text-blue-600 dark:text-blue-400 relative">
              Jay Patel
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded" />
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-gray-700 dark:text-gray-300 text-lg font-medium"
          >
            <strong className="text-gray-900 dark:text-gray-100">Software Developer</strong> from Valsad, Gujarat
          </motion.p>
        </div>

        {/* Split Layout - Code Terminal & About Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch relative">
          {/* Background Decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl -z-10"></div>
          {/* Left Side - Code Terminal */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 relative z-10 h-full"
          >
            <CodeTerminal />
          </motion.div>

          {/* Right Side - About Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 relative z-10 p-6 lg:p-8 flex flex-col justify-center min-h-[500px] lg:min-h-[550px]"
          >
            <div className="space-y-8">
              {/* Personal Introduction */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                  Crafting Digital 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"> Experiences</span>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  I'm passionate about transforming ideas into elegant digital solutions. Graduated in 2023 from Gujarat, India, I bring fresh perspectives to modern web development.
                </p>
              </motion.div>

              {/* Skills & Philosophy */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  What Drives Me
                </h4>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: "🚀", title: "Innovation" },
                    { icon: "🎯", title: "User Experience" },
                    { icon: "💡", title: "Problem Solving" },
                    { icon: "📚", title: "Learning" }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 1 + (index * 0.1) }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-100/50 dark:hover:bg-gray-700/30 transition-colors duration-300"
                    >
                      <div className="text-lg">{item.icon}</div>
                      <span className="font-medium text-gray-900 dark:text-white text-sm">
                        {item.title}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Quote & CTA */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-400/10 dark:to-purple-400/10 p-6 rounded-xl border border-blue-200/30 dark:border-blue-700/30">
                  <p className="text-gray-700 dark:text-gray-300 italic text-base leading-relaxed text-center">
                    "I believe in continuous learning and creating software that makes a positive impact with excellent user experiences."
                  </p>
                </div>

                <div className="flex justify-center">
                  <Button 
                    onClick={() => router.push('/about')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Explore My Journey
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Original About Content - Hidden since we moved header up and button is in terminal */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center" style={{display: 'none'}}>
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center order-2 lg:order-1"
          >
            <div className="relative">
              <Image
                src="/developer-image.jpg"
                alt="Jay Patel - Software Developer"
                width={350}
                height={400}
                className="rounded-2xl shadow-xl object-cover w-full max-w-sm lg:max-w-none hover:shadow-2xl transition-shadow duration-300"
              />
            </div>
          </motion.div>

          {/* Content */}
          <div className="space-y-6 order-1 lg:order-2 text-center lg:text-left">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center justify-center lg:justify-start space-x-2 text-blue-600 dark:text-blue-400"
            >
              <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
              <span className="text-sm font-medium tracking-wide uppercase">About Me</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight"
            >
              Hi, I'm{" "}
              <span className="text-blue-600 dark:text-blue-400 relative">
                Jay Patel
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded" />
              </span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-gray-700 dark:text-gray-300 text-lg font-medium"
            >
              <strong className="text-gray-900 dark:text-gray-100">Software Developer</strong> from Valsad, Gujarat
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-600 dark:text-gray-300 text-base leading-relaxed"
            >
              I'm a passionate software developer who graduated in 2023. I specialize in creating modern web applications and digital solutions that solve real-world problems. My journey in tech started with curiosity and has evolved into a career focused on building innovative software.
            </motion.p>

            {/* Key Points */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              {[
                "🎓 Graduated in 2023 with strong technical foundation",
                "💻 Experienced in full-stack web development",
                "🌍 Based in Valsad, Gujarat, India",
                "🚀 Passionate about modern technologies and clean code",
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1 + (index * 0.1) }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3"
                >
                  <Check className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{item}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              viewport={{ once: true }}
              className="text-gray-600 dark:text-gray-300 text-sm pt-2 leading-relaxed"
            >
              I believe in continuous learning and staying updated with the latest technologies. My goal is to create software that makes a positive impact and provides excellent user experiences.
            </motion.p>

            {/* CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              viewport={{ once: true }}
              className="pt-4 flex justify-center lg:justify-start"
            >
              <Button 
                onClick={() => router.push('/about')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                More About Me
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default AboutSection 