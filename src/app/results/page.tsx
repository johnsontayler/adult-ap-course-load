'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import { CATEGORIES } from '@/lib/constants';
import Confetti from '@/components/Confetti';
import EditorialTitle from '@/components/EditorialTitle';

export default function ResultsPage() {
  const router = useRouter();
  const { selectedWords } = useAppStore();

  const handleGeneratePlan = () => {
    router.push('/plan');
  };

  return (
    <div className="min-h-screen p-6 md:p-12 pt-32 md:pt-40">
      <Confetti />
      
      {/* Navigation Element */}
      <div className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-40 bg-white border-b border-black">
        <div className="font-mono text-sm tracking-widest uppercase">
          <Link href="/" className="hover:text-report-coral transition-colors">
            The Adult AP Course Load
          </Link> / Final Output
        </div>
        <div className="font-mono text-xs md:text-sm">
          [ 005 / 005 ]
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <div className="mb-8">
            <EditorialTitle 
              title={`COMPUTED\nTRAJECTORY`}
              highlightColor="bg-report-purple"
            />
          </div>
          <p className="font-mono text-sm uppercase tracking-widest text-gray-500">
            Optimized variables selected for your 2025 curriculum.
          </p>
        </motion.div>

        {/* Results Cards */}
        <div className="space-y-0 border-t border-black mb-16">
          {CATEGORIES.map((category, index) => {
            const selectedWord = selectedWords[category.slug];
            const bgColors = ['bg-report-yellow', 'bg-report-pink', 'bg-report-blue', 'bg-report-coral'];
            const highlightClass = bgColors[index % bgColors.length];

            return (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                className="group relative border-b border-black p-8 md:p-10 hover:bg-gray-50 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="flex items-center gap-6">
                  <div className="font-mono text-xs text-gray-400 uppercase tracking-widest w-8">
                    0{index + 1}
                  </div>
                  <div className="flex flex-col">
                     <h3 className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-1">
                      {category.title}
                    </h3>
                    <p className="font-serif text-4xl md:text-5xl text-black">
                      {selectedWord}
                    </p>
                  </div>
                </div>
                
                {/* Abstract Decoration */}
                <div className={`w-3 h-3 ${highlightClass} rounded-full opacity-0 group-hover:opacity-100 transition-opacity`} />
              </motion.div>
            );
          })}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center"
        >
          <button
            onClick={handleGeneratePlan}
            className="group relative px-12 py-5 overflow-hidden font-mono text-sm uppercase tracking-widest bg-black text-white hover:bg-report-purple hover:text-black transition-colors duration-300"
          >
            <span className="relative z-10">
              Generate Tactical Roadmap →
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
