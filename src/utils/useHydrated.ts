'use client';

import { useState, useEffect } from 'react';

/**
 * Returns true after the component has hydrated on the client.
 * Use this to defer animations so content is visible during SSR
 * and only starts animating after hydration.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}
