'use client';

import { motion } from 'framer-motion';
import { Experience } from '@/types';

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export default function ExperienceTimeline({
  experiences,
}: ExperienceTimelineProps) {
  return (
    <div className="relative">
      {/* Glowing vertical line */}
      <motion.div
        className="absolute bottom-0 left-8 top-0 w-px"
        style={{
          background:
            'linear-gradient(to bottom, #00D4FF, #7C3AED, rgba(0,212,255,0.1))',
          boxShadow: '0 0 8px rgba(0,212,255,0.3)',
        }}
        initial={{ scaleY: 0, originY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
      />

      {experiences.map((experience, index) => (
        <motion.div
          key={`${experience.company}-${experience.position}`}
          className="relative pb-14 pl-20 last:pb-0"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.15 }}
        >
          {/* Pulsing timeline dot */}
          <motion.div
            className="absolute left-[26px] top-2"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div
              className="flex h-4 w-4 items-center justify-center rounded-full"
              style={{
                background: 'rgba(0,212,255,0.15)',
                border: '2px solid #00D4FF',
                boxShadow: '0 0 12px rgba(0,212,255,0.4)',
              }}
            >
              <div
                className="h-2 w-2 rounded-full"
                style={{
                  background: '#00D4FF',
                  animation: 'pulseDot 2s ease-in-out infinite',
                }}
              />
            </div>
          </motion.div>

          {/* Card */}
          <motion.div
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="glass-card p-6 shadow-xl"
          >
            {/* Header */}
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="mb-1 text-xl font-bold text-white">
                  {experience.position}
                </h3>
                <p className="font-semibold" style={{ color: '#00D4FF' }}>
                  {experience.company}
                </p>
                <p
                  className="mt-1 font-mono text-sm"
                  style={{ color: '#64748b' }}
                >
                  {experience.duration}
                </p>
              </div>
              {/* Impact badge */}
              {experience.impact && (
                <motion.div
                  className="flex-shrink-0 rounded-xl px-4 py-2 text-center"
                  style={{
                    background: 'rgba(16,185,129,0.12)',
                    border: '1px solid rgba(16,185,129,0.35)',
                    boxShadow: '0 0 16px rgba(16,185,129,0.15)',
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 }}
                >
                  <div
                    className="mb-1 font-mono text-xs uppercase tracking-widest"
                    style={{ color: '#34d399' }}
                  >
                    Key Impact
                  </div>
                  <div
                    className="text-sm font-bold"
                    style={{ color: '#6ee7b7' }}
                  >
                    {experience.impact}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Achievements */}
            <div className="mb-5">
              <h4
                className="mb-3 text-sm font-semibold uppercase tracking-widest"
                style={{ color: 'rgba(0,212,255,0.7)' }}
              >
                Key Achievements
              </h4>
              <motion.ul
                className="space-y-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ staggerChildren: 0.07, delayChildren: 0.2 }}
              >
                {experience.achievements.map((item, i) => (
                  <motion.li
                    key={i}
                    variants={{
                      hidden: { opacity: 0, x: -12 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.4 },
                      },
                    }}
                    className="flex items-start gap-3 text-sm leading-relaxed"
                    style={{ color: 'rgba(203,213,225,0.85)' }}
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{
                        background: '#00D4FF',
                        boxShadow: '0 0 6px rgba(0,212,255,0.5)',
                      }}
                    />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* Technologies */}
            <div>
              <h4
                className="mb-3 text-sm font-semibold uppercase tracking-widest"
                style={{ color: 'rgba(124,58,237,0.8)' }}
              >
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, i) => (
                  <motion.span
                    key={tech}
                    className={`tech-badge ${i % 3 === 1 ? 'tech-badge-violet' : i % 3 === 2 ? 'tech-badge-emerald' : ''}`}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.04 }}
                    whileHover={{ scale: 1.06, y: -2 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
