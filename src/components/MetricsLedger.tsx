'use client';

import { Metric } from '@/types';

interface MetricsLedgerProps {
  metrics: Metric[];
  eyebrow?: string;
}

/**
 * Operating-record ledger. Each row: large Fraunces numeral (ember unit),
 * a description with a muted sub-line, and a mono meta tag. Rows divided by
 * hairlines. Replaces the old glowing stat cards.
 */
export function MetricsLedger({ metrics, eyebrow = '// operating record' }: MetricsLedgerProps) {
  return (
    <div>
      {eyebrow && <p className="label mb-7">{eyebrow}</p>}
      <div>
        {metrics.map((m, i) => (
          <div
            key={`${m.value}-${i}`}
            className="metric-row grid items-baseline gap-4 border-b border-line"
            style={{
              gridTemplateColumns: 'auto 1fr auto',
              padding: '1.05rem 0',
              borderTop: i === 0 ? '1px solid var(--line)' : undefined,
            }}
          >
            <div
              className="font-display text-bone"
              style={{ fontSize: 'clamp(1.9rem, 4.5vw, 2.9rem)', fontWeight: 400, lineHeight: 1, minWidth: '4.5ch' }}
            >
              {m.value}
              {m.unit && <span className="text-ember" style={{ fontSize: '0.55em' }}>{m.unit}</span>}
            </div>
            <div className="text-bone" style={{ fontSize: '0.98rem' }}>
              {m.label}
              {m.detail && (
                <span className="block text-bone-dim" style={{ fontSize: '0.84rem', marginTop: '0.15rem' }}>
                  {m.detail}
                </span>
              )}
            </div>
            {m.meta && (
              <div className="font-mono text-bone-faint text-right whitespace-nowrap metric-meta" style={{ fontSize: '0.7rem', letterSpacing: '0.06em' }}>
                {m.meta}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
