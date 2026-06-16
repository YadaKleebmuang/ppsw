import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface ProjectCardProps {
  slug: string;
  titleTh: string;
  titleEn: string;
  shortDescriptionTh: string;
  coverImage?: string;
  tags?: string[];
}

export function ProjectCard({ slug, titleTh, titleEn, shortDescriptionTh, coverImage, tags = [] }: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`}>
      <Card className="group overflow-hidden border-0 bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer h-full flex flex-col shadow-none">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-200">
          {coverImage ? (
            <Image 
              src={coverImage} 
              alt={titleEn} 
              fill 
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <span className="font-medium">No Image</span>
            </div>
          )}
        </div>
        <CardContent className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-black line-clamp-1">{titleTh}</h3>
          <p className="text-sm font-medium text-gray-500 mt-1 line-clamp-1">{titleEn}</p>
          <p className="text-gray-600 mt-4 line-clamp-2 text-sm flex-1">{shortDescriptionTh}</p>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="font-normal bg-white">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
