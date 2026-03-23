'use client';

import React from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ClientPerformanceInit } from '@/components/ClientPerformanceInit';
import { Navigation } from '@/components/Navigation';
import { PerformanceMonitor } from '@/components/PerformanceMonitor';

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <ClientPerformanceInit />
      <Navigation />
      <div className="min-h-screen">
        {children}
      </div>
      <PerformanceMonitor />
    </ErrorBoundary>
  );
}
