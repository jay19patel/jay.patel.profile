"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

function MarqueeRow({ items, reverse = false }) {
  return (
    <div className="overflow-hidden w-full py-2 relative">
      <div
        className={`flex whitespace-nowrap ${reverse ? 'animate-marquee-reverse flex-row-reverse' : 'animate-marquee'}`}
        style={{ animationDuration: '30s' }}
      >
        {(reverse ? items.slice().reverse() : items).concat(reverse ? items.slice().reverse() : items).map((tool, idx) => (
          <div key={tool.name + idx} className="flex flex-col items-center min-w-[90px]">
            {tool.icon && (
              <Image src={tool.icon} alt={tool.name} width={40} height={40} className="w-10 h-10" />
            )}
            <span className="text-xs mt-1 text-gray-700 dark:text-gray-300 text-center font-medium">
              {tool.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ToolsTechnologiesShowcase() {
  const [tools, setTools] = useState([]);
  useEffect(() => {
    fetch('/api/tools')
      .then(res => res.json())
      .then(data => setTools(Array.isArray(data) ? data : []));
  }, []);

  // Split tools for two rows
  const half = Math.ceil(tools.length / 2);
  const row1 = tools.slice(0, half);
  const row2 = tools.slice(half);

  return (
    <section className="w-full py-16 max-w-7xl mx-auto bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl relative overflow-hidden transition-colors duration-300 mt-12">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/10 rounded-full blur-xl animate-pulse delay-1000" />
      </div>
      <div>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
            <span className="text-sm font-medium tracking-wide uppercase text-blue-600 dark:text-blue-400">Tools & Technologies</span>
            <div className="w-8 h-px bg-blue-600 dark:bg-blue-400" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            My <span className="text-blue-600 dark:text-blue-400 relative">Toolkit<div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded" /></span>
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Explore the tools and technologies I use to design, develop, and deploy modern digital experiences.
          </p>
        </div>
        <div className="space-y-4">
          <MarqueeRow items={row1} />
          <MarqueeRow items={row2} reverse={true}/>
        </div>
      </div>
    </section>
  );
} 