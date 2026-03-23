'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useHydrated } from '@/utils/useHydrated';
import { AutomationSystem } from '@/types';
import { ChevronDownIcon, ChevronUpIcon, PlayIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

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
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
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
      style={{ background: 'linear-gradient(to bottom, #080d1a, #0A0F1E)' }}
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.04), transparent 70%)' }} />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.05), transparent 70%)' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={sectionVariants}
          initial={hydrated ? "hidden" : false}
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-mono font-semibold uppercase tracking-widest"
            style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.20)', color: '#00D4FF' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00D4FF' }} />
            AI-Powered Automation Systems
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-5 text-gradient-cyan">
            Intelligent Workflows
          </h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: 'rgba(148,163,184,0.80)' }}>
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
          <div className="glass-card gradient-border p-8 relative overflow-hidden scan-line">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="pulse-dot" />
                <span className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: '#34d399' }}>
                  Production System · Live
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {flagship.title}
              </h3>
              {flagship.subtitle && (
                <p className="text-lg text-gray-300 font-medium mb-4 leading-relaxed">
                  {flagship.subtitle}
                </p>
              )}
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {flagship.description}
              </p>

              {/* Key Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                  Business AI
                </span>
                <span className="px-3 py-1 text-xs font-medium bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20">
                  Internal Tools
                </span>
                <span className="px-3 py-1 text-xs font-medium bg-green-500/10 text-green-400 rounded-full border border-green-500/20">
                  Intelligent Automation
                </span>
              </div>
            </div>

            {/* Expandable Sections */}
            <div className="space-y-4">
              {/* Business Context */}
              <div className="border border-gray-700/50 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('business-context')}
                  className="w-full flex items-center justify-between p-4 bg-gray-800/50 hover:bg-gray-800/70 transition-colors text-left"
                >
                  <span className="font-medium text-white">Business Context</span>
                  {expandedSections['business-context'] ? (
                    <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                <motion.div
                  variants={expandVariants}
                  initial="collapsed"
                  animate={expandedSections['business-context'] ? 'expanded' : 'collapsed'}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-gray-900/30">
                    <p className="text-gray-300 leading-relaxed">
                      {flagship.businessContext}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* System Capabilities */}
              <div className="border border-gray-700/50 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('capabilities')}
                  className="w-full flex items-center justify-between p-4 bg-gray-800/50 hover:bg-gray-800/70 transition-colors text-left"
                >
                  <span className="font-medium text-white">System Capabilities</span>
                  {expandedSections['capabilities'] ? (
                    <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                <motion.div
                  variants={expandVariants}
                  initial="collapsed"
                  animate={expandedSections['capabilities'] ? 'expanded' : 'collapsed'}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-gray-900/30">
                    <ul className="space-y-2">
                      {flagship.systemCapabilities?.map((capability, index) => (
                        <li key={index} className="flex items-start text-gray-300">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                          {capability}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>

              {/* Architecture & Reliability */}
              <div className="border border-gray-700/50 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('architecture')}
                  className="w-full flex items-center justify-between p-4 bg-gray-800/50 hover:bg-gray-800/70 transition-colors text-left"
                >
                  <span className="font-medium text-white">Architecture & Reliability</span>
                  {expandedSections['architecture'] ? (
                    <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                <motion.div
                  variants={expandVariants}
                  initial="collapsed"
                  animate={expandedSections['architecture'] ? 'expanded' : 'collapsed'}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-gray-900/30">
                    {flagship.architecture && Array.isArray(flagship.architecture) ? (
                      <ul className="space-y-2">
                        {flagship.architecture.map((item, index) => (
                          <li key={index} className="flex items-start text-gray-300">
                            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-300 leading-relaxed">
                        {flagship.architecture}
                      </p>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Outcome */}
              <div className="border border-gray-700/50 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('outcome')}
                  className="w-full flex items-center justify-between p-4 bg-gray-800/50 hover:bg-gray-800/70 transition-colors text-left"
                >
                  <span className="font-medium text-white">Outcome</span>
                  {expandedSections['outcome'] ? (
                    <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                <motion.div
                  variants={expandVariants}
                  initial="collapsed"
                  animate={expandedSections['outcome'] ? 'expanded' : 'collapsed'}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-gray-900/30">
                    <p className="text-gray-300 leading-relaxed font-medium">
                      {flagship.outcome}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Technologies */}
            <div className="mt-6 mb-8">
              <div className="flex flex-wrap gap-2">
                {flagship.technologies?.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {flagship.demoUrl && (
                <motion.a
                  href={flagship.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <PlayIcon className="w-4 h-4" />
                  Watch Demo
                </motion.a>
              )}
              <motion.a
                href="/contact"
                className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white rounded-lg font-medium transition-all duration-200 hover:bg-gray-800/50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get in Touch
              </motion.a>
            </div>
          </div>
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
            <div className="w-2 h-2 bg-purple-500 rounded-full" />
            <span className="text-sm font-medium text-purple-400 uppercase tracking-wide">
              Supporting Systems
            </span>
            <div className="w-2 h-2 bg-purple-500 rounded-full" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Additional Production Automation Systems
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
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
          {supporting.map((system, index) => (
            <motion.div
              key={system.id}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group"
              whileHover={{ y: -4 }}
            >
              <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {system.title}
              </h4>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                {system.description}
              </p>

              <div className="space-y-3 mb-6">
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">System Purpose</span>
                  <p className="text-gray-300 text-sm mt-1">{system.systemPurpose}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Architecture</span>
                  <div className="mt-1">
                    {system.architecture && Array.isArray(system.architecture) ? (
                      <ul className="space-y-1">
                        {system.architecture.map((item, index) => (
                          <li key={index} className="text-gray-300 text-sm flex items-start">
                            <span className="w-1 h-1 bg-gray-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-300 text-sm">{system.architecture}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {system.tools?.map((tool, toolIndex) => (
                    <span
                      key={toolIndex}
                      className="px-2 py-1 text-xs font-medium bg-gray-800 text-gray-300 rounded border border-gray-700"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {system.demoUrl && (
                <a
                  href={system.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <PlayIcon className="w-4 h-4" />
                  View Demo
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}