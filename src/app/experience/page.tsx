import { portfolioData } from '@/data/portfolio';
import { PageIntro, NextChapter } from '@/components/PageIntro';
import { DownloadLinks } from '@/components/DownloadLinks';

export default function Experience() {
  return (
    <main className="cinematic-home inner-page">
      <PageIntro
        number="04"
        label="EXPERIENCE"
        title="Built on experience."
        emphasis="Always building forward."
        description="A foundation in Linux, cloud and DevOps. Hands-on work in automation and full-stack software. The same curiosity, applied across the system."
      >
        <DownloadLinks />
      </PageIntro>
      <section
        className="wrap experience-stories"
        aria-label="Professional experience"
      >
        {portfolioData.experience.map((experience, index) => (
          <article className="experience-story reveal" key={experience.company}>
            <div className="experience-date">
              <span className="experience-dot" />
              <span className="cinema-eyebrow">
                0{index + 1} /{' '}
                {index === 0 ? 'CURRENT WORK' : 'PROFESSIONAL EXPERIENCE'}
              </span>
              <strong>{experience.duration}</strong>
              <p>{experience.location}</p>
            </div>
            <div className="experience-body">
              <p className="cinema-eyebrow">{experience.company}</p>
              <h2>{experience.position}</h2>
              <p className="experience-focus">{experience.impact}</p>
              <ul>
                {experience.achievements.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="project-tags">
                {experience.technologies.map(tech => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>
      <section className="credentials-band">
        <div className="wrap">
          <div>
            <p className="cinema-eyebrow">FOUNDATIONS & CONTINUED LEARNING</p>
            <h2>
              The learning
              <br />
              doesn’t stop at launch.
            </h2>
          </div>
          <div className="credential-list">
            <article>
              <span className="credential-mark">AWS</span>
              <div>
                <small>CERTIFIED · OCT 2024 – OCT 2027</small>
                <h3>Cloud Practitioner</h3>
                <p>Amazon Web Services</p>
              </div>
            </article>
            <article>
              <span className="credential-mark outline">AWS</span>
              <div>
                <small>IN PROGRESS</small>
                <h3>Solutions Architect — Associate</h3>
                <p>Continued study · SAA-C03</p>
              </div>
            </article>
          </div>
        </div>
      </section>
      <NextChapter
        label="THE EXPERIENCE IN ACTION"
        title="See what it became."
        href="/projects"
        action="Explore the projects"
      />
    </main>
  );
}
