'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { runElimination, EliminationStep } from '@/lib/elimination';
import { CATEGORIES } from '@/lib/constants';

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
    <div className="min-h-screen paper-texture p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="highlighter-blue">Elimination Round</span>
          </h1>
          <p className="text-xl text-gray-600">
            Counting by {magicNumber}... watch your options disappear!
          </p>
          {isComplete && (
            <p className="text-lg text-green-600 font-semibold mt-4">
              ✓ Elimination complete! Your destiny awaits.
            </p>
          )}
        </motion.div>

        {/* Items Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {allItems.map((item, index) => {
            const isEliminated = eliminatedIndices.includes(item.index);
            const eliminationIndex = eliminatedIndices.indexOf(item.index);
            const isAggressive = eliminationIndex % 3 === 0; // Vary strikethrough style

            return (
              <motion.div
                key={`${item.categorySlug}-${index}`}
                initial={{ opacity: 1 }}
                animate={{
                  opacity: isEliminated ? 0.3 : 1,
                  scale: isEliminated ? 0.95 : 1,
                }}
                className={`bg-white px-4 py-3 rounded-xl border-2 border-gray-300 text-center relative ${
                  isEliminated
                    ? isAggressive
                      ? 'strikethrough-aggressive'
                      : 'strikethrough-simple'
                    : ''
                }`}
              >
                <p className="text-sm font-medium">{item.item}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Continue Button */}
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center"
          >
            <button
              onClick={handleContinue}
              className="bg-gray-900 text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 shadow-lg"
            >
              See My Results →
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
