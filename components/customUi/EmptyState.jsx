import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function EmptyState({ 
  title, 
  description, 
  illustration = '/empty-state.svg',
  actionLabel,
  actionHref,
  className = ''
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full flex flex-col items-center justify-center p-8 text-center ${className}`}
    >
      <div className="relative w-64 h-64 mb-6">
        <Image
          src={illustration}
          alt="Empty state illustration"
          fill
          className="object-contain"
        />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        {description}
      </p>
      
      {actionLabel && actionHref && (
        <Button asChild>
          <a href={actionHref}>{actionLabel}</a>
        </Button>
      )}
    </motion.div>
  );
} 