'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { MOODS } from '@/lib/constants';
import { MoodType } from '@/types';

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
    <div className="min-h-screen paper-texture p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            What's your <span className="highlighter-blue">vibe</span>?
          </h1>
          <p className="text-xl text-gray-600">
            Select all that apply. This helps personalize your plan.
          </p>
        </motion.div>

        {/* Mood Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {MOODS.map((mood, index) => {
            const isSelected = selectedMoods.includes(mood.value);
            return (
              <motion.button
                key={mood.value}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleMood(mood.value)}
                className={`p-6 rounded-2xl border-4 transition-all ${
                  isSelected
                    ? 'border-gray-900 bg-neon-yellow shadow-lg'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
              >
                <div className="text-5xl mb-3">{mood.emoji}</div>
                <h3 className="text-xl font-bold mb-2">{mood.value}</h3>
                <p className="text-sm text-gray-600">{mood.description}</p>
              </motion.button>
            );
          })}
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center"
        >
          <button
            onClick={handleContinue}
            disabled={selectedMoods.length === 0}
            className={`px-12 py-4 rounded-full text-lg font-semibold transition-all ${
              selectedMoods.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg'
            }`}
          >
            Continue to Categories →
          </button>
        </motion.div>
      </div>
    </div>
  );
}
