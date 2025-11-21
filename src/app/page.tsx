'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { BookOpen } from 'lucide-react';

export default function SplashScreen() {
  const router = useRouter();

  return (
    <div className="min-h-screen paper-texture flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl text-center"
      >
        {/* Logo/Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <div className="w-24 h-24 bg-neon-yellow rounded-full flex items-center justify-center doodle-border">
            <BookOpen size={48} className="text-gray-900" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-6xl font-bold mb-4 text-gray-900"
        >
          The Adult AP
          <br />
          <span className="highlighter-pink">Course Load</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl md:text-2xl text-gray-700 mb-12 leading-relaxed"
        >
          Don't peak in high school.
          <br />
          Rebuild your grown-up life like the <span className="highlighter-yellow font-semibold">overachiever</span> you used to be.
        </motion.p>

        {/* Scribble decoration */}
        <motion.svg
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute top-20 right-10 w-32 h-32 opacity-30"
          viewBox="0 0 100 100"
        >
          <path
            d="M10,50 Q25,20 50,30 T90,50"
            stroke="#FF79C6"
            strokeWidth="2"
            fill="none"
          />
        </motion.svg>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/onboarding')}
          className="bg-gray-900 text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors shadow-lg"
        >
          Start My Course Load
        </motion.button>
      </motion.div>
    </div>
  );
}
