'use client';

import Link from 'next/link';

const FOOTER_LINKS = [
  { label: 'Home',       href: '/' },
  { label: 'What I Do',  href: '/what-i-do' },
  { label: 'Projects',   href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Contact',    href: '/contact' },
];

const SOCIAL_LINKS = [
  { label: 'GitHub',   href: 'https://github.com/98Devops' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tafara-rugara-0627b819b/' },
  { label: 'YouTube',  href: 'https://www.youtube.com/@techwithtaf' },
  { label: 'WhatsApp', href: 'https://wa.me/263777553271' },
  { label: 'Email',    href: 'mailto:tfrsuperfx@gmail.com' },
];

const DOCS = [
  { label: 'Download CV',      href: '/documents/tafara-rugara-cv.pdf',        name: 'Tafara-Rugara-CV.pdf' },
  { label: 'Reference Letter', href: '/documents/tafara-rugara-reference.pdf', name: 'Tafara-Rugara-Reference.pdf' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="wrap" style={{ paddingBlock: '3.5rem' }}>
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="live-dot" aria-hidden="true" />
              <span className="font-mono text-bone" style={{ fontSize: '0.82rem', letterSpacing: '0.04em' }}>TAFARA RUGARA</span>
            </div>
            <p className="text-bone-dim mb-4" style={{ fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '34ch' }}>
              Building intelligent infrastructure and AI-powered automation systems.
              Available from Harare &amp; Johannesburg.
            </p>
            <p className="label" style={{ textTransform: 'none', letterSpacing: '0.02em' }}>Open to Opportunities</p>
          </div>

          {/* Nav */}
          <div>
            <p className="label mb-5">Navigation</p>
            <ul className="space-y-3">
              {FOOTER_LINKS.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-bone-dim hover:text-bone transition-colors" style={{ fontSize: '0.9rem' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + docs */}
          <div>
            <p className="label mb-5">Contact &amp; Socials</p>
            <ul className="space-y-3 mb-8">
              {SOCIAL_LINKS.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="text-bone-dim hover:text-bone transition-colors"
                    style={{ fontSize: '0.9rem' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2">
              {DOCS.map(doc => (
                <a
                  key={doc.label}
                  href={doc.href}
                  download={doc.name}
                  className="contact-tile inline-flex items-center gap-2 px-3 py-2 font-mono"
                  style={{ fontSize: '0.74rem' }}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  {doc.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-line pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono" style={{ fontSize: '0.7rem', letterSpacing: '0.05em', color: 'var(--bone-faint)' }}>
          <span>© {year} TAFARA RUGARA · BUILT WITH NEXT.JS</span>
          <span>HARARE · GMT+2 · @TECHWITHTAF</span>
        </div>
      </div>
    </footer>
  );
}
