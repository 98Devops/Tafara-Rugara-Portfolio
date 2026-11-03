import Link from 'next/link';
export default function NotFound() {
  return (
    <main className="cinematic-home utility-page wrap">
      <span className="cinema-eyebrow">404 / OFF THE MAP</span>
      <h1>
        This page took
        <br />
        <em>a different route.</em>
      </h1>
      <p>
        The page you’re looking for doesn’t exist. Let’s get you back to the
        work.
      </p>
      <Link href="/" className="btn-solid">
        Back to home ↗
      </Link>
      <Link href="/projects">Explore projects ↗</Link>
    </main>
  );
}
