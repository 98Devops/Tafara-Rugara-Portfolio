import type { Metadata } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/StructuredData";
import { generatePageMetadata } from "@/components/SEO";
import ClientShell from "@/components/ClientShell";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700", "800"],
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false,
  weight: ["400", "500", "600"],
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
        <meta name="theme-color" content="#0A0F1E" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body
        className={`${syne.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        style={{ background: "#0A0F1E", color: "#e2e8f0" }}
      >
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
