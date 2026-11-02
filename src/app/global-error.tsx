'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: '#111214',
          color: '#f1eee8',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="w-full max-w-md text-center">
            <h1
              className="mb-4 text-4xl font-bold"
              style={{ color: '#f18453' }}
            >
              System Error
            </h1>
            <p className="mb-8 text-gray-300">
              A critical error occurred. Please refresh the page or try again
              later.
            </p>
            {process.env.NODE_ENV === 'development' && (
              <pre className="mb-8 max-h-64 overflow-auto rounded border border-red-900 bg-black p-4 text-left text-xs text-red-400">
                {error.message}
                {'\n'}
                {error.stack}
              </pre>
            )}
            <button
              onClick={() => reset()}
              className="rounded px-6 py-3"
              style={{ background: '#f18453', color: '#171310' }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
