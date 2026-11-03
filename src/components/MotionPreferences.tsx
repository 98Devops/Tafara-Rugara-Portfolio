'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const MotionContext = createContext({
  paused: false,
  reduced: false,
  toggle: () => {},
});
export function MotionPreferences({ children }: { children: React.ReactNode }) {
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);
  return (
    <MotionContext.Provider
      value={{ paused, reduced, toggle: () => setPaused(value => !value) }}
    >
      <div className={paused ? 'site-frame motion-paused' : 'site-frame'}>
        {children}
      </div>
    </MotionContext.Provider>
  );
}
export function useMotionPreferences() {
  return useContext(MotionContext);
}
export function MotionToggle() {
  const { paused, toggle } = useMotionPreferences();
  return (
    <button
      className="motion-toggle"
      type="button"
      aria-pressed={paused}
      onClick={toggle}
    >
      {paused ? 'Resume animation' : 'Pause animation'}{' '}
      <span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span>
    </button>
  );
}
