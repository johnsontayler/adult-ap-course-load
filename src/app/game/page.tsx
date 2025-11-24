'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import SpiralAnimation from '@/components/SpiralAnimation';
import EditorialTitle from '@/components/EditorialTitle';

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
    <div className="min-h-screen p-6 md:p-12 pt-32 md:pt-40">
      {/* Navigation Element */}
      <div className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-40 bg-white border-b border-black">
        <div className="font-mono text-sm tracking-widest uppercase">
          The Adult AP / Chapter 3
        </div>
        <div className="font-mono text-xs md:text-sm">
          [ 003 / 005 ]
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
              title={`DETERMINE\nVARIABLE N`}
              highlightColor="bg-report-yellow"
            />
          </div>
          <p className="font-mono text-sm uppercase tracking-widest text-gray-500">
            {showSpiral 
              ? 'Algorithm awaiting input. Interact to calibrate.'
              : 'Variable captured. Proceed to elimination sequence.'}
          </p>
        </motion.div>

        {/* Spiral or Result */}
        {showSpiral ? (
          <SpiralAnimation onStop={handleSpiralStop} />
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="relative w-64 h-64 flex items-center justify-center mb-12">
              {/* Geometric Background */}
              <div className="absolute inset-0 border-2 border-black transform rotate-45" />
              <div className="absolute inset-0 border-2 border-report-yellow" />
              
              <div className="relative z-10 text-9xl font-serif text-black">
                {number}
              </div>
            </div>
            
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={handleContinue}
              className="group relative px-12 py-4 overflow-hidden font-mono text-sm uppercase tracking-widest bg-black text-white hover:bg-report-yellow hover:text-black transition-colors duration-300"
            >
              <span className="relative z-10">Initiate Elimination Sequence →</span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
