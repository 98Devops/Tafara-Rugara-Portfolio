/**
 * Performance optimization utilities
 */

// Preload critical resources
export function preloadResource(href: string, as: string, type?: string, crossorigin?: string) {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;
  if (crossorigin) link.crossOrigin = crossorigin;
  
  document.head.appendChild(link);
}

// Preload images
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

// Lazy load images with intersection observer
export function createImageObserver(callback: (entry: IntersectionObserverEntry) => void) {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  return new IntersectionObserver(
    (entries) => {
      entries.forEach(callback);
    },
    {
      rootMargin: '50px 0px',
      threshold: 0.01,
    }
  );
}

// Debounce function for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle function for performance
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Get connection speed
export function getConnectionSpeed(): 'slow' | 'fast' | 'unknown' {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return 'unknown';
  }

  const connection = (navigator as any).connection;
  if (!connection) return 'unknown';

  // Consider 2G and slow-2g as slow
  if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
    return 'slow';
  }

  return 'fast';
}

// Measure performance
export function measurePerformance(name: string, fn: () => void | Promise<void>) {
  if (typeof performance === 'undefined') {
    return fn();
  }

  const start = performance.now();
  const result = fn();

  if (result instanceof Promise) {
    return result.finally(() => {
      const end = performance.now();
      console.log(`${name} took ${end - start} milliseconds`);
    });
  } else {
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
    return result;
  }
}

// Resource loading priorities
export const RESOURCE_PRIORITIES = {
  CRITICAL: 'high',
  IMPORTANT: 'medium',
  OPTIONAL: 'low',
} as const;

// Preload critical resources on page load
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;

  // Preload critical fonts
  preloadResource('/fonts/jetbrains-mono.woff2', 'font', 'font/woff2', 'anonymous');
  
  // Preload critical images
  preloadImage('/images/placeholder.svg').catch(() => {
    // Silently fail if image doesn't exist
  });

  // Preload critical documents
  preloadResource('/documents/tafara-rugara-cv.pdf', 'document', 'application/pdf');
}

// Initialize performance optimizations
export function initializePerformanceOptimizations() {
  if (typeof window === 'undefined') return;

  // Preload critical resources
  preloadCriticalResources();

  // Add performance observer for long tasks
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            console.warn('Long task detected:', {
              duration: entry.duration,
              startTime: entry.startTime,
            });
          }
        }
      });

      observer.observe({ entryTypes: ['longtask'] });
    } catch (error) {
      // Silently fail if not supported
    }
  }
}