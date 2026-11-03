import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '../ContactForm';
import { site } from '@/data/site';
async function fill() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText(/Full name/), 'Test Visitor');
  await user.type(
    screen.getByLabelText(/Email address/),
    'visitor@example.com'
  );
  await user.type(
    screen.getByLabelText(/What would you/),
    'I need help with an automation & API integration.'
  );
  return user;
}
describe('Contact draft handoff', () => {
  it('validates required inputs without claiming to send', async () => {
    render(<ContactForm />);
    await userEvent.click(
      screen.getByRole('button', { name: /Prepare message/ })
    );
    expect(screen.getAllByRole('alert')).toHaveLength(3);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
  it('prepares encoded email and WhatsApp drafts, preserving the entered text', async () => {
    render(<ContactForm />);
    const user = await fill();
    await user.click(screen.getByRole('button', { name: /Prepare message/ }));
    expect(screen.getByRole('status')).toHaveTextContent(
      'Nothing has been sent yet'
    );
    const whatsapp = new URL(
      screen.getByRole('link', { name: /Open WhatsApp/ }).getAttribute('href')!
    );
    expect(whatsapp.origin + whatsapp.pathname).toBe(site.whatsapp);
    expect(whatsapp.searchParams.get('text')).toContain(
      'automation & API integration'
    );
    const email = screen.getByRole('link', { name: /Open email draft/ });
    expect(email.getAttribute('href')).toContain('mailto:' + site.email);
    expect(decodeURIComponent(email.getAttribute('href')!)).toContain(
      'visitor@example.com'
    );
    expect(screen.getByLabelText(/Full name/)).toHaveValue('Test Visitor');
    await user.type(screen.getByLabelText(/Full name/), ' changed');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
  it('retains the message if preparation fails', async () => {
    render(
      <ContactForm
        onSubmit={async () => {
          throw Error('failed');
        }}
      />
    );
    const user = await fill();
    await user.click(screen.getByRole('button', { name: /Prepare message/ }));
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Your text is still here'
    );
    expect(screen.getByLabelText(/What would you/)).toHaveValue(
      'I need help with an automation & API integration.'
    );
  });
});
