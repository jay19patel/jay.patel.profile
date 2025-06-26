"use client"

import Image from "next/image"
import { PageSection } from '@/components/customUi/PageSection'
import { 
  Code2, 
  Camera, 
  Users,
  Youtube,
  Instagram,
  Linkedin,
  Github,
  BookOpen,
  Coffee,
  Zap,
  Heart,
  MapPin,
  Calendar
} from "lucide-react"

export default function AboutPage() {
  const skills = [
    "React.js", "Next.js", "JavaScript", "TypeScript", "Node.js", 
    "Python", "MongoDB", "PostgreSQL", "TailwindCSS", "Docker"
  ]

  const contentCreatorStats = [
    { icon: Youtube, label: "YouTube Subscribers", value: "2.5K+", color: "text-red-500" },
    { icon: Instagram, label: "Instagram Followers", value: "1.8K+", color: "text-purple-500" },
    { icon: Linkedin, label: "LinkedIn Connections", value: "3.2K+", color: "text-blue-500" },
    { icon: Github, label: "GitHub Repositories", value: "50+", color: "text-gray-700 dark:text-gray-300" }
  ]

  const interests = [
    { icon: Code2, title: "Clean Code", desc: "Writing maintainable and scalable code" },
    { icon: Camera, title: "Tech Photography", desc: "Capturing behind-the-scenes coding moments" },
    { icon: BookOpen, title: "Learning", desc: "Continuously exploring new technologies" },
    { icon: Coffee, title: "Coffee & Code", desc: "Best combination for productivity" }
  ]

  // Custom props for the PageSection header
  const headerProps = {
    portfolioLabel: "About Me",
    showBreadcrumb: true,
    breadcrumbItems: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" }
    ],
    headline: ["Developer &", "Content", "Creator"],
    description: "My journey in technology is driven by a passion for building innovative web applications and sharing knowledge. Explore the two sides of my professional life: development and content creation.",
    stats: [
      { count: "2023", label: "Graduated", color: "green" },
      { count: "50+", label: "Projects Built", color: "blue" },
      { count: "7K+", label: "Total Followers", color: "purple" }
    ]
  }

  return (
    <PageSection {...headerProps}>
      <div className="space-y-12">
        {/* Personal Intro Section */}
        <section className="grid lg:grid-cols-3 gap-12 items-center">
          <div className="flex justify-center items-center lg:col-span-1">
            <div className="relative">
              <Image
                src="/developer-image.jpg"
                alt="Jay Patel"
                width={250}
                height={250}
                className="rounded-full shadow-2xl border-8 border-white dark:border-gray-800"
              />
              <div className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-6 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              I'm Jay Patel
            </h2>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                <span className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                    <MapPin className="w-4 h-4" />
                    Valsad, Gujarat
                </span>
                <span className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                    <Calendar className="w-4 h-4" />
                    Graduated 2023
                </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
                This space is a blend of my professional work and my creative explorations. I'm passionate about building things for the web and sharing what I learn with the community.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-gray-200 dark:bg-gray-700"></div>

        {/* Two Sides Section */}
        <div className="container mx-auto px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
              <span className="text-sm font-medium tracking-wide uppercase text-blue-600 dark:text-blue-400">My Two Sides</span>
              <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Developer &{" "}
              <span className="text-blue-600 dark:text-blue-400 relative">
                Creator
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded" />
              </span>
            </h2>

            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Bridging the gap between technical expertise and creative storytelling
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Developer Side */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">The Developer</h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                I craft digital experiences with clean, efficient code. My expertise spans full-stack development, 
                from responsive frontends to robust backend systems. I believe in writing code that not only works 
                but is maintainable and scalable.
              </p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Core Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-1 rounded-full text-xs text-gray-700 dark:text-gray-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">Always learning, always coding</span>
              </div>
            </div>

            {/* Content Creator Side */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">The Creator</h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                I share my coding journey through tutorials, tips, and behind-the-scenes content. 
                My goal is to make programming accessible and inspire others to start their tech careers. 
                From quick tips to detailed walkthroughs, I love teaching through content.
              </p>
              
              <div className="space-y-3 mb-6">
                {contentCreatorStats.map((stat, index) => {
                  const IconComponent = stat.icon
                  return (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <IconComponent className={`w-5 h-5 ${stat.color}`} />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</span>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">{stat.value}</span>
                    </div>
                  )
                })}
              </div>
              
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                <Heart className="w-4 h-4" />
                <span className="text-sm font-medium">Building community through content</span>
              </div>
            </div>
          </div>
        </div>

        {/* My Journey Section */}
        <div className="container mx-auto px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
              <span className="text-sm font-medium tracking-wide uppercase text-blue-600 dark:text-blue-400">My Journey</span>
              <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              From Beginner To{" "}
              <span className="text-blue-600 dark:text-blue-400 relative">
                Educator
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded" />
              </span>
            </h2>

            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              From curious beginner to passionate developer and educator
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 text-center border border-green-200 dark:border-green-800">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Learning Phase
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Started with curiosity about how websites work. Spent countless hours learning HTML, CSS, and JavaScript fundamentals.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 text-center border border-blue-200 dark:border-blue-800">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Building Phase
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Graduated in 2023 and started building real projects. Mastered modern frameworks and began creating professional applications.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 text-center border border-purple-200 dark:border-purple-800">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Sharing Phase
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Now I share my knowledge through content creation, helping others learn and grow in their coding journey.
              </p>
            </div>
          </div>
        </div>

        {/* Interests & Hobbies */}
        <div className="container mx-auto px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
              <span className="text-sm font-medium tracking-wide uppercase text-blue-600 dark:text-blue-400">What I Love</span>
              <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Beyond{" "}
              <span className="text-blue-600 dark:text-blue-400 relative">
                Coding
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded" />
              </span>
            </h2>

            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Beyond coding, here's what drives my passion
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {interests.map((interest, index) => {
              const IconComponent = interest.icon
              return (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {interest.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {interest.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </PageSection>
  )
} 