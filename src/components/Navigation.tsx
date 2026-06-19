'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { NavigationItem } from '@/types';

const navigationItems: NavigationItem[] = [
  { label: 'Home',       href: '/' },
  { label: 'What I Do',  href: '/what-i-do' },
  { label: 'Projects',   href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Contact',    href: '/contact' },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setIsMobileMenuOpen(false); }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsMobileMenuOpen(false); };
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
      className="fixed top-0 left-0 right-0 z-50 border-b border-line"
      style={{ background: 'color-mix(in srgb, var(--ink) 88%, transparent)', backdropFilter: 'blur(8px)' }}
    >
      <div className="wrap">
        <div className="flex items-center justify-between" style={{ height: 60 }}>

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
          <div className="hidden md:flex items-center gap-7">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
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

          {/* CTA (kept out of the nav-items group) */}
          <Link
            href="/contact"
            className="hidden md:inline-flex font-mono text-bone border border-line-2 rounded-sm transition-colors duration-150 hover:border-ember hover:text-ember"
            style={{ fontSize: '0.74rem', letterSpacing: '0.06em', padding: '0.5rem 1rem' }}
          >
            Get in touch
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-bone-dim transition-colors hover:text-bone"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="w-5 h-4 flex flex-col justify-between">
              <span className="w-5 h-px block bg-current" />
              <span className="w-5 h-px block bg-current" />
              <span className="w-5 h-px block bg-current" />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-line"
            style={{ background: 'var(--ink)' }}
          >
            <div className="wrap py-4 flex flex-col">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="font-mono py-3 transition-colors hover:text-bone"
                    style={{
                      fontSize: '0.82rem',
                      letterSpacing: '0.05em',
                      color: isActive ? 'var(--bone)' : 'var(--bone-dim)',
                      borderLeft: isActive ? '2px solid var(--ember)' : '2px solid transparent',
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
                className="font-mono mt-3 text-center text-bone border border-line-2 rounded-sm py-3 transition-colors hover:border-ember hover:text-ember"
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
