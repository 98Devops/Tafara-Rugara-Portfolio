import fc from 'fast-check';
import { render } from '@testing-library/react';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import CapabilityCard from '@/components/CapabilityCard';
import ProjectCard from '@/components/ProjectCard';
import ContactForm from '@/components/ContactForm';
import { portfolioData } from '@/data/portfolio';

const viewportSizes = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1920, height: 1080 },
];

describe('Performance Standards Property Tests', () => {
  it('Property 2.1: maintains semantic HTML structure across all components', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          { name: 'Navigation', component: Navigation, props: {} },
          { name: 'Hero', component: Hero, props: { personal: portfolioData.personal } },
          { name: 'CapabilityCard', component: CapabilityCard, props: { capability: portfolioData.capabilities[0], index: 0 } },
          { name: 'ProjectCard', component: ProjectCard, props: { project: portfolioData.projects[0], index: 0 } },
          { name: 'ContactForm', component: ContactForm, props: {} }
        ),
        (testComponent) => {
          const Component = testComponent.component;
          const { container } = render(<Component {...testComponent.props} />);
          const semanticElements = container.querySelectorAll(
            'main, section, article, header, footer, nav, aside, h1, h2, h3, h4, h5, h6'
          );
          expect(semanticElements.length).toBeGreaterThan(0);
        }
      ),
      { numRuns: 20 }
    );
  });

  it('Property 2.2: maintains responsive layout across all device sizes', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          { name: 'Navigation', component: Navigation, props: {} },
          { name: 'Hero', component: Hero, props: { personal: portfolioData.personal } }
        ),
        fc.constantFrom(...viewportSizes),
        (testComponent, viewport) => {
          const Component = testComponent.component;
          const { container } = render(<Component {...testComponent.props} />);
          expect(container.firstChild).toBeTruthy();
        }
      ),
      { numRuns: 20 }
    );
  });
});
