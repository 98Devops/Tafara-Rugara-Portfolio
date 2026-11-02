import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CinematicHome } from '../CinematicHome';
import { MotionPreferences } from '../MotionPreferences';
import { portfolioData } from '@/data/portfolio';

describe('Cinematic portfolio', () => {
  it('lets visitors explore disciplines without leaving the page', async () => {
    const user = userEvent.setup();
    render(
      <MotionPreferences>
        <CinematicHome />
      </MotionPreferences>
    );
    await user.click(screen.getByRole('button', { name: 'Cloud' }));
    expect(screen.getByRole('button', { name: 'Cloud' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByRole('button', { name: 'Automation' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
    expect(
      screen.getByText('From source code to a reliable service.')
    ).toBeVisible();
  });

  it('allows visitors to pause ambient motion', async () => {
    const user = userEvent.setup();
    render(
      <MotionPreferences>
        <CinematicHome />
      </MotionPreferences>
    );
    await user.click(screen.getByRole('button', { name: /pause motion/i }));
    expect(screen.getByRole('main')).toHaveClass('motion-paused');
    await user.click(screen.getByRole('button', { name: /resume motion/i }));
    expect(screen.getByRole('main')).not.toHaveClass('motion-paused');
  });

  it('expands the selected process step and collapses the previous step', async () => {
    const user = userEvent.setup();
    render(
      <MotionPreferences>
        <CinematicHome />
      </MotionPreferences>
    );
    await user.click(
      screen.getByRole('button', { name: /test the uncomfortable cases/i })
    );
    expect(
      screen.getByText(/Duplicate events. Partial payments./)
    ).toBeVisible();
    expect(
      screen.getByRole('button', { name: /understand the real problem/i })
    ).toHaveAttribute('aria-expanded', 'false');
  });

  it('preserves the existing CV destination and project actions', () => {
    render(
      <MotionPreferences>
        <CinematicHome />
      </MotionPreferences>
    );
    expect(screen.getByRole('link', { name: /^download cv/i })).toHaveAttribute(
      'href',
      portfolioData.personal.documents.cv
    );
    expect(
      screen.getByRole('link', { name: /visit live app/i })
    ).toHaveAttribute('href', 'https://trevis.netlify.app/');
    expect(
      screen.getByRole('link', { name: /explore my work/i })
    ).toHaveAttribute('href', '/projects');
  });
});
