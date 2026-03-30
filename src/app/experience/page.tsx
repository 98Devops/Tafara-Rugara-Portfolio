'use client';

import { motion } from 'framer-motion';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import { portfolioData } from '@/data/portfolio';

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.2,
      ease: 'easeOut',
    },
  },
};

export default function Experience() {
  return (
    <main
      className="min-h-screen pt-16"
      style={{ background: '#0A0F1E', color: '#e2e8f0' }}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <motion.div
              className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs font-semibold uppercase tracking-widest"
              style={{
                background: 'rgba(124,58,237,0.08)',
                border: '1px solid rgba(124,58,237,0.25)',
                color: '#a78bfa',
              }}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span
                className="h-2 w-2 animate-pulse rounded-full"
                style={{ background: '#a78bfa' }}
              />
              Professional Journey
            </motion.div>
            <motion.h1
              variants={headerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="mb-4 text-4xl font-bold md:text-5xl"
              style={{
                background: 'linear-gradient(135deg, #00D4FF, #7C3AED)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Experience
            </motion.h1>
            <motion.p
              variants={subtitleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="mx-auto max-w-2xl leading-relaxed"
              style={{ color: 'rgba(148,163,184,0.85)' }}
            >
              Professional journey and measurable impact in DevOps engineering,
              AI automation, and cloud infrastructure.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <ExperienceTimeline experiences={portfolioData.experience} />
          </motion.div>
        </div>
      </div>
    </main>
  );
}
