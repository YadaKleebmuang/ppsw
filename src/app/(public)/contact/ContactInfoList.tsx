'use client';

import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { toast } from 'sonner';
import { copyTextToClipboard } from '@/components/ui/social-links';

type ContactInfoListProps = {
  location: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  githubUrl: string;
};

export function ContactInfoList({ location, email, phone, linkedinUrl, githubUrl }: ContactInfoListProps) {
  const [copied, setCopied] = useState(false);
  const displayUrl = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

  const copyEmail = async () => {
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

  const items = [
    { icon: MapPin, label: 'Location', value: location },
    { icon: Mail, label: 'Email', value: email, onClick: copyEmail, hint: copied ? 'Copied' : 'Click to copy' },
    { icon: Phone, label: 'Phone', value: phone },
    { icon: FaLinkedin, label: 'LinkedIn', value: displayUrl(linkedinUrl), href: linkedinUrl },
    { icon: FaGithub, label: 'GitHub', value: displayUrl(githubUrl), href: githubUrl },
  ];

  return (
    <div className="mt-8 space-y-5 border-l-2 border-[#8dbbff] pl-7">
      {items.map((item) => {
        const Icon = item.icon;
        const content = (
          <>
            <span className="glass-button grid size-14 shrink-0 place-items-center rounded-full text-[#0063ff]">
              <Icon className="size-7" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium text-[#46629a]">{item.label}</p>
                {item.hint && <span className="text-xs font-bold text-[#0063ff]">{item.hint}</span>}
              </div>
              <p className="truncate font-bold text-[#08245c]">{item.value}</p>
            </div>
          </>
        );

        const className = 'flex w-full items-center gap-5 border-b border-white/35 pb-4 text-left transition last:border-b-0 hover:translate-x-1';

        if (item.href) {
          return (
            <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className={className}>
              {content}
            </a>
          );
        }

        if (item.onClick) {
          return (
            <button key={item.label} type="button" onClick={item.onClick} className={className}>
              {content}
            </button>
          );
        }

        return (
          <div key={item.label} className={className}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
