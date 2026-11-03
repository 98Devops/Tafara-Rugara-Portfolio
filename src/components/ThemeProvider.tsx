'use client';
import { createContext, useContext, useEffect, useState } from 'react';
export type Theme = 'light' | 'dark';
const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: 'light',
  toggle: () => {},
});
function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'light' ? '#f4f1e9' : '#111214');
}
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem('tafara-theme');
    } catch {
      /* Storage is optional. */
    }
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const initial =
      stored === 'light' || stored === 'dark'
        ? stored
        : media.matches
          ? 'dark'
          : 'light';
    setTheme(initial);
    applyTheme(initial);
    const onSystem = (event: MediaQueryListEvent) => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem('tafara-theme');
      } catch {}
      if (!saved) {
        const next = event.matches ? 'dark' : 'light';
        setTheme(next);
        applyTheme(next);
      }
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === 'tafara-theme') {
        const next =
          event.newValue === 'dark'
            ? 'dark'
            : event.newValue === 'light'
              ? 'light'
              : media.matches
                ? 'dark'
                : 'light';
        setTheme(next);
        applyTheme(next);
      }
    };
    media.addEventListener('change', onSystem);
    window.addEventListener('storage', onStorage);
    return () => {
      media.removeEventListener('change', onSystem);
      window.removeEventListener('storage', onStorage);
    };
  }, []);
  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
    try {
      localStorage.setItem('tafara-theme', next);
    } catch {}
  }
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
export function useTheme() {
  return useContext(ThemeContext);
}
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={
        'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' theme'
      }
      title={'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' theme'}
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        {theme === 'dark' ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5" />
          </>
        ) : (
          <path d="M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z" />
        )}
      </svg>
      <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
  );
}
