'use client';

import { motion } from 'framer-motion';

const contactMethods = [
  {
    key: 'email',
    label: 'Email',
    value: 'tfrsuperfx@gmail.com',
    href: 'mailto:tfrsuperfx@gmail.com',
    color: '#00D4FF',
    bg: 'rgba(0,212,255,0.08)',
    border: 'rgba(0,212,255,0.22)',
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    value: '+263 777 553 271',
    href: 'https://wa.me/263777553271',
    color: '#34d399',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.25)',
    icon: (
      <svg
        className="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    value: 'tafara-rugara',
    href: 'https://www.linkedin.com/in/tafara-rugara-0627b819b/',
    color: '#a78bfa',
    bg: 'rgba(124,58,237,0.08)',
    border: 'rgba(124,58,237,0.25)',
    icon: (
      <svg
        className="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    key: 'github',
    label: 'GitHub',
    value: '98Devops',
    href: 'https://github.com/98Devops',
    color: '#e2e8f0',
    bg: 'rgba(255,255,255,0.05)',
    border: 'rgba(255,255,255,0.12)',
    icon: (
      <svg
        className="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    key: 'youtube',
    label: 'YouTube',
    value: '@techwithtaf',
    href: 'https://www.youtube.com/@techwithtaf',
    color: '#f87171',
    bg: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.25)',
    icon: (
      <svg
        className="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const documents = [
  {
    label: '↓ Download CV',
    path: '/documents/tafara-rugara-cv.pdf',
    name: 'Tafara-Rugara-CV.pdf',
    color: '#00D4FF',
  },
  {
    label: '↓ Reference Letter',
    path: '/documents/tafara-rugara-reference.pdf',
    name: 'Tafara-Rugara-Reference.pdf',
    color: '#a78bfa',
  },
];

export default function ContactInfo() {
  const handleDownload = (path: string, name: string) => {
    const a = document.createElement('a');
    a.href = path;
    a.download = name;
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      if (document.body.contains(a)) document.body.removeChild(a);
    }, 100);
  };

  return (
    <motion.div
      className="space-y-7"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {/* Intro */}
      <div>
        <h3 className="mb-3 text-2xl font-bold text-white">
          Let's Build Together
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'rgba(148,163,184,0.9)' }}
        >
          Open to Cloud & DevOps engineering roles, AI automation consulting,
          and workflow architecture projects. Based in Harare & Johannesburg.
        </p>
      </div>

      {/* Availability */}
      <div
        className="flex items-center gap-3 rounded-xl px-4 py-3"
        style={{
          background: 'rgba(16,185,129,0.10)',
          border: '1px solid rgba(16,185,129,0.30)',
        }}
      >
        <span className="pulse-dot flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold" style={{ color: '#34d399' }}>
            Open to Opportunities
          </p>
          <p className="mt-0.5 text-xs" style={{ color: '#64748b' }}>
            Harare, Zimbabwe & Johannesburg, South Africa
          </p>
        </div>
      </div>

      {/* Document downloads */}
      <div className="space-y-2">
        <h4
          className="mb-3 text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'rgba(0,212,255,0.7)' }}
        >
          Documents
        </h4>
        {documents.map(doc => (
          <button
            key={doc.label}
            onClick={() => handleDownload(doc.path, doc.name)}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: `rgba(${doc.color === '#00D4FF' ? '0,212,255' : '124,58,237'},0.08)`,
              border: `1px solid rgba(${doc.color === '#00D4FF' ? '0,212,255' : '124,58,237'},0.22)`,
              color: doc.color,
            }}
          >
            <svg
              className="h-4 w-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            {doc.label}
          </button>
        ))}
      </div>

      {/* Contact links */}
      <div className="space-y-2">
        <h4
          className="mb-3 text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'rgba(0,212,255,0.7)' }}
        >
          Contact & Socials
        </h4>
        {contactMethods.map((m, i) => (
          <motion.a
            key={m.key}
            href={m.href}
            target={m.key !== 'email' ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-xl p-3 transition-all duration-200"
            style={{ background: m.bg, border: `1px solid ${m.border}` }}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ x: 5 }}
            aria-label={`${m.label}: ${m.value}`}
          >
            <div
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
              style={{
                background: m.bg,
                color: m.color,
                border: `1px solid ${m.border}`,
              }}
            >
              {m.icon}
            </div>
            <div className="min-w-0">
              <p
                className="mb-0.5 text-xs uppercase tracking-wide"
                style={{ color: 'rgba(148,163,184,0.6)' }}
              >
                {m.label}
              </p>
              <p
                className="truncate text-sm font-medium"
                style={{ color: m.color }}
              >
                {m.value}
              </p>
            </div>
            <svg
              className="ml-auto h-3.5 w-3.5 flex-shrink-0 opacity-35 transition-opacity group-hover:opacity-75"
              style={{ color: m.color }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </motion.a>
        ))}
      </div>

      {/* QR Codes Section */}
      <div
        className="rounded-xl p-6"
        style={{
          background: 'rgba(0,212,255,0.05)',
          border: '1px solid rgba(0,212,255,0.15)',
        }}
      >
        <h4
          className="mb-4 text-center text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'rgba(0,212,255,0.7)' }}
        >
          Quick Connect
        </h4>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {/* WhatsApp QR Code */}
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div
              className="rounded-lg p-2"
              style={{
                background: 'white',
                border: '1px solid rgba(16,185,129,0.3)',
              }}
            >
              <img
                src="/images/qr-codes/whatsapp-qr.svg"
                alt="WhatsApp QR Code"
                className="h-24 w-24"
              />
            </div>
            <span className="text-xs font-medium" style={{ color: '#34d399' }}>
              WhatsApp
            </span>
          </motion.div>

          {/* LinkedIn QR Code */}
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div
              className="rounded-lg p-2"
              style={{
                background: 'white',
                border: '1px solid rgba(124,58,237,0.3)',
              }}
            >
              <img
                src="/images/qr-codes/linkedin-qr.svg"
                alt="LinkedIn QR Code"
                className="h-24 w-24"
              />
            </div>
            <span className="text-xs font-medium" style={{ color: '#a78bfa' }}>
              LinkedIn
            </span>
          </motion.div>
        </div>
        <p
          className="mt-4 text-center text-xs"
          style={{ color: 'rgba(148,163,184,0.6)' }}
        >
          Scan to connect instantly
        </p>
      </div>
    </motion.div>
  );
}
