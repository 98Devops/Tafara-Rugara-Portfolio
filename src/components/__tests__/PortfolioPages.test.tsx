import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Projects from '@/app/projects/page';
import Contact from '@/app/contact/page';
import { DownloadLinks } from '../DownloadLinks';
import { BookingSection } from '../BookingSection';
import { documents, site } from '@/data/site';
describe('Portfolio journeys', () => {
  it('filters real project groups and restores the complete collection', async () => {
    render(<Projects />);
    const all = screen.getAllByRole('article').length;
    expect(screen.getByRole('heading', { name: /Munda/ })).toBeVisible();
    await userEvent.click(screen.getByRole('button', { name: /Cloud & APIs/ }));
    expect(
      screen.queryByRole('heading', { name: /Munda/ })
    ).not.toBeInTheDocument();
    expect(screen.getAllByRole('article').length).toBeLessThan(all);
    await userEvent.click(screen.getByRole('button', { name: /All work/ }));
    expect(screen.getAllByRole('article')).toHaveLength(all);
  });
  it('uses the current PDF paths and actual download filenames', () => {
    render(<DownloadLinks />);
    for (const doc of Object.values(documents)) {
      const link = screen.getByRole('link', { name: new RegExp(doc.label) });
      expect(link).toHaveAttribute('href', doc.href);
      expect(link).toHaveAttribute('download', doc.filename);
    }
  });
  it('keeps direct booking available while loading the embed only on request', async () => {
    const scoped = jest.fn();
    const cal = Object.assign(jest.fn(), {
      ns: {} as Record<string, typeof scoped>,
    });
    cal.mockImplementation((action: string, namespace: string) => {
      cal.ns[namespace] = scoped;
    });
    window.Cal = cal;
    render(<BookingSection />);
    expect(cal).not.toHaveBeenCalled();
    expect(
      screen.getByRole('link', { name: /Book directly on Cal/ })
    ).toHaveAttribute('href', site.bookingUrl);
    await userEvent.click(
      screen.getByRole('button', { name: /Show available times/ })
    );
    expect(cal).toHaveBeenCalledTimes(1);
    expect(scoped).toHaveBeenCalledWith(
      'inline',
      expect.objectContaining({ calLink: site.bookingPath })
    );
    expect(screen.getByRole('status')).toHaveTextContent(
      'Loading available times'
    );
    delete window.Cal;
  });
  it('offers contact, download and booking journeys together', () => {
    render(<Contact />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Good systems start'
    );
    expect(
      within(screen.getByRole('form', { name: 'Contact form' })).getByRole(
        'button',
        { name: /Prepare message/ }
      )
    ).toBeVisible();
    expect(
      screen.getByRole('link', { name: /Download reference/ })
    ).toHaveAttribute('download', documents.reference.filename);
    expect(
      screen.getByRole('link', { name: /Book a discovery call/ })
    ).toHaveAttribute('href', '#book');
  });
});
