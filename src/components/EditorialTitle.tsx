import React from 'react';
import { motion } from 'framer-motion';

interface EditorialTitleProps {
  title: string;
  highlightColor?: string;
  className?: string;
}

export default function EditorialTitle({ 
  title, 
  highlightColor = "bg-report-yellow",
  className = ""
}: EditorialTitleProps) {
  // Split title into chunks to create the stair-step effect
  // We'll treat newlines as explicit breaks, but also wrap words
  const lines = title.split('\n');

  return (
    <div className={`flex flex-col items-start gap-0 ${className}`}>
      {lines.map((line, index) => (
        <motion.div
          key={index}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className={`
            inline-block px-4 py-1 md:px-6 md:py-2
            ${highlightColor} border border-black
            font-sans text-3xl md:text-5xl lg:text-7xl font-medium tracking-tight uppercase
            ${index !== 0 ? '-mt-[1px]' : ''} // Overlap borders slightly
          `}
        >
          {line.trim()}
        </motion.div>
      ))}
    </div>
  );
}
