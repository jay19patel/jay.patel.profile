import React from 'react'
import { PageSection } from '@/components/customUi/PageSection'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'

const projectsData = [
  {
    id: 1,
    title: "E-Commerce Fashion Store",
    description: "A modern online fashion store with shopping cart, payment integration, and user accounts. Built with React and Node.js.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&crop=center",
    category: "E-Commerce",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    status: "Completed"
  },
  {
    id: 2,
    title: "Restaurant Management System",
    description: "Complete restaurant management solution with online ordering, table booking, and inventory management.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop&crop=center",
    category: "Business",
    technologies: ["Next.js", "PostgreSQL", "Prisma", "TailwindCSS"],
    status: "Completed"
  },
  {
    id: 3,
    title: "Electronics Shop",
    description: "Multi-vendor electronics marketplace with product reviews, wishlist, and advanced search functionality.",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=300&fit=crop&crop=center",
    category: "E-Commerce",
    technologies: ["Vue.js", "Laravel", "MySQL", "PayPal"],
    status: "In Progress"
  },
  {
    id: 4,
    title: "Real Estate Platform",
    description: "Property listing website with virtual tours, mortgage calculator, and agent dashboard.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop&crop=center",
    category: "Real Estate",
    technologies: ["React", "Express.js", "MongoDB", "Cloudinary"],
    status: "Completed"
  },
  {
    id: 5,
    title: "Grocery Delivery App",
    description: "On-demand grocery delivery platform with real-time tracking and multiple payment options.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop&crop=center",
    category: "E-Commerce",
    technologies: ["React Native", "Firebase", "Google Maps API"],
    status: "Completed"
  },
  {
    id: 6,
    title: "Learning Management System",
    description: "Online education platform with video streaming, quizzes, certificates, and progress tracking.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&crop=center",
    category: "Education",
    technologies: ["Next.js", "Supabase", "VideoJS", "Stripe"],
    status: "In Progress"
  }
]

const ProjectCard = ({ project }) => {
  return (
    <Link href={`/projects/${project.id}`} className="group">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer border-2 hover:border-blue-200 dark:hover:border-blue-600">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              project.status === 'Completed' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            }`}>
              {project.status}
            </span>
          </div>
        </div>
        
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {project.title}
            </CardTitle>
          </div>
          <span className="text-sm text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-md w-fit">
            {project.category}
          </span>
        </CardHeader>
        
        <CardContent className="pt-0">
          <CardDescription className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {project.description}
          </CardDescription>
          
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs font-medium"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs font-medium">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

const ProjectsPage = () => {
  // Custom props for the PageSection header
  const headerProps = {
    portfolioLabel: "Portfolio",
    showBreadcrumb: true,
    breadcrumbItems: [
      { label: "Home", href: "/" },
      { label: "Projects", href: "/projects" }
    ],
    headline: ["My", "Creative", "Projects"],
    description: "Explore my portfolio of innovative web applications, e-commerce solutions, and digital experiences. Each project showcases cutting-edge technologies and creative problem-solving approaches.",
    centerTitle: "Innovative",
    centerSubtitle: "Solutions",
    technologies: ["React", "Node", "JS", "CSS", "MongoDB", "API"],
    stats: [
      { count: "6+", label: "Projects Completed", color: "green" },
      { count: "10+", label: "Technologies", color: "blue" }
    ],
    centerIcon: (
      <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  };

  return (
    <PageSection {...headerProps}>
      <div className="space-y-8">
        {/* Filter Section */}
        <div className="flex flex-wrap justify-center gap-3">
          {['All', 'E-Commerce', 'Business', 'Real Estate', 'Education'].map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full transition-all duration-200 font-medium ${
                category === 'All'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">6+</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Projects Completed</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-purple-600 dark:text-purple-400">10+</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Technologies Used</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-green-600 dark:text-green-400">100%</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </PageSection>
  )
}

export default ProjectsPage