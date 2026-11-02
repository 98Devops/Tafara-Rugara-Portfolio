import Link from 'next/link';
import { PageIntro, NextChapter } from '@/components/PageIntro';
import { ProjectArtwork } from '@/components/ProjectArtwork';
export default function SpreadsheetEscape() {
  return (
    <main className="cinematic-home inner-page">
      <PageIntro
        number="06"
        label="SPREADSHEET ESCAPE"
        title="Your business grew."
        emphasis="Your spreadsheet didn’t."
        description="When the work starts living across tabs, chat threads and people’s memory, it may be time for a system built around the way your business operates."
      >
        <Link href="/contact#book" className="btn-solid">
          Map out your workflow ↗
        </Link>
      </PageIntro>
      <section className="principles-band">
        <div className="wrap">
          <p className="cinema-eyebrow">LESS CHASING. MORE CLARITY.</p>
          <h2>
            Give the work
            <br />a proper place to live.
          </h2>
          <div>
            <p>
              <b>One reliable record.</b> Bring people, transactions and status
              into a shared system with clear ownership.
            </p>
            <p>
              <b>Fewer repeated steps.</b> Connect the tools you already use and
              automate the handoffs that slow you down.
            </p>
            <p>
              <b>Visibility without the chase.</b> Make the important
              information accessible to the right people, when they need it.
            </p>
          </div>
        </div>
      </section>
      <section className="wrap escape-proof">
        <div>
          <p className="cinema-eyebrow">A REAL EXAMPLE / TREVIS</p>
          <h2>
            From scattered records
            <br />
            to shared operations.
          </h2>
          <p>
            A property management system for 130+ tenants across four
            properties. Tenant records, rent tracking, invoicing and reporting
            brought into one application.
          </p>
          <Link href="/projects#trevis-property-management">
            Explore the Trevis build ↗
          </Link>
        </div>
        <ProjectArtwork
          id="trevis-property-management"
          category="webapp"
          title="Trevis Property Management"
        />
      </section>
      <section className="wrap escape-steps" aria-label="Engagement process">
        {[
          [
            '01',
            'Understand the work',
            'We map the current process, where information gets lost and which parts are worth improving first.',
          ],
          [
            '02',
            'Build the useful core',
            'Start with a focused workflow, clear access rules and a practical way to bring existing records across.',
          ],
          [
            '03',
            'Test, hand over, improve',
            'Walk through real scenarios, document the system and agree on the next improvements based on use.',
          ],
        ].map(([number, title, text]) => (
          <article key={number}>
            <p className="cinema-eyebrow">{number} / THE PROCESS</p>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>
      <NextChapter
        title="Let’s untangle the workflow."
        href="/contact#book"
        action="Book a discovery call"
      />
    </main>
  );
}
