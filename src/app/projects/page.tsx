'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { portfolioData, automationSystems } from '@/data/portfolio';
import {
  PlayIcon,
  CodeBracketIcon,
  ArrowTopRightOnSquareIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { FloatingCard } from '@/components/FloatingCard';
const AnimatedBackground = dynamic(
  () =>
    import('@/components/AnimatedBackground').then(
      mod => mod.AnimatedBackground
    ),
  { ssr: false, loading: () => null }
);

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

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'websites' | 'automation' | 'devops'
  >('all');

  const websiteProjects = portfolioData.projects.filter(project =>
    [
      'litho-solutions',
      'proair-zimbabwe',
      'mero-tech-ai',
      'aws-cloud-resume',
    ].includes(project.id)
  );

  const platformProjects = portfolioData.projects.filter(project =>
    [
      'acquisitions-api',
      'voice-to-vector-api',
      'legacy-migration',
      'serverless-platform-pattern',
    ].includes(project.id)
  );

  const shouldShowSection = (
    category: 'websites' | 'automation' | 'devops'
  ) => {
    return selectedCategory === 'all' || selectedCategory === category;
  };

  return (
    <main className="relative min-h-screen bg-gray-950 text-white">
      <AnimatedBackground />

      <div className="container relative z-10 mx-auto px-6 py-16">
        {/* FILTER BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 flex flex-wrap justify-center gap-3"
        >
          <button
            onClick={() => setSelectedCategory('all')}
            className={`rounded-lg px-6 py-2 font-medium transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25'
                : 'border border-gray-700 bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            All Projects
          </button>
          <button
            onClick={() => setSelectedCategory('websites')}
            className={`rounded-lg px-6 py-2 font-medium transition-all duration-300 ${
              selectedCategory === 'websites'
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/25'
                : 'border border-gray-700 bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            Websites
          </button>
          <button
            onClick={() => setSelectedCategory('automation')}
            className={`rounded-lg px-6 py-2 font-medium transition-all duration-300 ${
              selectedCategory === 'automation'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                : 'border border-gray-700 bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            Automation
          </button>
          <button
            onClick={() => setSelectedCategory('devops')}
            className={`rounded-lg px-6 py-2 font-medium transition-all duration-300 ${
              selectedCategory === 'devops'
                ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg shadow-green-500/25'
                : 'border border-gray-700 bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            DevOps/Platform
          </button>
        </motion.div>

        {/* SECTION 1: WEBSITE DEVELOPMENT PROJECTS */}
        {shouldShowSection('websites') && (
          <section className="mb-24">
            <motion.div
              variants={headerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="mb-16 text-center"
            >
              <h1 className="mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                Website Development Projects
              </h1>
              <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-400">
                Modern, performant websites built with Next.js, React, and
                cutting-edge web technologies.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {websiteProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.15 }}
                >
                  <FloatingCard>
                    <div className="group relative h-full overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/50">
                      <motion.div
                        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full"
                        initial={false}
                      />

                      <div className="relative z-10">
                        <motion.h2
                          className="mb-2 text-xl font-bold text-white"
                          whileHover={{ x: 5 }}
                        >
                          {project.title}
                        </motion.h2>
                        <div className="mb-4 flex items-center gap-2">
                          <motion.span
                            className="flex items-center gap-1.5 rounded border border-cyan-500/20 bg-cyan-500/10 px-2 py-1 text-xs font-medium text-cyan-400"
                            whileHover={{ scale: 1.05 }}
                          >
                            <span className="live-pulse-dot" />
                            Website
                          </motion.span>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-400">
                              Overview
                            </h3>
                            <p className="text-sm leading-relaxed text-gray-300">
                              {project.description}
                            </p>
                          </div>

                          <div>
                            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-400">
                              Key Features
                            </h3>
                            <ul className="space-y-1">
                              {project.highlights
                                ?.slice(0, 4)
                                .map((highlight, hIndex) => (
                                  <li
                                    key={hIndex}
                                    className="flex items-start text-sm text-gray-300"
                                  >
                                    <span className="mr-2 mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-cyan-500" />
                                    {highlight}
                                  </li>
                                ))}
                            </ul>
                          </div>

                          {project.highlights &&
                            project.highlights.length > 4 && (
                              <div>
                                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-400">
                                  Technical Highlights
                                </h3>
                                <ul className="space-y-1">
                                  {project.highlights
                                    .slice(4, 8)
                                    .map((highlight, hIndex) => (
                                      <li
                                        key={hIndex}
                                        className="flex items-start text-sm text-gray-300"
                                      >
                                        <span className="mr-2 mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-blue-500" />
                                        {highlight}
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            )}

                          {project.outcome && (
                            <div>
                              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-400">
                                Outcome
                              </h3>
                              <p className="text-sm leading-relaxed text-gray-300">
                                {project.outcome}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="mt-6 border-t border-gray-700/50 pt-4">
                          <div className="flex flex-col gap-3">
                            {project.demoUrl && (
                              <motion.a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-cyan-400 transition-colors hover:text-cyan-300"
                                whileHover={{ x: 5 }}
                              >
                                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                                View Live Website
                              </motion.a>
                            )}
                            {project.githubUrl && (
                              <motion.a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-blue-400 transition-colors hover:text-blue-300"
                                whileHover={{ x: 5 }}
                              >
                                <CodeBracketIcon className="h-4 w-4" />
                                View Repository
                              </motion.a>
                            )}
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="flex flex-wrap gap-2">
                            {project.technologies
                              ?.slice(0, 6)
                              .map((tech, techIndex) => (
                                <motion.span
                                  key={techIndex}
                                  className="rounded border border-gray-700 bg-gray-800 px-2 py-1 text-xs font-medium text-gray-300"
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  transition={{
                                    type: 'spring',
                                    stiffness: 400,
                                  }}
                                >
                                  {tech}
                                </motion.span>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </FloatingCard>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 2: WORKFLOWS & AUTOMATION SYSTEMS */}
        {shouldShowSection('automation') && (
          <section className="mb-24">
            <motion.div
              variants={headerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="mb-16 text-center"
            >
              <h1 className="mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                Workflows & Automation Systems
              </h1>
              <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-400">
                Automation built for real teams, real decisions, real
                operational pressure.
              </p>
            </motion.div>

            {/* FLAGSHIP CASE STUDY */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="mb-16"
            >
              <FloatingCard>
                <div className="relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-900/80 to-gray-800/80 p-8 shadow-2xl backdrop-blur-sm">
                  {/* Animated corner accents */}
                  <motion.div
                    className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-gradient-to-br from-blue-500/20 to-transparent"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />

                  <div className="relative z-10 mb-8">
                    <motion.div
                      className="mb-4 flex items-center gap-3"
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <motion.div
                        className="h-3 w-3 rounded-full bg-green-500"
                        animate={{
                          scale: [1, 1.3, 1],
                          boxShadow: [
                            '0 0 0 0 rgba(34, 197, 94, 0.7)',
                            '0 0 0 10px rgba(34, 197, 94, 0)',
                            '0 0 0 0 rgba(34, 197, 94, 0)',
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                      <span className="text-sm font-medium uppercase tracking-wide text-green-400">
                        Production System
                      </span>
                      <SparklesIcon className="h-4 w-4 text-green-400" />
                    </motion.div>

                    <motion.h2
                      className="mb-2 text-2xl font-bold text-white md:text-3xl"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      {automationSystems.flagship.title}
                    </motion.h2>
                    <motion.p
                      className="mb-4 text-lg font-medium leading-relaxed text-gray-300"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      {automationSystems.flagship.subtitle}
                    </motion.p>
                    <div className="mb-6 flex flex-wrap gap-2">
                      {[
                        'Business AI',
                        'Internal Tools',
                        'Intelligent Automation',
                      ].map((tag, index) => (
                        <motion.span
                          key={tag}
                          className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 space-y-8">
                    <div>
                      <h3 className="mb-3 text-lg font-semibold text-white">
                        Business Context
                      </h3>
                      <p className="leading-relaxed text-gray-300">
                        {automationSystems.flagship.businessContext}
                      </p>
                    </div>

                    <div>
                      <h3 className="mb-3 text-lg font-semibold text-white">
                        System Capabilities
                      </h3>
                      <ul className="space-y-2">
                        {automationSystems.flagship.systemCapabilities?.map(
                          (capability, index) => (
                            <li
                              key={index}
                              className="flex items-start text-gray-300"
                            >
                              <span className="mr-3 mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                              {capability}
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div>
                      <h3 className="mb-3 text-lg font-semibold text-white">
                        Architecture & Reliability
                      </h3>
                      <p className="mb-4 leading-relaxed text-gray-300">
                        {automationSystems.flagship.description}
                      </p>
                      <ul className="space-y-2">
                        {automationSystems.flagship.architecture?.map(
                          (item, index) => (
                            <li
                              key={index}
                              className="flex items-start text-gray-300"
                            >
                              <span className="mr-3 mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500" />
                              {item}
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div>
                      <h3 className="mb-3 text-lg font-semibold text-white">
                        Outcome
                      </h3>
                      <p className="font-medium leading-relaxed text-gray-300">
                        {automationSystems.flagship.outcome}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 mt-8 border-t border-gray-700/50 pt-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                      {automationSystems.flagship.demoUrl && (
                        <motion.a
                          href={automationSystems.flagship.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:shadow-blue-500/25"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <PlayIcon className="h-4 w-4" />
                          Watch Full Demo
                        </motion.a>
                      )}
                      {automationSystems.flagship.githubUrl && (
                        <motion.a
                          href={automationSystems.flagship.githubUrl}
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
                      {automationSystems.flagship.documentationUrl && (
                        <motion.a
                          href={automationSystems.flagship.documentationUrl}
                          download="Crebos-Documentation.pdf"
                          className="flex items-center justify-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-6 py-3 font-medium text-green-400 transition-all duration-200 hover:border-green-500/50 hover:bg-green-500/20"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                          Download Documentation
                        </motion.a>
                      )}
                      <motion.a
                        href="/contact"
                        className="flex items-center justify-center gap-2 rounded-lg border border-gray-600 px-6 py-3 font-medium text-gray-300 transition-all duration-200 hover:border-gray-500 hover:bg-gray-800/50 hover:text-white"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Get in Touch
                      </motion.a>
                    </div>
                  </div>
                </div>
              </FloatingCard>
            </motion.div>

            {/* SUPPORTING SYSTEMS */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <div className="mb-12 text-center">
                <div className="mb-4 flex items-center justify-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-purple-500" />
                  <span className="text-sm font-medium uppercase tracking-wide text-purple-400">
                    Supporting Systems
                  </span>
                  <div className="h-2 w-2 rounded-full bg-purple-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {automationSystems.supporting.map((system, index) => (
                  <motion.div
                    key={system.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <FloatingCard>
                      <div className="group relative h-full overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 transition-all duration-500 group-hover:from-blue-500/10 group-hover:to-purple-500/10"
                          initial={false}
                        />

                        <div className="relative z-10">
                          <motion.h3
                            className="mb-3 text-xl font-semibold text-white transition-colors group-hover:text-blue-400"
                            whileHover={{ x: 5 }}
                          >
                            {system.title}
                          </motion.h3>
                          <p className="mb-4 text-sm leading-relaxed text-gray-400">
                            {system.description}
                          </p>

                          <p className="mb-4 text-sm text-gray-300">
                            {system.systemPurpose}
                          </p>

                          <div className="mb-6 flex flex-wrap gap-2">
                            {system.tools?.map((tool, toolIndex) => (
                              <motion.span
                                key={toolIndex}
                                className="rounded border border-gray-700 bg-gray-800 px-2 py-1 text-xs font-medium text-gray-300"
                                whileHover={{
                                  scale: 1.05,
                                  borderColor: 'rgb(59, 130, 246)',
                                }}
                                transition={{ type: 'spring', stiffness: 400 }}
                              >
                                {tool}
                              </motion.span>
                            ))}
                          </div>

                          {system.demoUrl && (
                            <motion.a
                              href={system.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-blue-400 transition-colors hover:text-blue-300"
                              whileHover={{ x: 5 }}
                            >
                              <PlayIcon className="h-4 w-4" />
                              Watch Demo
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </FloatingCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* SECTION 2: PLATFORM CASE STUDIES */}
        {shouldShowSection('devops') && (
          <section>
            <motion.div
              variants={headerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="mb-16 text-center"
            >
              <h1 className="mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                Platform Case Studies
              </h1>
              <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-400">
                Architecture, Standards, and Value Delivery
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {platformProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.15 }}
                >
                  <FloatingCard>
                    <div className="group relative h-full overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-green-500/50">
                      <motion.div
                        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full"
                        initial={false}
                      />

                      <div className="relative z-10">
                        <motion.h2
                          className="mb-2 text-xl font-bold text-white"
                          whileHover={{ x: 5 }}
                        >
                          {project.title}
                        </motion.h2>
                        <div className="mb-4 flex items-center gap-2">
                          <motion.span
                            className="rounded border border-green-500/20 bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400"
                            whileHover={{ scale: 1.05 }}
                          >
                            {project.id === 'acquisitions-api'
                              ? 'Platform · API'
                              : project.id === 'voice-to-vector-api'
                                ? 'Internal API'
                                : project.id === 'legacy-migration'
                                  ? 'Modernization'
                                  : 'IaC Pattern'}
                          </motion.span>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-400">
                              Overview
                            </h3>
                            <p className="text-sm leading-relaxed text-gray-300">
                              {project.description}
                            </p>
                          </div>

                          <div>
                            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-400">
                              Key Capabilities
                            </h3>
                            <ul className="space-y-1">
                              {project.highlights
                                ?.slice(0, 4)
                                .map((highlight, hIndex) => (
                                  <li
                                    key={hIndex}
                                    className="flex items-start text-sm text-gray-300"
                                  >
                                    <span className="mr-2 mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-green-500" />
                                    {highlight}
                                  </li>
                                ))}
                            </ul>
                          </div>

                          <div>
                            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-400">
                              Architecture & Stack
                            </h3>
                            <ul className="space-y-1">
                              {project.highlights
                                ?.slice(4, 8)
                                .map((highlight, hIndex) => (
                                  <li
                                    key={hIndex}
                                    className="flex items-start text-sm text-gray-300"
                                  >
                                    <span className="mr-2 mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-blue-500" />
                                    {highlight}
                                  </li>
                                ))}
                            </ul>
                          </div>

                          <div>
                            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-400">
                              Value Delivered
                            </h3>
                            <p className="text-sm leading-relaxed text-gray-300">
                              {project.outcome}
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 border-t border-gray-700/50 pt-4">
                          <div className="flex flex-col gap-3">
                            {project.githubUrl && (
                              <motion.a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-blue-400 transition-colors hover:text-blue-300"
                                whileHover={{ x: 5 }}
                              >
                                <CodeBracketIcon className="h-4 w-4" />
                                View Repository
                              </motion.a>
                            )}
                            {project.demoUrl && (
                              <motion.a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-green-400 transition-colors hover:text-green-300"
                                whileHover={{ x: 5 }}
                              >
                                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                                View Live
                              </motion.a>
                            )}
                            <motion.a
                              href="/contact"
                              className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-gray-300"
                              whileHover={{ x: 5 }}
                            >
                              <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                              Request Case Details
                            </motion.a>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="flex flex-wrap gap-2">
                            {project.technologies
                              ?.slice(0, 6)
                              .map((tech, techIndex) => (
                                <motion.span
                                  key={techIndex}
                                  className="rounded border border-gray-700 bg-gray-800 px-2 py-1 text-xs font-medium text-gray-300"
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  transition={{
                                    type: 'spring',
                                    stiffness: 400,
                                  }}
                                >
                                  {tech}
                                </motion.span>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </FloatingCard>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Final CTA */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-20 text-center"
        >
          <FloatingCard>
            <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-8">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-2 w-2 rounded-full bg-blue-400"
                  animate={{
                    x: [0, 100, 0],
                    y: [0, -100, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                  style={{
                    left: `${20 + i * 30}%`,
                    top: '50%',
                  }}
                />
              ))}

              <motion.h2
                className="relative z-10 mb-4 text-2xl font-semibold"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Two Disciplines. One Engineer.
              </motion.h2>
              <motion.p
                className="relative z-10 mx-auto mb-6 max-w-2xl text-gray-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Automation Systems = Operational Intelligence. Platform Case
                Studies = Infrastructure & API Engineering.
              </motion.p>
              <div className="relative z-10 flex flex-col justify-center gap-4 sm:flex-row">
                <motion.a
                  href="/contact"
                  className="rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.a>
                <motion.a
                  href={portfolioData.personal.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-gray-700 px-8 py-3 font-medium text-gray-300 transition-colors hover:border-gray-600 hover:text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View GitHub
                </motion.a>
              </div>
            </div>
          </FloatingCard>
        </motion.div>
      </div>
    </main>
  );
}
