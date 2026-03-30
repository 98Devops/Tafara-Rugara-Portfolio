'use client';

import Link from 'next/link';

const FOOTER_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'What I Do', href: '/what-i-do' },
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Contact', href: '/contact' },
];

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/98Devops', icon: '⌨️' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/tafara-rugara-0627b819b/',
    icon: '💼',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@techwithtaf',
    icon: '▶️',
  },
  { label: 'WhatsApp', href: 'https://wa.me/263777553271', icon: '💬' },
  { label: 'Email', href: 'mailto:tfrsuperfx@gmail.com', icon: '✉️' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative"
      style={{
        background: '#050810',
        borderTop: '1px solid rgba(0,212,255,0.10)',
      }}
    >
      {/* Top glow */}
      <div
        className="absolute left-0 right-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0,212,255,0.4), rgba(124,58,237,0.4), transparent)',
        }}
      />

      <div className="container mx-auto px-6 py-14">
        <div className="mb-10 grid gap-10 md:grid-cols-3">
          {/* Brand col */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))',
                  border: '1px solid rgba(0,212,255,0.30)',
                  color: '#00D4FF',
                  fontFamily: 'var(--font-jetbrains-mono)',
                }}
              >
                {'<TR/>'}
              </div>
              <div>
                <p className="text-sm font-bold text-white">Tafara Rugara</p>
                <p className="text-xs" style={{ color: '#64748b' }}>
                  Cloud & DevOps · AI Automation
                </p>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'rgba(148,163,184,0.70)' }}
            >
              Building intelligent infrastructure and AI-powered automation
              systems. Available from Harare & Johannesburg.
            </p>

            {/* Availability dot */}
            <div className="mt-4 flex items-center gap-2">
              <span className="pulse-dot flex-shrink-0" />
              <span
                className="text-xs font-medium"
                style={{ color: '#34d399' }}
              >
                Open to Opportunities
              </span>
            </div>
          </div>

          {/* Nav col */}
          <div>
            <p
              className="mb-4 font-mono text-xs uppercase tracking-widest"
              style={{ color: 'rgba(0,212,255,0.6)' }}
            >
              Navigation
            </p>
            <ul className="space-y-2">
              {FOOTER_LINKS.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(148,163,184,0.65)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div>
            <p
              className="mb-4 font-mono text-xs uppercase tracking-widest"
              style={{ color: 'rgba(0,212,255,0.6)' }}
            >
              Contact & Socials
            </p>
            <ul className="space-y-2">
              {SOCIAL_LINKS.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={
                      link.href.startsWith('mailto') ? undefined : '_blank'
                    }
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(148,163,184,0.65)' }}
                  >
                    <span>{link.icon}</span>
                    <span className="transition-colors group-hover:text-white">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Quick downloads */}
            <div className="mt-6 flex flex-col gap-2">
              <a
                href="/documents/tafara-rugara-cv.pdf"
                download="Tafara-Rugara-CV.pdf"
                className="font-mono text-xs transition-colors hover:text-white"
                style={{ color: 'rgba(0,212,255,0.55)' }}
              >
                ↓ Download CV
              </a>
              <a
                href="/documents/tafara-rugara-reference.pdf"
                download="Tafara-Rugara-Reference.pdf"
                className="font-mono text-xs transition-colors hover:text-white"
                style={{ color: 'rgba(124,58,237,0.55)' }}
              >
                ↓ Reference Letter
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p className="font-mono text-xs" style={{ color: '#334155' }}>
            © {year} Tafara Rugara · Built with Next.js & passion
          </p>
          <p className="font-mono text-xs" style={{ color: '#334155' }}>
            Harare, Zimbabwe · GMT+2
          </p>
        </div>
      </div>
    </footer>
  );
}
