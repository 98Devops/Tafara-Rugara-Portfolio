'use client';

import { motion } from 'framer-motion';
import { testimonial } from '@/data/portfolio';

export default function Testimonial() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: '#080d1a' }}>
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.08), transparent 70%)' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          {/* Section label */}
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="h-px flex-1 max-w-16" style={{ background: 'rgba(124,58,237,0.3)' }} />
            <p className="text-xs font-mono uppercase tracking-widest" style={{ color: 'rgba(124,58,237,0.8)' }}>
              What They Say
            </p>
            <div className="h-px flex-1 max-w-16" style={{ background: 'rgba(124,58,237,0.3)' }} />
          </div>

          {/* Card */}
          <motion.div
            className="relative p-8 md:p-12 rounded-2xl"
            style={{
              background: 'rgba(15,22,41,0.70)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(124,58,237,0.25)',
              boxShadow: '0 0 60px rgba(124,58,237,0.08)',
            }}
            whileHover={{ boxShadow: '0 0 80px rgba(124,58,237,0.15)' }}
            transition={{ duration: 0.3 }}
          >
            {/* Large quote mark */}
            <div
              className="absolute top-6 left-8 text-8xl font-serif leading-none select-none pointer-events-none"
              style={{ color: 'rgba(124,58,237,0.20)', fontFamily: 'Georgia, serif', lineHeight: 1 }}
              aria-hidden="true"
            >
              "
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-6 justify-center">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  className="text-xl"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08, type: 'spring', stiffness: 400 }}
                >
                  ⭐
                </motion.span>
              ))}
            </div>

            {/* Quote */}
            <blockquote
              className="text-base md:text-xl leading-loose text-center mb-8 relative z-10 font-light"
              style={{ color: 'rgba(226,232,240,0.90)', fontStyle: 'italic', letterSpacing: '0.01em' }}
            >
              "{testimonial.quote}"
            </blockquote>

            {/* Attribution */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-0.5 rounded-full mb-3" style={{ background: 'rgba(124,58,237,0.6)' }} />
              <p className="font-bold text-white">{testimonial.author}</p>
              <p className="text-sm" style={{ color: '#a78bfa' }}>{testimonial.title}</p>
              <p className="text-xs font-mono mt-0.5" style={{ color: '#64748b' }}>{testimonial.company}</p>
              <a
                href="/documents/tafara-rugara-reference.pdf"
                download="Tafara-Rugara-Reference-Letter.pdf"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.35)', color: '#a78bfa' }}
              >
                ↓ Download Reference Letter
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
