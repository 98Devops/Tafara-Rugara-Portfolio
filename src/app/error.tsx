'use client';
import Link from 'next/link';
import { useEffect } from 'react';
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Route error:', error);
  }, [error]);
  return (
    <main className="cinematic-home utility-page wrap">
      <span className="cinema-eyebrow">A SMALL DETOUR</span>
      <h1>
        Something needs
        <br />
        <em>another try.</em>
      </h1>
      <p>This page couldn’t load. Try again or head back to the homepage.</p>
      <button className="btn-solid" onClick={reset}>
        Try again ↻
      </button>
      <Link href="/">Back to home ↗</Link>
    </main>
  );
}
