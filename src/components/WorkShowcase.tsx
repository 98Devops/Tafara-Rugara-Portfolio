'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ProjectMedia } from './ProjectMedia';
import { portfolioData } from '@/data/portfolio';
const features = [
  {
    id: 'trevis-property-management',
    name: 'Trevis',
    tone: 'trevis',
    ghost: 'LEDGER',
    status: 'LIVE CLIENT SYSTEM',
    category: 'Property operations',
    line: 'Four spreadsheets. One source of truth.',
    text: 'Tenant records, payment coverage and reporting brought together for a real student-accommodation business.',
    tags: ['130+ tenants', 'Auditable payments'],
    action: 'Visit live app',
  },
  {
    id: 'munda',
    name: 'Munda',
    tone: 'munda',
    ghost: 'FIELD',
    status: 'LIVE PRODUCT',
    category: 'Farm control',
    line: 'Clarity, even when the signal disappears.',
    text: 'Farm inputs, offline capture and an auditable ledger. A clear view of the work for owners who cannot be there every day.',
    tags: ['Offline capture', 'Safe synchronization'],
    action: 'Explore Munda',
  },
  {
    id: 'runproduce',
    name: 'RunProduce',
    tone: 'runproduce',
    ghost: 'HARVEST',
    status: 'PRELAUNCH',
    category: 'Broiler operations',
    line: 'From daily records to better decisions.',
    text: 'Connecting flock records, harvest planning and cashflow in a focused workflow for a broiler business.',
    tags: ['Harvest planning', 'Cashflow decisions'],
  },
  {
    id: 'iats',
    name: 'IATS',
    tone: 'iats',
    ghost: 'CUSTODY',
    status: 'INDEPENDENT PRODUCT',
    category: 'Asset management',
    line: 'Who has what. And how it moved.',
    text: 'An asset-management product for schools, NGOs and businesses, with role-based access and a traceable chain of custody.',
    tags: ['QR workflows', 'Custody history'],
  },
  {
    id: 'litho-solutions',
    name: 'Litho Solutions',
    tone: 'litho',
    ghost: 'EXPLORE',
    status: 'WEBSITE',
    category: 'Mineral exploration',
    line: 'Technical expertise. A clear first impression.',
    text: 'A digital presence for geological surveying and exploration, designed to explain the service and make the next step obvious.',
    tags: ['Interactive visuals', 'Responsive website'],
    action: 'Visit website',
  },
  {
    id: 'proair-zimbabwe',
    name: 'ProAir Zimbabwe',
    tone: 'proair',
    ghost: 'AIRFLOW',
    status: 'WEBSITE',
    category: 'Heating & cooling',
    line: 'A business website built for the next enquiry.',
    text: 'Clear services, direct WhatsApp access and a focused contact experience for an air-conditioning specialist in Zimbabwe.',
    tags: ['WhatsApp enquiries', 'Service discovery'],
    action: 'Visit ProAir',
  },
];
export function WorkShowcase() {
  const [active, setActive] = useState(features[0].id);
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!host.current || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting)
            setActive(entry.target.id.replace('featured-', ''));
        });
      },
      { rootMargin: '-25% 0px -50% 0px' }
    );
    host.current
      .querySelectorAll('.showcase-panel')
      .forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (
    <section
      id="selected-work"
      className="stack-showcase"
      aria-labelledby="work-heading"
    >
      <div className="wrap showcase-intro">
        <p className="chapter-label">
          <span>01 / SELECTED WORK</span>
          <span>SIX FEATURED BUILDS</span>
        </p>
        <div>
          <h2 id="work-heading">
            Meet the <em>work.</em>
          </h2>
          <p>
            Real interfaces. Thoughtful engineering.
            <br />
            Live systems, independent products and what’s next.
          </p>
        </div>
      </div>
      <div ref={host} className="showcase-layout">
        <nav className="showcase-index" aria-label="Featured projects">
          <div className="wrap">
            <div>
              {features.map((item, i) => (
                <a
                  key={item.id}
                  href={'#featured-' + item.id}
                  aria-current={active === item.id ? 'location' : undefined}
                  onClick={() => setActive(item.id)}
                >
                  <span>0{i + 1}</span>
                  {item.name}
                </a>
              ))}
            </div>
            <a className="skip-work" href="#after-work">
              Skip projects ↓
            </a>
          </div>
        </nav>
        {features.map((item, i) => {
          const project = portfolioData.projects.find(p => p.id === item.id)!;
          return (
            <article
              id={'featured-' + item.id}
              key={item.id}
              className={'showcase-panel tone-' + item.tone}
              aria-labelledby={'title-' + item.id}
            >
              <div className="panel-ghost" aria-hidden="true">
                {item.ghost}
              </div>
              <div className="wrap panel-layout">
                <div className="panel-art">
                  <ProjectMedia id={item.id} title={item.name} />
                  <div className="panel-tags">
                    {item.tags.map(tag => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="panel-copy">
                  <p className="panel-category">
                    {item.category}
                    <span>{item.status}</span>
                  </p>
                  <h3 id={'title-' + item.id}>{item.name}</h3>
                  <p className="panel-tagline">{item.line}</p>
                  <p className="panel-description">{item.text}</p>
                  <p className="panel-tools">
                    {project.technologies.slice(0, 4).join(' / ')}
                  </p>
                  <div className="panel-actions">
                    {project.demoUrl && item.action && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.action} ↗
                      </a>
                    )}
                    <Link
                      href={'/projects#' + item.id}
                      className="panel-secondary"
                    >
                      Inside the build →
                    </Link>
                  </div>
                </div>
              </div>
              <div className="panel-count" aria-hidden="true">
                0{i + 1} / 06
              </div>
            </article>
          );
        })}
      </div>
      <div id="after-work" className="wrap showcase-all">
        <span>THERE’S MORE TO THE SYSTEM.</span>
        <Link href="/projects">Explore all projects →</Link>
      </div>
    </section>
  );
}
