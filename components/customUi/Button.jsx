import React from 'react'
import { ArrowUpRight } from 'lucide-react';

export const Button = ({children}) => {
  return (
    <button className="relative hidden sm:flex items-center space-x-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-full shadow-[0_4px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_25px_rgba(99,102,241,0.4)] border border-white/20 hover:border-white/40 transition-all duration-300 group overflow-hidden before:content-[''] before:absolute before:w-[100px] before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:top-0 before:-left-[100px] before:opacity-60 before:rotate-12 hover:before:animate-[shine_1.5s_ease-out_infinite]">
        <span className="text-sm font-semibold relative z-10">{children}</span>
            <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors relative z-10">
                <ArrowUpRight size={14} className="text-white group-hover:rotate-180 transition-all duration-300 origin-center" />
            </div>
    </button>

  )
}
