'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/customUi/Button';
import { Check, Users, Code, Palette, Video, Bot, Smartphone, FileText, Globe, Cpu, BarChart3 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MagicCard } from '@/components/ui/magic-card';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';

const ServicesSection = () => {
  const router = useRouter();
  
  const skillFeatures = [
    { title: "Web Software Development", icon: Code },
    { title: "Automation & AI Integration", icon: Bot },
    { title: "Photo, Video, Banner & Design", icon: Palette },
    { title: "ERP & Frappe Development", icon: FileText },
    { title: "School/College Projects", icon: Cpu },
    { title: "IoT, Scripting & Data Science", icon: BarChart3 }
  ];


  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full max-w-7xl mx-auto py-8 lg:py-8"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Section Header */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center justify-center lg:justify-start space-x-2 text-blue-600 dark:text-blue-400"
              >
                <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
                <span className="text-sm font-medium tracking-wide uppercase">Services</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight"
              >
                What I Can Do{" "}
                <span className="text-blue-600 dark:text-blue-400 relative">
                  For You
                  <div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded" />
                </span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed"
            >
              Creating innovative digital solutions that help businesses grow and individuals achieve their goals
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-600 dark:text-gray-400 text-base"
            >
              Specializing in <strong>Web Software Development, Automation & AI Integration, 
              Creative Design, ERP Solutions, IoT Projects, Data Science</strong>, and more.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="text-gray-600 dark:text-gray-400 text-base"
            >
              Ready to bring your vision to reality with quality and innovation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4 pt-4"
            >
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
                onClick={() => router.push('/services')}
              >
                My Services
              </Button>
              
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                </div>
                <span className="text-sm font-medium">100+ satisfied clients</span>
              </div>
            </motion.div>
          </div>

          {/* Features Box */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <MagicCard
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-lg"
              gradientColor="#3b82f6"
              gradientOpacity={0.1}
              gradientFrom="#3b82f6"
              gradientTo="#8b5cf6"
            >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              My core services include
            </h3>
            
            <div className="space-y-4">
              {skillFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                  >
                    <div className="w-6 h-6 flex items-center justify-center mt-0.5">
                      <IconComponent className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <AnimatedShinyText className="text-gray-900 dark:text-white font-medium text-sm">
                        {feature.title}
                      </AnimatedShinyText>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            </MagicCard>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ServicesSection;