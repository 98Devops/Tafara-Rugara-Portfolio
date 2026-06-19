'use client';

import { motion } from 'framer-motion';
import { TechnicalCapability } from '@/types';
import { SpotlightCard } from '@/components/SpotlightCard';

// Category → icon mapping
const CATEGORY_ICONS: Record<string, string> = {
  'Cloud Architecture':         '☁️',
  'DevOps & CI/CD':             '⚙️',
  'Automation Engineering':     '🤖',
  'Monitoring & Reliability':   '📡',
};

interface CapabilityCardProps {
  capability: TechnicalCapability;
  index: number;
}

export default function CapabilityCard({ capability, index }: CapabilityCardProps) {
  const icon = CATEGORY_ICONS[capability.category] ?? '🔧';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
    >
      <SpotlightCard className="h-full">
        <div className="glass-card p-6 flex flex-col h-full">
          {/* Category header */}
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <motion.div
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: 36, height: 36,
                background: 'rgba(24, 24, 27, 0.9)',
                border: '1px solid rgba(39, 39, 42, 0.8)',
                borderRadius: 8,
                transition: 'box-shadow 0.3s ease',
              }}
              whileHover={{
                boxShadow: '0 0 16px rgba(255,255,255,0.08)',
              }}
            >
              <span style={{ fontSize: '18px' }}>{icon}</span>
            </motion.div>
            <h3 className="text-base font-semibold text-white leading-tight">
              {capability.category}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-5 relative z-10" style={{ color: '#A1A1AA' }}>
            {capability.description}
          </p>

          {/* Skills as monospace tags — staggered reveal */}
          <motion.div
            className="flex flex-wrap gap-2 mt-auto relative z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-30px' }}
            transition={{ staggerChildren: 0.04, delayChildren: 0.2 + index * 0.08 }}
          >
            {capability.skills.map((skill) => (
              <motion.span
                key={skill}
                className="tech-badge"
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 4 },
                  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
                }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}