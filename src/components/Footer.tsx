'use client';

import Link from 'next/link';

const FOOTER_LINKS = [
  { label: 'Home',       href: '/' },
  { label: 'What I Do', href: '/what-i-do' },
  { label: 'Projects',  href: '/projects' },
  { label: 'Experience',href: '/experience' },
  { label: 'Contact',   href: '/contact' },
];

const SOCIAL_LINKS = [
  { label: 'GitHub',   href: 'https://github.com/98Devops' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tafara-rugara-0627b819b/' },
  { label: 'YouTube',  href: 'https://www.youtube.com/@techwithtaf' },
  { label: 'WhatsApp', href: 'https://wa.me/263777553271' },
  { label: 'Email',    href: 'mailto:tfrsuperfx@gmail.com' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: '#0A0A0A' }}
    >
      {/* Gradient glow top border */}
      <div className="section-divider-glow" />

      {/* Ambient glow */}
      <div className="ambient-glow-2" style={{ bottom: '-40%', right: '10%', opacity: 0.2 }} />

      <div className="container mx-auto px-6 py-14 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">

          {/* Brand col */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-8 h-8 flex items-center justify-center text-xs font-bold font-mono transition-all duration-200"
                style={{
                  background: '#111111',
                  border: '1px solid #27272A',
                  borderRadius: '6px',
                  color: '#FFFFFF',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 12px rgba(255,255,255,0.06)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >
                TR
              </div>
              <div>
                <p className="font-semibold text-white text-sm">Tafara Rugara</p>
                <p className="text-xs font-mono" style={{ color: '#71717A' }}>Cloud &amp; DevOps · AI Automation</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#71717A' }}>
              Building intelligent infrastructure and AI-powered automation systems.
              Available from Harare &amp; Johannesburg.
            </p>
            <div className="flex items-center gap-2">
              <span
                className="glow-pulse"
                style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#FFFFFF', display: 'inline-block', flexShrink: 0,
                }}
              />
              <span className="text-xs font-mono" style={{ color: '#A1A1AA' }}>Open to Opportunities</span>
            </div>
          </div>

          {/* Nav col */}
          <div>
            <p className="mono-label mb-5">Navigation</p>
            <ul className="space-y-3">
              {FOOTER_LINKS.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-all duration-200 hover:text-white"
                    style={{ color: '#71717A' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.textShadow = '0 0 8px rgba(255,255,255,0.1)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.textShadow = 'none'; }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Downloads col */}
          <div>
            <p className="mono-label mb-5">Contact &amp; Socials</p>
            <ul className="space-y-3 mb-8">
              {SOCIAL_LINKS.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="text-sm transition-all duration-200 hover:text-white"
                    style={{ color: '#71717A' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.textShadow = '0 0 8px rgba(255,255,255,0.1)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.textShadow = 'none'; }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Downloads */}
            <div className="flex flex-col gap-2">
              <a
                href="/documents/tafara-rugara-cv.pdf"
                download="Tafara-Rugara-CV.pdf"
                className="inline-flex items-center gap-2 px-3 py-2 text-xs font-mono transition-all duration-200"
                style={{
                  background: 'rgba(17,17,17,0.8)', border: '1px solid rgba(39,39,42,0.8)',
                  color: '#A1A1AA', borderRadius: '6px', backdropFilter: 'blur(4px)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)';
                  (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 12px rgba(255,255,255,0.05)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(39,39,42,0.8)';
                  (e.currentTarget as HTMLElement).style.color = '#A1A1AA';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                ↓ Download CV
              </a>
              <a
                href="/documents/tafara-rugara-reference.pdf"
                download="Tafara-Rugara-Reference.pdf"
                className="inline-flex items-center gap-2 px-3 py-2 text-xs font-mono transition-all duration-200"
                style={{
                  background: 'rgba(17,17,17,0.8)', border: '1px solid rgba(39,39,42,0.8)',
                  color: '#A1A1AA', borderRadius: '6px', backdropFilter: 'blur(4px)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)';
                  (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 12px rgba(255,255,255,0.05)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(39,39,42,0.8)';
                  (e.currentTarget as HTMLElement).style.color = '#A1A1AA';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                ↓ Reference Letter
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="section-divider-glow mb-8" />
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs font-mono" style={{ color: '#52525B' }}>
            © {year} Tafara Rugara · Built with Next.js
          </p>
          <p className="text-xs font-mono" style={{ color: '#52525B' }}>
            Harare, Zimbabwe · GMT+2
          </p>
        </div>
      </div>
    </footer>
  );
}
