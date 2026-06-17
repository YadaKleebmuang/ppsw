'use client';

import { useEffect, useState } from 'react';
import { ProjectForm } from '@/features/projects/components/ProjectForm';
import { projectRepository } from '@/repositories/project.repository';
import { Project } from '@/types';
import { useParams } from 'next/navigation';

export default function EditProjectPage() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const id = params.id as string;
        if (id) {
          const data = await projectRepository.getById(id);
          setProject(data || null);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProject();
  }, [params.id]);

  if (isLoading) {
    return <div className="p-8 text-center">กำลังโหลดข้อมูล...</div>;
  }

  if (!project) {
    return <div className="p-8 text-center text-red-500">ไม่พบโปรเจกต์ที่ต้องการแก้ไข</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
        <p className="text-gray-500">แก้ไขข้อมูลโปรเจกต์</p>
      </div>

      <ProjectForm initialData={project} />
    </div>
  );
}
