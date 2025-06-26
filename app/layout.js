import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';
import ChatBot from '@/components/ChatBot';

export const metadata = {
  title: 'Portfolio',
  description: 'My professional portfolio',
  fontFamily: "'Kavoon', sans-serif",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <ThemeProvider>
          <ThemeToggle />
          <Header />
          <main className="flex-grow w-full px-4 py-6">
            {children}
          </main>
          <Footer />
          <ChatBot />
        </ThemeProvider>
      </body>
    </html>
  );
}
