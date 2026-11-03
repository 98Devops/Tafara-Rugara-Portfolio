'use client';

import { useState } from 'react';
import { HeroExperience } from './HeroExperience';
import { WorkShowcase } from './WorkShowcase';
import { useMotionPreferences } from '@/components/MotionPreferences';
import { documents, availability } from '@/data/site';
import Link from 'next/link';
import { portfolioData, testimonial } from '@/data/portfolio';

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

export function CinematicHome() {
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(0);
  const { paused, toggle } = useMotionPreferences();
  const { personal } = portfolioData;

  return (
    <main
      id="main-content"
      className={paused ? 'cinematic-home motion-paused' : 'cinematic-home'}
    >
      <section className="cinema-hero" aria-labelledby="hero-heading">
        <div className="wrap">
          <div className="hero-meta">
            <span>OPEN TO OPPORTUNITIES</span>
            <span>{availability.short}</span>
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
                  href={documents.cv.href}
                  download={documents.cv.filename}
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
              <HeroExperience active={active} />
              <p className="blueprint-caption" aria-live="polite">
                {disciplines[active].label}
              </p>
            </div>
          </div>
          <div className="hero-baseline">
            <span>IDEA → INTERFACE → AUTOMATION → INFRASTRUCTURE</span>
            <button type="button" onClick={toggle} aria-pressed={paused}>
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
      <WorkShowcase />
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
              Available in Harare, Zimbabwe and South Africa. I work across
              software, automation and cloud infrastructure, connecting the
              pieces that turn an idea into something people can use.
            </p>
            <p>
              I care about the work after launch: clear documentation, useful
              logs, recoverable failures and software that earns its place in
              someone’s day.
            </p>
            <a
              href={documents.cv.href}
              download={documents.cv.filename}
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
      <section className="start-paths wrap" aria-labelledby="paths-heading">
        <p className="chapter-label">
          <span>YOUR NEXT STEP</span>
          <span>A DIRECT ROUTE</span>
        </p>
        <h2 id="paths-heading">
          Find <em>your way in.</em>
        </h2>
        <div className="path-grid">
          <Link href="/experience">
            <span>01 / HIRING</span>
            <h3>A builder for your team.</h3>
            <p>Experience, skills and a CV you can take with you.</p>
            <b>Meet the engineer ↗</b>
          </Link>
          <Link href="/spreadsheet-escape">
            <span>02 / BUSINESS</span>
            <h3>Your process. Working better.</h3>
            <p>
              Turn scattered records and repeated tasks into useful software.
            </p>
            <b>Explore the approach ↗</b>
          </Link>
          <Link href="/what-i-do">
            <span>03 / AUTOMATION</span>
            <h3>Connect the moving parts.</h3>
            <p>
              AI workflows, integrations and infrastructure built to work
              together.
            </p>
            <b>See what I do ↗</b>
          </Link>
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
        <p>
          Available in Harare, Zimbabwe and South Africa · Open to remote roles
          and contracts.
        </p>
      </section>
    </main>
  );
}
