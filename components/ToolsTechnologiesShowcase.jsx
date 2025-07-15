'use client'
import React from 'react';

// Flat list of all tools (icon + name)
const tools = [
  // Editing
  { name: 'VS Code', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" alt="VS Code" className="w-10 h-10" /> },
  { name: 'Notion', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg" alt="Notion" className="w-10 h-10" /> },
  { name: 'Figma', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma" className="w-10 h-10" /> },
  { name: 'Photoshop', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" alt="Photoshop" className="w-10 h-10" /> },
  { name: 'Canva', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg" alt="Canva" className="w-10 h-10" /> },
  { name: 'After Effects', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg" alt="After Effects" className="w-10 h-10" /> },
  { name: 'Premiere Pro', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg" alt="Premiere Pro" className="w-10 h-10" /> },
  { name: 'Markdown', icon: <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/><path d="M8 9v6m0 0l2-2m-2 2l-2-2m8-2v2a2 2 0 002 2h0a2 2 0 002-2v-2"/></svg> },
  // Coding
  { name: 'JavaScript', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" className="w-10 h-10" /> },
  { name: 'Python', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" className="w-10 h-10" /> },
  { name: 'TypeScript', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" className="w-10 h-10" /> },
  { name: 'Node.js', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" className="w-10 h-10" /> },
  { name: 'React', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="w-10 h-10" /> },
  { name: 'Next.js', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" className="w-10 h-10 bg-white rounded-full p-1" /> },
  { name: 'TailwindCSS', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" alt="TailwindCSS" className="w-10 h-10" /> },
  { name: 'HTML5', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" className="w-10 h-10" /> },
  { name: 'CSS3', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" className="w-10 h-10" /> },
  // DevOps
  { name: 'Git', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" className="w-10 h-10" /> },
  { name: 'GitHub', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="w-10 h-10 bg-white rounded-full p-1 dark:bg-gray-800" /> },
  { name: 'Docker', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" className="w-10 h-10" /> },
  { name: 'Nginx', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" alt="Nginx" className="w-10 h-10" /> },
  { name: 'Vercel', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" alt="Vercel" className="w-10 h-10 bg-white rounded-full p-1" /> },
  { name: 'Netlify', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg" alt="Netlify" className="w-10 h-10" /> },
  // Cloud & Database
  { name: 'MongoDB', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" className="w-10 h-10" /> },
  { name: 'PostgreSQL', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" className="w-10 h-10" /> },
  { name: 'Firebase', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" alt="Firebase" className="w-10 h-10" /> },
  { name: 'AWS', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg" alt="AWS" className="w-10 h-10" /> },
  { name: 'Supabase', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" alt="Supabase" className="w-10 h-10" /> },
];

function MarqueeRow({ items, reverse = false }) {
  return (
    <div className="overflow-hidden w-full py-2 relative">
      <div
        className={`flex whitespace-nowrap ${reverse ? 'animate-marquee-reverse flex-row-reverse' : 'animate-marquee'}`}
        style={{ animationDuration: '30s' }}
      >
        {(reverse ? items.slice().reverse() : items).concat(reverse ? items.slice().reverse() : items).map((tool, idx) => (
          <div key={tool.name + idx} className="flex flex-col items-center min-w-[90px]">
            {tool.icon}
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