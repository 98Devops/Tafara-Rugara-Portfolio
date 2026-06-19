'use client';

import { motion } from 'framer-motion';
import { certifications } from '@/data/portfolio';
import { SpotlightCard } from '@/components/SpotlightCard';

export default function Certifications() {
  return (
    <section className="py-16 relative overflow-hidden" style={{ background: '#0A0A0A' }}>
      {/* Gradient divider at top */}
      <div className="section-divider-glow absolute top-0 left-0 right-0" />

      {/* Ambient glow */}
      <div className="ambient-glow" style={{ top: '-30%', left: '50%', transform: 'translateX(-50%)', opacity: 0.3 }} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="mono-label mb-3">Certifications &amp; Credentials</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-white" style={{ letterSpacing: '-0.01em' }}>
            AWS Certified &amp; Continuously Learning
          </h2>
        </motion.div>

        {/* Cert cards */}
        <div className="flex flex-wrap justify-center gap-5 max-w-3xl mx-auto">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              className="flex-1 min-w-[240px] max-w-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <SpotlightCard className="h-full">
                <div
                  className="h-full p-6 relative overflow-hidden glass-card"
                >
                  {/* Icon + Status */}
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <motion.span
                      className="text-2xl"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      {cert.icon}
                    </motion.span>
                    <span
                      className={`px-2.5 py-1 text-xs font-mono ${cert.status === 'Certified' ? 'glow-pulse' : ''}`}
                      style={{
                        background: 'rgba(10, 10, 10, 0.8)',
                        border: '1px solid rgba(39, 39, 42, 0.8)',
                        color: cert.status === 'Certified' ? '#FFFFFF' : '#71717A',
                        borderRadius: 4,
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      {cert.status === 'Certified' ? '✓ Certified' : '⏳ In Progress'}
                    </span>
                  </div>

                  {/* Badge code */}
                  <div className="mono-label mb-2 relative z-10">{cert.badge}</div>

                  {/* Name */}
                  <h3 className="text-sm font-semibold text-white mb-1 leading-tight relative z-10">{cert.name}</h3>
                  <p className="text-xs font-mono relative z-10" style={{ color: '#71717A' }}>{cert.issuer} · {cert.year}</p>

                  {/* Progress bar — shimmer effect */}
                  {cert.status !== 'Certified' && (
                    <div className="mt-4 relative z-10">
                      <div className="flex justify-between text-xs font-mono mb-1.5" style={{ color: '#71717A' }}>
                        <span>Exam prep</span><span>~60%</span>
                      </div>
                      <div className="h-[2px] overflow-hidden rounded-full" style={{ background: '#27272A' }}>
                        <motion.div
                          className="h-full relative"
                          style={{
                            background: 'linear-gradient(90deg, #3F3F46, #FFFFFF, #3F3F46)',
                            backgroundSize: '200% 100%',
                          }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '60%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.0, delay: 0.3, ease: 'easeOut' }}
                          animate={{
                            backgroundPosition: ['0% center', '200% center'],
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Targeting note */}
        <motion.p
          className="text-center text-xs mt-8 font-mono"
          style={{ color: '#71717A' }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
        >
          Target: AWS SAA-C03 · April / May 2026
        </motion.p>
      </div>
    </section>
  );
}
