'use client';

import { useEffect } from 'react';
import { initializePerformanceOptimizations } from '@/utils/performance';

export function ClientPerformanceInit() {
  useEffect(() => {
    initializePerformanceOptimizations();
  }, []);

  return null;
}
