import * as React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export function AdminFormDialog({
  title,
  description,
  children,
  isOpen,
  onClose,
  className = ''
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-h-[90vh] flex flex-col gap-0 p-0 ${className}`}>
        <DialogHeader className="sticky top-0 z-50 bg-background px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-slate-900 dark:text-white">
              {title}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          {description && (
            <DialogDescription className="text-slate-600 dark:text-slate-400">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
} 