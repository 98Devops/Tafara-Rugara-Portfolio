/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef } from 'react';

/**
 * ─── ACTIVATE BOOKING ───────────────────────────────────────────────
 * Paste your Cal.com booking link below, e.g. 'tafara-rugara/30min'
 * (create a free account at cal.com, add an event type, copy its link).
 *
 * While this is empty, the section renders nothing — the Contact page is
 * unchanged. The moment you set it, a live inline calendar appears on the
 * Contact page. No other code changes needed. Cal.com is already allowed
 * in the site CSP (netlify.toml).
 * ────────────────────────────────────────────────────────────────────
 */
const CAL_LINK: string = 'tfr263/30min';
const CAL_NAMESPACE = 'book';
const BRAND = '#E2672E'; // --ember

declare global {
  interface Window { Cal?: any }
}

export function BookingSection() {
  const initialised = useRef(false);

  useEffect(() => {
    if (!CAL_LINK || initialised.current) return;
    initialised.current = true;

    // Official Cal.com embed loader (queues API calls until embed.js loads).
    (function (C: any, A: string, L: string) {
      const p = (a: any, ar: any) => a.q.push(ar);
      const d = C.document;
      C.Cal = C.Cal || function (...args: any[]) {
        const cal = C.Cal;
        const ar = args;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement('script')).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api: any = function (...a2: any[]) { p(api, a2); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === 'string') {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ['initNamespace', namespace]);
          } else { p(cal, ar); }
          return;
        }
        p(cal, ar);
      };
    })(window, 'https://app.cal.com/embed/embed.js', 'init');

    const Cal = window.Cal!;
    Cal('init', CAL_NAMESPACE, { origin: 'https://cal.com' });
    Cal.ns[CAL_NAMESPACE]('inline', {
      elementOrSelector: '#cal-inline',
      calLink: CAL_LINK,
      layout: 'month_view',
    });
    Cal.ns[CAL_NAMESPACE]('ui', {
      theme: 'dark',
      cssVarsPerTheme: { dark: { 'cal-brand': BRAND } },
      hideEventTypeDetails: false,
      layout: 'month_view',
    });
  }, []);

  // Not configured yet → render nothing (Contact page stays unchanged).
  if (!CAL_LINK) return null;

  return (
    <section className="rise border border-line rounded-md p-6 sm:p-8 mb-16" style={{ background: 'var(--surface)' }}>
      <p className="label mb-4">// book a call</p>
      <h2 className="font-display text-bone mb-3" style={{ fontWeight: 400, fontSize: 'clamp(1.4rem, 3vw, 1.9rem)' }}>
        Schedule a call
      </h2>
      <p className="text-bone-dim mb-6" style={{ maxWidth: '52ch', fontSize: '0.94rem', lineHeight: 1.65 }}>
        Pick a time that works for you — a 30-minute discovery call to talk through your project,
        whatever it is: web &amp; software development, web apps, Cloud, DevOps, or AI automation.
        Tell me a bit about it in the notes when you book.
      </p>

      <div id="cal-inline" style={{ minHeight: 520, width: '100%', overflow: 'auto' }}>
        <p className="label" style={{ textTransform: 'none' }}>Loading calendar…</p>
      </div>

      <p className="text-bone-faint mt-4 font-mono" style={{ fontSize: '0.72rem' }}>
        Calendar not loading?{' '}
        <a href="https://wa.me/263777553271" target="_blank" rel="noopener noreferrer" className="text-bone-dim hover:text-bone transition-colors">
          message me on WhatsApp
        </a>.
      </p>
    </section>
  );
}
