import { projectRepository } from '@/repositories/project.repository';
import { techStackRepository } from '@/repositories/tech-stack.repository';
import { categoryRepository } from '@/repositories/category.repository';
import { notFound } from 'next/navigation';
import { ExternalLink, ArrowLeft, Calendar, LayoutGrid } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await projectRepository.getBySlug(resolvedParams.slug);
  if (!project) return { title: 'Project Not Found' };
  
  return {
    title: `${project.titleEnglish} | Portfolio`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = await projectRepository.getBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  // Fetch tech stacks used in this project
  const allTechStacks = await techStackRepository.getAllSorted();
  const projectTechStacks = allTechStacks.filter(t => project.techStackIds.includes(t.id!));

  // Fetch category
  const category = await categoryRepository.getById(project.categoryId);

  return (
    <article className="min-h-screen bg-white pb-24">
      {/* Header Section */}
      <section className="bg-gray-50 pt-20 pb-16 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <Link href="/projects" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black mb-8 transition-colors">
            <ArrowLeft className="mr-2 w-4 h-4" />
            กลับไปหน้าผลงานทั้งหมด
          </Link>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full">
                  {category?.name || project.categoryId}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                {project.titleEnglish}
              </h1>
              <h2 className="text-2xl font-medium text-gray-500">
                {project.titleThai}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl pt-4">
                {project.shortDescription}
              </p>
            </div>

            <div className="flex flex-wrap md:flex-col gap-3 shrink-0">
              {project.liveDemoUrl && (
                <a href={project.liveDemoUrl} target="_blank" rel="noreferrer">
                  <Button size="lg" className="w-full sm:w-auto md:w-full rounded-full font-medium">
                    <ExternalLink className="mr-2 w-4 h-4" /> Live Demo
                  </Button>
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto md:w-full rounded-full font-medium">
                    <FaGithub className="mr-2 w-4 h-4" /> GitHub Repo
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl pt-16">

        {/* Cover Image */}
        {project.coverImageUrl && (
          <div className="rounded-3xl overflow-hidden border shadow-lg mb-16 aspect-video relative group">
            <img
              src={project.coverImageUrl}
              alt={project.titleEnglish}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-16">

            {project.problem && (
              <section>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                  ปัญหาและความท้าทาย (The Challenge)
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap">
                  {project.problem}
                </p>
              </section>
            )}

            <section>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                เนื้อหาหลัก (Overview)
              </h3>
              <div className="prose prose-lg prose-gray max-w-none break-words">
                <ReactMarkdown>{project.fullContent}</ReactMarkdown>
              </div>
            </section>

            {project.features && project.features.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">ฟีเจอร์หลัก (Key Features)</h3>
                <ul className="space-y-4">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-black text-sm font-bold mr-4 shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-gray-600 leading-relaxed text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.results && project.results.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">ผลลัพธ์ (Results)</h3>
                <div className="grid gap-4">
                  {project.results.map((result, i) => (
                    <div key={i} className="p-6 bg-gray-50 rounded-2xl border text-gray-700 leading-relaxed text-lg">
                      {result}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Gallery */}
            {project.images && project.images.filter(img => !img.isCover).length > 0 && (
              <section>
                <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                  <LayoutGrid className="w-6 h-6" /> รูปภาพเพิ่มเติม (Gallery)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.images.filter(img => !img.isCover).map((img, i) => (
                    <div key={i} className="rounded-xl overflow-hidden border bg-gray-100 aspect-[4/3] group cursor-pointer relative">
                      <img src={img.url} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Right Column: Meta */}
          <div className="space-y-8 lg:sticky lg:top-24 self-start">

            <div className="p-6 bg-gray-50 rounded-2xl border space-y-6">
              <h3 className="font-bold text-gray-900 border-b pb-4">เทคโนโลยีที่ใช้ (Tech Stack)</h3>
              <div className="flex flex-wrap gap-2">
                {projectTechStacks.length > 0 ? projectTechStacks.map(tech => (
                  <span key={tech.id} className="px-3 py-1.5 bg-white border rounded-full text-sm font-medium text-gray-700 shadow-sm">
                    {tech.name}
                  </span>
                )) : (
                  <span className="text-sm text-gray-500">ไม่ได้ระบุ</span>
                )}
              </div>
            </div>

            {project.objectives && project.objectives.length > 0 && (
              <div className="p-6 bg-white border rounded-2xl shadow-sm space-y-4">
                <h3 className="font-bold text-gray-900 mb-2">เป้าหมาย (Objectives)</h3>
                <ul className="space-y-3 text-gray-600 text-sm list-disc pl-4">
                  {project.objectives.map((obj, i) => (
                    <li key={i}>{obj}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.responsibilities && project.responsibilities.length > 0 && (
              <div className="p-6 bg-black text-white rounded-2xl shadow-md space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -mr-16 -mt-16 pointer-events-none" />
                <h3 className="font-bold mb-2">บทบาทของฉัน (My Role)</h3>
                <ul className="space-y-3 text-gray-300 text-sm list-disc pl-4 relative z-10">
                  {project.responsibilities.map((res, i) => (
                    <li key={i}>{res}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>
      </div>
    </article>
  );
}
