import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0A0F1E' }}>
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4" style={{ color: '#00D4FF' }}>
          404
        </h1>
        <h2 className="text-2xl font-semibold mb-6" style={{ color: '#ffffff' }}>
          Page Not Found
        </h2>
        <p className="text-lg mb-8" style={{ color: 'rgba(203,213,225,0.82)' }}>
          The page you're looking for doesn't exist.
        </p>
        <Link 
          href="/" 
          className="inline-block px-6 py-3 rounded-lg font-semibold transition-colors"
          style={{ 
            background: 'linear-gradient(135deg, #00D4FF, #7C3AED)',
            color: '#ffffff'
          }}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}