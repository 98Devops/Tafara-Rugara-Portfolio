'use client';
import { useState } from 'react';
import { site } from '@/data/site';
import type { ContactFormData } from '@/types';

type FormErrors = Partial<Record<keyof ContactFormData, string>>;
export default function ContactForm({
  onSubmit,
}: {
  onSubmit?: (data: ContactFormData) => Promise<void>;
}) {
  const [data, setData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [draft, setDraft] = useState<ContactFormData | null>(null);
  const [busy, setBusy] = useState(false);
  const [failure, setFailure] = useState(false);
  function change(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setData(previous => ({ ...previous, [name]: value }));
    setErrors(previous => ({ ...previous, [name]: undefined }));
    setDraft(null);
    setFailure(false);
  }
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const next: FormErrors = {};
    if (!data.name.trim()) next.name = 'Name is required';
    if (!data.email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      next.email = 'Enter a valid email';
    if (!data.message.trim()) next.message = 'Message is required';
    else if (data.message.trim().length < 10)
      next.message = 'At least 10 characters required';
    setErrors(next);
    if (Object.keys(next).length) return;
    setBusy(true);
    setFailure(false);
    try {
      const clean = {
        name: data.name.trim(),
        email: data.email.trim(),
        message: data.message.trim(),
      };
      await onSubmit?.(clean);
      setDraft(clean);
    } catch {
      setFailure(true);
    } finally {
      setBusy(false);
    }
  }
  const text = draft
    ? 'Hi Tafara,\n\nFrom: ' +
      draft.name +
      '\nEmail: ' +
      draft.email +
      '\n\n' +
      draft.message
    : '';
  return (
    <form
      name="contact"
      aria-label="Contact form"
      className="message-form"
      noValidate
      onSubmit={submit}
    >
      <div className="form-intro">
        <span className="cinema-eyebrow">01 / TELL ME ABOUT IT</span>
        <h2>Start with the problem.</h2>
        <p>
          A role, a project or a process that needs fixing. A little context
          goes a long way.
        </p>
      </div>
      <div className="form-row">
        {(['name', 'email'] as const).map(field => (
          <div key={field}>
            <label htmlFor={'contact-' + field}>
              {field === 'name' ? 'Full name' : 'Email address'} <span>*</span>
            </label>
            <input
              id={'contact-' + field}
              name={field}
              type={field === 'email' ? 'email' : 'text'}
              autoComplete={field}
              value={data[field]}
              onChange={change}
              required
              maxLength={field === 'name' ? 120 : 254}
              aria-invalid={!!errors[field]}
              aria-describedby={errors[field] ? field + '-error' : undefined}
              placeholder={field === 'name' ? 'Your name' : 'you@company.com'}
              disabled={busy}
            />
            {errors[field] && (
              <p role="alert" id={field + '-error'} className="field-error">
                {errors[field]}
              </p>
            )}
          </div>
        ))}
      </div>
      <div>
        <label htmlFor="contact-message">
          What would you like to build? <span>*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={data.message}
          onChange={change}
          required
          rows={6}
          minLength={10}
          maxLength={4000}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          placeholder="What is happening today, and what would you like to work better?"
          disabled={busy}
        />
        {errors.message && (
          <p role="alert" id="message-error" className="field-error">
            {errors.message}
          </p>
        )}
      </div>
      <button type="submit" className="btn-solid" disabled={busy}>
        {busy ? 'Preparing…' : 'Prepare message'}{' '}
        <span aria-hidden="true">→</span>
      </button>
      <p className="form-help">
        You’ll review and send your message in WhatsApp or your email app.
      </p>
      {draft && (
        <div className="message-ready" role="status">
          <strong>Your draft is ready.</strong>
          <p>
            Choose where to open it, then review and send. Nothing has been sent
            yet.
          </p>
          <div>
            <a
              href={site.whatsapp + '?text=' + encodeURIComponent(text)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open WhatsApp ↗
            </a>
            <a
              href={
                'mailto:' +
                site.email +
                '?subject=' +
                encodeURIComponent('Portfolio enquiry from ' + draft.name) +
                '&body=' +
                encodeURIComponent(text)
              }
            >
              Open email draft ↗
            </a>
          </div>
        </div>
      )}
      {failure && (
        <p role="alert" className="field-error">
          Couldn’t prepare the draft. Your text is still here. You can also use
          the direct email link.
        </p>
      )}
    </form>
  );
}
