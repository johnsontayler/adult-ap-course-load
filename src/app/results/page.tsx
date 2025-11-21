'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { CATEGORIES } from '@/lib/constants';
import Confetti from '@/components/Confetti';

export default function ResultsPage() {
  const router = useRouter();
  const { selectedWords } = useAppStore();

  const handleGeneratePlan = () => {
    router.push('/plan');
  };

  return (
    <div className="min-h-screen paper-texture p-6 md:p-12 relative">
      <Confetti />
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your <span className="highlighter-pink">Course Load</span>
          </h1>
          <p className="text-xl text-gray-600">
            Here's what the universe (and math) chose for you:
          </p>
        </motion.div>

        {/* Results Cards */}
        <div className="space-y-6 mb-12">
          {CATEGORIES.map((category, index) => {
            const selectedWord = selectedWords[category.slug];
            const colors = ['highlighter-yellow', 'highlighter-pink', 'highlighter-blue'];
            const highlightClass = colors[index % colors.length];

            return (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                className="bg-white rounded-2xl border-4 border-gray-900 p-8 shadow-xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{category.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {category.title}
                  </h3>
                </div>
                <div className={`inline-block px-6 py-3 rounded-full border-2 border-gray-900 ${highlightClass}`}>
                  <p className="text-3xl font-bold">{selectedWord}</p>
                </div>
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
            className="bg-gray-900 text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 shadow-lg flex items-center gap-3"
          >
            <span>✨</span>
            Generate My 6-Month Plan
            <span>✨</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
