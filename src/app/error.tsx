'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Route Error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4 text-white">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 text-center shadow-xl">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
          <svg
            className="h-8 w-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        <h2 className="mb-4 text-2xl font-bold">Something went wrong!</h2>

        <p className="mb-8 text-gray-400">
          We encountered an error while loading this page.
          {process.env.NODE_ENV === 'development' && (
            <span className="mt-2 block max-h-32 overflow-auto rounded bg-gray-900 p-2 text-left font-mono text-sm text-red-400">
              {error.message}
            </span>
          )}
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={() => reset()}
            className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700"
          >
            Try again
          </button>

          <button
            onClick={() => (window.location.href = '/')}
            className="rounded-lg bg-gray-700 px-6 py-2 font-medium text-gray-200 transition-colors hover:bg-gray-600"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
