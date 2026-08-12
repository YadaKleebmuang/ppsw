import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Code2, ImageIcon } from 'lucide-react';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  categoryName?: string;
  techNames?: string[];
}

export function ProjectCard({ project, categoryName, techNames = [] }: ProjectCardProps) {
  const { slug, titleEnglish, shortDescription, coverImageUrl, categoryId } = project;

  return (
    <Link href={`/projects/${slug}`} className="group glass-panel flex h-full flex-col overflow-hidden rounded-[1.25rem] p-4 transition hover:-translate-y-1">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-white/35">
        {coverImageUrl ? (
          <Image
            src={coverImageUrl}
            alt={titleEnglish}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-[#0063ff]">
            <ImageIcon className="size-12" />
          </div>
        )}
        <span className="glass-button absolute bottom-4 right-4 grid size-14 place-items-center rounded-full text-[#0063ff]">
          <Code2 className="size-7" />
        </span>
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#0063ff]">{categoryName || categoryId}</p>
        <h3 className="text-xl font-bold text-[#08245c]">{titleEnglish}</h3>
        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-6 text-[#46629a]">{shortDescription}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {(techNames.length ? techNames : ['Next.js', 'TypeScript', 'Tailwind CSS']).slice(0, 4).map((tech) => (
            <span key={tech} className="rounded-full border border-[#9ec3ff]/70 bg-[#dceaff]/70 px-3 py-1 text-xs font-medium text-[#0063ff]">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 inline-flex items-center gap-2 text-base font-bold text-[#005eff]">
          View Project
          <ArrowRight className="size-5 transition group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
