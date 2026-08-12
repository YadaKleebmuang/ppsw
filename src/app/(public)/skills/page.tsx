import { Metadata } from 'next';
import { Code2, Sparkles } from 'lucide-react';
import { skillRepository } from '@/repositories/skill.repository';
import { techStackRepository } from '@/repositories/tech-stack.repository';
import { TechIcon } from '@/components/ui/tech-icon';

export const metadata: Metadata = {
  title: 'Skills | PPSW',
  description: 'Skills, tools, and technologies',
};

export const revalidate = 60;

const fallbackSkills = [
  { id: 'html', name: 'HTML', level: 95 },
  { id: 'css', name: 'CSS', level: 90 },
  { id: 'js', name: 'JavaScript', level: 85 },
  { id: 'react', name: 'React', level: 80 },
  { id: 'uiux', name: 'UI/UX Design', level: 90 },
  { id: 'responsive', name: 'Responsive Design', level: 95 },
];

export default async function SkillsPage() {
  const [skills, techStacks] = await Promise.all([
    skillRepository.getVisibleSkills(),
    techStackRepository.getAllSorted(),
  ]);

  const visibleSkills = skills.length ? skills : fallbackSkills;
  const tools = techStacks.filter((tech) => tech.isActive);

  return (
    <div className="ppsw-page pb-10 pt-10">
      <span className="bubble right-14 top-24 size-16 hidden md:block" />
      <span className="bubble left-[42%] top-40 size-12 hidden lg:block" />

      <section className="mb-8 grid items-center gap-8 lg:grid-cols-[0.9fr_1fr]">
        <div>
          <div className="glass-button mb-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-[#0063ff]">
            <Code2 className="size-4" />
            Skills
          </div>
          <h1 className="text-[clamp(3.4rem,5.5vw,5.8rem)] font-bold leading-tight text-[#08245c]">
            My <span className="text-[#0063ff]">Skills</span>
          </h1>
          <p className="mt-5 max-w-2xl text-xl leading-8 text-[#46629a]">
            Technologies, tools, and practical skills I use to design and build responsive digital products.
          </p>
        </div>

        <div className="glass-panel hidden rounded-[1.5rem] p-8 lg:block">
          <div className="grid grid-cols-3 gap-5 text-center">
            {[
              [`${visibleSkills.length}+`, 'Skill Areas'],
              [`${tools.length || 8}+`, 'Technologies'],
              ['100%', 'Learning Mindset'],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="text-3xl font-bold text-[#0063ff]">{value}</p>
                <p className="mt-2 text-sm text-[#46629a]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-[1.5rem] p-8 md:p-10">
        <h2 className="text-2xl font-bold text-[#08245c]">My Skills</h2>
        <div className="mt-3 h-1 w-10 rounded-full bg-[#0063ff]" />
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {visibleSkills.map((skill) => {
            const level = Number(skill.level) || 90;
            return (
              <div key={skill.id || skill.name} className="glass-panel rounded-2xl p-5 text-center">
                <div className="mx-auto mb-5 grid size-16 place-items-center rounded-xl bg-white/40 text-2xl font-bold text-[#0063ff]">
                  <TechIcon icon={skill.name} name={skill.name} className="h-10 w-10" />
                </div>
                <h3 className="min-h-10 text-sm font-bold text-[#08245c]">{skill.name}</h3>
                <p className="mt-3 text-sm font-bold text-[#08245c]">{level}%</p>
                <div className="mt-2 h-2 rounded-full bg-white/70">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#0063ff] to-[#55a2ff]"
                    style={{ width: `${Math.min(level, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="glass-panel mt-5 rounded-[1.5rem] p-8 md:p-10">
        <h2 className="text-2xl font-bold text-[#08245c]">Tools & Technologies</h2>
        <div className="mt-7 grid gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
          {(tools.length ? tools : []).map((tool) => (
            <div key={tool.id || tool.name} className="text-center">
              <span className="glass-button mx-auto grid size-16 place-items-center rounded-full text-3xl text-[#0063ff]">
                <TechIcon icon={tool.icon || tool.name} name={tool.name} className="h-8 w-8" />
              </span>
              <p className="mt-3 text-sm font-medium text-[#365891]">{tool.name}</p>
            </div>
          ))}

          {!tools.length && (
            <div className="col-span-full flex items-center justify-center gap-3 rounded-2xl border border-white/60 bg-white/25 p-8 text-[#46629a]">
              <Sparkles className="size-5 text-[#0063ff]" />
              Add active technologies in the admin panel to show them here.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
