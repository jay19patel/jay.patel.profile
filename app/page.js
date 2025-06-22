import { PageSection } from '@/components/customUi/PageSection'

export default function Home() {
  // Example of how to use the dynamic PageSection
  const homePageProps = {
    portfolioLabel: "Welcome",
    headline: ["Creative", "Web", "Developer"],
    description: "I'm a passionate full-stack developer creating beautiful, functional, and user-friendly web applications. Specializing in modern JavaScript frameworks and cutting-edge technologies.",
    centerTitle: "Full Stack",
    centerSubtitle: "Developer",
    technologies: ["React", "Next.js", "Node.js", "Python", "MongoDB", "PostgreSQL", "AWS", "Docker"],
    stats: [
      { count: "3+", label: "Years Experience", color: "blue" },
      { count: "50+", label: "Projects Built", color: "green" },
      { count: "15+", label: "Technologies", color: "purple" }
    ],
    centerIcon: (
      <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  };

  return (
    <PageSection {...homePageProps}>
      <div className="space-y-8">
        {/* Additional home page content can go here */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Let's work together to bring your ideas to life with modern web technologies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
              View My Work
            </button>
            <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200">
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </PageSection>
  )
}
