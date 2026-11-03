'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ProjectMedia } from './ProjectMedia';
const features = [
  {
    id: 'trevis-property-management',
    name: 'Trevis',
    tag: 'PROPERTY OPERATIONS / LIVE CLIENT SYSTEM',
    line: 'Four spreadsheets. One source of truth.',
    text: 'Tenant records, payment coverage and reporting brought together for a real student-accommodation business.',
    stack: ['React', 'Supabase', 'PostgreSQL'],
    href: 'https://trevis.netlify.app/',
    action: 'Visit live app',
  },
  {
    id: 'munda',
    name: 'Munda',
    tag: 'FARM CONTROL / LIVE PRODUCT',
    line: 'Clarity, even when the signal disappears.',
    text: 'A farm-control product connecting input records, offline capture and an auditable ledger to a clear view of farm operations.',
    stack: ['TypeScript', 'Supabase', 'Offline sync'],
    href: 'https://munda-mvp.netlify.app',
    action: 'Explore Munda',
  },
  {
    id: 'runproduce',
    name: 'RunProduce',
    tag: 'BROILER OPERATIONS / PRELAUNCH',
    line: 'From daily records to better decisions.',
    text: 'A client project bringing flock records, harvest planning and cashflow into a focused operational workflow.',
    stack: ['Next.js', 'TypeScript', 'Supabase'],
    href: '/projects#runproduce',
    action: 'Inside the build',
  },
  {
    id: 'litho-solutions',
    name: 'Litho',
    tag: 'MINERAL EXPLORATION / WEBSITE',
    line: 'Technical expertise. A clear first impression.',
    text: 'A digital presence for geological surveying and exploration, designed to explain the service and make the next step obvious.',
    stack: ['Next.js', 'React', 'Tailwind CSS'],
    href: 'https://litho-solution.netlify.app/',
    action: 'Visit website',
  },
];
export function WorkShowcase() {
  const [selected, setSelected] = useState(0);
  const project = features[selected];
  return (
    <section
      id="selected-work"
      className="work-cinema"
      aria-labelledby="work-heading"
    >
      <div className="wrap">
        <div className="section-heading">
          <div>
            <p className="cinema-eyebrow">01 / THE WORK, IN THE REAL WORLD</p>
            <h2 id="work-heading">
              Built with purpose.
              <br />
              <em>Made to be used.</em>
            </h2>
          </div>
          <p>
            Actual interfaces. Real decisions.
            <br />A closer look at the systems I build.
          </p>
        </div>
        <div
          className="work-selector"
          role="group"
          aria-label="Featured projects"
        >
          {features.map((item, i) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setSelected(i)}
              aria-pressed={selected === i}
            >
              <span>0{i + 1}</span>
              {item.name}
              <i>↗</i>
            </button>
          ))}
        </div>
        <div className={'work-stage stage-' + project.id}>
          <div key={project.id} className="work-stage-content">
            <div className="work-stage-heading">
              <div>
                <p className="cinema-eyebrow">{project.tag}</p>
                <h3>
                  {project.name}
                  <span>↗</span>
                </h3>
              </div>
              <p>{project.line}</p>
            </div>
            <ProjectMedia id={project.id} title={project.name} />
            <div className="work-stage-bottom">
              <p>{project.text}</p>
              <div className="project-tags">
                {project.stack.map(tech => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <a
                href={project.href}
                target={project.href.startsWith('https') ? '_blank' : undefined}
                rel="noopener noreferrer"
              >
                {project.action} ↗
              </a>
            </div>
          </div>
        </div>
        <Link href="/projects" className="all-projects">
          Applications, automation & digital experiences{' '}
          <span>Explore all projects →</span>
        </Link>
      </div>
    </section>
  );
}
