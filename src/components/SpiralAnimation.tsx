'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface SpiralAnimationProps {
  onStop?: (magicNumber: number) => void;
  decorative?: boolean;
  className?: string;
}

export default function SpiralAnimation({ onStop, decorative = false, className = "" }: SpiralAnimationProps) {
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

      // Update rotation
      angleRef.current += 0.05; // Rotation speed
      
      // Count loops based on rotation
      // We'll count 1 loop every 360 degrees (2PI radians) of rotation
      const currentLoops = Math.floor(angleRef.current / (Math.PI * 2));
      if (currentLoops > loopCount) {
        loopCount = currentLoops;
        setLoops(loopCount);
      }

      // 3D Spiral Parameters
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 140;
      const height = 340;
      const turns = 5; // Number of turns in the spiral
      const pointsPerTurn = 50;
      const totalPoints = turns * pointsPerTurn;

      ctx.beginPath();
      ctx.strokeStyle = '#000000'; 
      ctx.lineWidth = 1;

      let firstPoint = true;

      // Morph
      const morph = (Math.sin(angleRef.current * 0.5) + 1) / 2;

      for (let i = 0; i < totalPoints; i++) {
        const progress = i / totalPoints;
        const angle = progress * Math.PI * 2 * turns + angleRef.current; 
        const y = (progress - 0.5) * height;
        
        // Taper: Wide at top (progress 0), Narrow at bottom (progress 1)
        const taper = 1.2 - (progress * 0.6);

        // Irregular oval shape
        // Add organic wobble
        const irregularity = Math.sin(angle * 2.5) * 20 + Math.cos(y * 0.05) * 15;
        const rX = (radius + irregularity) * taper;
        const rZ = ((radius * 0.6) + irregularity) * taper; 

        // 3D Helix
        const hx = Math.cos(angle) * rX;
        const hz = Math.sin(angle) * rZ;
        const hy = y; 

        // 2D Spiral
        // Grow radius from 0 to ~height/2
        const sRadius = (height * 0.6) * progress;
        const sx = Math.cos(angle) * sRadius;
        const sy = Math.sin(angle) * sRadius;
        const sz = 0;

        // Interpolate
        const xMixed = hx * morph + sx * (1 - morph);
        const yMixed = hy * morph + sy * (1 - morph);
        const zMixed = hz * morph + sz * (1 - morph);
        
        const scale = 400 / (400 + zMixed); 
        const x2d = centerX + xMixed * scale;
        const y2d = centerY + yMixed * scale;

        if (firstPoint) {
          ctx.moveTo(x2d, y2d);
          firstPoint = false;
        } else {
          ctx.lineTo(x2d, y2d);
        }
      }
      
      ctx.stroke();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating, decorative]);

  const handleClick = () => {
    if (decorative || !onStop) return;
    setIsAnimating(false);
    const magicNumber = Math.max(2, loops || 2); 
    setTimeout(() => onStop(magicNumber), 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex flex-col items-center ${className}`}
    >
      <div
        onClick={handleClick}
        className={decorative 
          ? "pointer-events-none"
          : "cursor-pointer bg-white p-4 mb-6 border-2 border-black hover:border-report-blue transition-colors"
        }
      >
        <canvas
          ref={canvasRef}
          width={600}
          height={600}
          className={`${decorative ? "" : "bg-gray-50"} w-full h-auto max-w-[600px]`}
        />
      </div>
      
      {!decorative && (
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
      )}
    </motion.div>
  );
}
