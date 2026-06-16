import { getProfile } from '@/features/profile/services/profile.service';

export const metadata = {
  title: 'About Me | Personal Portfolio',
  description: 'Learn more about my background, education, and skills.',
};

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const profile = await getProfile();

  const renderSkills = (skillsString?: string) => {
    if (!skillsString) return null;
    return skillsString.split(',').map(s => s.trim()).filter(Boolean).map((skill, index) => (
      <li key={index}>{skill}</li>
    ));
  };

  return (
    <div className="max-w-3xl mx-auto py-12 space-y-16">
      <section className="space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">เกี่ยวกับฉัน</h1>
        <p className="text-gray-500 text-lg">About Me</p>
        
        <div className="prose prose-gray prose-lg mt-8">
          {profile?.aboutMeTh && (
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {profile.aboutMeTh}
            </p>
          )}
          {profile?.aboutMeEn && (
            <p className="text-gray-700 leading-relaxed mt-4 whitespace-pre-line">
              {profile.aboutMeEn}
            </p>
          )}
          {!profile?.aboutMeTh && !profile?.aboutMeEn && (
            <p className="text-gray-700 leading-relaxed">
              No about me information provided yet.
            </p>
          )}
        </div>
      </section>

      <div className="h-px w-full bg-gray-200" />

      {(profile?.educationSchool || profile?.educationDegree || profile?.educationYear) && (
        <section className="space-y-8">
          <h2 className="text-2xl font-bold tracking-tight">การศึกษา (Education)</h2>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start group">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{profile.educationSchool}</h3>
                <p className="text-gray-600 flex items-center flex-wrap gap-2 mt-1">
                  {profile.educationDegree}
                  {profile.educationGpa && (
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-md">
                      GPA {profile.educationGpa}
                    </span>
                  )}
                </p>
              </div>
              {profile.educationYear && (
                <div className="mt-2 md:mt-0 text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full w-fit">
                  {profile.educationYear}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <div className="h-px w-full bg-gray-200" />

      {(profile?.skillsFrontend || profile?.skillsBackend || profile?.skillsOther) && (
        <section className="space-y-8">
          <h2 className="text-2xl font-bold tracking-tight">ทักษะ (Skills)</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {profile.skillsFrontend && (
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Frontend</h3>
                <ul className="space-y-2 text-gray-600">
                  {renderSkills(profile.skillsFrontend)}
                </ul>
              </div>
            )}
            {profile.skillsBackend && (
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Backend</h3>
                <ul className="space-y-2 text-gray-600">
                  {renderSkills(profile.skillsBackend)}
                </ul>
              </div>
            )}
            {profile.skillsOther && (
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Other</h3>
                <ul className="space-y-2 text-gray-600">
                  {renderSkills(profile.skillsOther)}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
