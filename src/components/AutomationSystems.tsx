'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useHydrated } from '@/utils/useHydrated';
import { AutomationSystem } from '@/types';
import { ChevronDownIcon, ChevronUpIcon, PlayIcon } from '@heroicons/react/24/outline';
import { SpotlightCard } from '@/components/SpotlightCard';

interface AutomationSystemsProps {
  flagship: AutomationSystem;
  supporting: AutomationSystem[];
}

export function AutomationSystems({ flagship, supporting }: AutomationSystemsProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const hydrated = useHydrated();

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const expandVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: {
      height: 'auto',
      opacity: 1,
      transition: {
        height: { duration: 0.3, ease: 'easeOut' },
        opacity: { duration: 0.2, delay: 0.1 }
      }
    }
  };

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ background: '#0A0A0A' }}
    >
      {/* Gradient divider top */}
      <div className="section-divider-glow absolute top-0 left-0 right-0" />

      {/* Ambient glow */}
      <div className="ambient-glow" style={{ top: '-10%', right: '-5%', opacity: 0.25 }} />
      <div className="ambient-glow-2" style={{ bottom: '-10%', left: '-5%', opacity: 0.2 }} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={sectionVariants}
          initial={hydrated ? "hidden" : false}
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 text-xs font-mono font-semibold uppercase tracking-widest"
            style={{
              background: 'rgba(17,17,17,0.7)',
              border: '1px solid rgba(39,39,42,0.8)',
              color: '#A1A1AA',
              borderRadius: '20px',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-white glow-pulse" />
            AI-Powered Automation Systems
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-5 text-white" style={{ letterSpacing: '-0.03em' }}>
            Intelligent Workflows
          </h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: '#71717A' }}>
            Automation built for real teams, real decisions, real operational pressure.
          </p>
        </motion.div>

        {/* Flagship Case Study */}
        <motion.div
          variants={sectionVariants}
          initial={hydrated ? "hidden" : false}
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-16"
        >
          <SpotlightCard>
            <div
              className="glass-card p-8 relative overflow-hidden"
              style={{ borderRadius: '16px' }}
            >
              {/* Corner accent — animated draw-in */}
              <motion.div
                className="absolute top-0 right-0 pointer-events-none"
                initial={{ opacity: 0, scaleX: 0, scaleY: 0 }}
                whileInView={{ opacity: 1, scaleX: 1, scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                style={{ transformOrigin: 'top right' }}
              >
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <path d="M80 0 L80 80" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                  <path d="M0 0 L80 0" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                  <path d="M60 0 L80 0 L80 20" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" />
                </svg>
              </motion.div>

              {/* Header */}
              <div className="mb-8 relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-2 h-2 rounded-full bg-white glow-pulse" />
                  <span className="mono-label">Production System · Live</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ letterSpacing: '-0.02em' }}>
                  {flagship.title}
                </h3>
                {flagship.subtitle && (
                  <p className="text-lg font-medium mb-4 leading-relaxed" style={{ color: '#A1A1AA' }}>
                    {flagship.subtitle}
                  </p>
                )}
                <p className="leading-relaxed mb-6" style={{ color: '#A1A1AA' }}>
                  {flagship.description}
                </p>

                {/* Key Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Business AI', 'Internal Tools', 'Intelligent Automation'].map(tag => (
                    <span key={tag} className="tech-badge">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Expandable Sections */}
              <div className="space-y-3 relative z-10">
                {[
                  { id: 'business-context', label: 'Business Context', content: flagship.businessContext, type: 'text' as const },
                  { id: 'capabilities', label: 'System Capabilities', content: flagship.systemCapabilities, type: 'list' as const },
                  { id: 'architecture', label: 'Architecture & Reliability', content: flagship.architecture, type: 'list' as const },
                  { id: 'outcome', label: 'Outcome', content: flagship.outcome, type: 'text' as const },
                ].map(({ id, label, content, type }) => (
                  <div
                    key={id}
                    className="overflow-hidden"
                    style={{
                      border: `1px solid ${expandedSections[id] ? 'rgba(63,63,70,0.9)' : 'rgba(39,39,42,0.8)'}`,
                      borderRadius: '10px',
                      transition: 'border-color 0.2s ease',
                      background: 'rgba(17,17,17,0.5)',
                    }}
                  >
                    <button
                      onClick={() => toggleSection(id)}
                      className="w-full flex items-center justify-between p-4 text-left transition-colors"
                      style={{ color: '#FFFFFF' }}
                    >
                      <span className="font-medium text-sm">{label}</span>
                      {expandedSections[id]
                        ? <ChevronUpIcon className="w-4 h-4" style={{ color: '#71717A' }} />
                        : <ChevronDownIcon className="w-4 h-4" style={{ color: '#71717A' }} />}
                    </button>
                    <motion.div
                      variants={expandVariants}
                      initial="collapsed"
                      animate={expandedSections[id] ? 'expanded' : 'collapsed'}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4" style={{ color: '#A1A1AA' }}>
                        {type === 'list' && Array.isArray(content) ? (
                          <ul className="space-y-2">
                            {(content as string[]).map((item, i) => (
                              <li key={i} className="flex items-start text-sm leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full mt-1.5 mr-3 flex-shrink-0" style={{ background: '#3F3F46' }} />
                                {item}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm leading-relaxed">{content as string}</p>
                        )}
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div className="mt-6 mb-8 relative z-10">
                <div className="flex flex-wrap gap-2">
                  {flagship.technologies?.map((tech, index) => (
                    <span key={index} className="tech-badge">{tech}</span>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                {flagship.demoUrl && (
                  <motion.a
                    href={flagship.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <PlayIcon className="w-4 h-4" />
                    Watch Demo
                  </motion.a>
                )}
                <motion.a
                  href="/contact"
                  className="btn-glass flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get in Touch
                </motion.a>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Supporting Systems Header */}
        <motion.div
          variants={sectionVariants}
          initial={hydrated ? "hidden" : false}
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full glow-pulse" style={{ background: '#FFFFFF' }} />
            <span className="mono-label">Supporting Systems</span>
            <div className="w-2 h-2 rounded-full glow-pulse" style={{ background: '#FFFFFF' }} />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
            Additional Production Automation Systems
          </h3>
          <p className="max-w-2xl mx-auto" style={{ color: '#71717A' }}>
            Reinforcing architectural depth and range across different domains and use cases.
          </p>
        </motion.div>

        {/* Supporting Systems Grid */}
        <motion.div
          variants={sectionVariants}
          initial={hydrated ? "hidden" : false}
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {supporting.map((system) => (
            <motion.div
              key={system.id}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <SpotlightCard className="h-full">
                <div className="glass-card p-6 h-full group" style={{ borderRadius: '12px' }}>
                  <h4 className="text-xl font-semibold text-white mb-3 transition-colors" style={{ letterSpacing: '-0.01em' }}>
                    {system.title}
                  </h4>
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: '#71717A' }}>
                    {system.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div>
                      <span className="mono-label block mb-1">System Purpose</span>
                      <p className="text-sm" style={{ color: '#A1A1AA' }}>{system.systemPurpose}</p>
                    </div>
                    <div>
                      <span className="mono-label block mb-1">Architecture</span>
                      <div>
                        {system.architecture && Array.isArray(system.architecture) ? (
                          <ul className="space-y-1">
                            {(system.architecture as string[]).map((item, index) => (
                              <li key={index} className="text-sm flex items-start" style={{ color: '#A1A1AA' }}>
                                <span className="w-1 h-1 rounded-full mt-2 mr-2 flex-shrink-0" style={{ background: '#3F3F46' }} />
                                {item}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm" style={{ color: '#A1A1AA' }}>{system.architecture as string}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {system.tools?.map((tool, toolIndex) => (
                        <span key={toolIndex} className="tech-badge">{tool}</span>
                      ))}
                    </div>
                  </div>

                  {system.demoUrl && (
                    <a
                      href={system.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm transition-all duration-200 hover:text-white"
                      style={{ color: '#71717A' }}
                    >
                      <PlayIcon className="w-4 h-4" />
                      View Demo
                    </a>
                  )}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}