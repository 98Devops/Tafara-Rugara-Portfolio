'use client';

import { PersonalInfo } from '@/types';
import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';

interface HeroProps { personal: PersonalInfo; }

const SPECIALISMS = [
  'Cloud & DevOps Engineer',
  'AI Automation Architect',
  'Workflow Systems Specialist',
  'Infrastructure-as-Code Expert',
  'Container Orchestration Pro',
];

const STATS = [
  { value: '60%', label: 'Pipeline Downtime Reduced' },
  { value: '3+',  label: 'AI Systems Built' },
  { value: '5+',  label: 'Cloud Projects Delivered' },
];

export function Hero({ personal }: HeroProps) {
  const [specIdx, setSpecIdx]     = useState(0);
  const [displayText, setDisplay] = useState('');
  const [isDeleting, setDeleting] = useState(false);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  // Typewriter
  useEffect(() => {
    const full  = SPECIALISMS[specIdx];
    const speed = isDeleting ? 30 : 60;
    typingRef.current = setTimeout(() => {
      if (!isDeleting) {
        setDisplay(full.slice(0, displayText.length + 1));
        if (displayText.length + 1 === full.length) setTimeout(() => setDeleting(true), 1800);
      } else {
        setDisplay(full.slice(0, displayText.length - 1));
        if (displayText.length === 0) { setDeleting(false); setSpecIdx(s => (s + 1) % SPECIALISMS.length); }
      }
    }, speed);
    return () => { if (typingRef.current) clearTimeout(typingRef.current); };
  }, [displayText, isDeleting, specIdx]);

  const handleDownload = useCallback((href: string, name: string) => {
    const a = document.createElement('a');
    a.href = href; a.download = name; a.rel = 'noopener noreferrer';
    document.body.appendChild(a); a.click();
    setTimeout(() => { try { document.body.removeChild(a); } catch (_) { /* */ } }, 200);
  }, []);

  // Magnetic tilt for profile image
  const handleImgMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    imgRef.current.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  }, []);

  const handleImgLeave = useCallback(() => {
    if (imgRef.current) imgRef.current.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg)';
  }, []);

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ background: '#0A0A0A' }}
    >
      {/* ── Atmospheric Background ── */}
      <div className="absolute inset-0 dot-grid-bg" style={{ opacity: 0.25 }} />
      <div className="ambient-glow" style={{ top: '10%', left: '60%' }} />
      <div className="ambient-glow-2" style={{ top: '55%', left: '15%' }} />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-24 pb-20 text-center">
        <div className="max-w-4xl mx-auto w-full hero-fade-in">

          {/* Profile photo — magnetic tilt */}
          {personal.profileImage && (
            <div className="flex justify-center mb-8 hero-fade-in" style={{ animationDelay: '0.05s' }}>
              <div
                ref={imgRef}
                onMouseMove={handleImgMove}
                onMouseLeave={handleImgLeave}
                className="w-24 h-24 md:w-28 md:h-28 overflow-hidden transition-all duration-300"
                style={{
                  border: '1px solid rgba(39, 39, 42, 0.8)',
                  borderRadius: '12px',
                  boxShadow: '0 0 0 rgba(255,255,255,0)',
                  transition: 'box-shadow 0.3s ease, transform 0.15s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(255,255,255,0.06), 0 4px 20px rgba(0,0,0,0.3)'; }}
              >
                <Image
                  src={personal.profileImage}
                  alt={personal.name}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          )}

          {/* Availability badge */}
          <div
            className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 text-xs font-mono hero-fade-in"
            style={{
              background: 'rgba(17, 17, 17, 0.7)',
              border: '1px solid rgba(39, 39, 42, 0.8)',
              color: '#A1A1AA',
              letterSpacing: '0.05em',
              animationDelay: '0.1s',
              backdropFilter: 'blur(8px)',
              borderRadius: '20px',
            }}
          >
            <span
              className="glow-pulse"
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#FFFFFF',
                flexShrink: 0,
                display: 'inline-block',
              }}
            />
            AVAILABLE · HARARE &amp; JOHANNESBURG
          </div>

          {/* Name */}
          <h1
            className="leading-none mb-4 hero-fade-in text-white"
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              animationDelay: '0.2s',
            }}
          >
            {personal.name}
          </h1>

          {/* Typewriter subtitle */}
          <div className="h-8 md:h-10 flex items-center justify-center mb-8 hero-fade-in" style={{ animationDelay: '0.3s' }}>
            <p
              className="text-base md:text-lg font-mono"
              style={{ color: '#71717A', letterSpacing: '0.05em' }}
            >
              {displayText}
              <span
                className="ml-0.5 inline-block w-0.5 h-5 align-middle"
                style={{
                  background: '#A1A1AA',
                  boxShadow: '0 0 8px rgba(255,255,255,0.3)',
                  animation: 'pulse 1s cubic-bezier(0.4,0,0.6,1) infinite',
                }}
              />
            </p>
          </div>

          {/* Summary */}
          <p
            className="max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-12 hero-fade-in"
            style={{ color: '#A1A1AA', fontWeight: 400, animationDelay: '0.4s', maxWidth: '60ch' }}
          >
            {personal.summary}
          </p>

          {/* Stats — cards with glow */}
          <div
            className="flex flex-wrap items-center justify-center gap-4 mb-12 hero-fade-in"
            style={{ animationDelay: '0.5s' }}
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                className="px-6 py-4 text-center transition-all duration-300 cursor-default"
                style={{
                  background: 'rgba(17, 17, 17, 0.5)',
                  border: '1px solid rgba(39, 39, 42, 0.5)',
                  borderRadius: '10px',
                  backdropFilter: 'blur(4px)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(63, 63, 70, 0.8)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(255,255,255,0.03)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(39, 39, 42, 0.5)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <div
                  className="text-2xl md:text-3xl font-bold text-white mb-1"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {s.value}
                </div>
                <div className="text-xs font-mono" style={{ color: '#71717A' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tech badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 hero-fade-in" style={{ animationDelay: '0.58s' }}>
            {['Cloud Platform', 'DevOps & CI/CD', 'AI Automation', 'n8n Workflows', 'Kubernetes', 'Terraform', 'AWS'].map(tag => (
              <span key={tag} className="tech-badge">{tag}</span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-3 hero-fade-in" style={{ animationDelay: '0.65s' }}>
            <a
              href="/projects"
              className="btn-primary px-7 py-3 text-sm font-semibold"
            >
              View Projects
            </a>
            <a
              href={personal.documents.cv}
              download="Tafara-Rugara-CV.pdf"
              role="button"
              className="btn-glass px-7 py-3 text-sm font-semibold"
            >
              Download CV
            </a>
            <a
              href={personal.documents.reference}
              download="Tafara-Rugara-Reference.pdf"
              role="button"
              className="btn-glass px-7 py-3 text-sm font-semibold"
            >
              Download Reference
            </a>
            <a
              href={personal.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass px-7 py-3 text-sm font-semibold"
            >
              GitHub
            </a>
            <a
              href={personal.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass px-7 py-3 text-sm font-semibold"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          style={{ color: '#52525B' }}
          aria-hidden="true"
        >
          <span className="text-xs font-mono tracking-widest uppercase" style={{ opacity: 0.7 }}>Scroll</span>
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none" className="animate-bounce" style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.1))' }}>
            <path d="M7 3v14M7 17l-4-4M7 17l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
  );
}