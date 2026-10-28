import type { Metadata } from "next";
import { Fraunces, Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/StructuredData";
import { generatePageMetadata } from "@/components/SEO";
import ClientShell from "@/components/ClientShell";

// Display — statements, section titles, numerals
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  preload: true,
  weight: ["400", "500"],
  style: ["normal", "italic"],
  fallback: ["Georgia", "serif"],
  adjustFontFallback: true,
});

// UI / body
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600"],
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});

// Data / labels / mono
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false,
  weight: ["400", "500"],
  fallback: ["ui-monospace", "SFMono-Regular", "Consolas", "monospace"],
  adjustFontFallback: true,
});

export const metadata: Metadata = generatePageMetadata("home");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <StructuredData pageKey="home" />
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch */}
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://linkedin.com" />
        {/* Preload critical assets */}
        <link rel="preload" href="/documents/tafara-rugara-cv.pdf" as="document" type="application/pdf" />
        {/* Viewport & theme */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#14110D" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body
        className={`${fraunces.variable} ${archivo.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        style={{ background: "var(--ink)", color: "var(--bone)" }}
      >
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
