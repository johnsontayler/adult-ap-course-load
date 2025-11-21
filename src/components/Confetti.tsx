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
      color: ['#FFEE58', '#FF79C6', '#7AD7F0'][Math.floor(Math.random() * 3)],
    }));
    setConfetti(pieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{ y: -20, x: `${piece.x}vw`, opacity: 1 }}
          animate={{
            y: '100vh',
            rotate: 360,
            opacity: 0,
          }}
          transition={{
            duration: 3,
            delay: piece.delay,
            ease: 'linear',
          }}
          className="absolute w-3 h-3 rounded-full"
          style={{ backgroundColor: piece.color }}
        />
      ))}
    </div>
  );
}
