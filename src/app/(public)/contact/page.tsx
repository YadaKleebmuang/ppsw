import { Metadata } from 'next';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { profileRepository } from '@/repositories/profile.repository';
import { ContactMessageForm } from './ContactMessageForm';

export const metadata: Metadata = {
  title: 'Contact | PPSW',
  description: 'Contact PPSW',
};

export const revalidate = 60;

const fallbackProfile = {
  email: 'ppsw.dev@gmail.com',
  phone: '+66 98 765 4321',
  location: 'Bangkok, Thailand',
  githubUrl: 'https://github.com/ppsw-dev',
  linkedinUrl: 'https://linkedin.com/in/pannaporn-suwannaporn',
};

export default async function ContactPage() {
  const profileData = await profileRepository.getProfile();
  const profile = { ...fallbackProfile, ...profileData };
  const displayUrl = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <div className="ppsw-page pb-10 pt-10">
      <span className="bubble left-[62%] top-32 size-14 hidden md:block" />
      <span className="bubble right-16 top-[24rem] size-24 hidden lg:block" />

      <section className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="glass-button mb-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-[#0063ff]">
            <Send className="size-4" />
            Let&apos;s Connect
          </div>
          <h1 className="text-[clamp(3.2rem,5.4vw,5.4rem)] font-bold leading-[1.05] text-[#08245c]">
            Let&apos;s Work
            <span className="block text-[#0063ff]">Together</span>
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-8 text-[#46629a]">
            I&apos;m always open to discussing new opportunities, exciting projects, or just having a friendly chat.
          </p>
        </div>

        <div className="relative hidden min-h-72 lg:block">
          <span className="absolute right-24 top-10 h-36 w-64 rounded-full bg-[#5d96ff]/20 blur-3xl" />
          <img
            src="/images/projects/PLMP/Character-2-transparent-fixed.png"
            alt="Contact illustration"
            width={1145}
            height={1373}
            className="absolute right-10 top-[-3.5rem] h-[25rem] w-auto object-contain drop-shadow-[0_24px_34px_rgba(31,91,180,0.22)]"
          />
          <div className="blue-button absolute right-20 top-32 grid size-20 place-items-center rounded-full">
            <Send className="size-12" />
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-[0.72fr_1.4fr]">
        <div className="glass-panel rounded-[1.5rem] p-8">
          <h2 className="text-2xl font-bold text-[#08245c]">Contact Information</h2>
          <div className="mt-8 space-y-5 border-l-2 border-[#8dbbff] pl-7">
            {[
              [MapPin, 'Location', profile.location],
              [Mail, 'Email', profile.email],
              [Phone, 'Phone', profile.phone],
              [FaLinkedin, 'LinkedIn', displayUrl(profile.linkedinUrl)],
              [FaGithub, 'GitHub', displayUrl(profile.githubUrl)],
            ].map(([Icon, label, value]) => (
              <div key={String(label)} className="flex items-center gap-5 border-b border-white/35 pb-4 last:border-b-0">
                <span className="glass-button grid size-14 shrink-0 place-items-center rounded-full text-[#0063ff]">
                  <Icon className="size-7" />
                </span>
                <div className="min-w-0">
                  <p className="font-medium text-[#46629a]">{String(label)}</p>
                  <p className="truncate font-bold text-[#08245c]">{String(value)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ContactMessageForm />
      </section>
    </div>
  );
}
