'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMotionPreferences } from './MotionPreferences';

const scenes = [
  {
    name: 'FROM SIGNAL TO SOMETHING USEFUL',
    input: 'A voice note.',
    output: 'A clear next step.',
    steps: ['Capture', 'Understand', 'Validate', 'Connect'],
    details: [
      'Capture the original thought.',
      'Bring the right context into view.',
      'Check the structure. Keep a human in the loop.',
      'Route the reviewed output into the next workflow.',
    ],
    tools: 'Whisper / LLMs / n8n',
    symbol: '≈',
    project: 'munda',
    title: 'Munda',
    href: '/projects#munda',
    caption: 'In practice: read-only AI tools in Munda.',
  },
  {
    name: 'FROM PROCESS TO PRODUCT',
    input: 'A real problem.',
    output: 'Software people use.',
    steps: ['Discover', 'Build', 'Validate', 'Ship'],
    details: [
      'Understand the people and the process.',
      'Connect the interface to the business logic.',
      'Validate the record and check access.',
      'Make the daily work simpler.',
    ],
    tools: 'React / TypeScript / Supabase',
    symbol: '{ }',
    project: 'trevis',
    title: 'Trevis',
    href: '/projects#trevis-property-management',
    caption: 'In practice: property operations in Trevis.',
  },
  {
    name: 'FROM SOURCE TO SERVICE',
    input: 'A code change.',
    output: 'Ready for the world.',
    steps: ['Commit', 'Build', 'Test', 'Deploy'],
    details: [
      'Start with a versioned change.',
      'Build a repeatable release.',
      'Run the checks before promotion.',
      'Deploy, observe and keep a recovery path.',
    ],
    tools: 'GitHub Actions / Docker / AWS',
    symbol: '↗',
    project: 'litho',
    title: 'Litho',
    href: '/projects#cloud-resume-challenge',
    caption: 'Explore the cloud builds and deployment work.',
  },
];
export function HeroExperience({ active = 0 }: { active?: number }) {
  const { paused, reduced } = useMotionPreferences();
  const [phase, setPhase] = useState(0);
  const [inView, setInView] = useState(true);
  const [revision, setRevision] = useState(0);
  const host = useRef<HTMLDivElement>(null);
  const scene = scenes[active];
  useEffect(() => {
    setPhase(0);
  }, [active]);
  useEffect(() => {
    if (paused || reduced || !inView) return;
    const timer = setInterval(() => setPhase(value => (value + 1) % 4), 2600);
    return () => clearInterval(timer);
  }, [paused, reduced, inView, active, revision]);
  useEffect(() => {
    if (!host.current || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(host.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={host}
      className="build-scene"
      data-phase={phase}
      data-active={active}
    >
      <div className="build-scene-top">
        <span>THE CONNECTED SYSTEM</span>
        <span>0{active + 1} / 03</span>
      </div>
      <div className="build-scene-cards">
        <div className="signal-card">
          <span className="signal-symbol" aria-hidden="true">
            {scene.symbol}
          </span>
          <small>INPUT</small>
          <strong>{scene.input}</strong>
        </div>
        <span className="signal-connector" aria-hidden="true">
          →
        </span>
        <div className={'result-card ' + (phase === 3 ? 'is-ready' : '')}>
          <span aria-hidden="true">↗</span>
          <small>OUTCOME</small>
          <strong>{scene.output}</strong>
        </div>
      </div>
      <div
        className="build-sequence"
        role="group"
        aria-label="Explore the engineering sequence"
      >
        {scene.steps.map((step, i) => (
          <button
            key={step}
            type="button"
            aria-pressed={phase === i}
            data-complete={i < phase}
            onClick={() => {
              setPhase(i);
              setRevision(v => v + 1);
            }}
          >
            <span>0{i + 1}</span>
            {step}
          </button>
        ))}
      </div>
      <p className="sequence-detail">{scene.details[phase]}</p>
      <div className="product-fan" aria-hidden="true">
        {scenes.map((item, i) => (
          <div
            key={item.project}
            className={
              'fan-shot ' +
              (active === i
                ? 'is-front'
                : i === (active + 1) % 3
                  ? 'is-left'
                  : 'is-right')
            }
          >
            <div className="fan-chrome">
              <span>● ● ●</span>
              {item.title}
            </div>
            <Image
              src={'/images/work/' + item.project + '.jpg'}
              alt=""
              width={1600}
              height={800}
              sizes="(max-width: 760px) 78vw, 440px"
              priority={i === 0}
            />
          </div>
        ))}
      </div>
      <div className="build-scene-bottom">
        <span>{scene.tools}</span>
        <button
          type="button"
          onClick={() => {
            setPhase(0);
            setRevision(v => v + 1);
          }}
          aria-label="Replay sequence"
        >
          Replay ↺
        </button>
      </div>
      <p className="scene-honesty">
        Illustrative workflow · screenshots from my projects
      </p>
      <Link
        className="scene-evidence"
        href={active === 2 ? '/projects' : scene.href}
      >
        {scene.caption} <span aria-hidden="true">↗</span>
      </Link>
    </div>
  );
}
