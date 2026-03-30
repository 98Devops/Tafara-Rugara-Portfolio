'use client';

import { motion } from 'framer-motion';
import CapabilityCard from '@/components/CapabilityCard';
import { portfolioData } from '@/data/portfolio';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

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

export default function WhatIDo() {
  return (
    <main
      className="min-h-screen pt-16"
      style={{ background: '#0A0F1E', color: '#e2e8f0' }}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <motion.div
              className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs font-semibold uppercase tracking-widest"
              style={{
                background: 'rgba(0,212,255,0.08)',
                border: '1px solid rgba(0,212,255,0.20)',
                color: '#00D4FF',
              }}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span
                className="h-2 w-2 animate-pulse rounded-full"
                style={{ background: '#00D4FF' }}
              />
              Specialist Capabilities
            </motion.div>
            <motion.h1
              variants={headerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="text-gradient-cyan mb-4 text-4xl font-bold md:text-5xl"
            >
              What I Do
            </motion.h1>
            <motion.p
              variants={subtitleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="mx-auto max-w-3xl leading-relaxed"
              style={{ color: 'rgba(148,163,184,0.85)' }}
            >
              Specialized expertise in Cloud Architecture, DevOps pipelines,
              AI-powered automation engineering, and system reliability —
              building production-grade solutions that deliver real operational
              value.
            </motion.p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {portfolioData.capabilities.map((capability, index) => (
              <CapabilityCard
                key={capability.category}
                capability={capability}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
