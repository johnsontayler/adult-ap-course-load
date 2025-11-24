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
      prev.includes(mood) ? [] : [mood]
    );
  };

  const handleContinue = () => {
    setMoods(selectedMoods);
    router.push('/categories');
  };

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col">
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

      <div className="flex-1 flex flex-col w-full max-w-7xl mx-auto pt-20 md:pt-24 pb-4 md:pb-6 px-6 md:px-12 h-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-none mb-4 md:mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4 md:mb-6 border-b border-black pb-4 md:pb-6">
            <EditorialTitle 
              title={`ESTABLISH\nYOUR VIBE`}
              highlightColor="bg-report-blue"
              className="leading-[0.8]"
              staggered
            />
            <p className="font-mono text-xs uppercase tracking-widest text-gray-500 max-w-md pb-2">
              Select the tone for your personalized course load generation.
            </p>
          </div>
        </motion.div>

        {/* Mood Grid - Takes remaining space */}
        <div className="flex-1 min-h-0 grid grid-cols-2 grid-rows-3 md:grid-cols-3 md:grid-rows-2 lg:grid-cols-5 lg:grid-rows-1 gap-px bg-gray-200 border border-gray-200">
          {MOODS.map((mood, index) => {
            const isSelected = selectedMoods.includes(mood.value);
            return (
              <motion.button
                key={mood.value}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => toggleMood(mood.value)}
                className={`relative p-3 md:p-6 text-left transition-all duration-300 bg-white group hover:bg-gray-50 flex flex-col justify-between h-full overflow-hidden
                  ${isSelected ? '!bg-report-yellow' : ''}
                `}
              >
                <div className="w-full">
                  <div className="flex justify-between items-start mb-1 md:mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-black">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                    <span className="text-lg md:text-xl grayscale group-hover:grayscale-0 transition-all">
                      {mood.emoji}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg md:text-2xl mb-1 leading-tight">{mood.value}</h3>
                </div>
                
                <p className="font-mono text-[10px] text-gray-500 leading-relaxed mt-1 md:mt-2">
                  {mood.description}
                </p>
                
                {/* Corner Accent */}
                {isSelected && (
                  <div className="absolute top-0 right-0 w-2 h-2 bg-black" />
                )}
              </motion.button>
            );
          })}
          
          {/* Ghost Cell to fill grid on mobile/tablet */}
          <div className="bg-white lg:hidden block" />
        </div>

        {/* Continue Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex-none mt-4 md:mt-6 flex justify-end"
        >
          <button
            onClick={handleContinue}
            disabled={selectedMoods.length === 0}
            className={`group relative px-8 py-3 overflow-hidden font-mono text-xs uppercase tracking-widest transition-colors duration-300
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
