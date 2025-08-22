'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/customUi/Button';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
const ServicesSection = () => {
  const router = useRouter();
  const services = [
    "🎨 Photo Banner Design & Creative Graphics",
    "💻 Software Development & Web Applications", 
    "📹 Content Creation & Video Production",
    "🤖 Automation & Workflow Optimization",
    "🔌 IoT Applications & Smart Device Integration",
    "📱 Mobile App Development",
    "✍️ Technical Writing & Documentation",
    "🌐 All kinds of digital solutions and tech work"
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full max-w-7xl mx-auto"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-4 order-1 lg:order-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2 text-blue-600 dark:text-blue-400">
              <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
              <span className="text-sm font-medium tracking-wide uppercase">Services</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              What I Can Do{" "}
              <span className="text-blue-600 dark:text-blue-400 relative">
                For You
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded" />
              </span>
            </h2>

            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
              <strong>Digital Solutions Expert</strong> providing comprehensive services
            </p>

            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              I specialize in creating innovative digital solutions that help businesses grow and individuals achieve their tech goals. From custom software development to creative design work, I bring ideas to life with modern technology and creative expertise.
            </p>

            {/* Services List */}
            <div className="space-y-2">
              {services.map((service, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{service}</span>
                </div>
              ))}
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm pt-2">
              Whether you need a complete digital transformation or specific technical solutions, I'm here to help turn your vision into reality with quality, efficiency, and innovation.
            </p>

            {/* CTA Button */}
            <div className="pt-4 flex justify-center lg:justify-start">
              <Button 
                onClick={() => {
                  router.push('/services');
                }}
              >
                View All Services
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center order-2 lg:order-2">
            <div className="relative">
              <Image
                src="/services-showcase.jpg"
                alt="Services & Digital Solutions"
                width={350}
                height={400}
                className="rounded-2xl shadow-lg object-cover w-full max-w-sm lg:max-w-none"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ServicesSection;