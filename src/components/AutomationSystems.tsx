'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useHydrated } from '@/utils/useHydrated';
import { AutomationSystem } from '@/types';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlayIcon,
  DocumentArrowDownIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';

interface AutomationSystemsProps {
  flagship: AutomationSystem;
  supporting: AutomationSystem[];
}

export function AutomationSystems({
  flagship,
  supporting,
}: AutomationSystemsProps) {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});
  const hydrated = useHydrated();

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
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
        opacity: { duration: 0.2, delay: 0.1 },
      },
    },
  };

  return (
    <section
      className="relative overflow-hidden py-20"
      style={{ background: 'linear-gradient(to bottom, #080d1a, #0A0F1E)' }}
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(ellipse, rgba(0,212,255,0.04), transparent 70%)',
          }}
        />
        <div
          className="absolute right-1/4 top-1/4 h-80 w-80 rounded-full"
          style={{
            background:
              'radial-gradient(ellipse, rgba(124,58,237,0.05), transparent 70%)',
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        {/* Section Header */}
        <motion.div
          variants={sectionVariants}
          initial={hydrated ? 'hidden' : false}
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16 text-center"
        >
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs font-semibold uppercase tracking-widest"
            style={{
              background: 'rgba(0,212,255,0.08)',
              border: '1px solid rgba(0,212,255,0.20)',
              color: '#00D4FF',
            }}
          >
            <span
              className="h-2 w-2 animate-pulse rounded-full"
              style={{ background: '#00D4FF' }}
            />
            AI-Powered Automation Systems
          </div>
          <h2 className="text-gradient-cyan mb-5 text-4xl font-bold md:text-5xl">
            Intelligent Workflows
          </h2>
          <p
            className="mx-auto max-w-3xl text-lg leading-relaxed"
            style={{ color: 'rgba(148,163,184,0.80)' }}
          >
            Automation built for real teams, real decisions, real operational
            pressure.
          </p>
        </motion.div>

        {/* Flagship Case Study */}
        <motion.div
          variants={sectionVariants}
          initial={hydrated ? 'hidden' : false}
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mb-16"
        >
          <div className="glass-card gradient-border scan-line relative overflow-hidden p-8">
            {/* Header */}
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="pulse-dot" />
                <span
                  className="font-mono text-xs font-semibold uppercase tracking-widest"
                  style={{ color: '#34d399' }}
                >
                  Production System · Live
                </span>
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white md:text-3xl">
                {flagship.title}
              </h3>
              {flagship.subtitle && (
                <p className="mb-4 text-lg font-medium leading-relaxed text-gray-300">
                  {flagship.subtitle}
                </p>
              )}
              <p className="mb-6 text-lg leading-relaxed text-gray-300">
                {flagship.description}
              </p>

              {/* Key Tags */}
              <div className="mb-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                  Business AI
                </span>
                <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400">
                  Internal Tools
                </span>
                <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                  Intelligent Automation
                </span>
              </div>
            </div>

            {/* Expandable Sections */}
            <div className="space-y-4">
              {/* Business Context */}
              <div className="overflow-hidden rounded-lg border border-gray-700/50">
                <button
                  onClick={() => toggleSection('business-context')}
                  className="flex w-full items-center justify-between bg-gray-800/50 p-4 text-left transition-colors hover:bg-gray-800/70"
                >
                  <span className="font-medium text-white">
                    Business Context
                  </span>
                  {expandedSections['business-context'] ? (
                    <ChevronUpIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                <motion.div
                  variants={expandVariants}
                  initial="collapsed"
                  animate={
                    expandedSections['business-context']
                      ? 'expanded'
                      : 'collapsed'
                  }
                  className="overflow-hidden"
                >
                  <div className="bg-gray-900/30 p-4">
                    <p className="leading-relaxed text-gray-300">
                      {flagship.businessContext}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* System Capabilities */}
              <div className="overflow-hidden rounded-lg border border-gray-700/50">
                <button
                  onClick={() => toggleSection('capabilities')}
                  className="flex w-full items-center justify-between bg-gray-800/50 p-4 text-left transition-colors hover:bg-gray-800/70"
                >
                  <span className="font-medium text-white">
                    System Capabilities
                  </span>
                  {expandedSections['capabilities'] ? (
                    <ChevronUpIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                <motion.div
                  variants={expandVariants}
                  initial="collapsed"
                  animate={
                    expandedSections['capabilities'] ? 'expanded' : 'collapsed'
                  }
                  className="overflow-hidden"
                >
                  <div className="bg-gray-900/30 p-4">
                    <ul className="space-y-2">
                      {flagship.systemCapabilities?.map((capability, index) => (
                        <li
                          key={index}
                          className="flex items-start text-gray-300"
                        >
                          <span className="mr-3 mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                          {capability}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>

              {/* Architecture & Reliability */}
              <div className="overflow-hidden rounded-lg border border-gray-700/50">
                <button
                  onClick={() => toggleSection('architecture')}
                  className="flex w-full items-center justify-between bg-gray-800/50 p-4 text-left transition-colors hover:bg-gray-800/70"
                >
                  <span className="font-medium text-white">
                    Architecture & Reliability
                  </span>
                  {expandedSections['architecture'] ? (
                    <ChevronUpIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                <motion.div
                  variants={expandVariants}
                  initial="collapsed"
                  animate={
                    expandedSections['architecture'] ? 'expanded' : 'collapsed'
                  }
                  className="overflow-hidden"
                >
                  <div className="bg-gray-900/30 p-4">
                    {flagship.architecture &&
                    Array.isArray(flagship.architecture) ? (
                      <ul className="space-y-2">
                        {flagship.architecture.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start text-gray-300"
                          >
                            <span className="mr-3 mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="leading-relaxed text-gray-300">
                        {flagship.architecture}
                      </p>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Outcome */}
              <div className="overflow-hidden rounded-lg border border-gray-700/50">
                <button
                  onClick={() => toggleSection('outcome')}
                  className="flex w-full items-center justify-between bg-gray-800/50 p-4 text-left transition-colors hover:bg-gray-800/70"
                >
                  <span className="font-medium text-white">Outcome</span>
                  {expandedSections['outcome'] ? (
                    <ChevronUpIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                <motion.div
                  variants={expandVariants}
                  initial="collapsed"
                  animate={
                    expandedSections['outcome'] ? 'expanded' : 'collapsed'
                  }
                  className="overflow-hidden"
                >
                  <div className="bg-gray-900/30 p-4">
                    <p className="font-medium leading-relaxed text-gray-300">
                      {flagship.outcome}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Technologies */}
            <div className="mb-8 mt-6">
              <div className="flex flex-wrap gap-2">
                {flagship.technologies?.map((tech, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row">
              {flagship.demoUrl && (
                <motion.a
                  href={flagship.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:shadow-blue-500/25"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <PlayIcon className="h-4 w-4" />
                  Watch Demo
                </motion.a>
              )}
              {flagship.githubUrl && (
                <motion.a
                  href={flagship.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 px-6 py-3 font-medium text-blue-400 transition-all duration-200 hover:border-blue-500/50 hover:bg-blue-500/20"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CodeBracketIcon className="h-4 w-4" />
                  View Repository
                </motion.a>
              )}
              {flagship.documentationUrl && (
                <motion.a
                  href={flagship.documentationUrl}
                  download="Crebos-Documentation.pdf"
                  className="flex items-center justify-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-6 py-3 font-medium text-green-400 transition-all duration-200 hover:border-green-500/50 hover:bg-green-500/20"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <DocumentArrowDownIcon className="h-4 w-4" />
                  Download Documentation
                </motion.a>
              )}
            </div>

            {/* QR Codes Section */}
            <div className="rounded-lg border border-gray-700/50 bg-gray-900/30 p-6">
              <h4 className="mb-4 text-center text-sm font-medium uppercase tracking-wide text-gray-400">
                Connect with Me
              </h4>
              <div className="flex flex-wrap items-center justify-center gap-8">
                {/* WhatsApp QR Code */}
                <div className="flex flex-col items-center gap-2">
                  <div className="rounded-lg border border-green-500/30 bg-white p-3">
                    <img
                      src="/images/qr-codes/whatsapp-qr.svg"
                      alt="WhatsApp QR Code"
                      className="h-32 w-32"
                    />
                  </div>
                  <span className="text-xs font-medium text-green-400">
                    WhatsApp
                  </span>
                </div>

                {/* LinkedIn QR Code */}
                <div className="flex flex-col items-center gap-2">
                  <div className="rounded-lg border border-blue-500/30 bg-white p-3">
                    <img
                      src="/images/qr-codes/linkedin-qr.svg"
                      alt="LinkedIn QR Code"
                      className="h-32 w-32"
                    />
                  </div>
                  <span className="text-xs font-medium text-blue-400">
                    LinkedIn
                  </span>
                </div>
              </div>
              <p className="mt-4 text-center text-xs text-gray-500">
                Scan to connect instantly
              </p>
            </div>
          </div>
        </motion.div>

        {/* Supporting Systems Header */}
        <motion.div
          variants={sectionVariants}
          initial={hydrated ? 'hidden' : false}
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mb-12 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-2 w-2 rounded-full bg-purple-500" />
            <span className="text-sm font-medium uppercase tracking-wide text-purple-400">
              Supporting Systems
            </span>
            <div className="h-2 w-2 rounded-full bg-purple-500" />
          </div>
          <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
            Additional Production Automation Systems
          </h3>
          <p className="mx-auto max-w-2xl text-gray-400">
            Reinforcing architectural depth and range across different domains
            and use cases.
          </p>
        </motion.div>

        {/* Supporting Systems Grid */}
        <motion.div
          variants={sectionVariants}
          initial={hydrated ? 'hidden' : false}
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-2"
        >
          {supporting.map(system => (
            <motion.div
              key={system.id}
              className="group rounded-xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
              whileHover={{ y: -4 }}
            >
              <h4 className="mb-3 text-xl font-semibold text-white transition-colors group-hover:text-blue-400">
                {system.title}
              </h4>
              <p className="mb-4 text-sm leading-relaxed text-gray-400">
                {system.description}
              </p>

              <div className="mb-6 space-y-3">
                <div>
                  <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    System Purpose
                  </span>
                  <p className="mt-1 text-sm text-gray-300">
                    {system.systemPurpose}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Architecture
                  </span>
                  <div className="mt-1">
                    {system.architecture &&
                    Array.isArray(system.architecture) ? (
                      <ul className="space-y-1">
                        {system.architecture.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start text-sm text-gray-300"
                          >
                            <span className="mr-2 mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-gray-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-300">
                        {system.architecture}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {system.tools?.map((tool, toolIndex) => (
                    <span
                      key={toolIndex}
                      className="rounded border border-gray-700 bg-gray-800 px-2 py-1 text-xs font-medium text-gray-300"
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
                  className="flex items-center gap-2 text-sm text-blue-400 transition-colors hover:text-blue-300"
                >
                  <PlayIcon className="h-4 w-4" />
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
