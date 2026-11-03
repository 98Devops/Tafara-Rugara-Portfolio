import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, ThemeToggle } from '../ThemeProvider';
import { HeroExperience } from '../HeroExperience';
import { MotionPreferences, MotionToggle } from '../MotionPreferences';
import { ProjectMedia } from '../ProjectMedia';
import { WorkShowcase } from '../WorkShowcase';

afterEach(() => {
  localStorage.clear();
  delete document.documentElement.dataset.theme;
  jest.useRealTimers();
  jest.restoreAllMocks();
});
describe('Studio themes and project media', () => {
  it('restores a saved theme, switches it and keeps the choice after remount', async () => {
    localStorage.setItem('tafara-theme', 'dark');
    const first = render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    await userEvent.click(
      screen.getByRole('button', { name: 'Switch to light theme' })
    );
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    expect(localStorage.getItem('tafara-theme')).toBe('light');
    first.unmount();
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    expect(
      screen.getByRole('button', { name: 'Switch to dark theme' })
    ).toBeVisible();
  });
  it('advances the engineering sequence and freezes it when motion is paused', () => {
    jest.useFakeTimers();
    render(
      <MotionPreferences>
        <HeroExperience />
        <MotionToggle />
      </MotionPreferences>
    );
    expect(screen.getByRole('button', { name: '01 Capture' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    act(() => jest.advanceTimersByTime(2600));
    expect(
      screen.getByRole('button', { name: '02 Understand' })
    ).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(screen.getByRole('button', { name: /Pause animation/ }));
    act(() => jest.advanceTimersByTime(10400));
    expect(
      screen.getByRole('button', { name: '02 Understand' })
    ).toHaveAttribute('aria-pressed', 'true');
  });
  it('supports manual sequence inspection and resets to capture on discipline change', () => {
    const view = render(<HeroExperience />);
    fireEvent.click(screen.getByRole('button', { name: '04 Connect' }));
    expect(screen.getByRole('button', { name: '04 Connect' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    view.rerender(<HeroExperience active={2} />);
    expect(screen.getByRole('button', { name: '01 Commit' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });
  it('keeps the sequence still for reduced motion while allowing manual steps', () => {
    jest.useFakeTimers();
    const original = window.matchMedia('(prefers-reduced-motion: reduce)');
    jest.spyOn(window, 'matchMedia').mockImplementation(query => ({
      ...original,
      matches: query === '(prefers-reduced-motion: reduce)',
    }));
    render(
      <MotionPreferences>
        <HeroExperience />
      </MotionPreferences>
    );
    act(() => jest.advanceTimersByTime(10400));
    expect(screen.getByRole('button', { name: '01 Capture' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    fireEvent.click(screen.getByRole('button', { name: '04 Connect' }));
    expect(screen.getByRole('button', { name: '04 Connect' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });
  it('provides direct access to all six featured builds with real screenshots and honest status', () => {
    render(<WorkShowcase />);
    expect(
      screen.getByRole('link', { name: 'Visit live app ↗' })
    ).toHaveAttribute('href', 'https://trevis.netlify.app/');
    expect(screen.getByRole('link', { name: '02 Munda' })).toHaveAttribute(
      'href',
      '#featured-munda'
    );
    expect(
      screen.getByRole('link', { name: 'Explore Munda ↗' })
    ).toHaveAttribute('href', 'https://munda-mvp.netlify.app');
    expect(screen.getAllByRole('article')).toHaveLength(6);
    expect(screen.getByText('PRELAUNCH')).toBeVisible();
    expect(
      screen.getByRole('link', { name: 'Skip projects ↓' })
    ).toHaveAttribute('href', '#after-work');
    expect(
      decodeURIComponent(
        screen
          .getByRole('img', { name: /Munda demo farm/ })
          .getAttribute('src')!
      )
    ).toContain('/images/work/munda.jpg');
  });
  it('provides both ProAir screenshots without navigating away', async () => {
    render(<ProjectMedia id="proair-zimbabwe" title="ProAir" />);
    await userEvent.click(
      screen.getByRole('button', { name: 'Show Contact experience' })
    );
    expect(
      decodeURIComponent(
        screen
          .getByRole('img', { name: /ProAir contact page/ })
          .getAttribute('src')!
      )
    ).toContain('/images/work/proair-contact.jpg');
    expect(
      screen.getByRole('button', { name: 'View ProAir screenshot' })
    ).toBeVisible();
  });
});
