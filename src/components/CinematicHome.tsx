'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  automationSystems,
  portfolioData,
  testimonial,
} from '@/data/portfolio';

const disciplines = [
  {
    name: 'Automation',
    label: 'From a signal to something useful.',
    input: 'TRIGGER',
    core: 'ORCHESTRATE',
    output: 'ACTION',
    tools: 'n8n / GoHighLevel / APIs',
    detail:
      'Connect the tools. Validate the data. Give every failure a recovery path.',
  },
  {
    name: 'Applications',
    label: 'From a workflow to a working product.',
    input: 'INTERFACE',
    core: 'BUSINESS LOGIC',
    output: 'DATABASE',
    tools: 'React / TypeScript / Supabase',
    detail:
      'Turn real operational problems into clear interfaces and dependable business logic.',
  },
  {
    name: 'Cloud',
    label: 'From source code to a reliable service.',
    input: 'COMMIT',
    core: 'BUILD & DEPLOY',
    output: 'OBSERVE',
    tools: 'AWS / Docker / GitHub Actions',
    detail:
      'Make deployment repeatable, infrastructure understandable and recovery practical.',
  },
];

const process = [
  {
    title: 'Understand the real problem.',
    text: 'Map the people, the data and the workarounds. Find where time disappears and where errors enter before choosing a tool.',
  },
  {
    title: 'Build the complete system.',
    text: 'Connect the interface, business logic, integrations and infrastructure. Make the important decisions explicit and the daily work simpler.',
  },
  {
    title: 'Test the uncomfortable cases.',
    text: 'Duplicate events. Partial payments. An API that stops responding. Build validation, recovery paths and useful logs around the ways a system can fail.',
  },
  {
    title: 'Ship it. Keep it dependable.',
    text: 'Deploy, document and observe. Leave behind something that can be understood, maintained and improved after the first release.',
  },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>;
}

function Blueprint({ active }: { active: number }) {
  const data = disciplines[active];
  return (
    <div className="system-blueprint">
      <div className="blueprint-top">
        <span>SYSTEM BLUEPRINT</span>
        <span>0{active + 1} / 03</span>
      </div>
      <div className="blueprint-art" aria-hidden="true">
        <svg viewBox="0 0 540 460" fill="none">
          <defs>
            <linearGradient
              id="orbit-light"
              x1="60"
              y1="80"
              x2="480"
              y2="390"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#ff895e" />
              <stop offset=".45" stopColor="#e2672e" />
              <stop offset="1" stopColor="#35221a" />
            </linearGradient>
            <radialGradient id="core-light">
              <stop stopColor="#ffb18f" />
              <stop offset=".18" stopColor="#ed794a" />
              <stop offset="1" stopColor="#9b3c1c" />
            </radialGradient>
          </defs>
          <path
            d="M270 20V440M35 230H505"
            stroke="#383838"
            strokeDasharray="3 7"
          />
          <circle cx="270" cy="230" r="185" stroke="#303133" />
          <circle
            cx="270"
            cy="230"
            r="151"
            stroke="#262729"
            strokeDasharray="2 9"
          />
          <g className="orbit-rings">
            <ellipse
              cx="270"
              cy="230"
              rx="205"
              ry="75"
              stroke="url(#orbit-light)"
              strokeWidth="1.5"
              transform="rotate(-32 270 230)"
            />
            <ellipse
              cx="270"
              cy="230"
              rx="205"
              ry="75"
              stroke="url(#orbit-light)"
              strokeWidth="1.5"
              transform="rotate(32 270 230)"
            />
            <ellipse
              cx="270"
              cy="230"
              rx="205"
              ry="75"
              stroke="url(#orbit-light)"
              strokeWidth="1.5"
              transform="rotate(90 270 230)"
            />
            <circle cx="96" cy="331" r="5" fill="#ffad82" />
            <circle cx="444" cy="331" r="5" fill="#ffad82" />
            <circle cx="270" cy="25" r="5" fill="#ffad82" />
          </g>
          <path
            d="M270 156 335 193v74l-65 37-65-37v-74Z"
            fill="#201b18"
            stroke="#eb936e"
          />
          <path d="m270 156 65 37-65 38-65-38Z" fill="url(#core-light)" />
          <path d="M270 231v73l65-37v-74Z" fill="#a24b29" />
          <path d="M270 231v73l-65-37v-74Z" fill="#63341f" />
          <path
            d="m237 212 33 19 33-19M270 231v38"
            stroke="#ffd5b9"
            strokeWidth="1.5"
          />
        </svg>
        <span className="orbit-label label-input">{data.input}</span>
        <span className="orbit-label label-core">{data.core}</span>
        <span className="orbit-label label-output">{data.output}</span>
      </div>
      <div className="blueprint-bottom">
        <span className="live-dot" />
        <span>{data.tools}</span>
        <span aria-hidden="true">⌘</span>
      </div>
    </div>
  );
}

export function CinematicHome() {
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const { personal } = portfolioData;
  const trevis = portfolioData.projects.find(
    project => project.id === 'trevis-property-management'
  )!;

  return (
    <main
      id="main-content"
      className={paused ? 'cinematic-home motion-paused' : 'cinematic-home'}
    >
      <section className="cinema-hero" aria-labelledby="hero-heading">
        <div className="wrap">
          <div className="hero-meta">
            <span>
              <i className="live-dot" /> OPEN TO OPPORTUNITIES
            </span>
            <span>HARARE, ZIMBABWE · GMT+2</span>
          </div>
          <div className="cinema-hero-grid">
            <div className="hero-copy">
              <p className="cinema-eyebrow rise">
                TAFARA RUGARA / AI SYSTEMS BUILDER
              </p>
              <h1 id="hero-heading" className="rise d1">
                Built to think.
                <br />
                Engineered
                <br />
                to <em>work.</em>
              </h1>
              <p className="hero-description rise d2">
                I build AI workflows, business applications and the cloud
                infrastructure that keeps them running.
              </p>
              <div className="hero-actions rise d3">
                <Link className="btn-solid" href="/projects">
                  Explore my work <Arrow />
                </Link>
                <a
                  className="cv-link"
                  href={personal.documents.cv}
                  download="Tafara-Rugara-CV.pdf"
                >
                  Download CV <span aria-hidden="true">↓</span>
                </a>
              </div>
              <div className="hero-socials rise d3">
                <a
                  href={personal.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub <Arrow diagonal />
                </a>
                <a
                  href={personal.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn <Arrow diagonal />
                </a>
                <Link href="/contact">
                  Let’s talk <Arrow diagonal />
                </Link>
              </div>
            </div>
            <div className="hero-system">
              <Blueprint active={active} />
              <div
                className="discipline-switch"
                role="group"
                aria-label="Explore my disciplines"
              >
                {disciplines.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    aria-pressed={active === index}
                    onClick={() => setActive(index)}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              <p className="blueprint-caption" aria-live="polite">
                {disciplines[active].label}
              </p>
            </div>
          </div>
          <div className="hero-baseline">
            <span>IDEA → INTERFACE → AUTOMATION → INFRASTRUCTURE</span>
            <button
              type="button"
              onClick={() => setPaused(!paused)}
              aria-pressed={paused}
            >
              {paused ? 'Resume motion' : 'Pause motion'}{' '}
              <span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span>
            </button>
            <a href="#selected-work">SCROLL TO EXPLORE ↓</a>
          </div>
        </div>
      </section>
      <section className="expertise-strip" aria-label="Areas of expertise">
        <div className="wrap">
          <span>THE FULL PICTURE.</span>
          <p>
            Intelligent automation <b>✳</b> Useful software <b>✳</b> Reliable
            infrastructure
          </p>
        </div>
      </section>
      <section
        className="selected-work wrap"
        id="selected-work"
        aria-labelledby="work-heading"
      >
        <div className="section-heading">
          <div>
            <p className="cinema-eyebrow">01 / SELECTED WORK</p>
            <h2 id="work-heading">
              Real problems.
              <br />
              <span>Working systems.</span>
            </h2>
          </div>
          <p>
            From daily business operations to AI-powered workflows. A closer
            look at what I build.
          </p>
        </div>
        <article className="featured-project trevis-feature">
          <div
            className="project-visual dashboard-visual"
            role="img"
            aria-label="Illustrative Trevis interface showing property management, payment tracking and reporting. No live tenant data."
          >
            <div className="visual-label">
              <span>BUSINESS APPLICATION</span>
              <span>01</span>
            </div>
            <div className="mini-dashboard">
              <aside>
                <strong>
                  t<span>revis</span>
                </strong>
                <span className="mini-nav-active">◫ Overview</span>
                <span>⌂ Properties</span>
                <span>↔ Payments</span>
                <span>▤ Reports</span>
                <small>ONE SOURCE OF TRUTH</small>
              </aside>
              <div className="mini-dashboard-main">
                <div className="mini-dashboard-top">
                  <span>Portfolio overview</span>
                  <i />
                </div>
                <p>
                  Your properties.
                  <br />
                  <strong>One clear picture.</strong>
                </p>
                <div className="mini-stats">
                  <div>
                    <small>PROPERTIES</small>
                    <b>Connected</b>
                  </div>
                  <div>
                    <small>PAYMENTS</small>
                    <b>Traceable</b>
                  </div>
                  <div>
                    <small>REPORTING</small>
                    <b>Automated</b>
                  </div>
                </div>
                <div className="mini-chart">
                  <span>From scattered records to clarity</span>
                  <div>
                    {[36, 55, 44, 69, 58, 82, 73, 95, 87, 110, 104, 127].map(
                      (height, index) => (
                        <i key={index} style={{ height }} />
                      )
                    )}
                  </div>
                </div>
                <div className="mini-dashboard-foot">
                  <span>React + Supabase</span>
                  <span>Built for daily operations ↗</span>
                </div>
              </div>
            </div>
            <span className="visual-disclaimer">
              INTERFACE ILLUSTRATION · NOT LIVE DATA
            </span>
          </div>
          <div className="project-copy">
            <div>
              <p className="cinema-eyebrow">
                FULL-STACK DEVELOPMENT / AUTOMATION
              </p>
              <h3>Trevis</h3>
              <p>
                Four spreadsheets became one working system. Property
                management, tenant payments and reporting brought together for a
                real student accommodation business.
              </p>
              <div className="project-tags">
                <span>React</span>
                <span>Supabase</span>
                <span>PostgreSQL</span>
              </div>
            </div>
            <div className="project-links">
              <a
                href={trevis.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit live app <Arrow diagonal />
              </a>
              <a
                href={trevis.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View source <Arrow diagonal />
              </a>
            </div>
          </div>
        </article>
        <article className="featured-project automation-feature">
          <div className="project-visual workflow-visual">
            <div className="visual-label">
              <span>AI OPERATIONS / PILOT</span>
              <span>02</span>
            </div>
            <div className="workflow-scene">
              <p>
                Less chasing.
                <br />
                <em>More clarity.</em>
              </p>
              <div className="workflow-path">
                <div>
                  <span>01</span>
                  <b>ClickUp</b>
                  <small>Project signals</small>
                </div>
                <i aria-hidden="true">→</i>
                <div className="workflow-core">
                  <span>02</span>
                  <b>n8n + AI</b>
                  <small>Score & diagnose</small>
                </div>
                <i aria-hidden="true">→</i>
                <div>
                  <span>03</span>
                  <b>Leadership</b>
                  <small>Review & act</small>
                </div>
              </div>
              <div className="workflow-safeguards">
                <span>↳ Schema validation</span>
                <span>↳ Retry handling</span>
                <span>↳ Human review</span>
              </div>
            </div>
            <span className="visual-disclaimer">
              DELIVERY HEALTH · WORKFLOW OVERVIEW
            </span>
          </div>
          <div className="project-copy">
            <div>
              <p className="cinema-eyebrow">AI WORKFLOWS / API INTEGRATION</p>
              <h3>Delivery Intelligence</h3>
              <p>
                A ClickUp pilot that turns fragmented project updates into
                structured health scores, AI-assisted diagnostics and
                consolidated leadership reports.
              </p>
              <div className="project-tags">
                <span>n8n</span>
                <span>ClickUp</span>
                <span>LLMs</span>
              </div>
            </div>
            <div className="project-links">
              <a
                href={automationSystems.flagship.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch the demo <Arrow diagonal />
              </a>
              <a
                href={automationSystems.flagship.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore the system <Arrow diagonal />
              </a>
            </div>
          </div>
        </article>
        <Link href="/projects" className="all-projects">
          More websites, applications & cloud projects{' '}
          <span>
            View all work <Arrow />
          </span>
        </Link>
      </section>
      <section className="capability-section">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <p className="cinema-eyebrow">02 / WHAT I BRING</p>
              <h2>
                Connected thinking.
                <br />
                <span>End-to-end execution.</span>
              </h2>
            </div>
            <Link href="/what-i-do" className="text-link">
              Explore my capabilities <Arrow diagonal />
            </Link>
          </div>
          <div className="capability-columns">
            {disciplines.map((item, index) => (
              <div key={item.name}>
                <span className="capability-number">0{index + 1}</span>
                <h3>{item.name}</h3>
                <p>{item.detail}</p>
                <span className="capability-tools">{item.tools}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        className="process-section wrap"
        aria-labelledby="process-heading"
      >
        <div>
          <p className="cinema-eyebrow">03 / HOW I WORK</p>
          <h2 id="process-heading">
            The details
            <br />
            make it <em>dependable.</em>
          </h2>
          <p>Good engineering shows up when the happy path ends.</p>
          <Link href="/experience" className="text-link">
            My experience <Arrow diagonal />
          </Link>
        </div>
        <div className="process-steps">
          {process.map((item, index) => (
            <div
              key={item.title}
              className={
                step === index ? 'process-step is-open' : 'process-step'
              }
            >
              <h3>
                <button
                  type="button"
                  aria-expanded={step === index}
                  aria-controls={`process-panel-${index}`}
                  onClick={() => setStep(step === index ? -1 : index)}
                >
                  <span>0{index + 1}</span>
                  {item.title}
                  <b aria-hidden="true">{step === index ? '−' : '+'}</b>
                </button>
              </h3>
              <div id={`process-panel-${index}`} hidden={step !== index}>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="about-section">
        <div className="wrap about-grid">
          <div>
            <p className="cinema-eyebrow">04 / THE PERSON BEHIND THE SYSTEMS</p>
            <h2>
              I’m Taf.
              <br />A builder at heart.
            </h2>
            <p>
              Based in Harare, Zimbabwe. I work across software, automation and
              cloud infrastructure, connecting the pieces that turn an idea into
              something people can use.
            </p>
            <p>
              I care about the work after launch: clear documentation, useful
              logs, recoverable failures and software that earns its place in
              someone’s day.
            </p>
            <a
              href={personal.documents.cv}
              download="Tafara-Rugara-CV.pdf"
              className="text-link"
            >
              Download my CV <span aria-hidden="true">↓</span>
            </a>
          </div>
          <figure className="cinema-quote">
            <span aria-hidden="true">“</span>
            <blockquote>{testimonial.quote}</blockquote>
            <figcaption>
              <strong>{testimonial.author}</strong>
              <span>
                {testimonial.title}, {testimonial.company}
              </span>
            </figcaption>
          </figure>
        </div>
      </section>
      <section className="cinema-contact wrap">
        <p className="cinema-eyebrow">HAVE A CHALLENGE WORTH SOLVING?</p>
        <h2>
          Let’s build
          <br />
          something <em>useful.</em>
        </h2>
        <div>
          <Link href="/contact" className="btn-solid">
            Start a conversation <Arrow diagonal />
          </Link>
          <a href={`mailto:${personal.socialLinks.email}`}>
            {personal.socialLinks.email} <Arrow diagonal />
          </a>
        </div>
        <p>Open to remote roles, contracts and thoughtful collaborations.</p>
      </section>
    </main>
  );
}
