import { projectRepository } from '@/repositories/project.repository';
import { categoryRepository } from '@/repositories/category.repository';
import Link from 'next/link';
import { ArrowRight, FolderOpen } from 'lucide-react';
import { Metadata } from 'next';
import { ProjectCard } from '@/features/projects/components/ProjectCard';

export const metadata: Metadata = {
  title: 'Projects | Portfolio',
  description: 'รวมผลงานและโปรเจกต์ที่ผ่านมา',
};

export const revalidate = 60;

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const [projects, categories] = await Promise.all([
    projectRepository.getPublishedProjects(),
    categoryRepository.getAllSorted(),
  ]);

  const selectedCategory = resolvedSearchParams.category || 'all';

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.categoryId === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <section className="bg-white py-20 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gray-100 text-black rounded-xl border shadow-sm">
                <FolderOpen className="w-6 h-6" />
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                ผลงาน (Projects)
              </h1>
            </div>
            <p className="text-xl text-gray-600 mt-6">
              รวบรวมผลงานและโปรเจกต์ที่ผมได้พัฒนา ทั้งงานส่วนตัวและโปรเจกต์ที่ทำร่วมกับทีม
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          <Link 
            href="/projects" 
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'all' 
                ? 'bg-black text-white shadow-md' 
                : 'bg-white text-gray-600 border hover:border-gray-400'
            }`}
          >
            ทั้งหมด
          </Link>
          {categories.map(cat => (
            <Link 
              key={cat.id} 
              href={`/projects?category=${cat.id}`}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat.id 
                  ? 'bg-black text-white shadow-md' 
                  : 'bg-white text-gray-600 border hover:border-gray-400'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-2xl border border-dashed">
            <FolderOpen className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">ไม่มีผลงานในหมวดหมู่นี้</h3>
            <p className="mt-1 text-gray-500">ทดลองเลือกหมวดหมู่ใหม่ หรือกลับไปดูผลงานทั้งหมด</p>
            <div className="mt-6">
              <Link href="/projects">
                <button type="button" className="inline-flex items-center rounded-full bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800">
                  ดูผลงานทั้งหมด
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
