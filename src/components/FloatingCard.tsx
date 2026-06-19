'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useRef, useCallback } from 'react';

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
}

export function FloatingCard({ children, className = '' }: FloatingCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 250, damping: 35 });
  const mouseYSpring = useSpring(y, { stiffness: 250, damping: 35 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);

    // Set spotlight position for CSS
    ref.current.style.setProperty('--spotlight-x', `${mouseX}px`);
    ref.current.style.setProperty('--spotlight-y', `${mouseY}px`);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative spotlight-card ${className}`}
      whileHover={{ scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 250, damping: 25 }}
    >
      {/* Spotlight gradient overlay */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none z-10 opacity-0 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(600px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(255,255,255,0.04) 0%, transparent 60%)',
          borderRadius: 'inherit',
        }}
      />
      <div style={{ transform: 'translateZ(30px)' }}>
        {children}
      </div>
    </motion.div>
  );
}
