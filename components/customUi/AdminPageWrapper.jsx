import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from 'next/link';

export function AdminPageWrapper({ children, breadcrumbItems = [], title }) {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <div className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full shadow-inner border border-gray-200 dark:border-gray-600">
          <Breadcrumb>
            <BreadcrumbList className="flex items-center space-x-1">
              {breadcrumbItems.map((item, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    {item.href ? (
                      <BreadcrumbLink asChild>
                        <Link href={item.href} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition-colors">
                          {item.label}
                        </Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className="text-gray-900 dark:text-white text-sm font-semibold">
                        {item.label}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbItems.length - 1 && (
                    <BreadcrumbSeparator className="text-gray-400 dark:text-gray-500">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="m9 18 6-6-6-6"/>
                      </svg>
                    </BreadcrumbSeparator>
                  )}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {title && (
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">{title}</h1>
        )}
      </div>
      <main className="min-h-screen">
        {children}
      </main>
    </div>
  );
} 