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
    <div className="p-6">
      {breadcrumbItems.length > 0 && (
        <div className="mb-8">
          <div className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <Breadcrumb>
              <BreadcrumbList className="flex items-center space-x-2">
                {breadcrumbItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbItem>
                      {item.href ? (
                        <BreadcrumbLink asChild>
                          <Link href={item.href} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition-colors px-2 py-1 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                            {item.label}
                          </Link>
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage className="text-gray-900 dark:text-white text-sm font-semibold px-2 py-1">
                          {item.label}
                        </BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumbItems.length - 1 && (
                      <BreadcrumbSeparator className="text-gray-400 dark:text-gray-500 mx-1">
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-6">{title}</h1>
          )}
        </div>
      )}
      <main className="min-h-screen">
        {children}
      </main>
    </div>
  );
} 