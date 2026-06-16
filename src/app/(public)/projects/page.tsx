import { ProjectGrid } from '@/features/projects/components/ProjectGrid';
import { getPublishedProjects } from '@/features/projects/services/project.service';
import { ProjectFormValues } from '@/features/projects/schemas/project.schema';

export const metadata = {
  title: 'Projects | Personal Portfolio',
  description: 'A showcase of my software development projects.',
};

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const projects = await getPublishedProjects() as (ProjectFormValues & { id: string })[];

  return (
    <div className="py-12 space-y-12">
      <section className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">ผลงาน (Projects)</h1>
        <p className="text-xl text-gray-500 max-w-2xl">
          รวบรวมผลงานและโปรเจกต์ต่างๆ ที่ผ่านมา ทั้งงานเดี่ยว งานกลุ่ม และโปรเจกต์ส่วนตัว
        </p>
      </section>

      <ProjectGrid projects={projects} />
    </div>
  );
}
