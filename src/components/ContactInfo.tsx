import { portfolioData } from '@/data/portfolio';
import { DownloadLinks } from '@/components/DownloadLinks';
import { site } from '@/data/site';

export default function ContactInfo() {
  return (
    <aside className="contact-sidebar">
      <p className="cinema-eyebrow">A DIRECT LINE</p>
      <a className="contact-email" href={'mailto:' + site.email}>
        {site.email} <span>↗</span>
      </a>
      <p>
        Based in Harare, Zimbabwe. Open to remote opportunities and project
        collaborations.
      </p>
      <div className="contact-routes">
        <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
          <span>
            WhatsApp<small>+263 777 553 271</small>
          </span>
          <b>↗</b>
        </a>
        <a
          href={portfolioData.personal.socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>
            LinkedIn<small>Experience & professional updates</small>
          </span>
          <b>↗</b>
        </a>
        <a
          href={portfolioData.personal.socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>
            GitHub<small>The code behind the work</small>
          </span>
          <b>↗</b>
        </a>
      </div>
      <div className="contact-documents">
        <p className="cinema-eyebrow">TAKE A CLOSER LOOK</p>
        <DownloadLinks />
      </div>
    </aside>
  );
}
