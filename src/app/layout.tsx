import type { Metadata } from 'next';
import { Fraunces, Archivo, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import './cinematic.css';
import './studio.css';
import { StructuredData } from '@/components/StructuredData';
import { generatePageMetadata } from '@/components/SEO';
import ClientShell from '@/components/ClientShell';

// Display — statements, section titles, numerals
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  preload: true,
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  fallback: ['Georgia', 'serif'],
  adjustFontFallback: true,
});

// UI / body
const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600'],
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
});

// Data / labels / mono
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: false,
  weight: ['400', '500'],
  fallback: ['ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'],
  adjustFontFallback: true,
});

export const metadata: Metadata = generatePageMetadata('home');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme="light"
      className={`${fraunces.variable} ${archivo.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=localStorage.getItem("tafara-theme");var t=p==="light"||p==="dark"?p:window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t;document.documentElement.classList.toggle("dark",t==="dark");}catch(e){}})();`,
          }}
        />
        <StructuredData pageKey="home" />
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* DNS prefetch */}
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://linkedin.com" />
        {/* Viewport & theme */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#111214" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body
        className="font-sans antialiased"
        style={{ background: 'var(--ink)', color: 'var(--bone)' }}
      >
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
