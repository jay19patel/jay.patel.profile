import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';
import ChatBot from '@/components/ChatBot';
import { Toaster } from 'sonner';

export const metadata = {
  title: {
    default: 'Jay Patel - Full-Stack Developer & Problem Solver',
    template: '%s | Jay Patel Portfolio'
  },
  description: 'Passionate full-stack developer creating innovative web applications and digital solutions with modern technologies. Specializing in React, Next.js, Node.js, and cloud technologies.',
  keywords: ['Jay Patel', 'Full-Stack Developer', 'React Developer', 'Next.js', 'Node.js', 'Web Development', 'Portfolio', 'JavaScript', 'TypeScript'],
  authors: [{ name: 'Jay Patel' }],
  creator: 'Jay Patel',
  publisher: 'Jay Patel',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://jaypatel.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jaypatel.dev',
    title: 'Jay Patel - Full-Stack Developer & Problem Solver',
    description: 'Passionate full-stack developer creating innovative web applications and digital solutions with modern technologies.',
    siteName: 'Jay Patel Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Jay Patel - Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jay Patel - Full-Stack Developer & Problem Solver',
    description: 'Passionate full-stack developer creating innovative web applications and digital solutions with modern technologies.',
    creator: '@jaypatel',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Jay Patel",
    "jobTitle": "Full-Stack Developer",
    "description": "Passionate full-stack developer creating innovative web applications and digital solutions with modern technologies.",
    "url": "https://jaypatel.dev",
    "sameAs": [
      "https://github.com/jaypatel",
      "https://linkedin.com/in/jaypatel",
      "https://twitter.com/jaypatel"
    ],
    "knowsAbout": [
      "React",
      "Next.js",
      "Node.js",
      "JavaScript",
      "TypeScript",
      "Python",
      "MongoDB",
      "Web Development",
      "Full-Stack Development"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Full-Stack Developer",
      "description": "Develops web applications using modern technologies",
      "skills": "React, Next.js, Node.js, Python, MongoDB, JavaScript, TypeScript"
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeToggle />
          <Header />
          <main className="flex-grow w-full py-6">
            {children}
          </main>
          <Footer />
          <ChatBot />
          <Toaster richColors closeButton position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
