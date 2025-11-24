'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import { MOODS } from '@/lib/constants';
import { MoodType } from '@/types';
import EditorialTitle from '@/components/EditorialTitle';

export default function OnboardingPage() {
  const router = useRouter();
  const { moods, setMoods } = useAppStore();
  const [selectedMoods, setSelectedMoods] = useState<MoodType[]>(moods);

  const toggleMood = (mood: MoodType) => {
    setSelectedMoods((prev) =>
      prev.includes(mood)
        ? prev.filter((m) => m !== mood)
        : [...prev, mood]
    );
  };

  const handleContinue = () => {
    setMoods(selectedMoods);
    router.push('/categories');
  };

  return (
    <div className="min-h-screen p-6 md:p-12 pt-32 md:pt-40">
      {/* Navigation Element (matches Splash) */}
      <div className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-40 bg-white border-b border-black">
        <div className="font-mono text-sm tracking-widest uppercase">
          <Link href="/" className="hover:text-report-coral transition-colors">
            The Adult AP Course Load
          </Link>
        </div>
        <div className="font-mono text-xs md:text-sm">
          [ 001 / 005 ]
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="mb-8">
            <EditorialTitle 
              title={`ESTABLISH\nYOUR VIBE`}
              highlightColor="bg-report-blue"
            />
          </div>
          <p className="font-mono text-sm uppercase tracking-widest text-gray-500 border-l-2 border-report-blue pl-4">
            Select parameters for your personalized course load generation.
          </p>
        </motion.div>

        {/* Mood Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
          {MOODS.map((mood, index) => {
            const isSelected = selectedMoods.includes(mood.value);
            return (
              <motion.button
                key={mood.value}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => toggleMood(mood.value)}
                className={`relative p-8 text-left transition-all duration-300 bg-white group hover:bg-gray-50
                  ${isSelected ? '!bg-report-yellow' : ''}
                `}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-gray-400 group-hover:text-black">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                  <span className="text-2xl grayscale group-hover:grayscale-0 transition-all">
                    {mood.emoji}
                  </span>
                </div>
                <h3 className="font-serif text-2xl mb-2">{mood.value}</h3>
                <p className="font-mono text-xs text-gray-500 leading-relaxed">
                  {mood.description}
                </p>
                
                {/* Corner Accent */}
                {isSelected && (
                  <div className="absolute top-0 right-0 w-3 h-3 bg-black" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Continue Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex justify-end"
        >
          <button
            onClick={handleContinue}
            disabled={selectedMoods.length === 0}
            className={`group relative px-8 py-4 overflow-hidden font-mono text-sm uppercase tracking-widest transition-colors duration-300
              ${selectedMoods.length === 0 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-black text-white hover:bg-report-blue hover:text-black'
              }
            `}
          >
            <span className="relative z-10">Proceed to Categories →</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
