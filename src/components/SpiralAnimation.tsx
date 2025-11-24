'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface SpiralAnimationProps {
  onStop: (magicNumber: number) => void;
}

export default function SpiralAnimation({ onStop }: SpiralAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [loops, setLoops] = useState(0);
  const animationRef = useRef<number>(0);
  const angleRef = useRef(0);
  const radiusRef = useRef(10);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    let loopCount = 0;
    const maxRadius = Math.min(centerX, centerY) - 20;

    const animate = () => {
      if (!isAnimating) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw spiral
      ctx.beginPath();
      ctx.strokeStyle = '#FC7B69'; // Report Coral
      ctx.lineWidth = 2;

      for (let i = 0; i <= angleRef.current; i += 0.1) {
        const radius = (i / (Math.PI * 10)) * maxRadius;
        const x = centerX + radius * Math.cos(i);
        const y = centerY + radius * Math.sin(i);

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Draw current point
      const currentRadius = (angleRef.current / (Math.PI * 10)) * maxRadius;
      const currentX = centerX + currentRadius * Math.cos(angleRef.current);
      const currentY = centerY + currentRadius * Math.sin(angleRef.current);

      ctx.beginPath();
      ctx.arc(currentX, currentY, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#EBE553'; // Report Yellow
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Increment angle
      angleRef.current += 0.15;
      radiusRef.current = currentRadius;

      // Count loops
      if (angleRef.current >= (loopCount + 1) * Math.PI * 2) {
        loopCount++;
        setLoops(loopCount);
      }

      // Reset if spiral gets too big
      if (radiusRef.current >= maxRadius) {
        angleRef.current = 0;
        radiusRef.current = 10;
        loopCount = 0;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating]);

  const handleClick = () => {
    setIsAnimating(false);
    const magicNumber = Math.max(2, loops || 2); // Ensure minimum of 2
    setTimeout(() => onStop(magicNumber), 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center"
    >
      <div
        onClick={handleClick}
        className="cursor-pointer bg-white p-4 mb-6 border-2 border-black hover:border-report-blue transition-colors"
      >
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="bg-gray-50"
        />
      </div>
      
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-center"
      >
        <p className="text-4xl font-serif text-black mb-2">
          CYCLES: <span className="text-report-coral font-mono">{loops}</span>
        </p>
        <p className="font-mono text-xs text-gray-500 uppercase tracking-widest">
          [ Click Visual to Capture Variable ]
        </p>
      </motion.div>
    </motion.div>
  );
}
