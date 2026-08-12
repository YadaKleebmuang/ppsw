'use client';

import { FormEvent, useState } from 'react';
import { ArrowRight, FileText, Mail, Send, UserRound } from 'lucide-react';
import { toast } from 'sonner';
import { messageRepository } from '@/repositories/message.repository';

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export function ContactMessageForm() {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      toast.error('Please fill out every field.');
      return;
    }

    setIsSubmitting(true);

    try {
      await messageRepository.createMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });
      setForm(initialForm);
      toast.success('Message sent successfully.');
    } catch (error) {
      console.error(error);
      toast.error('Could not send your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel rounded-[1.5rem] p-8">
      <h2 className="text-2xl font-bold text-[#08245c]">Send Me a Message</h2>
      <p className="mt-3 text-[#46629a]">Fill out the form below and I&apos;ll get back to you as soon as possible.</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <label className="glass-button flex min-h-14 items-center gap-4 rounded-xl px-5 text-[#46629a]">
          <UserRound className="size-5 text-[#2c66c4]" />
          <input
            name="name"
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            className="w-full bg-transparent text-[#08245c] outline-none placeholder:text-[#46629a]"
            placeholder="Your Name"
          />
        </label>
        <label className="glass-button flex min-h-14 items-center gap-4 rounded-xl px-5 text-[#46629a]">
          <Mail className="size-5 text-[#2c66c4]" />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            className="w-full bg-transparent text-[#08245c] outline-none placeholder:text-[#46629a]"
            placeholder="Your Email"
          />
        </label>
        <label className="glass-button flex min-h-14 items-center gap-4 rounded-xl px-5 text-[#46629a] md:col-span-2">
          <FileText className="size-5 text-[#2c66c4]" />
          <input
            name="subject"
            value={form.subject}
            onChange={(event) => updateField('subject', event.target.value)}
            className="w-full bg-transparent text-[#08245c] outline-none placeholder:text-[#46629a]"
            placeholder="Subject"
          />
        </label>
        <label className="glass-button flex min-h-32 items-start gap-4 rounded-xl px-5 py-5 text-[#46629a] md:col-span-2">
          <Send className="mt-1 size-5 text-[#2c66c4]" />
          <textarea
            name="message"
            value={form.message}
            onChange={(event) => updateField('message', event.target.value)}
            className="min-h-24 w-full resize-none bg-transparent text-[#08245c] outline-none placeholder:text-[#46629a]"
            placeholder="Your Message"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="blue-button mt-5 inline-flex min-h-14 items-center gap-4 rounded-full px-9 text-base font-bold disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
        <ArrowRight className="size-5" />
      </button>
    </form>
  );
}
