import { profileRepository } from '@/repositories/profile.repository';
import { educationRepository } from '@/repositories/education.repository';
import { experienceRepository } from '@/repositories/experience.repository';
import { techStackRepository } from '@/repositories/tech-stack.repository';
import { Briefcase, GraduationCap, Code2 } from 'lucide-react';
import { TechIcon } from '@/components/ui/tech-icon';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Portfolio',
  description: 'ประวัติส่วนตัว การศึกษา และประสบการณ์ทำงาน',
};

export const revalidate = 60;

export default async function AboutPage() {
  const [profile, educations, experiences, techStacks] = await Promise.all([
    profileRepository.getProfile(),
    educationRepository.getVisibleEducations(),
    experienceRepository.getVisibleExperiences(),
    techStackRepository.getAllSorted(),
  ]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gray-50 py-20 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
            <div className="flex-1 max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
                เกี่ยวกับฉัน (About)
              </h1>
              {profile?.about ? (
                <div className="prose prose-lg text-gray-600">
                  {profile.about.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              ) : (
                <p className="text-xl text-gray-600">
                  ยินดีที่ได้รู้จักครับ ผมเป็นนักพัฒนาที่หลงใหลในการสร้างสรรค์ซอฟต์แวร์
                </p>
              )}
            </div>

            <div className="flex-1 flex justify-center md:justify-end animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gray-50 flex items-center justify-center">
                {profile?.profileImageUrl ? (
                  <img
                    src={profile.profileImageUrl}
                    alt={profile.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-6xl md:text-8xl">👩🏻‍💻</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Education Timeline */}
          {educations.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-10">
                <div className="p-3 bg-gray-100 text-black rounded-xl border shadow-sm">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">ประวัติการศึกษา</h2>
              </div>

              <div className="space-y-8">
                {educations.map(edu => (
                  <div key={edu.id} className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-gray-200 last:before:hidden">
                    <div className="absolute left-[-4px] top-2 w-2.5 h-2.5 rounded-full bg-gray-400 ring-4 ring-white" />
                    <div className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                      <h3 className="font-semibold text-lg text-gray-900">{edu.institution}</h3>
                      <div className="text-black font-medium mt-1">
                        {edu.degree} - {edu.faculty} {edu.major}
                      </div>
                      <div className="text-sm text-gray-500 mt-2">
                        {edu.startYear} - {edu.endYear}
                      </div>
                      {edu.description && (
                        <p className="text-gray-600 text-sm mt-4 leading-relaxed whitespace-pre-wrap">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Section */}
          {techStacks.filter(ts => ts.isActive).length > 0 && (
            <div className="h-full">
              <div className="flex items-center gap-3 mb-10">
                <div className="p-3 bg-gray-100 text-black rounded-xl border shadow-sm">
                  <Code2 className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">เทคโนโลยีที่ถนัด (Tech Stack)</h2>
              </div>

              <div className="flex flex-wrap gap-3">
                {techStacks.filter(ts => ts.isActive).map(ts => (
                  <div key={ts.id} className="flex items-center gap-2 px-4 py-2.5 bg-white border rounded-full text-base font-medium text-gray-800 shadow-sm hover:shadow hover:-translate-y-0.5 hover:border-gray-300 transition-all cursor-default">
                    <div className="scale-110">
                      <TechIcon icon={ts.icon} />
                    </div>
                    {ts.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
