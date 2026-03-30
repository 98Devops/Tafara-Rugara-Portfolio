import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ background: '#0A0F1E' }}
    >
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold" style={{ color: '#00D4FF' }}>
          404
        </h1>
        <h2
          className="mb-6 text-2xl font-semibold"
          style={{ color: '#ffffff' }}
        >
          Page Not Found
        </h2>
        <p className="mb-8 text-lg" style={{ color: 'rgba(203,213,225,0.82)' }}>
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg px-6 py-3 font-semibold transition-colors"
          style={{
            background: 'linear-gradient(135deg, #00D4FF, #7C3AED)',
            color: '#ffffff',
          }}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
