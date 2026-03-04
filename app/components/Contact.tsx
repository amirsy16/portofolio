'use client';

import { useState } from 'react';
import { personalInfo } from '@/app/data/portfolio';
import SocialLinks from '@/app/components/ui/SocialLinks';
import { Send, Mail, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <section
      id="contact"
      className="min-h-screen flex items-center py-16 pb-32 md:pb-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950"
    >
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* Left: Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <p className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2 text-xs uppercase tracking-widest">
              <span className="w-6 h-0.5 bg-slate-400 rounded-full" />
              Let&apos;s Talk
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
              Get in Touch
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Interested in working together? Feel free to reach out for{' '}
              <span className="font-semibold text-slate-900 dark:text-white">work or freelance opportunities</span>.
            </p>
          </div>

          {/* Email */}
          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
              <Mail className="w-4 h-4" />
            </div>
            <span className="font-medium border-b border-slate-300 dark:border-slate-600 group-hover:border-slate-900 dark:group-hover:border-white transition-colors">
              {personalInfo.email}
            </span>
          </a>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-slate-200 dark:border-slate-800" />
            <span className="text-xs text-slate-400 dark:text-slate-500">or connect via</span>
            <div className="flex-1 border-t border-slate-200 dark:border-slate-800" />
          </div>

          <SocialLinks socials={personalInfo.socials} />
        </motion.div>

        {/* Right: Form */}
        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          onSubmit={handleSubmit}
          className="space-y-3"
        >
          <div className="space-y-1">
            <label htmlFor="name" className="block text-xs font-medium text-slate-700 dark:text-slate-300">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-sm rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-slate-400 dark:focus:border-slate-500 focus:outline-none transition-colors"
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block text-xs font-medium text-slate-700 dark:text-slate-300">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-sm rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-slate-400 dark:focus:border-slate-500 focus:outline-none transition-colors"
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="message" className="block text-xs font-medium text-slate-700 dark:text-slate-300">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-3 py-2 text-sm rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-slate-400 dark:focus:border-slate-500 focus:outline-none transition-colors resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full px-6 py-2.5 text-sm rounded-lg bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
              <><div className="w-4 h-4 border-2 border-white dark:border-slate-900 border-t-transparent rounded-full animate-spin" />Sending...</>
            ) : status === 'success' ? (
              <><CheckCircle2 className="w-4 h-4" />Message Sent!</>
            ) : status === 'error' ? (
              <><XCircle className="w-4 h-4" />Failed to Send</>
            ) : (
              <><Send className="w-4 h-4" />Send Message</>
            )}
          </button>

          <p className="text-[10px] text-center text-slate-400 dark:text-slate-500">
            Your information is safe and will never be shared
          </p>
        </motion.form>

      </div>
    </section>
  );
}
