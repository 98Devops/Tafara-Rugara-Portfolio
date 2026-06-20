'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { AutomationSystem } from '@/types';
import { ChevronDownIcon, PlayIcon } from '@heroicons/react/24/outline';

interface AutomationSystemsProps {
  flagship: AutomationSystem;
  supporting: AutomationSystem[];
}

export function AutomationSystems({ flagship, supporting }: AutomationSystemsProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  const sections = [
    { id: 'business-context', label: 'Business Context', content: flagship.businessContext, type: 'text' as const },
    { id: 'capabilities', label: 'System Capabilities', content: flagship.systemCapabilities, type: 'list' as const },
    { id: 'architecture', label: 'Architecture & Reliability', content: flagship.architecture, type: 'list' as const },
    { id: 'outcome', label: 'Outcome', content: flagship.outcome, type: 'text' as const },
  ];

  return (
    <section className="border-b border-line" style={{ paddingBlock: 'var(--section-pad)' }}>
      <div className="wrap">
        {/* Header */}
        <div className="mb-10">
          <p className="label mb-3">// ai-powered automation systems</p>
          <h2 className="font-display text-bone" style={{ fontWeight: 400, fontSize: 'clamp(1.5rem, 3.4vw, 2.1rem)', letterSpacing: '-0.01em' }}>
            Intelligent workflows
          </h2>
          <p className="mt-3 text-bone-dim" style={{ maxWidth: '52ch', fontSize: '0.98rem', lineHeight: 1.6 }}>
            Automation built for real teams, real decisions, real operational pressure.
          </p>
        </div>

        {/* Flagship */}
        <div className="border border-line rounded-md p-6 sm:p-8 mb-10" style={{ background: 'var(--surface)' }}>
          <p className="label mb-4">Production system · Live</p>
          <h3 className="font-display text-bone mb-2" style={{ fontWeight: 400, fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', lineHeight: 1.15 }}>
            {flagship.title}
          </h3>
          {flagship.subtitle && (
            <p className="text-bone-dim mb-4" style={{ fontSize: '0.98rem', lineHeight: 1.6 }}>{flagship.subtitle}</p>
          )}
          <p className="text-bone-dim mb-6" style={{ fontSize: '0.94rem', lineHeight: 1.65 }}>{flagship.description}</p>

          {/* Accordions */}
          <div className="space-y-2.5">
            {sections.map(({ id, label, content, type }) => {
              const isOpen = !!expanded[id];
              return (
                <div key={id} className="border border-line rounded-sm overflow-hidden" style={{ background: 'var(--ink)' }}>
                  <button
                    onClick={() => toggle(id)}
                    aria-expanded={isOpen}
                    aria-controls={`panel-${id}`}
                    className="w-full flex items-center justify-between p-4 text-left text-bone"
                    style={{ fontSize: '0.9rem', fontWeight: 500 }}
                  >
                    {label}
                    <ChevronDownIcon
                      className="w-4 h-4 flex-shrink-0 transition-transform"
                      style={{ color: 'var(--bone-faint)', transform: isOpen ? 'rotate(180deg)' : 'none' }}
                      aria-hidden="true"
                    />
                  </button>
                  <motion.div
                    id={`panel-${id}`}
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 text-bone-dim" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                      {type === 'list' && Array.isArray(content) ? (
                        <ul className="space-y-2">
                          {content.map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <span aria-hidden="true" className="text-ember flex-shrink-0">—</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>{content as string}</p>
                      )}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Tech + CTAs */}
          <div className="flex flex-wrap gap-1.5 mt-6 mb-6">
            {flagship.technologies?.map((tech, i) => <span key={i} className="chip">{tech}</span>)}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            {flagship.demoUrl && (
              <a href={flagship.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-solid">
                <PlayIcon className="w-4 h-4" aria-hidden="true" /> Watch Demo
              </a>
            )}
            <a href="/contact" className="btn-ghost">Get in touch</a>
          </div>
        </div>

        {/* Supporting */}
        <p className="label mb-5">Supporting systems</p>
        <div className="grid lg:grid-cols-2 gap-6">
          {supporting.map((system) => (
            <div key={system.id} className="border border-line rounded-md p-6" style={{ background: 'var(--surface)' }}>
              <h4 className="font-display text-bone mb-3" style={{ fontWeight: 400, fontSize: '1.2rem', lineHeight: 1.2 }}>
                {system.title}
              </h4>
              <p className="text-bone-dim mb-4" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{system.description}</p>
              {system.systemPurpose && (
                <p className="text-bone-dim mb-4" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{system.systemPurpose}</p>
              )}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {system.tools?.map((tool, i) => <span key={i} className="chip">{tool}</span>)}
              </div>
              {system.demoUrl && (
                <a href={system.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-bone-dim hover:text-bone transition-colors" style={{ fontSize: '0.74rem' }}>
                  <PlayIcon className="w-4 h-4" aria-hidden="true" /> Watch Demo
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
