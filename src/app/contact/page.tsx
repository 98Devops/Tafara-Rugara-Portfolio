import ContactInfo from '@/components/ContactInfo';
import ContactForm from '@/components/ContactForm';
import { BookingSection } from '@/components/BookingSection';
import { PageIntro } from '@/components/PageIntro';

export default function Contact() {
  return (
    <main className="cinematic-home inner-page">
      <PageIntro
        number="05"
        label="LET’S CONNECT"
        title="Good systems start"
        emphasis="with a conversation."
        description="Have a workflow to simplify, a product to build or a role that fits? Tell me what you have in mind."
      >
        <div className="contact-intro">
          <span className="live-dot" />
          <p>Open to opportunities</p>
          <span>REMOTE ROLES / CONTRACTS / COLLABORATIONS</span>
          <a href="#book">
            Book a discovery call <b>↗</b>
          </a>
        </div>
      </PageIntro>
      <section className="wrap contact-main">
        <ContactForm />
        <ContactInfo />
      </section>
      <div className="wrap">
        <BookingSection />
      </div>
    </main>
  );
}
