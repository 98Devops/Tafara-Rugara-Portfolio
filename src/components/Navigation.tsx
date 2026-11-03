'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useMotionPreferences } from './MotionPreferences';
import { ThemeToggle } from './ThemeProvider';
import { NavigationItem } from '@/types';

const navigationItems: NavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'What I Do', href: '/what-i-do' },
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Contact', href: '/contact' },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const { paused } = useMotionPreferences();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    if (isMobileMenuOpen) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      className="fixed left-0 right-0 top-0 z-50 border-b border-line"
      style={{
        background: 'color-mix(in srgb, var(--ink) 88%, transparent)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="wrap">
        <div
          className="flex items-center justify-between"
          style={{ height: 60 }}
        >
          {/* Monogram + name */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-mono text-bone"
            style={{ fontSize: '0.82rem', letterSpacing: '0.04em' }}
            aria-label="Tafara Rugara – Home"
          >
            <span className="live-dot" aria-hidden="true" />
            <span className="hidden sm:inline">TAFARA RUGARA</span>
            <span className="sm:hidden">TR</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-7 lg:flex">
            {navigationItems.map(item => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-mono transition-colors duration-150 hover:text-bone"
                  style={{
                    fontSize: '0.74rem',
                    letterSpacing: '0.06em',
                    color: isActive ? 'var(--bone)' : 'var(--bone-dim)',
                  }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="nav-actions">
            <ThemeToggle />
            {/* CTA (kept out of the nav-items group) */}
            <Link
              href="/contact"
              className="hidden rounded-sm border border-line-2 font-mono text-bone transition-colors duration-150 hover:border-ember hover:text-ember lg:inline-flex"
              style={{
                fontSize: '0.74rem',
                letterSpacing: '0.06em',
                padding: '0.5rem 1rem',
              }}
            >
              Get in touch
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-bone-dim transition-colors hover:text-bone lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="flex h-4 w-5 flex-col justify-between">
                <span className="block h-px w-5 bg-current" />
                <span className="block h-px w-5 bg-current" />
                <span className="block h-px w-5 bg-current" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: reducedMotion || paused ? 0 : 0.2 }}
            className="border-b border-line lg:hidden"
            style={{ background: 'var(--ink)' }}
          >
            <div className="wrap flex flex-col py-4">
              {navigationItems.map(item => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-3 font-mono transition-colors hover:text-bone"
                    style={{
                      fontSize: '0.82rem',
                      letterSpacing: '0.05em',
                      color: isActive ? 'var(--bone)' : 'var(--bone-dim)',
                      borderLeft: isActive
                        ? '2px solid var(--ember)'
                        : '2px solid transparent',
                      paddingLeft: '0.75rem',
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className="mt-3 rounded-sm border border-line-2 py-3 text-center font-mono text-bone transition-colors hover:border-ember hover:text-ember"
                style={{ fontSize: '0.78rem', letterSpacing: '0.06em' }}
              >
                Get in touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
