import { ProjectForm } from '@/features/projects/components/ProjectForm';
import { getProject, updateProject } from '@/features/projects/services/project.service';
import { redirect, notFound } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { ProjectFormValues } from '@/features/projects/schemas/project.schema';

export const metadata = {
  title: 'Edit Project | Admin',
};

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id) as (ProjectFormValues & { id: string }) | null;

  if (!project) {
    notFound();
  }

  const handleSubmit = async (data: ProjectFormValues) => {
    'use server';
    await updateProject(params.id, data);
    revalidatePath('/admin/projects');
    redirect('/admin/projects');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
        <p className="text-gray-500">แก้ไขข้อมูลผลงาน</p>
      </div>

      <div className="bg-white p-6 rounded-md border">
        <ProjectForm initialData={project} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
