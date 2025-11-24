'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { ChevronDown, ChevronUp, RefreshCw, TrendingUp, Target } from 'lucide-react';
import EditorialTitle from '@/components/EditorialTitle';

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
    <div className="min-h-screen p-6 md:p-12 pt-32 md:pt-40">
      {/* Navigation Element */}
      <div className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-40 bg-white border-b border-black">
        <div className="font-mono text-sm tracking-widest uppercase">
          The Adult AP / Roadmap
        </div>
        <div className="font-mono text-xs md:text-sm">
          [ STRATEGY ]
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <div className="mb-8">
            <EditorialTitle 
              title={`TACTICAL\nROADMAP`}
              highlightColor="bg-report-blue"
            />
          </div>
          <p className="font-mono text-sm uppercase tracking-widest text-gray-500">
            6-Month Execution Strategy for Personal Redevelopment.
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="animate-spin text-4xl mb-6">✶</div>
            <p className="font-mono text-sm uppercase tracking-widest text-gray-500">
              Processing Simulation...
            </p>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border-l-4 border-red-500 p-6 mb-6"
          >
            <p className="text-red-700 font-mono text-sm mb-2">{error}</p>
            <button
              onClick={() => generatePlan()}
              className="text-red-700 underline font-mono text-xs uppercase tracking-widest"
            >
              Retry Sequence
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
              className="flex flex-wrap gap-4 mb-12 justify-center"
            >
              <button
                onClick={() => generatePlan()}
                className="flex items-center gap-2 px-6 py-3 border border-gray-300 hover:border-black hover:bg-gray-50 font-mono text-xs uppercase tracking-widest transition-all"
              >
                <RefreshCw size={14} />
                Regenerate
              </button>
              <button
                onClick={() => generatePlan('more ambitious')}
                className="flex items-center gap-2 px-6 py-3 border border-gray-300 hover:border-black hover:bg-gray-50 font-mono text-xs uppercase tracking-widest transition-all"
              >
                <TrendingUp size={14} />
                Increase Difficulty
              </button>
              <button
                onClick={() => generatePlan('more realistic')}
                className="flex items-center gap-2 px-6 py-3 border border-gray-300 hover:border-black hover:bg-gray-50 font-mono text-xs uppercase tracking-widest transition-all"
              >
                <Target size={14} />
                Decrease Difficulty
              </button>
            </motion.div>

            {/* Accordion Sections */}
            <div className="space-y-0 border-t border-black mb-16">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-black"
                >
                  <button
                    onClick={() => toggleSection(index)}
                    className="w-full py-6 flex items-center justify-between group hover:bg-gray-50 transition-colors px-2"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                        0{index + 1}
                      </span>
                      <h3 className="font-serif text-2xl md:text-3xl text-left group-hover:text-report-blue transition-colors">
                        {section.title}
                      </h3>
                    </div>
                    {expandedSections[index] ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>
                  {expandedSections[index] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="pb-8 pl-10 pr-4"
                    >
                      <div className="prose max-w-none">
                        <pre className="whitespace-pre-wrap font-sans text-gray-600 text-sm md:text-base leading-relaxed">
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
                className="group relative px-12 py-5 overflow-hidden font-mono text-sm uppercase tracking-widest bg-black text-white hover:bg-report-blue hover:text-black transition-colors duration-300"
              >
                <span className="relative z-10">
                  Distribute Findings →
                </span>
              </button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
