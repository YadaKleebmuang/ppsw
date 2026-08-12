import { Metadata } from 'next';
import { CalendarDays, GraduationCap, Mail, MapPin, Quote, UserRound } from 'lucide-react';
import { profileRepository } from '@/repositories/profile.repository';
import { educationRepository } from '@/repositories/education.repository';

export const metadata: Metadata = {
  title: 'About | PPSW',
  description: 'About Pannaporn Suwannaporn',
};

export const revalidate = 60;

const fallbackProfile = {
  fullName: 'Pannaporn Suwannaporn',
  about: 'I am a frontend developer and UI/UX designer who loves turning ideas into clean, modern, and user-friendly web experiences.',
  email: 'ppsw.dev@gmail.com',
  location: 'Bangkok, Thailand',
  birthday: '10 May 2003',
  profileImageUrl: '',
};

const storyImageUrl = '/images/projects/PLMP/Character-1-transparent-with-bubble.png';

export default async function AboutPage() {
  const [profileData, educations] = await Promise.all([
    profileRepository.getProfile(),
    educationRepository.getVisibleEducations(),
  ]);

  const profile = { ...fallbackProfile, ...profileData };

  return (
    <div className="ppsw-page pb-10 pt-10">
      <span className="bubble right-12 top-24 size-16 hidden md:block" />
      <span className="bubble right-24 top-[28rem] size-12 hidden lg:block" />

      <section className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
        <div>
          <div className="glass-button mb-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-[#0063ff]">
            <UserRound className="size-4" />
            Get to know me
          </div>
          <h1 className="text-[clamp(3.2rem,4.7vw,5rem)] font-bold leading-tight text-[#08245c]">About Me</h1>
          <p className="mt-4 max-w-2xl text-2xl font-medium leading-10 text-[#0063ff]">
            Passionate about creating digital experiences that make a difference.
          </p>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#46629a]">{profile.about}</p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              [CalendarDays, 'Birthday', profile.birthday],
              [MapPin, 'Location', profile.location],
              [Mail, 'Email', profile.email],
            ].map(([Icon, label, value]) => (
              <div key={String(label)} className="glass-panel flex items-center gap-4 rounded-2xl p-5">
                <span className="glass-button grid size-11 place-items-center rounded-full text-[#0063ff]">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-[#6a80ad]">{String(label)}</p>
                  <p className="truncate text-sm font-bold text-[#08245c]">{String(value)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-[min(78vw,35rem)]">
          <div className="glass-panel absolute inset-0 overflow-hidden rounded-full p-7">
            <div className="absolute inset-5 rounded-full border border-white/80" />
            {profile.profileImageUrl ? (
              <img src={profile.profileImageUrl} alt={profile.fullName} className="relative z-10 h-full w-full rounded-full object-cover" />
            ) : (
              <div className="relative z-10 grid h-full w-full place-items-center rounded-full bg-white/35 text-6xl font-bold text-[#0063ff]">
                PPSW
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="glass-panel mt-8 grid items-center gap-10 rounded-[1.5rem] p-8 md:grid-cols-[0.42fr_1fr] md:p-12">
        <div className="relative mx-auto flex min-h-44 items-center justify-center">
          <span className="absolute inset-x-3 bottom-4 h-10 rounded-full bg-[#5d96ff]/20 blur-2xl" />
          <img
            src={storyImageUrl}
            alt="Story illustration"
            width={1402}
            height={1122}
            className="relative z-10 h-auto w-[min(78vw,22rem)] object-contain drop-shadow-[0_22px_30px_rgba(31,91,180,0.22)] md:w-[24rem]"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-[#08245c]">My Story</h2>
          <div className="mt-3 h-1 w-10 rounded-full bg-[#0063ff]" />
          <p className="mt-7 text-lg leading-8 text-[#46629a]">
            My journey in tech started from curiosity about how websites work and grew into a passion for designing beautiful interfaces and building functional, user-centered solutions.
          </p>
          <p className="mt-5 text-lg leading-8 text-[#46629a]">
            I enjoy learning new technologies, solving problems, and continuously improving my skills to create impactful digital products.
          </p>
          <div className="mt-8 flex gap-5 text-[#0063ff]">
            <Quote className="mt-1 size-9 shrink-0 fill-current" />
            <p className="max-w-2xl text-lg font-medium leading-8">
              Design is not just what it looks like and feels like. Design is how it works.
              <span className="ml-8 text-[#4c669e]">- Steve Jobs</span>
            </p>
          </div>
        </div>
      </section>

      <section className="glass-panel mt-5 rounded-[1.5rem] p-8 md:p-10">
        <h2 className="text-2xl font-bold text-[#08245c]">Education</h2>
        <div className="mt-8 space-y-6">
          {(educations.length ? educations : [{
            id: 'fallback',
            startYear: '2022',
            endYear: 'Present',
            degree: 'Bachelor of Science in Information Technology',
            institution: 'Buriram Rajabhat University',
            faculty: '',
            major: '',
            description: 'GPA: 3.45',
          }]).map((edu) => (
            <div key={edu.id || edu.institution} className="grid gap-5 md:grid-cols-[16rem_4rem_1fr] md:items-center">
              <div className="font-bold text-[#0063ff]">{edu.startYear} - {edu.endYear}</div>
              <span className="glass-button grid size-14 place-items-center rounded-full text-[#0063ff]"><GraduationCap className="size-7" /></span>
              <div>
                <h3 className="text-xl font-bold text-[#08245c]">{edu.degree}</h3>
                <p className="mt-2 font-medium text-[#0063ff]">{edu.institution}</p>
                {edu.description && <p className="mt-1 text-[#365891]">{edu.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
