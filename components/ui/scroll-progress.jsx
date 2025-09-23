"use client";
import { cn } from "@/lib/utils";
import { motion, useScroll, useSpring } from "motion/react";
import React from "react";

export const ScrollProgress = React.forwardRef(({ className, ...props }, ref) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Main progress bar */}
      <motion.div
        ref={ref}
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-1 origin-left",
          className
        )}
        style={{
          background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          scaleX,
          boxShadow: '0 0 10px rgba(102, 126, 234, 0.5)'
        }}
        {...props}
      />

      {/* Animated glow effect */}
      <motion.div
        className="fixed inset-x-0 top-0 z-40 h-1 origin-left opacity-60"
        style={{
          background: 'linear-gradient(90deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 50%, rgba(240, 147, 251, 0.8) 100%)',
          scaleX,
          filter: 'blur(3px)',
        }}
      />
    </>
  );
});

ScrollProgress.displayName = "ScrollProgress";
