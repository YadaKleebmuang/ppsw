import { profileRepository } from '@/repositories/profile.repository';
import { educationRepository } from '@/repositories/education.repository';
import { experienceRepository } from '@/repositories/experience.repository';
import { Briefcase, GraduationCap } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Portfolio',
  description: 'ประวัติส่วนตัว การศึกษา และประสบการณ์ทำงาน',
};

export const revalidate = 60;

export default async function AboutPage() {
  const [profile, educations, experiences] = await Promise.all([
    profileRepository.getProfile(),
    educationRepository.getVisibleEducations(),
    experienceRepository.getVisibleExperiences(),
  ]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gray-50 py-20 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
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
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Experience Timeline */}
          {experiences.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-10">
                <div className="p-3 bg-black text-white rounded-xl shadow-sm">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">ประสบการณ์ทำงาน</h2>
              </div>
              
              <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                {experiences.map((exp, index) => (
                  <div key={exp.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-black text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white border shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-gray-900">{exp.title}</span>
                      </div>
                      <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                        <span className="font-medium text-black">{exp.organization}</span>
                        <span>•</span>
                        <span>{String(exp.startDate)} - {exp.endDate ? String(exp.endDate) : 'ปัจจุบัน'}</span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
        </div>
      </div>
    </div>
  );
}
