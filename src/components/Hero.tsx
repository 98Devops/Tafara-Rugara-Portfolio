'use client';

import { PersonalInfo } from '@/types';
import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';

interface HeroProps {
  personal: PersonalInfo;
}

const SPECIALISMS = [
  'Cloud & DevOps Engineer',
  'AI Automation Architect',
  'Workflow Systems Specialist',
  'Infrastructure-as-Code Expert',
  'Container Orchestration Pro',
];

const STATS = [
  { value: '5+', label: 'Websites Live' },
  { value: '3+', label: 'AI Systems Built' },
  { value: '5+', label: 'DevOps & Cloud Projects' },
];

export function Hero({ personal }: HeroProps) {
  const [specIdx, setSpecIdx] = useState(0);
  const [displayText, setDisplay] = useState('');
  const [isDeleting, setDeleting] = useState(false);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Typewriter
  useEffect(() => {
    const full = SPECIALISMS[specIdx];
    const speed = isDeleting ? 30 : 60;
    typingRef.current = setTimeout(() => {
      if (!isDeleting) {
        setDisplay(full.slice(0, displayText.length + 1));
        if (displayText.length + 1 === full.length)
          setTimeout(() => setDeleting(true), 1800);
      } else {
        setDisplay(full.slice(0, displayText.length - 1));
        if (displayText.length === 0) {
          setDeleting(false);
          setSpecIdx(s => (s + 1) % SPECIALISMS.length);
        }
      }
    }, speed);
    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [displayText, isDeleting, specIdx]);

  const handleDownload = useCallback((href: string, name: string) => {
    const a = document.createElement('a');
    a.href = href;
    a.download = name;
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      try {
        document.body.removeChild(a);
      } catch {
        /* */
      }
    }, 200);
  }, []);

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ background: '#0A0F1E' }}
    >
      {/* CSS animated background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/4 top-1/4 h-[500px] w-[500px] animate-pulse rounded-full"
          style={{
            background:
              'radial-gradient(ellipse, rgba(0,212,255,0.12), transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 h-[400px] w-[400px] animate-pulse rounded-full"
          style={{
            background:
              'radial-gradient(ellipse, rgba(124,58,237,0.10), transparent 70%)',
            animationDelay: '1.5s',
          }}
        />
        <div
          className="absolute left-1/2 top-2/3 h-[350px] w-[350px] animate-pulse rounded-full"
          style={{
            background:
              'radial-gradient(ellipse, rgba(16,185,129,0.07), transparent 70%)',
            animationDelay: '3s',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,212,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content — using CSS animation class instead of framer-motion */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pb-16 pt-20 text-center">
        <div className="hero-fade-in mx-auto w-full max-w-5xl">
          {/* Profile photo */}
          {personal.profileImage && (
            <div
              className="hero-fade-in mb-7 flex justify-center"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="relative">
                <div
                  className="absolute inset-0 animate-pulse rounded-full"
                  style={{
                    background: 'rgba(0,212,255,0.20)',
                    transform: 'scale(1.15)',
                    borderRadius: '50%',
                  }}
                />
                <div
                  className="h-28 w-28 rounded-full p-[3px] md:h-32 md:w-32"
                  style={{
                    background:
                      'linear-gradient(135deg, #00D4FF, #7C3AED, #10b981)',
                    boxShadow: '0 0 30px rgba(0,212,255,0.35)',
                  }}
                >
                  <div
                    className="h-full w-full overflow-hidden rounded-full"
                    style={{ background: '#0A0F1E' }}
                  >
                    <Image
                      src={personal.profileImage}
                      alt={personal.name}
                      width={128}
                      height={128}
                      className="h-full w-full object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Availability badge */}
          <div
            className="hero-fade-in mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
            style={{
              background: 'rgba(16,185,129,0.10)',
              border: '1px solid rgba(16,185,129,0.30)',
              color: '#34d399',
              animationDelay: '0.15s',
            }}
          >
            <span className="pulse-dot" style={{ width: 8, height: 8 }} />
            Open to Opportunities · Harare &amp; Johannesburg
          </div>

          {/* Name */}
          <h1
            className="hero-fade-in mb-4 leading-tight"
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
              fontWeight: 800,
              background:
                'linear-gradient(135deg, #ffffff 0%, #00D4FF 40%, #7C3AED 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
              filter: 'drop-shadow(0 0 30px rgba(0,212,255,0.2))',
              animationDelay: '0.25s',
            }}
          >
            {personal.name}
          </h1>

          {/* Typewriter */}
          <div
            className="hero-fade-in mb-8 flex h-10 items-center justify-center md:h-12"
            style={{ animationDelay: '0.4s' }}
          >
            <p
              className="font-mono text-xl font-semibold md:text-2xl"
              style={{ color: '#00D4FF', letterSpacing: '0.02em' }}
            >
              {displayText}
              <span
                className="ml-0.5 animate-pulse"
                style={{ borderRight: '2px solid #00D4FF' }}
              >
                &nbsp;
              </span>
            </p>
          </div>

          {/* Summary */}
          <p
            className="hero-fade-in mx-auto mb-10 max-w-3xl text-base leading-loose md:text-lg"
            style={{
              color: 'rgba(203,213,225,0.82)',
              fontWeight: 400,
              animationDelay: '0.5s',
            }}
          >
            {personal.summary}
          </p>

          {/* Stats */}
          <div
            className="hero-fade-in mx-auto mb-10 grid max-w-2xl grid-cols-3 gap-3 md:gap-6"
            style={{ animationDelay: '0.58s' }}
          >
            {STATS.map(s => (
              <div
                key={s.label}
                className="glass-card p-4 text-center"
                style={{ borderRadius: 12 }}
              >
                <div
                  className="mb-1 text-3xl font-extrabold md:text-4xl"
                  style={{
                    background: 'linear-gradient(135deg, #00D4FF, #7C3AED)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {s.value}
                </div>
                <div className="text-xs" style={{ color: '#64748b' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Tech badges */}
          <div
            className="hero-fade-in mb-10 flex flex-wrap justify-center gap-2"
            style={{ animationDelay: '0.65s' }}
          >
            {[
              'Cloud Platform',
              'DevOps & CI/CD',
              'AI Automation',
              'n8n Workflows',
              'Kubernetes',
              'Terraform',
              'AWS',
            ].map(tag => (
              <span key={tag} className="tech-badge">
                {tag}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            className="hero-fade-in flex flex-wrap justify-center gap-3"
            style={{ animationDelay: '0.74s' }}
          >
            <a
              href="/projects"
              className="btn-primary rounded-lg px-7 py-3 text-sm font-bold"
            >
              View Projects
            </a>
            <button
              onClick={() =>
                handleDownload(personal.documents.cv, 'Tafara-Rugara-CV.pdf')
              }
              className="btn-glass rounded-lg px-7 py-3 text-sm font-bold"
            >
              ↓ Download CV
            </button>
            <a
              href="/contact"
              className="btn-glass rounded-lg px-7 py-3 text-sm font-bold"
              style={{
                borderColor: 'rgba(16,185,129,0.35)',
                color: '#34d399',
                background: 'rgba(16,185,129,0.08)',
              }}
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1"
          style={{ color: 'rgba(0,212,255,0.45)' }}
          aria-hidden="true"
        >
          <span className="font-mono text-xs uppercase tracking-widest">
            Scroll
          </span>
          <svg
            width="14"
            height="20"
            viewBox="0 0 14 20"
            fill="none"
            className="animate-bounce"
          >
            <path
              d="M7 3v14M7 17l-4-4M7 17l4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
