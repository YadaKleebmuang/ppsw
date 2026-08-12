import Link from 'next/link';
import { LockKeyhole, MoreHorizontal } from 'lucide-react';
import { SiNextdotjs, SiReact, SiTailwindcss, SiTypescript } from 'react-icons/si';
import { profileRepository } from '@/repositories/profile.repository';
import { SocialLinks } from '@/components/ui/social-links';

const fallbackProfile = {
  email: 'ppsw.dev@gmail.com',
  githubUrl: 'https://github.com/ppsw-dev',
  linkedinUrl: 'https://linkedin.com/in/pannaporn-suwannaporn',
  footerDescription: 'Building modern, responsive websites with a focus on clean design and great user experience.',
};

export async function PublicFooter() {
  const profileData = await profileRepository.getProfile();
  const profile = { ...fallbackProfile, ...profileData };

  return (
    <footer className="relative z-10 px-4 pb-6 pt-3">
      <div className="glass-panel mx-auto grid w-full max-w-[102rem] gap-8 rounded-[1.5rem] p-8 md:grid-cols-[1.2fr_1fr_1fr_1fr] md:p-10">
        <div>
          <Link href="/" className="mb-5 flex items-center gap-3 text-[#0063ff]">
            <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-[#3a86ff] to-[#0052e8] text-xl font-bold text-white shadow-lg">
              P
            </span>
            <span className="text-2xl font-bold">PPSW.</span>
          </Link>
          <p className="max-w-72 text-sm leading-7 text-[#46629a]">{profile.footerDescription}</p>
          <p className="mt-8 text-sm text-[#5c76a8]">© 2024 PPSW. All rights reserved.</p>
        </div>

        <div className="border-white/45 md:border-l md:pl-12">
          <h3 className="mb-5 font-bold text-[#08245c]">Quick Links</h3>
          <div className="grid grid-cols-2 gap-3 text-sm text-[#284b8e]">
            <Link href="/">Home</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/about">About</Link>
            <Link href="/skills">Skills</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/admin/login" className="inline-flex items-center gap-1 font-bold text-[#0063ff]">
              <LockKeyhole className="size-3.5" />
              Admin
            </Link>
          </div>
        </div>

        <div className="border-white/45 md:border-l md:pl-12">
          <h3 className="mb-5 font-bold text-[#08245c]">Technologies</h3>
          <div className="flex flex-wrap gap-3">
            {[SiNextdotjs, SiTypescript, SiTailwindcss, SiReact, MoreHorizontal].map((Icon, index) => (
              <span key={index} className="glass-button grid size-12 place-items-center rounded-full text-[#0063ff]">
                <Icon className="size-6" />
              </span>
            ))}
          </div>
        </div>

        <div className="border-white/45 md:border-l md:pl-12">
          <h3 className="mb-5 font-bold text-[#08245c]">Let&apos;s Connect</h3>
          <SocialLinks linkedinUrl={profile.linkedinUrl} githubUrl={profile.githubUrl} email={profile.email} />
        </div>
      </div>
    </footer>
  );
}
