'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close on Escape
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
      className="fixed left-0 right-0 top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10,15,30,0.92)' : 'rgba(10,15,30,0.65)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled
          ? '1px solid rgba(0,212,255,0.15)'
          : '1px solid rgba(0,212,255,0.06)',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* ── Logo monogram ── */}
          <Link
            href="/"
            className="group flex items-center gap-2 focus:outline-none"
            aria-label="Tafara Rugara – Home"
          >
            {/* Code-bracket logo */}
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold transition-all duration-200 group-hover:scale-105"
              style={{
                background:
                  'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))',
                border: '1px solid rgba(0,212,255,0.30)',
                color: '#00D4FF',
                fontFamily: 'var(--font-jetbrains-mono)',
                boxShadow: '0 0 12px rgba(0,212,255,0.15)',
              }}
            >
              {'<TR/>'}
            </div>
            <span
              className="hidden text-sm font-semibold transition-all duration-200 sm:block"
              style={{
                background: 'linear-gradient(135deg, #00D4FF, #7C3AED)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Tafara Rugara
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <div className="hidden items-center gap-1 md:flex">
            {navigationItems.map(item => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none"
                  style={{
                    color: isActive ? '#00D4FF' : 'rgba(203,213,225,0.75)',
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navPill"
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: 'rgba(0,212,255,0.10)',
                        border: '1px solid rgba(0,212,255,0.25)',
                        boxShadow: '0 0 12px rgba(0,212,255,0.10)',
                      }}
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 35,
                      }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}

            {/* CTA */}
            <Link
              href="/contact"
              className="ml-3 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #00D4FF, #0090b0)',
                color: '#000a10',
                boxShadow: '0 2px 12px rgba(0,212,255,0.25)',
              }}
            >
              Hire Me
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-2 transition-colors focus:outline-none md:hidden"
            style={{ color: 'rgba(203,213,225,0.8)' }}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <motion.div
              animate={isMobileMenuOpen ? 'open' : 'closed'}
              className="flex h-5 w-6 flex-col justify-between"
            >
              {[
                { closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 9 } },
                { closed: { opacity: 1 }, open: { opacity: 0 } },
                { closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -9 } },
              ].map((v, i) => (
                <motion.span
                  key={i}
                  variants={v}
                  className="block h-0.5 w-6 origin-center"
                  style={{ background: 'rgba(0,212,255,0.8)' }}
                />
              ))}
            </motion.div>
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-full md:hidden"
              style={{
                background: 'rgba(10,15,30,0.97)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(0,212,255,0.15)',
              }}
            >
              <div className="container mx-auto flex flex-col gap-1 px-4 py-4">
                {navigationItems.map(item => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-lg px-4 py-3 text-base font-medium transition-all duration-200"
                      style={{
                        color: isActive ? '#00D4FF' : 'rgba(203,213,225,0.80)',
                        background: isActive
                          ? 'rgba(0,212,255,0.10)'
                          : 'transparent',
                        border: isActive
                          ? '1px solid rgba(0,212,255,0.25)'
                          : '1px solid transparent',
                      }}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <Link
                  href="/contact"
                  className="mt-2 rounded-lg px-4 py-3 text-center text-base font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #00D4FF, #0090b0)',
                    color: '#000a10',
                  }}
                >
                  Hire Me
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
