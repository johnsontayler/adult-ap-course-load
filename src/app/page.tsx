'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import EditorialTitle from '@/components/EditorialTitle';

export default function SplashScreen() {
  const router = useRouter();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference text-white">
        <div className="font-mono text-sm tracking-widest uppercase">
          The Adult AP / Report
        </div>
        <div className="font-mono text-xs md:text-sm">
          EST. 2025
        </div>
      </nav>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        
        {/* Left Section: Typography & Title */}
        <div className="lg:col-span-8 p-6 pt-24 lg:pt-6 flex flex-col justify-center relative z-10">
          <div className="mb-8">
            <EditorialTitle 
              title={`THE ADULT\nAP COURSE\nLOAD`}
              highlightColor="bg-report-coral"
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="max-w-md mt-8"
          >
            <p className="font-mono text-sm md:text-base leading-relaxed text-gray-600 uppercase tracking-wide mb-8">
              [ 001 ] — Don't peak in high school.
              <br />
              Rebuild your grown-up life like the overachiever you used to be.
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/onboarding')}
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-black text-white overflow-hidden font-mono text-sm uppercase tracking-widest hover:bg-report-coral transition-colors duration-300"
            >
              <span className="relative z-10">Start Chapter 1</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Right Section: Abstract Visuals */}
        <div className="lg:col-span-4 relative min-h-[50vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
          {/* Abstract Shapes */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute w-[120%] h-[80%] bg-report-blue/20 rounded-full blur-3xl -top-20 -right-20"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="absolute w-[100%] h-[60%] bg-report-yellow/40 rounded-full blur-3xl bottom-0 -left-20 mix-blend-multiply"
          />
          
          <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 py-12 font-mono text-xs text-gray-400 uppercase tracking-widest">
            <div className="border-t border-black/10 pt-4">
              Figure 1.1
              <br />
              Life Redesign
            </div>
            <div className="border-b border-black/10 pb-4 text-right">
              Analysis
              <br />
              Pending
            </div>
          </div>
        </div>
      </div>

      {/* Background Texture/Grain if needed, or just subtle gradients */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
    </div>
  );
}
