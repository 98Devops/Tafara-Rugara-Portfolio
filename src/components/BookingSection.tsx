/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { useTheme } from './ThemeProvider';
import { site } from '@/data/site';
declare global {
  interface Window {
    Cal?: any;
  }
}

export function BookingSection() {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [slow, setSlow] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const namespace = 'book' + useId().replace(/:/g, '');
  useEffect(() => {
    if (!visible || initialized.current || !host.current) return;
    initialized.current = true;
    // Official Cal.com embed loader (queues API calls until embed.js loads).
    (function (C: any, A: string, L: string) {
      const p = (a: any, ar: any) => a.q.push(ar);
      const d = C.document;
      C.Cal =
        C.Cal ||
        function (...args: any[]) {
          const cal = C.Cal;
          const ar = args;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement('script')).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = function (...a2: any[]) {
              p(api, a2);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === 'string') {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ['initNamespace', namespace]);
            } else {
              p(cal, ar);
            }
            return;
          }
          p(cal, ar);
        };
    })(window, 'https://app.cal.com/embed/embed.js', 'init');

    const Cal = window.Cal!;
    Cal('init', namespace, { origin: 'https://cal.com' });
    Cal.ns[namespace]('inline', {
      elementOrSelector: host.current,
      calLink: site.bookingPath,
      config: { layout: 'month_view' },
    });
  }, [visible, namespace, theme]);
  useEffect(() => {
    if (!visible || !window.Cal?.ns?.[namespace]) return;
    window.Cal.ns[namespace]('ui', {
      theme,
      colorScheme: theme,
      cssVarsPerTheme: {
        dark: { 'cal-brand': '#F18453' },
        light: { 'cal-brand': '#AE451F' },
      },
      hideEventTypeDetails: false,
      layout: 'month_view',
    });
  }, [visible, namespace, theme]);
  useEffect(() => {
    if (!visible || !host.current) return;
    const target = host.current;
    const onLoad = () => {
      setLoading(false);
      setSlow(false);
    };
    const observeFrame = () => {
      const frame = target.querySelector('iframe');
      if (frame) {
        frame.title = 'Book a 30-minute call with Tafara Rugara';
        frame.addEventListener('load', onLoad, { once: true });
      }
    };
    const observer = new MutationObserver(observeFrame);
    observer.observe(target, { childList: true, subtree: true });
    observeFrame();
    const timer = setTimeout(() => setSlow(true), 15000);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
      target.querySelector('iframe')?.removeEventListener('load', onLoad);
    };
  }, [visible]);
  return (
    <section
      className="booking-section"
      id="book"
      aria-labelledby="booking-title"
    >
      <div className="booking-heading">
        <div>
          <p className="cinema-eyebrow">02 / PUT SOME TIME ASIDE</p>
          <h2 id="booking-title">
            Let’s map out
            <br />
            <em>the next move.</em>
          </h2>
          <p>
            A 30-minute discovery call to discuss the problem, what you need and
            whether I can help.
          </p>
        </div>
        <div className="booking-facts">
          <span>30 MINUTES</span>
          <span>PROJECT / ROLE / COLLABORATION</span>
          <p>
            Choose an available time in the calendar. Check the displayed time
            zone before confirming.
          </p>
          <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
            Open booking page ↗
          </a>
        </div>
      </div>
      {!visible && (
        <div className="booking-launch">
          <div aria-hidden="true" className="calendar-symbol">
            <span>LET’S TALK</span>
            <b>30</b>
            <small>MINUTES</small>
          </div>
          <div>
            <h3>A little clarity goes a long way.</h3>
            <p>
              Bring the problem, the goal and any constraints. We’ll start
              there.
            </p>
            <button
              type="button"
              className="btn-solid"
              onClick={() => setVisible(true)}
            >
              Show available times <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      )}
      <div className="booking-calendar" hidden={!visible}>
        {loading && (
          <p className="calendar-loading" role="status">
            {slow
              ? 'The calendar is taking a little longer. You can open the booking page directly below.'
              : 'Loading available times…'}
          </p>
        )}
        <div ref={host} className="calendar-host" />
      </div>
      <p className="booking-fallback">
        Prefer a separate window?{' '}
        <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
          Book directly on Cal.com ↗
        </a>{' '}
        ·{' '}
        <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
          Arrange a time on WhatsApp ↗
        </a>
      </p>
    </section>
  );
}
