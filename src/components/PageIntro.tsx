import Link from 'next/link';

export function PageIntro({
  number,
  label,
  title,
  emphasis,
  description,
  children,
}: {
  number: string;
  label: string;
  title: string;
  emphasis: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="inner-intro wrap">
      <div className="inner-breadcrumb">
        <Link href="/">TAFARA RUGARA</Link>
        <span>/ {label}</span>
        <span className="page-index">{number}</span>
      </div>
      <div className="inner-intro-grid">
        <div>
          <p className="cinema-eyebrow rise">{label}</p>
          <h1 className="rise d1">
            {title}
            <br />
            <em>{emphasis}</em>
          </h1>
          <p className="inner-description rise d2">{description}</p>
        </div>
        {children && <div className="intro-aside rise d2">{children}</div>}
      </div>
    </header>
  );
}

export function NextChapter({
  label = 'HAVE SOMETHING IN MIND?',
  title = 'Let’s make it work.',
  href = '/contact',
  action = 'Start a conversation',
}: {
  label?: string;
  title?: string;
  href?: string;
  action?: string;
}) {
  return (
    <section className="next-chapter wrap">
      <p className="cinema-eyebrow">{label}</p>
      <div>
        <h2>{title}</h2>
        <Link href={href} className="btn-solid">
          {action} <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
