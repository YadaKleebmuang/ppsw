import { profileRepository } from '@/repositories/profile.repository';
import { projectRepository } from '@/repositories/project.repository';
import { skillRepository } from '@/repositories/skill.repository';
import { techStackRepository } from '@/repositories/tech-stack.repository';
import { categoryRepository } from '@/repositories/category.repository';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail, ArrowRight, ExternalLink, Download } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { CopyEmailIcon } from './CopyEmailIcon';
import { CopyEmailActionButton } from './CopyEmailActionButton';
import { TechIcon } from '@/components/ui/tech-icon';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  const [profile, featuredProjects, allSkills, techStacks, categories] = await Promise.all([
    profileRepository.getProfile(),
    projectRepository.getFeaturedProjects(),
    skillRepository.getVisibleSkills(),
    techStackRepository.getAllSorted(),
    categoryRepository.getAllSorted(),
  ]);

  // Group skills by category
  const groupedSkills = allSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof allSkills>);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100/50 -z-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                  {profile?.fullName || 'Portfolio'}
                </h1>
                <h2 className="text-xl md:text-2xl font-medium text-gray-600">
                  {profile?.headline || 'Welcome to my portfolio'}
                </h2>
                {profile?.bio && (
                  <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                    {profile.bio}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link href="/projects">
                  <Button size="lg" className="rounded-full px-8 font-medium shadow-md hover:shadow-lg transition-all">
                    ดูผลงานทั้งหมด <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="rounded-full px-8 font-medium bg-white">
                    เกี่ยวกับฉัน
                  </Button>
                </Link>
                {profile?.resumeUrl && (
                  <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
                    <Button size="lg" variant="secondary" className="rounded-full px-8 font-medium">
                      ดู Resume <Download className="ml-2 w-4 h-4" />
                    </Button>
                  </a>
                )}
              </div>

              <div className="flex items-center gap-4 pt-4">
                {profile?.githubUrl && (
                  <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="p-2 text-gray-500 hover:text-black transition-colors bg-white rounded-full border shadow-sm hover:shadow-md">
                    <FaGithub className="w-5 h-5" />
                  </a>
                )}
                {profile?.linkedinUrl && (
                  <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="p-2 text-gray-500 hover:text-black transition-colors bg-white rounded-full border shadow-sm hover:shadow-md">
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                )}
                {profile?.email && (
                  <CopyEmailIcon email={profile.email} />
                )}
              </div>

              {techStacks && techStacks.length > 0 && (
                <div className="pt-8 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200">
                  <p className="text-sm text-gray-500 font-medium mb-3 uppercase tracking-wider">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {techStacks.filter(ts => ts.isActive).slice(0, 7).map(ts => (
                      <div key={ts.id} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border rounded-full text-sm font-medium text-gray-700 shadow-sm cursor-default hover:border-gray-400 transition-colors">
                        <TechIcon icon={ts.icon} />
                        {ts.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex-shrink-0 flex justify-center animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl bg-white flex items-center justify-center">
                <div className="text-[100px] md:text-[140px] leading-none">👩🏻‍💻</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">ผลงานเด่น</h2>
                <p className="text-gray-500">โปรเจกต์ที่น่าสนใจและประสบการณ์ที่ผ่านมา</p>
              </div>
              <Link href="/projects" className="hidden sm:flex text-sm font-medium text-black hover:underline items-center">
                ดูทั้งหมด <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-video overflow-hidden bg-gray-100">
                    {project.coverImageUrl ? (
                      <img
                        src={project.coverImageUrl}
                        alt={project.titleEnglish}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold tracking-wider uppercase text-gray-500">
                        {categories.find(c => c.id === project.categoryId)?.name || project.categoryId}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-black line-clamp-1">
                      {project.titleEnglish}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">
                      {project.shortDescription}
                    </p>
                    <div className="flex items-center text-sm font-medium text-black mt-auto">
                      อ่านเพิ่มเติม <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 sm:hidden flex justify-center">
              <Link href="/projects">
                <Button variant="outline" className="rounded-full w-full font-medium">ดูผลงานทั้งหมด</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {Object.keys(groupedSkills).length > 0 && (
        <section className="py-20 bg-gray-50 border-t">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">ทักษะและความเชี่ยวชาญ</h2>
              <p className="text-gray-500 text-lg">เครื่องมือและเทคโนโลยีที่ใช้ในการพัฒนา</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {Object.entries(groupedSkills).map(([category, skills]) => (
                <div key={category} className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold mb-6 text-gray-900 border-b pb-2">{category}</h3>
                  <div className="space-y-4">
                    {skills.map(skill => (
                      <div key={skill.id} className="group">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-gray-700 group-hover:text-black transition-colors">{skill.name}</span>
                          {skill.level && <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-full">{skill.level}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="py-24 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-black pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">สนใจร่วมงานด้วยกัน?</h2>
          <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed">
            ผมกำลังเปิดรับโอกาสในการทำงานหรือโปรเจกต์ที่น่าสนใจ หากคุณมีข้อเสนอหรือโปรเจกต์ที่อยากพูดคุย สามารถติดต่อได้เลยครับ
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {profile?.email && (
              <CopyEmailActionButton email={profile.email} />
            )}
            {profile?.linkedinUrl && (
              <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
                <Button size="lg" variant="outline" className="rounded-full px-8 bg-white text-black hover:bg-gray-100 w-full sm:w-auto font-bold h-12">
                  เชื่อมต่อผ่าน LinkedIn <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
