'use client';

import React from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ClientPerformanceInit } from '@/components/ClientPerformanceInit';
import { Navigation } from '@/components/Navigation';
import { PerformanceMonitor } from '@/components/PerformanceMonitor';
import Footer from '@/components/Footer';

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary>
      <ClientPerformanceInit />
      <a href="#portfolio-content" className="skip-link">
        Skip to content
      </a>
      <Navigation />
      <div id="portfolio-content" tabIndex={-1} className="min-h-screen">
        {children}
      </div>
      <Footer />
      <PerformanceMonitor />
    </ErrorBoundary>
  );
}
