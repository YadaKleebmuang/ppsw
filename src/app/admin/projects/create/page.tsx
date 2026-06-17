import { ProjectForm } from '@/features/projects/components/ProjectForm';

export const metadata = {
  title: 'Create Project | Admin',
};

export default function CreateProjectPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Project</h1>
        <p className="text-gray-500">เพิ่มผลงานหรือโปรเจกต์ใหม่ลงในพอร์ตโฟลิโอของคุณ</p>
      </div>

      <ProjectForm />
    </div>
  );
}
