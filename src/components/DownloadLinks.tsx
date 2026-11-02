import { documents } from '@/data/site';

export function DownloadLinks({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'document-links compact' : 'document-links'}>
      {Object.entries(documents).map(([key, doc]) => (
        <a
          key={key}
          href={doc.href}
          download={doc.filename}
          className="document-link"
        >
          <span className="document-icon" aria-hidden="true">
            ↓
          </span>
          <span>
            <strong>{doc.label}</strong>
            {!compact && <small>{doc.detail}</small>}
          </span>
          <span className="document-format">PDF</span>
        </a>
      ))}
    </div>
  );
}
