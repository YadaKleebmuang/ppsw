'use client';

import { useState } from 'react';
import { Check, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type SocialLinksProps = {
  linkedinUrl?: string;
  githubUrl?: string;
  email?: string;
  className?: string;
  iconClassName?: string;
};

export function copyTextToClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(value);
  }

  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  return Promise.resolve();
}

export function SocialLinks({ linkedinUrl, githubUrl, email, className, iconClassName }: SocialLinksProps) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    if (!email) return;

    try {
      await copyTextToClipboard(email);
      setCopied(true);
      toast.success('Copied email to clipboard.');
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error(error);
      toast.error('Could not copy email.');
    }
  };

  return (
    <div className={cn('flex gap-3', className)}>
      {linkedinUrl && (
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noreferrer"
          className={cn('glass-button grid size-12 place-items-center rounded-full text-[#0a66c2] transition hover:-translate-y-0.5', iconClassName)}
          aria-label="Open LinkedIn profile"
          title="LinkedIn"
        >
          <FaLinkedin className="size-6" />
        </a>
      )}
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          className={cn('glass-button grid size-12 place-items-center rounded-full text-[#0a2b66] transition hover:-translate-y-0.5', iconClassName)}
          aria-label="Open GitHub profile"
          title="GitHub"
        >
          <FaGithub className="size-6" />
        </a>
      )}
      {email && (
        <button
          type="button"
          onClick={copyEmail}
          className={cn('glass-button grid size-12 place-items-center rounded-full text-[#0063ff] transition hover:-translate-y-0.5', iconClassName)}
          aria-label="Copy email address"
          title={copied ? 'Email copied' : 'Copy email'}
        >
          {copied ? <Check className="size-6 text-emerald-600" /> : <Mail className="size-6" />}
        </button>
      )}
    </div>
  );
}
