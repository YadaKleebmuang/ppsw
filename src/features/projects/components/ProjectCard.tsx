import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Project } from '@/types';
import { ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { slug, titleEnglish, shortDescription, coverImageUrl, categoryId } = project;

  return (
    <Link href={`/projects/${slug}`}>
      <Card className="group overflow-hidden border bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full flex flex-col rounded-2xl">
        <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
          {coverImageUrl ? (
            <Image
              src={coverImageUrl}
              alt={titleEnglish}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <span className="font-medium">No Image</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
        <CardContent className="p-6 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-gray-500">
              {categoryId}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-black line-clamp-1">{titleEnglish}</h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">{shortDescription}</p>

          <div className="flex items-center text-sm font-medium text-black mt-auto">
            อ่านเพิ่มเติม <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
