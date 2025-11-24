'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Confetti() {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; delay: number; color: string }>>([]);

  useEffect(() => {
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      color: ['#FC7B69', '#EBE553', '#72B5EA', '#F5A9C1'][Math.floor(Math.random() * 4)],
    }));
    setConfetti(pieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{ y: -20, x: `${piece.x}vw`, opacity: 1, rotate: 0 }}
          animate={{
            y: '100vh',
            rotate: 720,
            opacity: 0,
          }}
          transition={{
            duration: 4,
            delay: piece.delay,
            ease: 'linear',
          }}
          className="absolute w-2 h-4 bg-current"
          style={{ backgroundColor: piece.color }}
        />
      ))}
    </div>
  );
}
