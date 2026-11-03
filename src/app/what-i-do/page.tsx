import Link from 'next/link';
import { PageIntro, NextChapter } from '@/components/PageIntro';
import { SystemVisual } from '@/components/SystemVisual';

const services = [
  {
    number: '01',
    title: 'Automation that carries the work.',
    name: 'AI & AUTOMATION',
    text: 'Connect the inbox, CRM and operations tools into a workflow with a clear job, reliable inputs and a useful outcome.',
    outputs: [
      'CRM and lifecycle workflows',
      'AI agents with structured output',
      'API integrations and webhooks',
      'Retries, validation and human review',
    ],
    stack: 'n8n · GoHighLevel · Zapier · LLMs',
    example:
      'Delivery health, voice-to-insight and patient-retention workflows.',
    active: 0,
  },
  {
    number: '02',
    title: 'Software built around the business.',
    name: 'APPLICATIONS & WEBSITES',
    text: 'Turn the spreadsheets, repeated tasks and awkward workarounds into an application people can use every day.',
    outputs: [
      'Business dashboards and internal tools',
      'Full-stack web applications',
      'Offline capture and sync',
      'Role-based access and auditable records',
    ],
    stack: 'React · Next.js · TypeScript · Supabase',
    example: 'Trevis for property operations. Munda for farm inputs.',
    active: 1,
  },
  {
    number: '03',
    title: 'A dependable place to run it.',
    name: 'CLOUD & DEVOPS',
    text: 'Connect application code to a repeatable deployment, with infrastructure that is understandable and failures you can diagnose.',
    outputs: [
      'Containerized services and Linux hardening',
      'AWS infrastructure and Terraform',
      'GitHub Actions deployment workflows',
      'Logs, monitoring and recovery paths',
    ],
    stack: 'AWS · Docker · Linux · GitHub Actions',
    example: 'AI pipeline deployments and the AWS Cloud Resume Challenge.',
    active: 2,
  },
];
export default function WhatIDo() {
  return (
    <main className="cinematic-home inner-page">
      <PageIntro
        number="02"
        label="WHAT I DO"
        title="The whole system."
        emphasis="Thought through."
        description="I work where software, AI and infrastructure meet. From the first interface to the automation behind it, each part has to work with the next."
      >
        <div className="intro-note">
          <span className="note-mark">↳</span>
          <p>
            One builder.
            <br />A connected skill set.
          </p>
          <small>AUTOMATION / SOFTWARE / CLOUD</small>
        </div>
      </PageIntro>
      <section className="wrap service-stories" aria-label="Services">
        {services.map(service => (
          <article key={service.number} className="service-story reveal">
            <div>
              <p className="cinema-eyebrow">
                {service.number} / {service.name}
              </p>
              <h2>{service.title}</h2>
              <p>{service.text}</p>
              <ul>
                {service.outputs.map(output => (
                  <li key={output}>
                    <span aria-hidden="true">↗</span>
                    {output}
                  </li>
                ))}
              </ul>
              <p className="service-stack">{service.stack}</p>
              <div className="service-proof">
                <span>IN PRACTICE</span>
                <p>{service.example}</p>
                <Link href="/projects">Explore the work ↗</Link>
              </div>
            </div>
            <SystemVisual active={service.active} compact />
          </article>
        ))}
      </section>
      <section className="principles-band">
        <div className="wrap">
          <p className="cinema-eyebrow">THE ENGINEERING STANDARD</p>
          <h2>
            Useful on day one.
            <br />
            Understandable on day one hundred.
          </h2>
          <div>
            <p>
              <b>Clear boundaries.</b> Define what the system should do and
              where a human should decide.
            </p>
            <p>
              <b>Honest numbers.</b> Keep calculations traceable and derive
              records from a reliable source.
            </p>
            <p>
              <b>A proper handover.</b> Document the workflow, its failure paths
              and how to operate it.
            </p>
          </div>
        </div>
      </section>
      <NextChapter title="What needs to work better?" />
    </main>
  );
}
