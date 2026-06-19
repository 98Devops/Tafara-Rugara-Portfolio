'use client';

import { motion } from 'framer-motion';
import { testimonial } from '@/data/portfolio';

export default function Testimonial() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: '#0A0A0A' }}>
      {/* Ambient glow */}
      <div className="ambient-glow" style={{ top: '-20%', left: '50%', transform: 'translateX(-50%)', opacity: 0.25 }} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          {/* Section label */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(90deg, transparent, #3F3F46)' }} />
            <p className="mono-label">What They Say</p>
            <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(90deg, #3F3F46, transparent)' }} />
          </div>

          {/* Card */}
          <div
            className="relative p-8 md:p-12 glass-card spotlight-card"
            style={{
              borderRadius: '16px',
            }}
          >
            {/* Large quote mark — breathing animation */}
            <div
              className="absolute top-6 left-8 text-8xl font-serif leading-none select-none pointer-events-none quote-breathe"
              style={{ color: '#27272A', fontFamily: 'Georgia, serif', lineHeight: 1 }}
              aria-hidden="true"
            >
              &ldquo;
            </div>

            {/* Stars — sparkle effect */}
            <div className="flex gap-1 mb-6 justify-center relative z-10">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  className="text-white text-lg star-sparkle"
                  style={{ animationDelay: `${i * 0.3}s` }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.06, type: 'spring', stiffness: 400 }}
                >
                  ★
                </motion.span>
              ))}
            </div>

            {/* Quote */}
            <blockquote
              className="text-base md:text-lg leading-loose text-center mb-8 relative z-10"
              style={{ color: '#A1A1AA', fontStyle: 'italic' }}
            >
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            {/* Attribution */}
            <div className="flex flex-col items-center gap-1 relative z-10">
              <div className="w-8 h-px mb-4" style={{ background: 'linear-gradient(90deg, transparent, #3F3F46, transparent)' }} />
              <p className="font-semibold text-white">{testimonial.author}</p>
              <p className="text-sm" style={{ color: '#A1A1AA' }}>{testimonial.title}</p>
              <p className="text-xs font-mono mt-0.5" style={{ color: '#71717A' }}>{testimonial.company}</p>
              <a
                href="/documents/tafara-rugara-reference.pdf"
                download="Tafara-Rugara-Reference-Letter.pdf"
                className="inline-flex items-center gap-2 mt-5 px-4 py-2 text-xs font-mono transition-all duration-200"
                style={{
                  background: 'rgba(17,17,17,0.8)',
                  border: '1px solid rgba(39,39,42,0.8)',
                  color: '#A1A1AA',
                  borderRadius: '6px',
                  backdropFilter: 'blur(4px)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)';
                  (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 12px rgba(255,255,255,0.05)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(39,39,42,0.8)';
                  (e.currentTarget as HTMLElement).style.color = '#A1A1AA';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                ↓ Download Reference Letter
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
