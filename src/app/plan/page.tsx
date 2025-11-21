'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { ChevronDown, ChevronUp, RefreshCw, TrendingUp, Target } from 'lucide-react';

export default function PlanPage() {
  const router = useRouter();
  const { selectedWords, moods, plan, setPlan } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({
    0: true,
  });

  useEffect(() => {
    if (!plan) {
      generatePlan();
    }
  }, [plan]);

  const generatePlan = async (modifier?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categories: selectedWords,
          mood: moods,
          modifier,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate plan');
      }

      setPlan(data.plan);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleShare = () => {
    router.push('/share');
  };

  // Parse plan into sections (simple markdown parsing)
  const sections = plan
    ? plan.split('\n##').map((section, i) => {
        const lines = section.trim().split('\n');
        const title = lines[0].replace(/^#\s*/, '');
        const content = lines.slice(1).join('\n');
        return { title, content };
      })
    : [];

  return (
    <div className="min-h-screen paper-texture p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your <span className="highlighter-yellow">Life Redesign Plan</span>
          </h1>
          <p className="text-xl text-gray-600">
            A 6-month roadmap to becoming your best self
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="animate-spin text-6xl mb-4">✨</div>
            <p className="text-xl text-gray-600">
              Crafting your personalized plan...
            </p>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border-2 border-red-500 rounded-2xl p-6 mb-6"
          >
            <p className="text-red-700 font-semibold">{error}</p>
            <button
              onClick={() => generatePlan()}
              className="mt-4 text-red-700 underline"
            >
              Try again
            </button>
          </motion.div>
        )}

        {/* Plan Content */}
        {!isLoading && plan && (
          <>
            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-wrap gap-4 mb-8 justify-center"
            >
              <button
                onClick={() => generatePlan()}
                className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-900 rounded-full hover:bg-gray-100 font-semibold"
              >
                <RefreshCw size={20} />
                Regenerate
              </button>
              <button
                onClick={() => generatePlan('more ambitious')}
                className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-900 rounded-full hover:bg-gray-100 font-semibold"
              >
                <TrendingUp size={20} />
                Make it More Ambitious
              </button>
              <button
                onClick={() => generatePlan('more realistic')}
                className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-900 rounded-full hover:bg-gray-100 font-semibold"
              >
                <Target size={20} />
                Make it More Realistic
              </button>
            </motion.div>

            {/* Accordion Sections */}
            <div className="space-y-4 mb-12">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl border-2 border-gray-300 overflow-hidden shadow-md"
                >
                  <button
                    onClick={() => toggleSection(index)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
                  >
                    <h3 className="text-xl font-bold text-left">
                      {section.title}
                    </h3>
                    {expandedSections[index] ? (
                      <ChevronUp size={24} />
                    ) : (
                      <ChevronDown size={24} />
                    )}
                  </button>
                  {expandedSections[index] && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      className="px-6 pb-6"
                    >
                      <div className="prose max-w-none">
                        <pre className="whitespace-pre-wrap font-sans text-gray-700">
                          {section.content}
                        </pre>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Share Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center"
            >
              <button
                onClick={handleShare}
                className="bg-gray-900 text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 shadow-lg"
              >
                Share My Course Load →
              </button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
