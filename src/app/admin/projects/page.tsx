'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Project } from '@/types';
import { projectRepository } from '@/repositories/project.repository';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Eye, EyeOff, Star, FolderOpen, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const data = await projectRepository.getAllProjects();
      setProjects(data);
    } catch (error) {
      console.error(error);
      toast.error('Could not load projects.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project? Images stored in Cloudinary will not be removed automatically.')) return;

    try {
      await projectRepository.delete(id);
      toast.success('Project deleted.');
      loadProjects();
    } catch (error) {
      console.error(error);
      toast.error('Could not delete project.');
    }
  };

  const togglePublish = async (project: Project) => {
    if (!project.id) return;
    try {
      await projectRepository.update(project.id, { isPublished: !project.isPublished });
      toast.success(project.isPublished ? 'Project hidden.' : 'Project published.');
      loadProjects();
    } catch (error) {
      console.error(error);
      toast.error('Could not update publish status.');
    }
  };

  const toggleFeatured = async (project: Project) => {
    if (!project.id) return;
    try {
      await projectRepository.update(project.id, { isFeatured: !project.isFeatured });
      toast.success(project.isFeatured ? 'Removed from featured projects.' : 'Added to featured projects.');
      loadProjects();
    } catch (error) {
      console.error(error);
      toast.error('Could not update featured status.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-bold text-[#0063ff] shadow-sm">
            <FolderOpen className="size-4" />
            Portfolio Content
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#08245c]">Projects</h1>
          <p className="mt-2 text-[#5a72a4]">Create, publish, and organize the project cards shown on the public site.</p>
        </div>
        <Link href="/admin/projects/create">
          <Button className="min-h-11 rounded-full bg-[#0063ff] px-5 font-bold text-white shadow-lg shadow-[#0063ff]/20 hover:bg-[#0051d6]">
            <Plus className="mr-2 size-4" />
            Add Project
          </Button>
        </Link>
      </div>

      <div className="rounded-[1.5rem] border border-white/75 bg-white/68 p-4 shadow-[0_18px_45px_rgba(41,101,202,0.08)] backdrop-blur-xl">
        {isLoading ? (
          <div className="grid min-h-56 place-items-center text-[#6a82b2]">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="grid min-h-56 place-items-center rounded-2xl border border-dashed border-[#b8cff5] bg-white/45 text-center">
            <div>
              <FolderOpen className="mx-auto mb-3 size-10 text-[#7daaf3]" />
              <p className="font-bold text-[#08245c]">No projects yet</p>
              <p className="mt-1 text-sm text-[#6a82b2]">Add your first portfolio project.</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="grid gap-4 rounded-[1.25rem] border border-white/80 bg-white/72 p-4 shadow-sm transition hover:bg-white md:grid-cols-[5rem_minmax(0,1fr)_auto]"
              >
                {project.coverImageUrl ? (
                  <div className="h-20 w-20 overflow-hidden rounded-2xl border border-[#dce9ff] bg-[#eef5ff]">
                    <img src={project.coverImageUrl} alt={project.titleEnglish} className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <div className="grid h-20 w-20 place-items-center rounded-2xl border border-dashed border-[#b8cff5] bg-[#eef5ff] text-xs font-bold text-[#7daaf3]">
                    No img
                  </div>
                )}

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="truncate text-lg font-bold text-[#08245c]">{project.titleEnglish}</h2>
                    <Badge variant={project.isPublished ? 'default' : 'secondary'} className={project.isPublished ? 'bg-emerald-600' : ''}>
                      {project.isPublished ? 'Published' : 'Draft'}
                    </Badge>
                    {project.isFeatured && (
                      <Badge className="bg-amber-500 text-white">Featured</Badge>
                    )}
                  </div>
                  <p className="mt-1 truncate text-sm font-medium text-[#0063ff]">{project.titleThai || project.slug}</p>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#5a72a4]">{project.shortDescription}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 md:justify-end">
                  <Link href={`/projects/${project.slug}`} target="_blank">
                    <Button variant="outline" size="sm" className="rounded-full bg-white/75">
                      <ExternalLink className="mr-1 size-3.5" />
                      View
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={() => togglePublish(project)} className="rounded-full bg-white/75">
                    {project.isPublished ? <EyeOff className="mr-1 size-3.5" /> : <Eye className="mr-1 size-3.5" />}
                    {project.isPublished ? 'Hide' : 'Publish'}
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => toggleFeatured(project)} className="rounded-full bg-white/75 text-amber-500">
                    <Star className="size-4" fill={project.isFeatured ? 'currentColor' : 'none'} />
                  </Button>
                  <Link href={`/admin/projects/${project.id}`}>
                    <Button variant="outline" size="icon" className="rounded-full bg-white/75 text-[#0063ff]">
                      <Edit className="size-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="icon" onClick={() => project.id && handleDelete(project.id)} className="rounded-full bg-white/75 text-red-600">
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
