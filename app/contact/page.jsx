"use client"

import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageSection } from "@/components/customUi/PageSection"
import { useForm, ValidationError } from '@formspree/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function ContactPage() {
  const [state, handleSubmit] = useForm("jaypatel1234567890@gmail.com");

  // Custom props for the PageSection header
  const headerProps = {
    portfolioLabel: "Get In Touch",
    showBreadcrumb: true,
    breadcrumbItems: [
      { label: "Home", href: "/" },
      { label: "Contact", href: "/contact" }
    ],
    headline: ["Let's Work", "Together", "Today"],
    description: "Ready to start your next project? I'm here to help bring your ideas to life. Fill out the form below and I'll get back to you as soon as possible.",
    stats: [
      { count: "24hrs", label: "Response Time", color: "green" },
      { count: "50+", label: "Projects Done", color: "blue" },
      { count: "100%", label: "Satisfaction", color: "purple" }
    ]
  }

  if (state.succeeded) {
    return (
      <PageSection {...headerProps}>
        <div className="text-center py-20">
          <h2 className="text-4xl font-bold mb-4 text-green-600">Thank You!</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">Your message has been successfully sent. I will get back to you shortly.</p>
        </div>
      </PageSection>
    );
  }

  return (
    <PageSection {...headerProps}>
      <div className="space-y-16">
        {/* Contact Form */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-10 border-2 border-gray-100 dark:border-gray-700 relative overflow-hidden">
            {/* Decorative gradient line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Send Me a Message
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Ready to start your project? Fill out the form below and I'll get back to you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-base font-semibold text-gray-700 dark:text-gray-300">
                    Your Name *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    required
                    placeholder="John Doe"
                    className="h-12 text-lg border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-500"
                  />
                  <ValidationError prefix="Name" field="name" errors={state.errors} />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-base font-semibold text-gray-700 dark:text-gray-300">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    className="h-12 text-lg border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-500"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block text-base font-semibold text-gray-700 dark:text-gray-300">
                  Subject *
                </label>
                <Input
                  id="subject"
                  type="text"
                  name="subject"
                  required
                  placeholder="Let's discuss about my project"
                  className="h-12 text-lg border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-500"
                />
                <ValidationError prefix="Subject" field="subject" errors={state.errors} />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-base font-semibold text-gray-700 dark:text-gray-300">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder="Tell me about your project requirements, goals, timeline, budget, and any specific features you need..."
                  className="w-full px-4 py-3 text-lg border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-500"
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
                >
                  <Send className="mr-3 h-6 w-6" />
                  {state.submitting ? 'Sending Message...' : 'Send Message'}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Got questions? I've got answers. Here are some common questions clients ask me.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-2 border-gray-100 dark:border-gray-700 overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b border-gray-200 dark:border-gray-700">
                <AccordionTrigger className="text-left px-8 py-6 text-lg font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  ⚡ What's your typical response time?
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6 text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                  I usually respond to all inquiries within 24 hours during business days. For urgent projects, I can respond much faster, often within a few hours. I believe in clear communication and keeping my clients updated throughout the entire process.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border-b border-gray-200 dark:border-gray-700">
                <AccordionTrigger className="text-left px-8 py-6 text-lg font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  💰 What are your development rates?
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6 text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                  My rates vary depending on the project complexity, timeline, and specific requirements. I offer competitive pricing and can work within different budget ranges. I provide detailed quotes after understanding your project scope. Let's discuss your project details to provide you with an accurate and fair quote.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left px-8 py-6 text-lg font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  🛠️ Do you provide ongoing support and maintenance?
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6 text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                  Absolutely! I provide comprehensive ongoing support and maintenance for all projects I develop. This includes bug fixes, security updates, feature enhancements, performance optimization, and technical support. I offer different maintenance packages to suit your needs and budget, ensuring your project stays current and secure.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </PageSection>
  )
} 