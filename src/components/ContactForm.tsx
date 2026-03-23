'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ContactFormData } from '@/types';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}
interface ContactFormProps { onSubmit?: (data: ContactFormData) => Promise<void>; }

const inputBase = `w-full px-4 py-3 rounded-xl text-white text-sm font-medium transition-all duration-200 outline-none`;
const inputStyle = {
  background: 'rgba(15,22,41,0.8)',
  border: '1px solid rgba(0,212,255,0.15)',
  color: '#e2e8f0',
};
const inputFocusStyle = {
  border: '1px solid rgba(0,212,255,0.5)',
  boxShadow: '0 0 0 3px rgba(0,212,255,0.08)',
};

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', message: '' });
  const [errors, setErrors]         = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle'|'success'|'error'>('idle');
  const [focused, setFocused]           = useState<string | null>(null);

  const validate = (data: ContactFormData): FormErrors => {
    const e: FormErrors = {};
    if (!data.name.trim())    e.name = 'Name is required';
    if (!data.email.trim())   e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Enter a valid email';
    if (!data.message.trim()) e.message = 'Message is required';
    else if (data.message.trim().length < 10) e.message = 'At least 10 characters required';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(formData);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setIsSubmitting(true); setSubmitStatus('idle');
    try {
      // Build WhatsApp message and open in new tab — zero server dependency
      const msg = encodeURIComponent(
        `Hi Tafara! 👋\n\n*From:* ${formData.name}\n*Email:* ${formData.email}\n\n${formData.message}`
      );
      const url = `https://wa.me/263777553271?text=${msg}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch { setSubmitStatus('error'); }
    finally { setIsSubmitting(false); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const fieldStyle = (field: string, hasError: boolean) => ({
    ...inputStyle,
    border: hasError
      ? '1px solid rgba(239,68,68,0.6)'
      : focused === field
        ? inputFocusStyle.border
        : inputStyle.border,
    boxShadow: hasError
      ? '0 0 0 3px rgba(239,68,68,0.08)'
      : focused === field
        ? inputFocusStyle.boxShadow
        : 'none',
  });

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-5"
      data-netlify="true"
      name="contact"
      method="POST"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <input type="hidden" name="form-name" value="contact" />

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'rgba(0,212,255,0.7)' }}>
          Full Name *
        </label>
        <input
          id="name" name="name" type="text"
          value={formData.name} onChange={handleChange} required
          disabled={isSubmitting}
          placeholder="Your full name"
          className={inputBase}
          style={fieldStyle('name', !!errors.name)}
          onFocus={() => setFocused('name')}
          onBlur={() => setFocused(null)}
        />
        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'rgba(0,212,255,0.7)' }}>
          Email Address *
        </label>
        <input
          id="email" name="email" type="email"
          value={formData.email} onChange={handleChange} required
          disabled={isSubmitting}
          placeholder="your.email@example.com"
          className={inputBase}
          style={fieldStyle('email', !!errors.email)}
          onFocus={() => setFocused('email')}
          onBlur={() => setFocused(null)}
        />
        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'rgba(0,212,255,0.7)' }}>
          Message *
        </label>
        <textarea
          id="message" name="message" rows={6}
          value={formData.message} onChange={handleChange} required
          disabled={isSubmitting}
          placeholder="Tell me about your Cloud & DevOps project or opportunity..."
          className={`${inputBase} resize-vertical`}
          style={fieldStyle('message', !!errors.message)}
          onFocus={() => setFocused('message')}
          onBlur={() => setFocused(null)}
        />
        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 px-6 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200 relative overflow-hidden"
        style={isSubmitting
          ? { background: 'rgba(15,22,41,0.5)', color: '#64748b', cursor: 'not-allowed', border: '1px solid rgba(0,212,255,0.10)' }
          : { background: 'linear-gradient(135deg, #00D4FF, #0090b0)', color: '#000a10', boxShadow: '0 4px 20px rgba(0,212,255,0.30)' }
        }
        whileHover={!isSubmitting ? { scale: 1.01, boxShadow: '0 6px 30px rgba(0,212,255,0.50)' } : {}}
        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
      >
        {!isSubmitting && (
          <div
            className="absolute inset-0 shimmer opacity-50"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)', backgroundSize: '200% 100%' }}
          />
        )}
        <span className="relative z-10">
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Opening WhatsApp...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Send via WhatsApp
            </span>
          )}
        </span>
      </motion.button>

      {/* Status messages */}
      {submitStatus === 'success' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl text-center text-sm font-medium"
          style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.35)', color: '#34d399' }}
        >
          ✓ Message sent! I'll get back to you soon.
        </motion.div>
      )}
      {submitStatus === 'error' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl text-center text-sm"
          style={{ background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.35)', color: '#f87171' }}
        >
          Something went wrong. Please try again or email me directly.
        </motion.div>
      )}
    </motion.form>
  );
}