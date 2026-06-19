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

const mobileItemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.3, ease: 'easeOut' },
  }),
};

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10,10,10,0.92)' : 'rgba(10,10,10,0.70)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(39,39,42,0.6)' : '1px solid rgba(39,39,42,0.3)',
      }}
    >
      {/* Subtle top glow line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.06) 70%, transparent 100%)',
          opacity: scrolled ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo monogram ── */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Tafara Rugara – Home"
          >
            <div
              className="w-8 h-8 flex items-center justify-center text-xs font-bold transition-all duration-200"
              style={{
                background: '#111111',
                border: '1px solid #27272A',
                borderRadius: '6px',
                fontFamily: '"JetBrains Mono", monospace',
                color: '#FFFFFF',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 12px rgba(255,255,255,0.08)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
            >
              TR
            </div>
            <span
              className="hidden sm:block font-semibold text-sm text-white transition-colors duration-150 group-hover:text-zinc-300"
            >
              Tafara Rugara
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <div className="hidden md:flex items-center gap-6">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative text-sm font-medium transition-all duration-200 focus:outline-none pb-0.5"
                  style={{
                    color: isActive ? '#FFFFFF' : '#71717A',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.textShadow = '0 0 10px rgba(255,255,255,0.15)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.textShadow = 'none';
                  }}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-white"
                      style={{
                        boxShadow: '0 0 8px rgba(255,255,255,0.3)',
                        borderRadius: '1px',
                      }}
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Hire Me CTA — shimmer idle */}
            <Link
              href="/contact"
              className="ml-2 px-4 py-2 text-sm font-semibold transition-all duration-200 shimmer-idle"
              style={{
                background: '#FFFFFF',
                color: '#0A0A0A',
                border: '1px solid #FFFFFF',
                borderRadius: '6px',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = '#0A0A0A';
                (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(255,255,255,0.12)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = '#FFFFFF';
                (e.currentTarget as HTMLElement).style.color = '#0A0A0A';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              Hire Me
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 transition-colors focus:outline-none"
            style={{ color: '#A1A1AA' }}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <motion.div animate={isMobileMenuOpen ? 'open' : 'closed'} className="w-5 h-4 flex flex-col justify-between">
              {[
                { closed: { rotate: 0, y: 0 },  open: { rotate: 45, y: 8 } },
                { closed: { opacity: 1 },        open: { opacity: 0 } },
                { closed: { rotate: 0, y: 0 },  open: { rotate: -45, y: -8 } },
              ].map((v, i) => (
                <motion.span
                  key={i}
                  variants={v}
                  className="w-5 h-px block origin-center bg-zinc-400"
                />
              ))}
            </motion.div>
          </button>
        </div>
      </div>

      {/* ── Mobile menu — staggered reveal ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-black/70 md:hidden"
              style={{ backdropFilter: 'blur(4px)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 md:hidden"
              style={{
                background: 'rgba(10, 10, 10, 0.95)',
                backdropFilter: 'blur(16px)',
                borderBottom: '1px solid rgba(39,39,42,0.6)',
              }}
            >
              <div className="container mx-auto px-6 py-4 flex flex-col gap-1">
                {navigationItems.map((item, i) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      custom={i}
                      variants={mobileItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        href={item.href}
                        className="px-3 py-3 text-sm font-medium transition-all duration-200 block"
                        style={{
                          color:      isActive ? '#FFFFFF' : '#71717A',
                          borderLeft: isActive ? '2px solid #FFFFFF' : '2px solid transparent',
                          paddingLeft: '12px',
                        }}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
                <motion.div
                  custom={navigationItems.length}
                  variants={mobileItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href="/contact"
                    className="mt-3 px-4 py-3 text-sm font-semibold text-center block"
                    style={{
                      background: '#FFFFFF',
                      color: '#0A0A0A',
                      border: '1px solid #FFFFFF',
                      borderRadius: '6px',
                    }}
                  >
                    Hire Me
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}