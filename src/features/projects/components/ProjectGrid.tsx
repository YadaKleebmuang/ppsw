'use client';

import { useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { cn } from '@/lib/utils';

interface Project {
  id: string;
  slug: string;
  titleTh: string;
  titleEn: string;
  shortDescriptionTh: string;
  tags: string[];
  category: string;
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    { id: 'All', label: 'ทั้งหมด (All)' },
    { id: 'Web App', label: 'เว็บแอปพลิเคชัน (Web App)' },
    { id: 'Chatbot', label: 'แชทบอท (Chatbot)' },
  ];

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="space-y-8">
      <div className="flex gap-4 pb-4 border-b overflow-x-auto hide-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
              activeCategory === cat.id
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map(project => (
          <ProjectCard key={project.id} {...project} />
        ))}
        
        {filteredProjects.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500">
            ไม่พบผลงานในหมวดหมู่นี้
          </div>
        )}
      </div>
    </div>
  );
}
