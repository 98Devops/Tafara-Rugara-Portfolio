'use client';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {/* Dot grid */}
      <div
        className="absolute inset-0 dot-grid-bg"
        style={{ opacity: 0.4 }}
      />
      {/* Ambient glow orbs */}
      <div
        className="ambient-glow"
        style={{ top: '10%', right: '-10%' }}
      />
      <div
        className="ambient-glow-2"
        style={{ bottom: '20%', left: '-5%' }}
      />
    </div>
  );
}
