import { generateStructuredData, PageSEOConfig } from './SEO';

interface StructuredDataProps {
  pageKey?: keyof PageSEOConfig;
}

export function StructuredData({ pageKey = 'home' }: StructuredDataProps) {
  const structuredData = generateStructuredData(pageKey);

  let json = '';
  try {
    json = JSON.stringify(structuredData);
  } catch (err) {
    // Prevent hard crashes from structured data serialization issues
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Structured data serialization failed:', err);
    }
    json = '';
  }

  if (!json) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
