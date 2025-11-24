'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import { runElimination, EliminationStep } from '@/lib/elimination';
import { CATEGORIES } from '@/lib/constants';
import EditorialTitle from '@/components/EditorialTitle';

export default function EliminationPage() {
  const router = useRouter();
  const { categories, magicNumber, setSelectedWords } = useAppStore();
  const [steps, setSteps] = useState<EliminationStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Run elimination algorithm
    const { steps: eliminationSteps, selectedWords } = runElimination(categories, magicNumber);
    setSteps(eliminationSteps);
    setSelectedWords(selectedWords);
  }, [categories, magicNumber, setSelectedWords]);

  useEffect(() => {
    // Animate through steps
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 300); // 300ms per elimination
      return () => clearTimeout(timer);
    } else if (steps.length > 0) {
      setIsComplete(true);
    }
  }, [currentStep, steps.length]);

  const handleContinue = () => {
    router.push('/results');
  };

  // Flatten all items for display
  const allItems: { categorySlug: string; item: string; index: number }[] = [];
  CATEGORIES.forEach((cat) => {
    (categories[cat.slug] || []).forEach((item) => {
      allItems.push({
        categorySlug: cat.slug,
        item,
        index: allItems.length,
      });
    });
  });

  // Check which items are eliminated
  const eliminatedIndices = steps.slice(0, currentStep).map((step) => step.index);

  return (
    <div className="min-h-screen p-6 md:p-12 pt-32 md:pt-40">
      {/* Navigation Element */}
      <div className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-40 bg-white border-b border-black">
        <div className="font-mono text-sm tracking-widest uppercase">
          <Link href="/" className="hover:text-report-coral transition-colors">
            The Adult AP Course Load
          </Link>
        </div>
        <div className="font-mono text-xs md:text-sm">
          [ 004 / 005 ]
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <div className="mb-8">
            <EditorialTitle 
              title={`PROCESSING\nDELETION`}
              highlightColor="bg-report-coral"
            />
          </div>
          <div className="flex justify-center items-center gap-4 font-mono text-sm uppercase tracking-widest text-gray-500">
            <span>Variable: {magicNumber}</span>
            <span>•</span>
            <span>
              Status: {isComplete ? <span className="text-black">Complete</span> : 'Processing...'}
            </span>
          </div>
        </motion.div>

        {/* Items Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-gray-200 border border-gray-200 mb-16">
          {allItems.map((item, index) => {
            const isEliminated = eliminatedIndices.includes(item.index);

            return (
              <motion.div
                key={`${item.categorySlug}-${index}`}
                initial={{ opacity: 1 }}
                animate={{
                  backgroundColor: isEliminated ? '#f3f4f6' : '#ffffff',
                }}
                className="relative p-6 min-h-[120px] flex flex-col justify-between group"
              >
                <div className="flex justify-between items-start">
                  <span className={`font-mono text-[10px] uppercase tracking-widest ${isEliminated ? 'text-gray-300' : 'text-gray-400'}`}>
                    {item.categorySlug.slice(0, 3)}
                  </span>
                  {isEliminated && (
                    <span className="font-mono text-[10px] text-red-500 uppercase tracking-widest">
                      [DEL]
                    </span>
                  )}
                </div>

                <div className="relative">
                  <p className={`font-serif text-xl md:text-2xl transition-colors duration-300 ${
                    isEliminated ? 'text-gray-300 line-through decoration-red-500/30 decoration-2' : 'text-black'
                  }`}>
                    {item.item}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Continue Button */}
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center"
          >
            <button
              onClick={handleContinue}
              className="group relative px-12 py-4 overflow-hidden font-mono text-sm uppercase tracking-widest bg-black text-white hover:bg-report-coral hover:text-black transition-colors duration-300"
            >
              <span className="relative z-10">View Final Report →</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
