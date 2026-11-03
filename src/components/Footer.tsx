'use client';
import Link from 'next/link';
import { portfolioData } from '@/data/portfolio';
import { DownloadLinks } from '@/components/DownloadLinks';
import { MotionToggle } from '@/components/MotionPreferences';

export default function Footer() {
  return (
    <footer className="cinema-footer">
      <div className="wrap">
        <div className="footer-top">
          <Link href="/" className="footer-wordmark">
            TAFARA<span>RUGARA.</span>
          </Link>
          <p>
            AI systems. Useful software.
            <br />
            Infrastructure that carries the work.
          </p>
        </div>
        <div className="footer-middle">
          <div className="footer-navigation">
            <p className="cinema-eyebrow">EXPLORE</p>
            {[
              ['Home', '/'],
              ['What I Do', '/what-i-do'],
              ['Projects', '/projects'],
              ['Experience', '/experience'],
              ['Contact', '/contact'],
              ['Spreadsheet Escape', '/spreadsheet-escape'],
            ].map(([label, href]) => (
              <Link key={href} href={href}>
                {label} <span>↗</span>
              </Link>
            ))}
          </div>
          <div className="footer-navigation">
            <p className="cinema-eyebrow">ELSEWHERE</p>
            {Object.entries(portfolioData.personal.socialLinks).map(
              ([label, href]) =>
                href && (
                  <a
                    key={label}
                    href={label === 'email' ? 'mailto:' + href : href}
                    target={label === 'email' ? undefined : '_blank'}
                    rel="noopener noreferrer"
                  >
                    {label === 'github'
                      ? 'GitHub'
                      : label === 'linkedin'
                        ? 'LinkedIn'
                        : label === 'youtube'
                          ? 'YouTube'
                          : label === 'whatsapp'
                            ? 'WhatsApp'
                            : 'Email'}{' '}
                    <span>↗</span>
                  </a>
                )
            )}
          </div>
          <div className="footer-docs">
            <p className="cinema-eyebrow">THE SHORT VERSION</p>
            <DownloadLinks compact />
            <Link href="/contact#book" className="footer-book">
              Book a call ↗
            </Link>
          </div>
        </div>
        <div className="footer-baseline">
          <span>© {new Date().getFullYear()} TAFARA RUGARA</span>
          <span>HARARE, ZIMBABWE & SOUTH AFRICA · UTC+2</span>
          <MotionToggle />
        </div>
      </div>
    </footer>
  );
}
