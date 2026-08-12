import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { FaGithub } from "react-icons/fa";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Goal,
  Images,
  Layers3,
  LayoutGrid,
  Sparkles,
  UserRoundCog,
} from "lucide-react";
import { TechIcon } from "@/components/ui/tech-icon";
import { projectRepository } from "@/repositories/project.repository";
import { techStackRepository } from "@/repositories/tech-stack.repository";
import { categoryRepository } from "@/repositories/category.repository";
import { ProjectImageGallery } from "./ProjectImageGallery";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await projectRepository.getBySlug(resolvedParams.slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.titleEnglish} | PPSW`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = await projectRepository.getBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const [allTechStacks, category] = await Promise.all([
    techStackRepository.getAllSorted(),
    categoryRepository.getById(project.categoryId),
  ]);

  const projectTechStacks = allTechStacks.filter((tech) => project.techStackIds.includes(tech.id!));
  const galleryImages = (project.images || [])
    .filter((image) => !image.isCover && image.url)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <article className="ppsw-page pb-10 pt-10">
      <span className="bubble left-[7%] top-44 size-20 hidden md:block" />
      <span className="bubble right-[8%] top-28 size-24 hidden lg:block" />
      <span className="bubble right-[2%] top-[34rem] size-28 hidden xl:block" />

      <Link
        href="/projects"
        className="glass-button mb-7 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-[#0063ff]"
      >
        <ArrowLeft className="size-4" />
        Back to Projects
      </Link>

      <section className="grid items-center gap-8 lg:grid-cols-[1fr_0.92fr]">
        <div className="space-y-6">
          <div className="glass-button inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-[#0063ff]">
            <LayoutGrid className="size-4" />
            {category?.name || "Project"}
          </div>

          <div>
            <h1 className="max-w-4xl text-[clamp(2.8rem,5vw,5.25rem)] font-bold leading-tight text-[#08245c]">
              {project.titleEnglish}
            </h1>
            {project.titleThai && (
              <h2 className="mt-3 text-2xl font-semibold leading-relaxed text-[#0063ff] md:text-3xl">
                {project.titleThai}
              </h2>
            )}
          </div>

          <p className="max-w-3xl text-lg leading-8 text-[#46629a] md:text-xl">
            {project.shortDescription}
          </p>

          <div className="flex flex-wrap gap-4">
            {project.liveDemoUrl && (
              <a href={project.liveDemoUrl} target="_blank" rel="noreferrer" className="blue-button inline-flex min-h-14 items-center gap-3 rounded-full px-8 font-bold">
                Live Demo
                <ExternalLink className="size-5" />
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="glass-button inline-flex min-h-14 items-center gap-3 rounded-full px-8 font-bold text-[#08245c]">
                <FaGithub className="size-5" />
                GitHub Repo
              </a>
            )}
          </div>
        </div>

        <div className="glass-panel relative overflow-hidden rounded-[2rem] p-4">
          <span className="bubble -right-8 -top-8 size-28" />
          <div className="relative aspect-video overflow-hidden rounded-[1.4rem] border border-white/75 bg-white/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
            {project.coverImageUrl ? (
              <img src={project.coverImageUrl} alt={project.titleEnglish} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-[#7daaf3]">
                <Images className="size-16" />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="glass-panel mt-8 grid gap-5 rounded-[1.5rem] p-6 sm:grid-cols-3">
        {[
          [Layers3, category?.name || "Project", "Category"],
          [Sparkles, `${projectTechStacks.length || project.techStackIds.length || 0}+`, "Technologies"],
          [Calendar, project.isFeatured ? "Featured" : "Published", "Status"],
        ].map(([Icon, value, label], index) => (
          <div key={String(label)} className={index ? "border-white/55 py-2 text-center sm:border-l" : "py-2 text-center"}>
            <span className="glass-button mx-auto mb-3 grid size-12 place-items-center rounded-full text-[#0063ff]">
              <Icon className="size-6" />
            </span>
            <p className="text-2xl font-bold text-[#0063ff]">{String(value)}</p>
            <p className="mt-1 text-sm text-[#46629a]">{String(label)}</p>
          </div>
        ))}
      </section>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-8">
          {project.problem && (
            <SectionCard icon={<Goal className="size-6" />} title="The Challenge">
              <p className="whitespace-pre-wrap text-lg leading-8 text-[#46629a]">{project.problem}</p>
            </SectionCard>
          )}

          <SectionCard icon={<Layers3 className="size-6" />} title="Overview">
            <div className="prose prose-lg max-w-none break-words text-[#46629a] prose-headings:text-[#08245c] prose-strong:text-[#08245c] prose-a:text-[#0063ff] prose-li:marker:text-[#0063ff]">
              <ReactMarkdown>{project.fullContent}</ReactMarkdown>
            </div>
          </SectionCard>

          {project.features && project.features.length > 0 && (
            <SectionCard icon={<CheckCircle2 className="size-6" />} title="Key Features">
              <div className="grid gap-3">
                {project.features.map((feature, index) => (
                  <div key={feature} className="flex gap-4 rounded-2xl border border-white/70 bg-white/45 p-4 text-[#46629a]">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#0063ff] text-sm font-bold text-white shadow-lg">
                      {index + 1}
                    </span>
                    <p className="leading-7">{feature}</p>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          {project.results && project.results.length > 0 && (
            <SectionCard icon={<Sparkles className="size-6" />} title="Results">
              <div className="grid gap-4 sm:grid-cols-2">
                {project.results.map((result) => (
                  <div key={result} className="rounded-2xl border border-white/70 bg-white/45 p-5 text-lg leading-8 text-[#46629a]">
                    {result}
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          {galleryImages.length > 0 && (
            <SectionCard icon={<Images className="size-6" />} title="Gallery">
              <ProjectImageGallery images={galleryImages} title={project.titleEnglish} />
            </SectionCard>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div className="glass-panel rounded-[1.5rem] p-6">
            <h3 className="mb-5 text-xl font-bold text-[#08245c]">Tech Stack</h3>
            {projectTechStacks.length > 0 ? (
              <div className="grid gap-3">
                {projectTechStacks.map((tech) => (
                  <div key={tech.id || tech.slug} className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/45 p-3">
                    <span className="glass-button grid size-12 shrink-0 place-items-center rounded-full text-[#0063ff]">
                      <TechIcon icon={tech.icon} name={tech.name} className="size-6" />
                    </span>
                    <div>
                      <p className="font-bold text-[#08245c]">{tech.name}</p>
                      <p className="text-xs text-[#5872a6]">{tech.slug}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#5872a6]">No technology specified.</p>
            )}
          </div>

          {project.objectives && project.objectives.length > 0 && (
            <SideCard icon={<Goal className="size-5" />} title="Objectives" items={project.objectives} />
          )}

          {project.responsibilities && project.responsibilities.length > 0 && (
            <SideCard icon={<UserRoundCog className="size-5" />} title="My Role" items={project.responsibilities} />
          )}

          <Link href="/contact" className="blue-button flex min-h-14 items-center justify-center gap-3 rounded-full px-6 font-bold">
            Let&apos;s Talk
            <ArrowRight className="size-5" />
          </Link>
        </aside>
      </div>
    </article>
  );
}

function SectionCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section className="glass-panel rounded-[1.75rem] p-6 md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="glass-button grid size-12 place-items-center rounded-full text-[#0063ff]">{icon}</span>
        <h2 className="text-2xl font-bold text-[#08245c]">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function SideCard({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  return (
    <div className="glass-panel rounded-[1.5rem] p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="glass-button grid size-10 place-items-center rounded-full text-[#0063ff]">{icon}</span>
        <h3 className="text-xl font-bold text-[#08245c]">{title}</h3>
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-[#46629a]">
            <span className="mt-2 size-2 shrink-0 rounded-full bg-[#0063ff]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
