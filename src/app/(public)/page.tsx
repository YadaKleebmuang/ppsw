import Link from 'next/link';
import { ArrowRight, Mail, MapPin, MessageCircle } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { profileRepository } from '@/repositories/profile.repository';
import { projectRepository } from '@/repositories/project.repository';
import { techStackRepository } from '@/repositories/tech-stack.repository';

export const revalidate = 60;

const fallbackProfile = {
  fullName: 'Pannaporn Suwannaporn',
  headline: 'Frontend Developer & UI/UX Designer',
  bio: 'I design and build modern, responsive websites with a focus on clean user experience and beautiful interfaces.',
  email: 'ppsw.dev@gmail.com',
  location: 'Bangkok, Thailand',
  clientSatisfaction: '100%',
  githubUrl: 'https://github.com/ppsw-dev',
  linkedinUrl: 'https://linkedin.com/in/pannaporn-suwannaporn',
  profileImageUrl: '',
};

export default async function HomePage() {
  const [profileData, projects, techStacks] = await Promise.all([
    profileRepository.getProfile(),
    projectRepository.getPublishedProjects(),
    techStackRepository.getAllSorted(),
  ]);

  const profile = { ...fallbackProfile, ...profileData };
  const activeTechStacks = techStacks.filter((tech) => tech.isActive);

  return (
    <div className="ppsw-page pb-6 pt-10">
      <span className="bubble left-[42%] top-24 size-16 hidden md:block" />
      <span className="bubble right-10 top-32 size-20 hidden md:block" />
      <span className="bubble bottom-72 left-[41%] size-20 hidden lg:block" />

      <section className="grid min-h-[calc(100vh-13rem)] items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="max-w-3xl">
          <div className="glass-button mb-9 inline-flex items-center gap-2 rounded-full px-7 py-3 text-base font-bold text-[#0063ff]">
            <span>Hi, I&apos;m</span>
          </div>

          <h1 className="text-[clamp(3.2rem,5.7vw,6.1rem)] font-bold leading-[1.02] tracking-normal text-[#08245c]">
            {profile.fullName.split(' ').slice(0, 1).join(' ')}
            <span className="block bg-gradient-to-r from-[#1b63d8] to-[#006bff] bg-clip-text text-transparent">
              {profile.fullName.split(' ').slice(1).join(' ') || 'Suwannaporn'}
            </span>
          </h1>

          <p className="mt-7 text-[clamp(1.35rem,1.8vw,1.8rem)] font-medium leading-relaxed text-[#526da6]">{profile.headline}</p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#395a98]">{profile.bio}</p>

          <div className="mt-10 flex flex-wrap gap-5">
            <Link href="/projects" className="blue-button inline-flex min-h-16 items-center gap-4 rounded-full px-10 text-lg font-bold">
              View My Work
              <ArrowRight className="size-6" />
            </Link>
            <Link href="/contact" className="glass-button inline-flex min-h-16 items-center gap-4 rounded-full px-10 text-lg font-bold text-[#005eff]">
              Let&apos;s Talk
              <MessageCircle className="size-6" />
            </Link>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-[50rem] flex-col items-center justify-center pb-4 lg:items-start lg:pb-0 lg:pl-4 lg:pr-28">
          <div className="glass-panel relative z-10 aspect-square w-[min(78vw,35rem)] overflow-hidden rounded-full p-7">
            <div className="absolute inset-7 rounded-full border border-white/80" />
            {profile.profileImageUrl ? (
              <img src={profile.profileImageUrl} alt={profile.fullName} className="relative z-10 h-full w-full rounded-full object-cover" />
            ) : (
              <div className="relative z-10 grid h-full w-full place-items-center rounded-full bg-gradient-to-br from-white/80 to-[#9bc5ff]/50 text-center text-7xl font-bold text-[#0063ff]">
                PPSW
              </div>
            )}
          </div>

          <div className="glass-panel relative z-20 -mt-8 w-full max-w-sm rounded-[1.5rem] p-6 sm:w-96 lg:absolute lg:bottom-14 lg:right-0 lg:mt-0">
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <span className="glass-button grid size-12 place-items-center rounded-full text-[#0063ff]"><MapPin className="size-5" /></span>
                <div><p className="text-sm text-[#6a80ad]">Location</p><p className="font-bold">{profile.location}</p></div>
              </div>
              <div className="flex items-center gap-4">
                <span className="glass-button grid size-12 place-items-center rounded-full text-[#0063ff]"><Mail className="size-5" /></span>
                <div className="min-w-0"><p className="text-sm text-[#6a80ad]">Email</p><p className="break-all font-bold">{profile.email}</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="glass-panel mb-6 grid rounded-[1.5rem] p-7 text-center sm:grid-cols-3">
        {[
          [`${Math.max(projects.length, 4)}`, 'Projects Completed'],
          [`${Math.max(activeTechStacks.length, 10)}+`, 'Technologies'],
          [profile.clientSatisfaction, 'Learning Progress'],
        ].map(([value, label], index) => (
          <div key={label} className={index ? 'border-white/55 py-3 lg:border-l' : 'py-3'}>
            <p className="text-4xl font-bold text-[#0063ff]">{value}</p>
            <p className="mt-3 text-base text-[#4b679e]">{label}</p>
          </div>
        ))}
      </section>

      <div className="mb-6 flex justify-center gap-4">
        <a href={profile.linkedinUrl} className="glass-button grid size-11 place-items-center rounded-full text-[#0a66c2]"><FaLinkedin className="size-5" /></a>
        <a href={profile.githubUrl} className="glass-button grid size-11 place-items-center rounded-full text-[#0a2b66]"><FaGithub className="size-5" /></a>
        <a href={`mailto:${profile.email}`} className="glass-button grid size-11 place-items-center rounded-full text-[#0063ff]"><Mail className="size-5" /></a>
      </div>
    </div>
  );
}
