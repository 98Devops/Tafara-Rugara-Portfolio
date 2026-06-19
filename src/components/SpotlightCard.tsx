'use client';

import { ReactNode, useRef, useCallback } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightSize?: number;
}

export function SpotlightCard({ children, className = '', spotlightSize = 400 }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty('--spotlight-x', `${x}px`);
    ref.current.style.setProperty('--spotlight-y', `${y}px`);
    ref.current.style.setProperty('--spotlight-size', `${spotlightSize}px`);
  }, [spotlightSize]);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`spotlight-card ${className}`}
    >
      {children}
    </div>
  );
}
