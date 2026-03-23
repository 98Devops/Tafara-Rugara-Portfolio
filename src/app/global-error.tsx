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
      <body className="bg-gray-900 text-white">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            <h1 className="text-4xl font-bold mb-4 text-red-500">System Error</h1>
            <p className="text-gray-300 mb-8">
              A critical error occurred. Please refresh the page or try again later.
            </p>
            {process.env.NODE_ENV === 'development' && (
              <pre className="text-xs text-left bg-black p-4 rounded mb-8 overflow-auto max-h-64 text-red-400 border border-red-900">
                {error.message}
                {'\n'}
                {error.stack}
              </pre>
            )}
            <button
              onClick={() => reset()}
              className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
