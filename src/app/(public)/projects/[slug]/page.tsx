import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/features/projects/services/project.service';
import { ProjectFormValues } from '@/features/projects/schemas/project.schema';

export const dynamic = 'force-dynamic';

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  let project: (ProjectFormValues & { id: string }) | null = null;
  
  try {
    project = await getProjectBySlug(resolvedParams.slug) as any;
  } catch (error) {
    console.error(error);
  }

  if (!project || !project.isPublished) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto py-12 space-y-12">
      <div className="space-y-8">
        <Link href="/projects" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          กลับไปหน้าผลงาน
        </Link>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            {project.titleTh}
          </h1>
          {project.titleEn && (
            <p className="text-xl text-gray-500 font-medium">
              {project.titleEn}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <Badge className="bg-black text-white px-3 py-1 rounded-full text-sm font-normal">
            {project.category}
          </Badge>
          {project.tags?.map((tag: string) => (
            <Badge key={tag} variant="outline" className="px-3 py-1 rounded-full text-sm font-normal border-gray-300">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {project.coverImageUrl ? (
        <div className="aspect-video w-full rounded-2xl overflow-hidden relative border">
          <img src={project.coverImageUrl} alt={project.titleTh} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="aspect-video w-full bg-gray-100 rounded-2xl overflow-hidden relative flex items-center justify-center border">
          <span className="text-gray-400 font-medium text-lg">No Cover Image</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8 border-t">
        <div className="md:col-span-2 space-y-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">ภาพรวม (Overview)</h2>
            <div className="prose prose-gray prose-lg">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {project.contentTh || project.shortDescriptionTh}
              </p>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          {(project.githubUrl || project.demoUrl) && (
            <section className="bg-gray-50 p-6 rounded-2xl space-y-6 border border-gray-100">
              <h3 className="font-bold text-gray-900">Links</h3>
              <div className="space-y-3 flex flex-col">
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={buttonVariants({ className: "w-full justify-start rounded-full bg-black hover:bg-gray-800", size: "lg" })}
                  >
                    <FaGithub className="mr-2 h-4 w-4" />
                    GitHub Repository
                  </a>
                )}
                {project.demoUrl && (
                  <a 
                    href={project.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={buttonVariants({ variant: "outline", className: "w-full justify-start rounded-full border-gray-300", size: "lg" })}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </section>
          )}
        </div>
      </div>

      {project.galleryUrls && project.galleryUrls.length > 0 && (
        <div className="space-y-6 pt-8 border-t">
          <h2 className="text-2xl font-bold tracking-tight">แกลเลอรี (Gallery)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {project.galleryUrls.map((url: string, index: number) => (
              <div key={index} className="aspect-video rounded-xl overflow-hidden border bg-gray-50 shadow-sm hover:shadow-md transition-shadow">
                <img src={url} alt={`${project.titleTh} - Gallery Image ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
