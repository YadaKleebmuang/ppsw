import { ProjectForm } from '@/features/projects/components/ProjectForm';
import { createProject } from '@/features/projects/services/project.service';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ProjectFormValues } from '@/features/projects/schemas/project.schema';

export const metadata = {
  title: 'Create Project | Admin',
};

export default function NewProjectPage() {
  // Form logic moved to Client Component to retain Firebase Auth context

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Project</h1>
        <p className="text-gray-500">เพิ่มผลงานใหม่ลงในพอร์ตโฟลิโอของคุณ</p>
      </div>

      <div className="bg-white p-6 rounded-md border">
        <ProjectForm />
      </div>
    </div>
  );
}
