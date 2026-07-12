import Image from 'next/image';
import Link from 'next/link';
import { BookingSection } from '@/components/BookingSection';

/* ─────────────────────────────────────────────────────────────
   SPREADSHEET ESCAPE — conversion landing page
   Standalone funnel for cold-traffic posts. Every path leads to
   the booked call (#book). No hard prices — the quote happens on
   the call (discovery-first). Content renders without JS; only the
   Cal.com calendar hydrates.
   ───────────────────────────────────────────────────────────── */

const CAL_LINK = 'https://cal.com/tfr263/30min';

// Small ember CTA — the one loud button on the page.
function CTA({ href, children, variant = 'solid' }: { href: string; children: React.ReactNode; variant?: 'solid' | 'ghost' }) {
  const base = 'inline-flex items-center justify-center gap-2 font-mono transition-all duration-150';
  const style: React.CSSProperties =
    variant === 'solid'
      ? { background: 'var(--ember)', color: 'var(--ink)', border: '1px solid var(--ember)', fontSize: '0.82rem', letterSpacing: '0.03em', padding: '0.85rem 1.6rem', borderRadius: 'var(--r-sm)', fontWeight: 500 }
      : { background: 'transparent', color: 'var(--bone-dim)', border: '1px solid var(--line-2)', fontSize: '0.82rem', letterSpacing: '0.03em', padding: '0.85rem 1.6rem', borderRadius: 'var(--r-sm)' };
  const isAnchor = href.startsWith('#');
  return isAnchor ? (
    <a href={href} className={base} style={style}>{children}</a>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer" className={base} style={style}>{children}</a>
  );
}

const check = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ember)" strokeWidth={2.4} aria-hidden="true" style={{ flexShrink: 0, marginTop: 3 }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" />
  </svg>
);
const cross = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--bone-faint)" strokeWidth={2.2} aria-hidden="true" style={{ flexShrink: 0, marginTop: 3 }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const trevisStats = [
  { n: '132', label: 'active tenants managed' },
  { n: '144', label: 'beds across 4 properties' },
  { n: '92%', label: 'occupancy, tracked live' },
  { n: '$17.6k', label: 'monthly rent handled' },
  { n: '~190', label: 'automated tests' },
];

const beforeItems = [
  'Rent ledger out of date by Tuesday',
  'Lease dates in a second file, quietly wrong',
  'Payments reconciled by memory and WhatsApp',
  'Nobody trusted the vacancy count',
];
const afterItems = [
  'One login, one dashboard, one number that’s always right',
  'Every tenant’s coverage computed automatically, daily',
  'Overdue / due-today / expiring-soon flagged before it costs money',
  'Payments recorded in seconds, ledger always current',
];

const tiers = [
  {
    name: 'Escape Pod',
    tag: 'stop the bleeding',
    forWho: 'Running on 1–2 spreadsheets you just need gone.',
    delivery: '14 days',
    features: ['1 spreadsheet → a real web app', '5 core screens + one dashboard', 'Role-based logins for up to 3 users', 'CSV import + export — you own the code', '30-day bug-fix window'],
    flagship: false,
  },
  {
    name: 'Ops OS Starter',
    tag: 'most operators start here',
    forWho: 'Drowning in 3+ spreadsheets that need one source of truth.',
    delivery: '21 days',
    features: ['Up to 3 spreadsheets → one system', 'Dashboard built around your ONE key number', 'Admin / Staff / Read-only access', 'Automated daily report to email or WhatsApp', '1 workflow automation (reminders, alerts…)', '60-day bug-fix window'],
    flagship: true,
  },
  {
    name: 'Ops OS Pro',
    tag: 'room to grow',
    forWho: 'Want the full system plus automation and training.',
    delivery: '30 days',
    features: ['Up to 5 spreadsheets consolidated', 'Audit log — who changed what, when', '2 workflow automations (WhatsApp bot, AI summaries…)', 'Recorded team training + written SOP', '90-day support + post-launch enhancements'],
    flagship: false,
  },
];

const niches = [
  { t: 'Property managers & landlords', d: 'Tenants, rent, leases, maintenance — like Trevis, 2–20 properties.' },
  { t: 'Clinics, dentists & therapists', d: 'Patients, appointments, billing and follow-ups, off the spreadsheets.' },
  { t: 'Trade services', d: 'HVAC, plumbing, electrical — jobs, quotes, invoices, schedules.' },
  { t: 'Boutique agencies', d: 'Clients, retainers, deliverables and hours in one clean view.' },
];

const faqs = [
  { q: 'That sounds expensive.', a: 'Right now you or someone on payroll spends hours every week wrestling spreadsheets. The system pays for itself in a couple of months and runs forever. On the call I’ll show you the math against your actual hours.' },
  { q: 'Can we start smaller?', a: 'Yes. The Escape Pod takes your single worst spreadsheet off your hands in 14 days. If it works, we do the rest.' },
  { q: 'How do I know you’ll deliver?', a: 'Two ways. One: Trevis is live right now, 132 tenants running on it daily. Two: the guarantee — miss 21 days and you get 20% off; don’t save 5+ hours a week in month one and you get a full refund. My risk, not yours.' },
  { q: 'Switching systems sounds like weeks of my team’s time.', a: 'It isn’t. You hand over the spreadsheets and give me about 45 minutes. I do the build, the migration and the testing. Your team logs into something that already works.' },
  { q: 'Do I own it?', a: 'Completely. The code, the data, the hosting — all yours. No lock-in, no per-seat rental.' },
];

export default function SpreadsheetEscape() {
  return (
    <main className="border-b border-line">

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="wrap" style={{ paddingTop: 'clamp(5.5rem, 12vw, 9rem)', paddingBottom: 'clamp(2.5rem, 6vw, 4rem)' }}>
        <p className="rise label mb-5 inline-flex items-center gap-2">
          <span className="live-dot" aria-hidden="true" />
          Spreadsheet Escape · taking 2 new builds this month
        </p>
        <h1 className="rise d1 font-display text-bone" style={{ fontWeight: 400, fontSize: 'clamp(2.1rem, 6vw, 4rem)', lineHeight: 1.04, letterSpacing: '-0.02em', maxWidth: '18ch' }}>
          Your business runs on spreadsheets. <span style={{ position: 'relative' }} className="ember-underline">It shouldn&apos;t.</span>
        </h1>
        <p className="rise d2 mt-7 text-bone-dim" style={{ maxWidth: '54ch', fontSize: 'clamp(1.05rem, 2.4vw, 1.25rem)', lineHeight: 1.6 }}>
          I replace the 3&ndash;5 spreadsheets your business actually runs on with <strong style={{ color: 'var(--bone)', fontWeight: 500 }}>one clean system</strong> &mdash; dashboard, logins, automations &mdash; in 21 days. Or you don&apos;t pay full price.
        </p>

        <div className="rise d3 mt-9 flex flex-wrap gap-3">
          <CTA href="#book">Book a free 15-min call →</CTA>
          <CTA href="#trevis" variant="ghost">See the Trevis build ↓</CTA>
        </div>

        {/* Double guarantee strip */}
        <div className="rise d3 mt-8 inline-flex flex-wrap items-center gap-x-3 gap-y-1 font-mono" style={{ fontSize: '0.75rem', color: 'var(--bone-dim)', border: '1px solid var(--line-2)', borderRadius: 'var(--r-sm)', padding: '0.6rem 0.95rem' }}>
          <span style={{ color: 'var(--ember)' }}>Guaranteed:</span>
          <span>21 days or 20% off</span>
          <span style={{ color: 'var(--line-2)' }}>·</span>
          <span>save 5+ hrs/week or full refund</span>
        </div>

        {/* Trust row */}
        <div className="rise d4 mt-10 flex flex-wrap gap-x-8 gap-y-3" style={{ borderTop: '1px solid var(--line)', paddingTop: '1.5rem' }}>
          {[['AWS', 'Certified engineer'], ['132+', 'tenants live on one build'], ['~190', 'automated tests'], ['21 days', 'not 8–12 weeks']].map(([n, l]) => (
            <div key={l as string}>
              <div className="font-display text-bone" style={{ fontSize: '1.4rem', fontWeight: 500, lineHeight: 1 }}>{n}</div>
              <div className="label mt-1.5" style={{ letterSpacing: '0.08em' }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── VIDEO — swap in the YouTube embed when recorded ── */}
      <section className="wrap" style={{ paddingBottom: 'var(--section-pad)' }}>
        <p className="label mb-4">// 90-second walkthrough</p>
        {/*
          ── ADD YOUR YOUTUBE VIDEO HERE ────────────────────────────
          When your Trevis walkthrough is on YouTube, replace this whole
          placeholder <div> with:

          <div style={{ position:'relative', paddingTop:'56.25%', borderRadius:'var(--r-md)', overflow:'hidden', border:'1px solid var(--line)' }}>
            <iframe
              src="https://www.youtube-nocookie.com/embed/VIDEO_ID"
              title="Trevis walkthrough — 4 spreadsheets to one system"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', border:0 }}
            />
          </div>

          (youtube-nocookie.com is already allowed in the site CSP — netlify.toml.)
          ───────────────────────────────────────────────────────────
        */}
        <div style={{ position: 'relative', paddingTop: '52%', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r-md)', overflow: 'hidden' }}>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center" style={{ padding: '2rem' }}>
            <div className="flex items-center justify-center" style={{ width: 62, height: 62, borderRadius: '50%', border: '1px solid var(--line-2)', background: 'var(--ember-soft)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--ember)" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
            </div>
            <p className="mt-5 font-display text-bone" style={{ fontSize: '1.15rem', fontWeight: 400 }}>Watch: 4 spreadsheets → one system</p>
            <p className="label mt-2" style={{ textTransform: 'none', letterSpacing: '0.04em' }}>Walkthrough video coming soon</p>
          </div>
        </div>
      </section>

      {/* ─── THE PROBLEM ──────────────────────────────────── */}
      <section style={{ background: 'var(--surface)', borderBlock: '1px solid var(--line)' }}>
        <div className="wrap" style={{ paddingBlock: 'var(--section-pad)' }}>
          <p className="label mb-4">// the real problem</p>
          <h2 className="font-display text-bone" style={{ fontWeight: 400, fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', lineHeight: 1.12, letterSpacing: '-0.01em', maxWidth: '20ch' }}>
            The spreadsheets aren&apos;t helping. They&apos;re the bug.
          </h2>
          <p className="mt-5 text-bone-dim" style={{ maxWidth: '58ch', fontSize: '1.02rem', lineHeight: 1.65 }}>
            Every growing operation ends up here: three, four, five spreadsheets, each one a little wrong, none of them agreeing. Here&apos;s the stack a landlord uses to run 30 tenants:
          </p>
          <ul className="mt-7 grid gap-3" style={{ maxWidth: '52ch' }}>
            {['Rent ledger — out of date by Tuesday', 'Lease dates — someone deleted a row last month', 'Maintenance requests — actually in WhatsApp', 'Vacancy tracker — nobody trusts it'].map((t) => (
              <li key={t} className="flex gap-3 items-start text-bone-dim" style={{ fontSize: '0.98rem', lineHeight: 1.55 }}>
                {cross}<span>{t}</span>
              </li>
            ))}
          </ul>
          <p className="mt-7 text-bone" style={{ maxWidth: '54ch', fontSize: '1.02rem', lineHeight: 1.6 }}>
            Every one of those is a bug. Together, they&apos;re your business &mdash; and they&apos;re costing you hours every week and revenue you never see.
          </p>
        </div>
      </section>

      {/* ─── TREVIS CASE STUDY ────────────────────────────── */}
      <section id="trevis" className="wrap" style={{ paddingBlock: 'var(--section-pad)', scrollMarginTop: 72 }}>
        <p className="label mb-4">// proof · property management</p>
        <h2 className="font-display text-bone" style={{ fontWeight: 400, fontSize: 'clamp(1.7rem, 4.2vw, 2.6rem)', lineHeight: 1.08, letterSpacing: '-0.02em', maxWidth: '22ch' }}>
          4 spreadsheets. 132 tenants. One system that&apos;s always right.
        </h2>
        <p className="mt-5 text-bone-dim" style={{ maxWidth: '60ch', fontSize: '1.05rem', lineHeight: 1.65 }}>
          Trevis is a student-housing operator in Harare running 4 properties. Rent, leases, occupancy and payments lived in four disconnected spreadsheets &mdash; until I replaced them with one web app the whole operation now runs on.
        </p>

        {/* Stats */}
        <div className="mt-10 grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
          {trevisStats.map((s) => (
            <div key={s.label} style={{ border: '1px solid var(--line)', borderRadius: 'var(--r-md)', padding: '1.1rem 1.2rem', background: 'var(--surface)' }}>
              <div className="font-display text-bone" style={{ fontSize: '1.9rem', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1 }}>{s.n}</div>
              <div className="label mt-2" style={{ letterSpacing: '0.06em' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Before / After */}
        <div className="mt-12 grid gap-8 md:gap-12" style={{ gridTemplateColumns: '1fr' }}>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="label mb-4" style={{ color: 'var(--bone-faint)' }}>// before</p>
              <ul className="grid gap-3">
                {beforeItems.map((t) => (
                  <li key={t} className="flex gap-3 items-start text-bone-dim" style={{ fontSize: '0.96rem', lineHeight: 1.5 }}>{cross}<span>{t}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label mb-4" style={{ color: 'var(--ember)' }}>// after</p>
              <ul className="grid gap-3">
                {afterItems.map((t) => (
                  <li key={t} className="flex gap-3 items-start text-bone" style={{ fontSize: '0.96rem', lineHeight: 1.5 }}>{check}<span>{t}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Screenshots */}
        <div className="mt-14 grid gap-10">
          {[
            { src: '/images/trevis/dashboard.png', cap: 'The owner’s morning view — collected vs expected, tenants needing attention, occupancy. No tabs, no formulas.' },
            { src: '/images/trevis/properties.png', cap: 'Every property with live collection and occupancy — the old “vacancy tracker” spreadsheet, deleted.' },
            { src: '/images/trevis/finance.png', cap: '12-month collection trend and the coverage ledger — the questions the spreadsheets could never answer.' },
          ].map((shot) => (
            <figure key={shot.src}>
              <div style={{ border: '1px solid var(--line)', borderRadius: 'var(--r-md)', overflow: 'hidden', background: 'var(--surface)' }}>
                <Image src={shot.src} alt={shot.cap} width={1600} height={900} sizes="(max-width: 1080px) 100vw, 1080px" style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
              <figcaption className="mt-3 text-bone-faint" style={{ fontSize: '0.85rem', lineHeight: 1.55, maxWidth: '62ch' }}>{shot.cap}</figcaption>
            </figure>
          ))}
        </div>

        <blockquote className="mt-12" style={{ borderLeft: '2px solid var(--ember)', paddingLeft: '1.2rem' }}>
          <p className="font-display text-bone" style={{ fontSize: 'clamp(1.15rem, 2.6vw, 1.5rem)', fontWeight: 400, lineHeight: 1.35, maxWidth: '32ch' }}>
            Built and shipped by one engineer. In production, running the business daily.
          </p>
        </blockquote>
      </section>

      {/* ─── THE OFFER ────────────────────────────────────── */}
      <section style={{ background: 'var(--surface)', borderBlock: '1px solid var(--line)' }}>
        <div className="wrap" style={{ paddingBlock: 'var(--section-pad)' }}>
          <p className="label mb-4">// the offer</p>
          <h2 className="font-display text-bone" style={{ fontWeight: 400, fontSize: 'clamp(1.7rem, 4.2vw, 2.6rem)', lineHeight: 1.08, letterSpacing: '-0.02em', maxWidth: '20ch' }}>
            Never touch a spreadsheet again.
          </h2>
          <p className="mt-5 text-bone-dim" style={{ maxWidth: '58ch', fontSize: '1.05rem', lineHeight: 1.65 }}>
            Hand over the spreadsheets and about 45 minutes of your time. I do the rest &mdash; build, migrate, test, launch. You get one system your whole team logs into, and a single dashboard with the one number that tells you the business is healthy.
          </p>

          {/* Double guarantee — the most important promise */}
          <div className="mt-9 grid gap-4 sm:grid-cols-2" style={{ maxWidth: '48rem' }}>
            {[
              { h: 'Shipped on time', b: 'Delivered in 21 days, or you get 20% off. Most agencies quote 8–12 weeks.' },
              { h: 'Hours saved, or refunded', b: 'Save 5+ hours a week in month one, or a full refund by day 45. My risk, not yours.' },
            ].map((g) => (
              <div key={g.h} style={{ border: '1px solid var(--ember)', borderRadius: 'var(--r-md)', padding: '1.4rem 1.5rem', background: 'var(--ember-soft)' }}>
                <p className="font-display text-bone" style={{ fontSize: '1.15rem', fontWeight: 500 }}>{g.h}</p>
                <p className="mt-2 text-bone-dim" style={{ fontSize: '0.92rem', lineHeight: 1.55 }}>{g.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIERS (no hard prices — quote on the call) ────── */}
      <section className="wrap" style={{ paddingBlock: 'var(--section-pad)' }}>
        <p className="label mb-4">// three ways in</p>
        <h2 className="font-display text-bone" style={{ fontWeight: 400, fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', lineHeight: 1.1, letterSpacing: '-0.01em', maxWidth: '24ch' }}>
          Pick the scope. I&apos;ll send a fixed quote in 24 hours.
        </h2>
        <p className="mt-4 text-bone-dim" style={{ maxWidth: '54ch', fontSize: '0.98rem', lineHeight: 1.6 }}>
          Flat fee, 50% to start, balance on delivery. No hourly billing, no surprises. We settle the exact number on a 15-minute call.
        </p>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="flex flex-col"
              style={{
                border: tier.flagship ? '1px solid var(--ember)' : '1px solid var(--line)',
                borderRadius: 'var(--r-md)',
                padding: '1.6rem 1.5rem',
                background: tier.flagship ? 'var(--surface-2)' : 'var(--surface)',
                position: 'relative',
              }}
            >
              {tier.flagship && (
                <span className="label" style={{ position: 'absolute', top: -10, left: 20, background: 'var(--ember)', color: 'var(--ink)', padding: '0.15rem 0.6rem', borderRadius: 'var(--r-sm)', letterSpacing: '0.1em' }}>
                  Flagship
                </span>
              )}
              <h3 className="font-display text-bone" style={{ fontSize: '1.4rem', fontWeight: 500 }}>{tier.name}</h3>
              <p className="label mt-1.5" style={{ textTransform: 'none', letterSpacing: '0.04em', color: tier.flagship ? 'var(--ember)' : 'var(--bone-faint)' }}>{tier.tag}</p>
              <p className="mt-4 text-bone-dim" style={{ fontSize: '0.9rem', lineHeight: 1.5, minHeight: '2.7em' }}>{tier.forWho}</p>

              <div className="mt-4 mb-5 flex items-center gap-2" style={{ borderTop: '1px solid var(--line)', paddingTop: '1rem' }}>
                <span className="label" style={{ letterSpacing: '0.08em' }}>Delivered</span>
                <span className="font-mono text-bone" style={{ fontSize: '0.9rem' }}>{tier.delivery}</span>
              </div>

              <ul className="grid gap-2.5 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2.5 items-start text-bone-dim" style={{ fontSize: '0.88rem', lineHeight: 1.45 }}>{check}<span>{f}</span></li>
                ))}
              </ul>

              <div className="mt-6">
                <CTA href="#book" variant={tier.flagship ? 'solid' : 'ghost'}>Book a call →</CTA>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-bone-faint font-mono" style={{ fontSize: '0.74rem' }}>
          Add-ons available on the call: public booking page, WhatsApp lead-capture bot, AI FAQ agent, field-staff mobile view, and an ongoing Care Plan (hosting, backups, monitoring).
        </p>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────── */}
      <section style={{ background: 'var(--surface)', borderBlock: '1px solid var(--line)' }}>
        <div className="wrap" style={{ paddingBlock: 'var(--section-pad)' }}>
          <p className="label mb-4">// how it works</p>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { n: '01', h: 'Hand over the spreadsheets', b: 'A 15-minute call, then you send me the files you hate most. About 45 minutes of your time, total.' },
              { n: '02', h: 'I build it in 21 days', b: 'Design, migration, automations, testing — all done for you. You see progress, not busywork.' },
              { n: '03', h: 'Your team logs in', b: 'One system that already works, with a guarantee behind it. Spreadsheets retired for good.' },
            ].map((step) => (
              <div key={step.n}>
                <div className="font-mono" style={{ color: 'var(--ember)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>{step.n}</div>
                <h3 className="mt-3 font-display text-bone" style={{ fontSize: '1.25rem', fontWeight: 500 }}>{step.h}</h3>
                <p className="mt-2.5 text-bone-dim" style={{ fontSize: '0.94rem', lineHeight: 1.6 }}>{step.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHO IT'S FOR ─────────────────────────────────── */}
      <section className="wrap" style={{ paddingBlock: 'var(--section-pad)' }}>
        <p className="label mb-4">// who this is for</p>
        <h2 className="font-display text-bone" style={{ fontWeight: 400, fontSize: 'clamp(1.5rem, 3.6vw, 2.2rem)', lineHeight: 1.12, maxWidth: '22ch' }}>
          If your team runs on tabs, this is for you.
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {niches.map((n) => (
            <div key={n.t} className="capability-card" style={{ border: '1px solid var(--line)', borderRadius: 'var(--r-md)', padding: '1.3rem 1.4rem' }}>
              <h3 className="text-bone" style={{ fontSize: '1.02rem', fontWeight: 500 }}>{n.t}</h3>
              <p className="mt-2 text-bone-dim" style={{ fontSize: '0.9rem', lineHeight: 1.55 }}>{n.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── OBJECTIONS / FAQ ─────────────────────────────── */}
      <section style={{ background: 'var(--surface)', borderBlock: '1px solid var(--line)' }}>
        <div className="wrap" style={{ paddingBlock: 'var(--section-pad)' }}>
          <p className="label mb-4">// straight answers</p>
          <div className="grid gap-6" style={{ maxWidth: '60ch' }}>
            {faqs.map((f) => (
              <div key={f.q} style={{ borderBottom: '1px solid var(--line)', paddingBottom: '1.4rem' }}>
                <h3 className="text-bone" style={{ fontSize: '1.05rem', fontWeight: 500 }}>{f.q}</h3>
                <p className="mt-2.5 text-bone-dim" style={{ fontSize: '0.95rem', lineHeight: 1.65 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA + BOOKING CALENDAR ─────────────────── */}
      <section className="wrap" style={{ paddingBlock: 'var(--section-pad)' }}>
        <div className="text-center" style={{ maxWidth: '40rem', marginInline: 'auto' }}>
          <h2 className="font-display text-bone" style={{ fontWeight: 400, fontSize: 'clamp(1.8rem, 4.5vw, 2.8rem)', lineHeight: 1.06, letterSpacing: '-0.02em' }}>
            Bring the spreadsheets you hate most.
          </h2>
          <p className="mt-5 text-bone-dim" style={{ fontSize: '1.05rem', lineHeight: 1.65 }}>
            15 minutes. Leave with a plan and a fixed quote &mdash; and no pitch if it&apos;s not a fit. Tell me about your project in the notes when you book.
          </p>
        </div>

        {/* Anchor target for every CTA on the page. BookingSection renders
            the live Cal.com calendar; if CAL_LINK is unset it renders null,
            so the direct-link fallback below always keeps this actionable. */}
        <div id="book" style={{ scrollMarginTop: 72 }} className="mt-10">
          <BookingSection />
          <div className="text-center">
            <CTA href={CAL_LINK}>Or book directly on Cal.com →</CTA>
            <p className="mt-4 text-bone-faint font-mono" style={{ fontSize: '0.74rem' }}>
              Prefer to talk first?{' '}
              <a href="https://wa.me/263777553271" target="_blank" rel="noopener noreferrer" className="text-bone-dim hover:text-bone transition-colors">Message me on WhatsApp</a>.
            </p>
          </div>
        </div>

        <p className="mt-14 text-center text-bone-faint" style={{ fontSize: '0.8rem' }}>
          Delivered by <Link href="/" className="text-bone-dim hover:text-bone transition-colors">Tafara Rugara</Link> &mdash; AWS-certified engineer, DevOps background.{' '}
          Trevis data shown with the owner&apos;s permission, personal details cropped.
        </p>
      </section>
    </main>
  );
}
