'use client';

import { motion } from 'framer-motion';
import { Project } from '@/types';
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
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
      viewport={{ once: true, margin: "-50px" }}
      whileHover="hover"
      className="group relative"
    >
      <motion.div
        variants={hoverVariants}
        className="relative h-full bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
      >
        {/* Project Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {project.description}
            </p>
            
            {/* Problem/Solution Structure */}
            {(project.problem || project.technicalArchitecture || project.operationalValue || project.outcome) && (
              <div className="space-y-3 mb-4">
                {project.problem && (
                  <div>
                    <span className="text-xs font-medium text-orange-400 uppercase tracking-wide">Problem</span>
                    <p className="text-gray-300 text-sm mt-1 leading-relaxed">{project.problem}</p>
                  </div>
                )}
                {project.technicalArchitecture && (
                  <div>
                    <span className="text-xs font-medium text-blue-400 uppercase tracking-wide">Technical Architecture</span>
                    <p className="text-gray-300 text-sm mt-1 leading-relaxed">{project.technicalArchitecture}</p>
                  </div>
                )}
                {project.operationalValue && (
                  <div>
                    <span className="text-xs font-medium text-green-400 uppercase tracking-wide">Operational Value</span>
                    <p className="text-gray-300 text-sm mt-1 leading-relaxed">{project.operationalValue}</p>
                  </div>
                )}
                {project.outcome && (
                  <div>
                    <span className="text-xs font-medium text-purple-400 uppercase tracking-wide">Outcome</span>
                    <p className="text-gray-300 text-sm mt-1 leading-relaxed font-medium">{project.outcome}</p>
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
            viewport={{ once: true, margin: "-30px" }}
            transition={{ staggerChildren: 0.05, delayChildren: 0.2 }}
          >
            {project.technologies.map((tech, techIndex) => (
              <motion.span
                key={techIndex}
                variants={techVariants}
                className="px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Highlights */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Key Features:</h4>
          <motion.ul 
            className="space-y-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
          >
            {project.highlights.slice(0, 4).map((highlight, highlightIndex) => (
              <motion.li
                key={highlightIndex}
                variants={highlightVariants}
                className="text-sm text-gray-400 flex items-start"
              >
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                {highlight}
              </motion.li>
            ))}
            {project.highlights.length > 4 && (
              <motion.li 
                variants={highlightVariants}
                className="text-sm text-gray-500 italic"
              >
                +{project.highlights.length - 4} more features...
              </motion.li>
            )}
          </motion.ul>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group/link focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md px-1 py-1"
              aria-label={`View ${project.title} source code on GitHub`}
            >
              <CodeBracketIcon className="w-4 h-4 group-hover/link:text-blue-400 transition-colors" aria-hidden="true" />
              <span>View Code</span>
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group/link focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md px-1 py-1"
              aria-label={`View ${project.title} live demo`}
            >
              <ArrowTopRightOnSquareIcon className="w-4 h-4 group-hover/link:text-blue-400 transition-colors" aria-hidden="true" />
              <span>Live Demo</span>
            </a>
          )}
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}