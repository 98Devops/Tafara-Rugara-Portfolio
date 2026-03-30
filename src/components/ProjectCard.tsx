'use client';

import { motion } from 'framer-motion';
import { Project } from '@/types';
import {
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
  DocumentArrowDownIcon,
} from '@heroicons/react/24/outline';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({
  project,
  index: _index,
}: ProjectCardProps) {
  const cardVariants = {
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

  const hoverVariants = {
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const techVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  const highlightVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      whileHover="hover"
      className="group relative"
    >
      <motion.div
        variants={hoverVariants}
        className="relative h-full rounded-xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10"
      >
        {/* Project Header */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1">
            <h3 className="mb-2 text-xl font-semibold text-white transition-colors group-hover:text-blue-400">
              {project.title}
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-gray-400">
              {project.description}
            </p>

            {/* Problem/Solution Structure */}
            {(project.problem ||
              project.technicalArchitecture ||
              project.operationalValue ||
              project.outcome) && (
              <div className="mb-4 space-y-3">
                {project.problem && (
                  <div>
                    <span className="text-xs font-medium uppercase tracking-wide text-orange-400">
                      Problem
                    </span>
                    <p className="mt-1 text-sm leading-relaxed text-gray-300">
                      {project.problem}
                    </p>
                  </div>
                )}
                {project.technicalArchitecture && (
                  <div>
                    <span className="text-xs font-medium uppercase tracking-wide text-blue-400">
                      Technical Architecture
                    </span>
                    <p className="mt-1 text-sm leading-relaxed text-gray-300">
                      {project.technicalArchitecture}
                    </p>
                  </div>
                )}
                {project.operationalValue && (
                  <div>
                    <span className="text-xs font-medium uppercase tracking-wide text-green-400">
                      Operational Value
                    </span>
                    <p className="mt-1 text-sm leading-relaxed text-gray-300">
                      {project.operationalValue}
                    </p>
                  </div>
                )}
                {project.outcome && (
                  <div>
                    <span className="text-xs font-medium uppercase tracking-wide text-purple-400">
                      Outcome
                    </span>
                    <p className="mt-1 text-sm font-medium leading-relaxed text-gray-300">
                      {project.outcome}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-6">
          <motion.div
            className="flex flex-wrap gap-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-30px' }}
            transition={{ staggerChildren: 0.05, delayChildren: 0.2 }}
          >
            {project.technologies.map((tech, techIndex) => (
              <motion.span
                key={techIndex}
                variants={techVariants}
                className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Highlights */}
        <div className="mb-6">
          <h4 className="mb-3 text-sm font-medium text-gray-300">
            Key Features:
          </h4>
          <motion.ul
            className="space-y-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-30px' }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
          >
            {project.highlights.slice(0, 4).map((highlight, highlightIndex) => (
              <motion.li
                key={highlightIndex}
                variants={highlightVariants}
                className="flex items-start text-sm text-gray-400"
              >
                <span className="mr-3 mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                {highlight}
              </motion.li>
            ))}
            {project.highlights.length > 4 && (
              <motion.li
                variants={highlightVariants}
                className="text-sm italic text-gray-500"
              >
                +{project.highlights.length - 4} more features...
              </motion.li>
            )}
          </motion.ul>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-4 border-t border-gray-800 pt-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-2 rounded-md px-1 py-1 text-sm text-gray-400 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label={`View ${project.title} source code on GitHub`}
            >
              <CodeBracketIcon
                className="h-4 w-4 transition-colors group-hover/link:text-blue-400"
                aria-hidden="true"
              />
              <span>View Code</span>
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-2 rounded-md px-1 py-1 text-sm text-gray-400 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label={`View ${project.title} live demo`}
            >
              <ArrowTopRightOnSquareIcon
                className="h-4 w-4 transition-colors group-hover/link:text-blue-400"
                aria-hidden="true"
              />
              <span>Live Demo</span>
            </a>
          )}
          {project.documentationUrl && (
            <a
              href={project.documentationUrl}
              download
              className="group/link flex items-center gap-2 rounded-md px-1 py-1 text-sm text-gray-400 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label={`Download ${project.title} documentation`}
            >
              <DocumentArrowDownIcon
                className="h-4 w-4 transition-colors group-hover/link:text-green-400"
                aria-hidden="true"
              />
              <span>Documentation</span>
            </a>
          )}
        </div>

        {/* Hover Effect Overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </motion.div>
    </motion.div>
  );
}
