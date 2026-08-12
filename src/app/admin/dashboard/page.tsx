import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Cpu, FolderOpen, Mail, Settings, Sparkles, Star, User } from 'lucide-react';

export const metadata = {
  title: 'Dashboard | Admin',
};

export default function AdminDashboard() {
  const stats = [
    { name: 'Projects', value: '4', note: 'Portfolio items', icon: FolderOpen },
    { name: 'Messages', value: 'New', note: 'Contact inbox', icon: Mail },
    { name: 'Tech Stacks', value: '16+', note: 'Tools and skills', icon: Cpu },
    { name: 'Profile', value: 'Live', note: 'Public content', icon: User },
  ];

  const quickActions = [
    { title: 'Add Project', description: 'Create a new portfolio item with images and tech stack.', href: '/admin/projects/create', icon: FolderOpen },
    { title: 'Read Messages', description: 'View messages submitted from the contact form.', href: '/admin/messages', icon: Mail },
    { title: 'Edit Profile', description: 'Update hero, contact, resume, and social links.', href: '/admin/profile', icon: User },
    { title: 'Manage Skills', description: 'Update skills and technologies shown on the public site.', href: '/admin/skills', icon: Star },
  ];

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/75 bg-white/70 p-7 shadow-[0_24px_70px_rgba(41,101,202,0.12)] backdrop-blur-2xl">
        <div className="absolute -right-16 -top-16 size-48 rounded-full bg-[#0063ff]/15 blur-2xl" />
        <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#e7f1ff] px-4 py-2 text-sm font-bold text-[#0063ff]">
              <Sparkles className="size-4" />
              PPSW Portfolio
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-[#08245c] md:text-4xl">Admin Dashboard</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#5a72a4]">
              Manage the content shown on the public portfolio, including projects, profile details, skills, technologies, and contact messages.
            </p>
          </div>
          <Link
            href="/"
            target="_blank"
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#0063ff] px-6 text-sm font-bold text-white shadow-lg shadow-[#0063ff]/25 transition hover:bg-[#0051d6]"
          >
            Preview Website
            <ArrowRight className="size-4 -rotate-45" />
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="rounded-[1.5rem] border-white/75 bg-white/68 py-0 shadow-[0_18px_45px_rgba(41,101,202,0.08)] backdrop-blur-xl">
            <CardContent className="flex items-center gap-4 p-5">
              <span className="grid size-13 place-items-center rounded-2xl bg-[#e8f2ff] text-[#0063ff]">
                <stat.icon className="size-6" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#6a82b2]">{stat.name}</p>
                <p className="mt-1 text-2xl font-bold text-[#08245c]">{stat.value}</p>
                <p className="text-xs text-[#7b91bd]">{stat.note}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_22rem]">
        <div className="rounded-[1.5rem] border border-white/75 bg-white/68 p-6 shadow-[0_18px_45px_rgba(41,101,202,0.08)] backdrop-blur-xl">
          <h2 className="text-xl font-bold text-[#08245c]">Quick Actions</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="group rounded-2xl border border-white/80 bg-white/65 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-lg"
              >
                <span className="mb-4 grid size-11 place-items-center rounded-2xl bg-[#e8f2ff] text-[#0063ff] transition group-hover:bg-[#0063ff] group-hover:text-white">
                  <action.icon className="size-5" />
                </span>
                <h3 className="font-bold text-[#08245c]">{action.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5a72a4]">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/75 bg-[#0063ff] p-6 text-white shadow-[0_18px_45px_rgba(0,99,255,0.2)]">
          <Settings className="mb-5 size-10" />
          <h2 className="text-xl font-bold">Content Checklist</h2>
          <div className="mt-5 space-y-3 text-sm text-white/85">
            {['Update profile and resume link', 'Review project cover images', 'Check social links in footer', 'Reply to unread messages'].map((item) => (
              <div key={item} className="rounded-2xl bg-white/12 px-4 py-3">{item}</div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
