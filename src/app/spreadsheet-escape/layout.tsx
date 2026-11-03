import { Metadata } from 'next';

const title = 'Spreadsheet Escape — Software for Your Business';
const description =
  'Turn scattered spreadsheets into a focused business application. Explore the Trevis example and discuss a workflow built around your operations.';
const url = 'https://tafara.netlify.app/spreadsheet-escape';
const ogImage = '/images/placeholder.svg';

export const metadata: Metadata = {
  metadataBase: new URL('https://tafara.netlify.app'),
  title,
  description,
  keywords: [
    'replace spreadsheets with software',
    'spreadsheet to web app',
    'custom business dashboard',
    'property management software',
    'small business system',
    'React Supabase web app',
    'productized software development',
    'Tafara Rugara',
    'Harare software developer',
  ],
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'en_US',
    url,
    siteName: 'Tafara Rugara',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Tafara Rugara — Business systems and automation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [ogImage],
  },
  robots: { index: true, follow: true },
};

export default function SpreadsheetEscapeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
