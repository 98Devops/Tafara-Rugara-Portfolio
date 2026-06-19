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
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="w-full max-w-md text-center">
            <h1 className="mb-4 text-4xl font-bold text-red-500">
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
              className="rounded-lg bg-blue-600 px-6 py-3 transition-colors hover:bg-blue-700"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
