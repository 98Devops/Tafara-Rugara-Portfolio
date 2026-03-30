'use client';

import { useEffect } from 'react';

interface WebVitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production and in browser
    if (
      process.env.NODE_ENV !== 'production' ||
      typeof window === 'undefined'
    ) {
      return;
    }

    // Dynamic import to avoid loading in development
    import('web-vitals')
      .then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
        const sendToAnalytics = (metric: WebVitalMetric) => {
          // In a real application, you would send this to your analytics service
          // For now, we'll just log to console in production
          console.log('Web Vital:', metric);

          // Example: Send to Google Analytics 4
          if (typeof window !== 'undefined' && 'gtag' in window) {
            (window as Window & { gtag: (...args: unknown[]) => void }).gtag(
              'event',
              metric.name,
              {
                value: Math.round(
                  metric.name === 'CLS' ? metric.value * 1000 : metric.value
                ),
                event_category: 'Web Vitals',
                event_label: metric.id,
                non_interaction: true,
              }
            );
          }
        };

        // Measure Core Web Vitals
        onCLS(sendToAnalytics);
        onFID(sendToAnalytics);
        onFCP(sendToAnalytics);
        onLCP(sendToAnalytics);
        onTTFB(sendToAnalytics);
      })
      .catch(() => {
        // Silently fail if web-vitals can't be loaded
      });
  }, []);

  // Monitor long tasks that could impact performance
  useEffect(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    try {
      const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            // Tasks longer than 50ms
            console.warn('Long task detected:', {
              duration: entry.duration,
              startTime: entry.startTime,
            });
          }
        }
      });

      observer.observe({ entryTypes: ['longtask'] });

      return () => observer.disconnect();
    } catch {
      // Silently fail if PerformanceObserver is not supported
    }
  }, []);

  // Monitor memory usage (if available)
  useEffect(() => {
    if (typeof window === 'undefined' || !('memory' in performance)) {
      return;
    }

    const checkMemoryUsage = () => {
      const memory = (
        performance as Performance & {
          memory?: {
            usedJSHeapSize: number;
            totalJSHeapSize: number;
            jsHeapSizeLimit: number;
          };
        }
      ).memory;
      if (!memory) return;

      const usedMB = memory.usedJSHeapSize / 1048576;
      const totalMB = memory.totalJSHeapSize / 1048576;
      const limitMB = memory.jsHeapSizeLimit / 1048576;

      // Warn if memory usage is high
      if (usedMB > limitMB * 0.8) {
        console.warn('High memory usage detected:', {
          used: `${usedMB.toFixed(2)}MB`,
          total: `${totalMB.toFixed(2)}MB`,
          limit: `${limitMB.toFixed(2)}MB`,
        });
      }
    };

    // Check memory usage every 30 seconds
    const interval = setInterval(checkMemoryUsage, 30000);

    return () => clearInterval(interval);
  }, []);

  return null; // This component doesn't render anything
}

// Hook to measure custom performance metrics
export function usePerformanceMetric(name: string, value: number) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    // Mark the performance metric
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(`${name}-start`);

      setTimeout(() => {
        performance.mark(`${name}-end`);
        performance.measure(name, `${name}-start`, `${name}-end`);

        const measure = performance.getEntriesByName(name)[0];
        if (measure) {
          console.log(`Custom metric ${name}:`, measure.duration);
        }
      }, value);
    }
  }, [name, value]);
}
