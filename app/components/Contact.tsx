'use client';

import { useState } from 'react';
import { personalInfo } from '@/app/data/portfolio';
import SocialLinks from '@/app/components/ui/SocialLinks';
import { Send, Mail, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { VIEWPORT_ONCE } from '@/lib/motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Using Web3Forms API to send email
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'YOUR_WEB3FORMS_ACCESS_KEY',
          subject: `Portfolio Contact from ${formData.name}`,
          from_name: formData.name,
          email: formData.email,
          message: formData.message,
          to_email: personalInfo.email,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setTimeout(() => {
          setFormData({ name: '', email: '', message: '' });
          setStatus('idle');
        }, 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="px-4 py-16 pb-32 sm:px-6 sm:py-20 md:pb-20 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-10 md:grid-cols-2 lg:gap-14">
        {/* Left: ledger info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="space-y-3">
            <p className="font-ledger text-[11px] uppercase tracking-[0.3em] text-[var(--emerald)]">04 · Contact — open ledger</p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
              File your request. I reply like ops: fast and clear.
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-[var(--muted-ink)]">
              Available for <span className="font-semibold text-[var(--ink)]">full-time roles and freelance builds</span> —
              especially finance, inventory, and internal tools.
            </p>
          </div>

          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3 pr-5 hover:border-[var(--emerald)]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--emerald)]/10 text-[var(--emerald)]">
              <Mail className="h-4 w-4" />
            </span>
            <span>
              <span className="font-ledger block text-[10px] uppercase tracking-[0.25em] text-[var(--muted-ink)]">Direct line</span>
              <span className="block text-sm font-semibold text-[var(--ink)]">{personalInfo.email}</span>
            </span>
          </a>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-[var(--line)]" />
            <span className="font-ledger text-[10px] uppercase tracking-[0.25em] text-[var(--muted-ink)]">or connect via</span>
            <div className="h-px flex-1 bg-[var(--line)]" />
          </div>

          <SocialLinks socials={personalInfo.socials} />
        </motion.div>

        {/* Right: ledger form */}
        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.6, delay: 0.12 }}
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-6"
        >
          <div className="flex items-center justify-between">
            <p className="font-ledger text-[11px] uppercase tracking-[0.25em] text-[var(--muted-ink)]">New entry</p>
            <span className="font-ledger rounded-full bg-[var(--gold)]/20 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--ink)]">{status}</span>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="name" className="font-ledger block text-[11px] uppercase tracking-[0.2em] text-[var(--muted-ink)]">
              01 · Your name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3.5 py-2.5 text-sm text-[var(--ink)] placeholder:text-[var(--muted-ink)]/70 focus:border-[var(--emerald)] focus:outline-none"
              placeholder="Jane Ops"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="font-ledger block text-[11px] uppercase tracking-[0.2em] text-[var(--muted-ink)]">
              02 · Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3.5 py-2.5 text-sm text-[var(--ink)] placeholder:text-[var(--muted-ink)]/70 focus:border-[var(--emerald)] focus:outline-none"
              placeholder="jane@company.com"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="message" className="font-ledger block text-[11px] uppercase tracking-[0.2em] text-[var(--muted-ink)]">
              03 · Scope & timeline
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full resize-none rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3.5 py-2.5 text-sm text-[var(--ink)] placeholder:text-[var(--muted-ink)]/70 focus:border-[var(--emerald)] focus:outline-none"
              placeholder="What should keep working on day one?"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--emerald)] px-6 py-3 text-sm font-semibold text-[var(--paper)] hover:bg-[var(--emerald-deep)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === 'loading' ? (
              <><div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--paper)] border-t-transparent" />Filing...</>
            ) : status === 'success' ? (
              <><CheckCircle2 className="h-4 w-4" />Entry received</>
            ) : status === 'error' ? (
              <><XCircle className="h-4 w-4" />Retry entry</>
            ) : (
              <><Send className="h-4 w-4" />File entry</>
            )}
          </button>

          <p className="font-ledger text-center text-[10px] uppercase tracking-[0.2em] text-[var(--muted-ink)]">
            Sealed · never shared
          </p>
        </motion.form>

      </div>
    </section>
  );
}
