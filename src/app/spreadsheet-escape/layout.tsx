import { Metadata } from 'next';

const title = 'Escape the Spreadsheets — One Clean System in 21 Days | Tafara Rugara';
const description =
  'Your business runs on 3–5 spreadsheets. I replace them with one system — dashboard, logins, automations — in 21 days, or you get 20% off. Save 5+ hours a week or your money back. See the Trevis build: 132 tenants, one app.';
const url = 'https://tafara-rugara.com/spreadsheet-escape';
const ogImage = '/images/trevis/dashboard.png';

export const metadata: Metadata = {
  metadataBase: new URL('https://tafara-rugara.com'),
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
    '21 day build',
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
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'One system replacing four spreadsheets — the Trevis dashboard' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [ogImage],
  },
  robots: { index: true, follow: true },
};

export default function SpreadsheetEscapeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
