'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useMotionPreferences } from './MotionPreferences';
const scenes = [
  {
    name: 'INTELLIGENCE, IN MOTION',
    core: 'AI',
    input: 'A voice note.',
    inputLabel: 'UNSTRUCTURED INPUT',
    output: 'A clear next step.',
    outputLabel: 'STRUCTURED ACTION',
    steps: ['Capture', 'Understand', 'Validate', 'Connect'],
    code: ['intent: task', 'priority: high', 'review: ready'],
    tools: 'Whisper / LLMs / n8n',
    type: 'voice',
  },
  {
    name: 'IDEAS, MADE TANGIBLE',
    core: '{ }',
    input: 'A real problem.',
    inputLabel: 'PEOPLE + PROCESS',
    output: 'Software people use.',
    outputLabel: 'INTERFACE TO DATABASE',
    steps: ['Discover', 'Build', 'Validate', 'Ship'],
    code: ['types: checked', 'access: scoped', 'record: saved'],
    tools: 'React / TypeScript / Supabase',
    type: 'app',
  },
  {
    name: 'ENGINEERED FOR DELIVERY',
    core: '⌘',
    input: 'A code change.',
    inputLabel: 'SOURCE TO SERVICE',
    output: 'Ready for the world.',
    outputLabel: 'REPEATABLE DELIVERY',
    steps: ['Commit', 'Build', 'Test', 'Deploy'],
    code: ['build: passed', 'checks: passed', 'release: ready'],
    tools: 'GitHub Actions / Docker / AWS',
    type: 'cloud',
  },
];
export function HeroExperience({ active = 0 }: { active?: number }) {
  const { paused, reduced } = useMotionPreferences();
  const [phase, setPhase] = useState(0);
  const [inView, setInView] = useState(true);
  const [revision, setRevision] = useState(0);
  const host = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const scene = scenes[active];
  const enabled = !paused && !reduced;
  useEffect(() => {
    setPhase(0);
  }, [active]);
  useEffect(() => {
    if (!enabled || !inView) return;
    const timer = setInterval(() => setPhase(value => (value + 1) % 4), 2600);
    return () => clearInterval(timer);
  }, [enabled, inView, active, revision]);
  useEffect(() => {
    if (!host.current || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(host.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!enabled) {
      host.current?.style.setProperty('--pointer-x', '0deg');
      host.current?.style.setProperty('--pointer-y', '0deg');
    }
    return () => cancelAnimationFrame(raf.current);
  }, [enabled]);
  function track(event: React.PointerEvent<HTMLDivElement>) {
    if (!enabled || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      host.current?.style.setProperty('--pointer-x', -y * 9 + 'deg');
      host.current?.style.setProperty('--pointer-y', x * 11 + 'deg');
    });
  }
  function reset() {
    cancelAnimationFrame(raf.current);
    host.current?.style.setProperty('--pointer-x', '0deg');
    host.current?.style.setProperty('--pointer-y', '0deg');
  }
  return (
    <div
      ref={host}
      className={'hero-experience ' + (!inView ? 'scene-sleep' : '')}
      data-phase={phase}
      data-scene={scene.type}
      onPointerMove={track}
      onPointerLeave={reset}
    >
      <div className="experience-topline">
        <span>
          <i />
          {scene.name}
        </span>
        <span>0{active + 1} / 03</span>
      </div>
      <div
        className="engine-stage"
        role="img"
        aria-label={
          scene.input +
          ' ' +
          scene.steps.join(', ') +
          '. ' +
          scene.output +
          ' Illustrative engineering sequence.'
        }
      >
        <div className="engine-atmosphere" aria-hidden="true" />
        <span className="engine-coordinate coordinate-top" aria-hidden="true">
          INPUT → INTELLIGENCE → IMPACT
        </span>
        <div className="engine-world" aria-hidden="true">
          <div className="engine-orbit orbit-one">
            <i />
          </div>
          <div className="engine-orbit orbit-two">
            <i />
          </div>
          <div className="engine-orbit orbit-three">
            <i />
          </div>
          <div className="engine-object">
            <div className="engine-shell shell-back" />
            <div className="engine-shell shell-middle" />
            <div className="engine-shell shell-front">
              <div className="engine-grooves" />
              <div className="engine-heart">
                <span>{scene.core}</span>
                <small>
                  {scene.type === 'voice'
                    ? 'ORCHESTRATE'
                    : scene.type === 'app'
                      ? 'CREATE'
                      : 'DELIVER'}
                </small>
              </div>
            </div>
            <div className="engine-halo" />
          </div>
          <div className="floating-input">
            <div className="float-label">
              <span>01 / INPUT</span>
              <i />
            </div>
            <div className="voice-bars">
              {[12, 25, 17, 36, 46, 29, 39, 17, 26, 10].map((h, i) => (
                <i
                  key={i}
                  style={
                    {
                      '--bar-height': h + 'px',
                      '--bar-delay': i * 0.12 + 's',
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
            <strong>{scene.input}</strong>
            <small>{scene.inputLabel}</small>
          </div>
          <div className="floating-code">
            <span>02 / THE LOGIC</span>
            <div key={scene.type}>
              {scene.code.map((line, i) => (
                <p key={line}>
                  <b>0{i + 1}</b>
                  {line}
                  <i>✓</i>
                </p>
              ))}
            </div>
          </div>
          <div className="floating-output">
            <div className="output-mark">
              <span>↗</span>
              <i>✓</i>
            </div>
            <div>
              <small>{scene.outputLabel}</small>
              <strong>{scene.output}</strong>
            </div>
          </div>
          {scene.type === 'app' && (
            <div className="floating-product">
              <Image
                src="/images/work/munda.jpg"
                alt=""
                width={1600}
                height={800}
                sizes="240px"
              />
              <span>MUNDA / AN ACTUAL BUILD</span>
            </div>
          )}
          <div className="engine-ground" />
        </div>
        <span
          className="engine-coordinate coordinate-bottom"
          aria-hidden="true"
        >
          {scene.tools}
        </span>
        <span className="engine-phase-number" aria-hidden="true">
          0{phase + 1}
        </span>
      </div>
      <div
        className="engine-sequence"
        role="group"
        aria-label="Explore the engineering sequence"
      >
        {scene.steps.map((step, i) => (
          <button
            key={step}
            type="button"
            onClick={() => {
              setPhase(i);
              setRevision(v => v + 1);
            }}
            aria-pressed={phase === i}
          >
            <span>0{i + 1}</span>
            {step}
            <i />
          </button>
        ))}
      </div>
      <p className="experience-disclaimer">
        AN INTERACTIVE IDEA OF HOW I BUILD · NOT LIVE TELEMETRY
      </p>
    </div>
  );
}
