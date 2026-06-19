'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { portfolioData, automationSystems } from '@/data/portfolio';
import { PlayIcon, CodeBracketIcon, ArrowTopRightOnSquareIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { FloatingCard } from '@/components/FloatingCard';

const AnimatedBackground = dynamic(
  () => import('@/components/AnimatedBackground').then((mod) => mod.AnimatedBackground),
  { ssr: false, loading: () => null }
);

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

export default function ProjectsPage() {
  const platformProjects = portfolioData.projects.filter(project =>
    ['acquisitions-api', 'voice-to-vector-api', 'legacy-migration', 'serverless-platform-pattern'].includes(project.id)
  );

  return (
    <main className="min-h-screen text-white relative overflow-hidden" style={{ background: '#0A0A0A' }}>
      <AnimatedBackground />

      <div className="container mx-auto px-6 py-16 relative z-10">

        {/* SECTION 1: WORKFLOWS & AUTOMATION SYSTEMS */}
        <section className="mb-24">
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            {/* Ambient glow behind heading */}
            <div className="relative inline-block">
              <div className="ambient-glow" style={{ top: '-80%', left: '50%', transform: 'translateX(-50%)', width: '400px', height: '400px', opacity: 0.2 }} />
              <h1 className="text-4xl md:text-5xl font-bold mb-6 relative" style={{ color: '#FFFFFF', letterSpacing: '-0.03em' }}>
                Workflows &amp; Automation Systems
              </h1>
            </div>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#71717A' }}>
              Automation built for real teams, real decisions, real operational pressure.
            </p>
          </motion.div>

          {/* FLAGSHIP CASE STUDY */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="mb-16"
          >
            <FloatingCard>
              <div className="p-8 shadow-2xl relative overflow-hidden glass-card" style={{ borderRadius: '16px' }}>
                {/* Animated corner accent */}
                <motion.div
                  className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
                  style={{ background: 'rgba(255, 255, 255, 0.02)', borderBottomLeftRadius: '100%' }}
                  animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />

                <div className="mb-8 relative z-10">
                  <motion.div
                    className="flex items-center gap-3 mb-4"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <motion.div
                      className="w-3 h-3 rounded-full glow-pulse"
                      style={{ background: '#FFFFFF' }}
                    />
                    <span className="mono-label">Production System</span>
                    <SparklesIcon className="w-4 h-4" style={{ color: '#A1A1AA' }} />
                  </motion.div>

                  <motion.h2
                    className="text-2xl md:text-3xl font-bold text-white mb-2"
                    style={{ letterSpacing: '-0.02em' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    {automationSystems.flagship.title}
                  </motion.h2>
                  <motion.p
                    className="text-lg font-medium mb-4 leading-relaxed"
                    style={{ color: '#A1A1AA' }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    {automationSystems.flagship.subtitle}
                  </motion.p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['Business AI', 'Internal Tools', 'Intelligent Automation'].map((tag, index) => (
                      <motion.span
                        key={tag}
                        className="tech-badge"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="space-y-8 relative z-10">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Business Context</h3>
                    <p className="leading-relaxed" style={{ color: '#A1A1AA' }}>
                      {automationSystems.flagship.businessContext}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">System Capabilities</h3>
                    <ul className="space-y-2">
                      {automationSystems.flagship.systemCapabilities?.map((capability, index) => (
                        <li key={index} className="flex items-start" style={{ color: '#A1A1AA' }}>
                          <span className="w-1.5 h-1.5 rounded-full mt-2 mr-3 flex-shrink-0" style={{ background: '#FFFFFF', boxShadow: '0 0 4px rgba(255,255,255,0.3)' }} />
                          {capability}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Architecture &amp; Reliability</h3>
                    <p className="leading-relaxed mb-4" style={{ color: '#A1A1AA' }}>
                      {automationSystems.flagship.description}
                    </p>
                    <ul className="space-y-2">
                      {automationSystems.flagship.architecture?.map((item, index) => (
                        <li key={index} className="flex items-start" style={{ color: '#A1A1AA' }}>
                          <span className="w-1.5 h-1.5 rounded-full mt-2 mr-3 flex-shrink-0" style={{ background: '#FFFFFF', boxShadow: '0 0 4px rgba(255,255,255,0.3)' }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Outcome</h3>
                    <p className="leading-relaxed font-medium" style={{ color: '#A1A1AA' }}>
                      {automationSystems.flagship.outcome}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 relative z-10" style={{ borderTop: '1px solid rgba(39,39,42,0.6)' }}>
                  <div className="flex flex-col sm:flex-row gap-4">
                    {automationSystems.flagship.demoUrl && (
                      <motion.a
                        href={automationSystems.flagship.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <PlayIcon className="w-4 h-4" />
                        Watch Full Demo
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
              </div>
            </FloatingCard>
          </motion.div>

          {/* SUPPORTING SYSTEMS */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full glow-pulse" style={{ background: '#FFFFFF' }} />
                <span className="mono-label">Supporting Systems</span>
                <div className="w-2 h-2 rounded-full glow-pulse" style={{ background: '#FFFFFF' }} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {automationSystems.supporting.map((system, index) => (
                <motion.div
                  key={system.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.2 }}
                >
                  <FloatingCard>
                    <div className="p-6 transition-all duration-300 h-full relative overflow-hidden glass-card group" style={{ borderRadius: '12px' }}>
                      <div className="relative z-10">
                        <motion.h3
                          className="text-xl font-semibold text-white mb-3 transition-colors"
                          style={{ letterSpacing: '-0.01em' }}
                          whileHover={{ x: 5 }}
                        >
                          {system.title}
                        </motion.h3>
                        <p className="text-sm mb-4 leading-relaxed" style={{ color: '#71717A' }}>
                          {system.description}
                        </p>
                        <p className="text-sm mb-4" style={{ color: '#A1A1AA' }}>
                          {system.systemPurpose}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {system.tools?.map((tool, toolIndex) => (
                            <motion.span
                              key={toolIndex}
                              className="tech-badge"
                              whileHover={{ scale: 1.05 }}
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
                            className="flex items-center gap-2 text-sm transition-colors"
                            style={{ color: '#A1A1AA' }}
                            whileHover={{ x: 5 }}
                          >
                            <PlayIcon className="w-4 h-4" />
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

        {/* SECTION 2: PLATFORM CASE STUDIES */}
        <section>
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#FFFFFF', letterSpacing: '-0.03em' }}>
              Platform Case Studies
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#71717A' }}>
              Architecture, Standards, and Value Delivery
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {platformProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15 }}
              >
                <FloatingCard>
                  <div className="p-6 transition-all duration-300 h-full relative overflow-hidden glass-card group" style={{ borderRadius: '12px' }}>
                    <div className="relative z-10">
                      <motion.h2
                        className="text-xl font-bold text-white mb-2"
                        style={{ letterSpacing: '-0.01em' }}
                        whileHover={{ x: 5 }}
                      >
                        {project.title}
                      </motion.h2>
                      <div className="flex items-center gap-2 mb-4">
                        <motion.span className="tech-badge" whileHover={{ scale: 1.05 }}>
                          {project.id === 'acquisitions-api' ? 'Platform · API' :
                           project.id === 'voice-to-vector-api' ? 'Internal API' :
                           project.id === 'legacy-migration' ? 'Modernization' :
                           'IaC Pattern'}
                        </motion.span>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h3 className="mono-label mb-2">Overview</h3>
                          <p className="text-sm leading-relaxed" style={{ color: '#A1A1AA' }}>
                            {project.description}
                          </p>
                        </div>

                        <div>
                          <h3 className="mono-label mb-2">Key Capabilities</h3>
                          <ul className="space-y-1">
                            {project.highlights?.slice(0, 4).map((highlight, hIndex) => (
                              <li key={hIndex} className="flex items-start text-sm" style={{ color: '#A1A1AA' }}>
                                <span className="w-1 h-1 rounded-full mt-2 mr-2 flex-shrink-0" style={{ background: '#FFFFFF', boxShadow: '0 0 3px rgba(255,255,255,0.3)' }} />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="mono-label mb-2">Architecture &amp; Stack</h3>
                          <ul className="space-y-1">
                            {project.highlights?.slice(4, 8).map((highlight, hIndex) => (
                              <li key={hIndex} className="flex items-start text-sm" style={{ color: '#A1A1AA' }}>
                                <span className="w-1 h-1 rounded-full mt-2 mr-2 flex-shrink-0" style={{ background: '#FFFFFF', boxShadow: '0 0 3px rgba(255,255,255,0.3)' }} />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="mono-label mb-2">Value Delivered</h3>
                          <p className="text-sm leading-relaxed" style={{ color: '#A1A1AA' }}>
                            {project.outcome}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 pt-4" style={{ borderTop: '1px solid rgba(39,39,42,0.6)' }}>
                        <div className="flex flex-col gap-3">
                          {project.githubUrl && (
                            <motion.a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm transition-colors"
                              style={{ color: '#A1A1AA' }}
                              whileHover={{ x: 5 }}
                            >
                              <CodeBracketIcon className="w-4 h-4" />
                              View Repository
                            </motion.a>
                          )}
                          {project.demoUrl && (
                            <motion.a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm transition-colors"
                              style={{ color: '#A1A1AA' }}
                              whileHover={{ x: 5 }}
                            >
                              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                              View Live
                            </motion.a>
                          )}
                          <motion.a
                            href="/contact"
                            className="flex items-center gap-2 text-sm transition-colors"
                            style={{ color: '#71717A' }}
                            whileHover={{ x: 5 }}
                          >
                            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                            Request Case Details
                          </motion.a>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies?.slice(0, 6).map((tech, techIndex) => (
                            <motion.span
                              key={techIndex}
                              className="tech-badge"
                              whileHover={{ scale: 1.05, y: -2 }}
                              transition={{ type: 'spring', stiffness: 400 }}
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

        {/* Final CTA */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-20 text-center"
        >
          <FloatingCard>
            <div className="p-8 relative overflow-hidden glass-card" style={{ borderRadius: '16px' }}>
              <motion.h2
                className="text-2xl font-semibold mb-4 relative z-10 text-white"
                style={{ letterSpacing: '-0.02em' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Two Disciplines. One Engineer.
              </motion.h2>
              <motion.p
                className="mb-6 max-w-2xl mx-auto relative z-10"
                style={{ color: '#71717A' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Automation Systems = Operational Intelligence. Platform Case Studies = Infrastructure &amp; API Engineering.
              </motion.p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <motion.a
                  href="/contact"
                  className="btn-primary px-6 py-3 text-sm font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.a>
                <motion.a
                  href={portfolioData.personal.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glass px-6 py-3 text-sm font-semibold"
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
