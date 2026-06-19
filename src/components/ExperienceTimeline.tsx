'use client';

import { motion } from 'framer-motion';
import { Experience } from '@/types';
import { SpotlightCard } from '@/components/SpotlightCard';

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <div className="relative">
      {/* Gradient vertical line */}
      <motion.div
        className="absolute left-8 top-0 bottom-0 w-px"
        style={{ background: 'linear-gradient(to bottom, transparent, #3F3F46 15%, #27272A 50%, #3F3F46 85%, transparent)' }}
        initial={{ scaleY: 0, originY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
      />

      {experiences.map((experience, index) => (
        <motion.div
          key={`${experience.company}-${experience.position}`}
          className="relative pl-20 pb-12 last:pb-0"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
        >
          {/* Timeline dot — white square with glow */}
          <motion.div
            className="absolute left-[26px] top-2"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <div
              className="glow-pulse"
              style={{
                width: 8, height: 8,
                background: '#FFFFFF',
                borderRadius: 2,
                boxShadow: '0 0 8px rgba(255,255,255,0.2)',
              }}
            />
          </motion.div>

          {/* Card */}
          <SpotlightCard>
            <motion.div
              whileHover={{ y: -2, transition: { duration: 0.15 } }}
              className="glass-card p-6"
              style={{ borderRadius: 12 }}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1" style={{ letterSpacing: '-0.01em' }}>
                    {experience.position}
                  </h3>
                  <p className="font-medium" style={{ color: '#A1A1AA' }}>{experience.company}</p>
                  <p className="text-xs mt-1 font-mono" style={{ color: '#71717A' }}>{experience.duration}</p>
                </div>
                {/* Impact badge — enhanced with blur and refined border */}
                {experience.impact && (
                  <div
                    className="flex-shrink-0 px-3 py-2 text-center"
                    style={{
                      background: '#111111',
                      border: '1px solid rgba(39,39,42,0.8)',
                      borderRadius: 8,
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    <div className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: '#71717A' }}>
                      Key Impact
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {experience.impact}
                    </div>
                  </div>
                )}
              </div>

              {/* Achievements */}
              <div className="mb-6">
                <p className="mono-label mb-3">Key Achievements</p>
                <motion.ul
                  className="space-y-2"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ staggerChildren: 0.06, delayChildren: 0.1 }}
                >
                  {experience.achievements.map((item, i) => (
                    <motion.li
                      key={i}
                      variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0, transition: { duration: 0.35 } } }}
                      className="flex items-start gap-3 text-sm leading-relaxed"
                      style={{ color: '#A1A1AA' }}
                    >
                      <span
                        className="mt-2 flex-shrink-0 text-white"
                        style={{ fontSize: '6px', textShadow: '0 0 4px rgba(255,255,255,0.3)' }}
                      >
                        ●
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              {/* Technologies */}
              <div>
                <p className="mono-label mb-3">Technologies</p>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <span key={tech} className="tech-badge">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </SpotlightCard>
        </motion.div>
      ))}
    </div>
  );
}