'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import SpiralAnimation from '@/components/SpiralAnimation';

export default function GamePage() {
  const router = useRouter();
  const { setMagicNumber } = useAppStore();
  const [showSpiral, setShowSpiral] = useState(true);
  const [number, setNumber] = useState<number | null>(null);

  const handleSpiralStop = (magicNum: number) => {
    setNumber(magicNum);
    setShowSpiral(false);
    setMagicNumber(magicNum);
  };

  const handleContinue = () => {
    router.push('/elimination');
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
            The <span className="highlighter-yellow">Magic Number</span>
          </h1>
          <p className="text-xl text-gray-600">
            {showSpiral 
              ? 'Tap anywhere to stop the spiral and reveal your magic number'
              : 'This is your magic number! It will determine your destiny.'}
          </p>
        </motion.div>

        {/* Spiral or Result */}
        {showSpiral ? (
          <SpiralAnimation onStop={handleSpiralStop} />
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="w-64 h-64 rounded-full bg-neon-pink flex items-center justify-center doodle-border shadow-2xl mb-8">
              <div className="text-9xl font-bold text-white">{number}</div>
            </div>
            
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContinue}
              className="bg-gray-900 text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 shadow-lg"
            >
              Continue to Elimination →
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
