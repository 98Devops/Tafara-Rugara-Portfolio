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
      ease: "easeOut"
    }
  }
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.2,
      ease: "easeOut"
    }
  }
};

export default function Experience() {
  return (
    <main className="min-h-screen pt-16 relative overflow-hidden" style={{ background: '#0A0A0A', color: '#A1A1AA' }}>
      {/* Ambient glow */}
      <div className="ambient-glow" style={{ top: '-5%', left: '60%', opacity: 0.3 }} />
      <div className="ambient-glow-2" style={{ bottom: '10%', left: '-5%', opacity: 0.2 }} />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 text-xs font-mono font-semibold uppercase tracking-widest"
              style={{
                background: 'rgba(17,17,17,0.7)',
                border: '1px solid rgba(39,39,42,0.8)',
                color: '#A1A1AA',
                borderRadius: '20px',
                backdropFilter: 'blur(8px)',
              }}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="w-2 h-2 rounded-full bg-white glow-pulse" />
              Professional Journey
            </motion.div>
            <motion.h1
              variants={headerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-4xl md:text-5xl font-bold mb-4 text-white"
              style={{ letterSpacing: '-0.03em' }}
            >
              Experience
            </motion.h1>
            <motion.p
              variants={subtitleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="max-w-2xl mx-auto leading-relaxed"
              style={{ color: '#71717A' }}
            >
              Professional journey and measurable impact in DevOps engineering, AI automation, and cloud infrastructure.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <ExperienceTimeline experiences={portfolioData.experience} />
          </motion.div>
        </div>
      </div>
    </main>
  );
}