'use client';

import { motion } from 'framer-motion';
import { testimonial } from '@/data/portfolio';

export default function Testimonial() {
  return (
    <section
      className="relative overflow-hidden py-20"
      style={{ background: '#080d1a' }}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(ellipse, rgba(124,58,237,0.08), transparent 70%)',
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          {/* Section label */}
          <div className="mb-12 flex items-center justify-center gap-3">
            <div
              className="h-px max-w-16 flex-1"
              style={{ background: 'rgba(124,58,237,0.3)' }}
            />
            <p
              className="font-mono text-xs uppercase tracking-widest"
              style={{ color: 'rgba(124,58,237,0.8)' }}
            >
              What They Say
            </p>
            <div
              className="h-px max-w-16 flex-1"
              style={{ background: 'rgba(124,58,237,0.3)' }}
            />
          </div>

          {/* Card */}
          <motion.div
            className="relative rounded-2xl p-8 md:p-12"
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
              className="pointer-events-none absolute left-8 top-6 select-none font-serif text-8xl leading-none"
              style={{
                color: 'rgba(124,58,237,0.20)',
                fontFamily: 'Georgia, serif',
                lineHeight: 1,
              }}
              aria-hidden="true"
            >
              "
            </div>

            {/* Stars */}
            <div className="mb-6 flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  className="text-xl"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.3 + i * 0.08,
                    type: 'spring',
                    stiffness: 400,
                  }}
                >
                  ⭐
                </motion.span>
              ))}
            </div>

            {/* Quote */}
            <blockquote
              className="relative z-10 mb-8 text-center text-base font-light leading-loose md:text-xl"
              style={{
                color: 'rgba(226,232,240,0.90)',
                fontStyle: 'italic',
                letterSpacing: '0.01em',
              }}
            >
              "{testimonial.quote}"
            </blockquote>

            {/* Attribution */}
            <div className="flex flex-col items-center gap-1">
              <div
                className="mb-3 h-0.5 w-10 rounded-full"
                style={{ background: 'rgba(124,58,237,0.6)' }}
              />
              <p className="font-bold text-white">{testimonial.author}</p>
              <p className="text-sm" style={{ color: '#a78bfa' }}>
                {testimonial.title}
              </p>
              <p
                className="mt-0.5 font-mono text-xs"
                style={{ color: '#64748b' }}
              >
                {testimonial.company}
              </p>
              <a
                href="/documents/tafara-rugara-reference.pdf"
                download="Tafara-Rugara-Reference-Letter.pdf"
                className="mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'rgba(124,58,237,0.15)',
                  border: '1px solid rgba(124,58,237,0.35)',
                  color: '#a78bfa',
                }}
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
