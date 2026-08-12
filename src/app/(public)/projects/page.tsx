import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, Boxes, Code2, Search, Star, UsersRound } from 'lucide-react';
import { projectRepository } from '@/repositories/project.repository';
import { categoryRepository } from '@/repositories/category.repository';
import { techStackRepository } from '@/repositories/tech-stack.repository';
import { ProjectCard } from '@/features/projects/components/ProjectCard';

export const metadata: Metadata = {
  title: 'Projects | PPSW',
  description: 'A collection of PPSW projects',
};

export const revalidate = 60;

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const [projects, categories, techStacks] = await Promise.all([
    projectRepository.getPublishedProjects(),
    categoryRepository.getAllSorted(),
    techStackRepository.getAllSorted(),
  ]);

  const selectedCategory = resolvedSearchParams.category || 'all';
  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter((project) => project.categoryId === selectedCategory);

  const techById = new Map(techStacks.map((tech) => [tech.id, tech.name]));

  return (
    <div className="ppsw-page pb-10 pt-10">
      <span className="bubble left-[44%] top-24 size-16 hidden md:block" />
      <span className="bubble right-4 top-[25rem] size-28 hidden lg:block" />

      <section className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <div className="glass-button mb-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-[#0063ff]">
            <Boxes className="size-4" />
            My Work
          </div>
          <h1 className="text-[clamp(3.4rem,5.5vw,5.8rem)] font-bold leading-tight text-[#08245c]">
            My <span className="text-[#0063ff]">Projects</span>
          </h1>
          <p className="mt-4 max-w-2xl text-xl leading-8 text-[#46629a]">
            A collection of projects that showcase my skills, problem-solving abilities, and passion for creating meaningful digital experiences.
          </p>
        </div>

        <div className="glass-panel grid rounded-[1.5rem] p-8 sm:grid-cols-4">
          {[
            [Boxes, `${Math.max(projects.length, 10)}+`, 'Projects Completed'],
            [Code2, `${Math.max(techStacks.filter((tech) => tech.isActive).length, 5)}+`, 'Technologies Used'],
            [UsersRound, '8+', 'Happy Clients'],
            [Star, '100%', 'Passion in Every Project'],
          ].map(([Icon, value, label], index) => (
            <div key={String(label)} className={index ? 'border-white/55 py-2 text-center sm:border-l' : 'py-2 text-center'}>
              <span className="glass-button mx-auto mb-4 grid size-12 place-items-center rounded-full text-[#0063ff]">
                <Icon className="size-6" />
              </span>
              <p className="text-3xl font-bold text-[#0063ff]">{String(value)}</p>
              <p className="mt-2 text-sm leading-5 text-[#46629a]">{String(label)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-panel mt-8 rounded-[2rem] p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3">
            <Link href="/projects" className={`rounded-full px-6 py-3 text-sm font-bold transition ${selectedCategory === 'all' ? 'blue-button' : 'glass-button text-[#08245c]'}`}>
              All Projects
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/projects?category=${category.id}`}
                className={`rounded-full px-6 py-3 text-sm font-bold transition ${selectedCategory === category.id ? 'blue-button' : 'glass-button text-[#08245c]'}`}
              >
                {category.name}
              </Link>
            ))}
          </div>

          <div className="glass-button flex min-h-12 w-full items-center gap-3 rounded-full px-5 text-[#5872a6] lg:w-80">
            <Search className="size-5" />
            <span className="text-sm">Search projects...</span>
          </div>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {filteredProjects.map((project) => {
              const categoryName = categories.find((category) => category.id === project.categoryId)?.name;
              const techNames = project.techStackIds.map((id) => techById.get(id)).filter(Boolean) as string[];
              return <ProjectCard key={project.id || project.slug} project={project} categoryName={categoryName} techNames={techNames} />;
            })}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-white/70 bg-white/35 py-20 text-center">
            <Boxes className="mx-auto mb-4 size-12 text-[#7daaf3]" />
            <h3 className="text-xl font-bold text-[#08245c]">No projects in this category</h3>
            <p className="mt-2 text-[#46629a]">Choose another category to view more work.</p>
          </div>
        )}
      </section>

      <section className="glass-panel mt-5 flex flex-col items-center justify-between gap-6 rounded-[1.25rem] p-7 md:flex-row">
        <div className="flex items-center gap-5">
          <span className="glass-button grid size-16 place-items-center rounded-full text-[#0063ff]">
            <ArrowRight className="size-7 -rotate-45" />
          </span>
          <div>
            <h2 className="text-2xl font-bold text-[#08245c]">Have a project in mind?</h2>
            <p className="mt-2 text-[#46629a]">Let&apos;s work together to bring your ideas to life.</p>
          </div>
        </div>
        <Link href="/contact" className="blue-button inline-flex min-h-14 min-w-60 items-center justify-center gap-4 rounded-full px-8 text-base font-bold">
          Let&apos;s Talk
          <ArrowRight className="size-5" />
        </Link>
      </section>
    </div>
  );
}
