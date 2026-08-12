import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  FolderOpen, 
  User, 
  Settings,
  Tags,
  Cpu,
  GraduationCap,
  Briefcase,
  Mail,
  Star,
  ExternalLink,
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/admin/projects', icon: FolderOpen },
  { name: 'Messages', href: '/admin/messages', icon: Mail },
  { name: 'Categories', href: '/admin/categories', icon: Tags },
  { name: 'Tech Stacks', href: '/admin/tech-stacks', icon: Cpu },
  { name: 'Skills', href: '/admin/skills', icon: Star },
  { name: 'Educations', href: '/admin/educations', icon: GraduationCap },
  { name: 'Experiences', href: '/admin/experiences', icon: Briefcase },
  { name: 'Profile & Resume', href: '/admin/profile', icon: User },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="relative z-20 flex h-full w-72 shrink-0 flex-col border-r border-white/70 bg-white/65 shadow-[12px_0_45px_rgba(41,101,202,0.08)] backdrop-blur-2xl">
      <div className="px-5 pb-5 pt-6">
        <Link href="/admin/dashboard" className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/70 p-3 shadow-sm">
          <span className="grid size-11 place-items-center rounded-full bg-[#0063ff] text-xl font-bold text-white shadow-lg shadow-[#0063ff]/25">
            P
          </span>
          <div>
            <p className="text-lg font-bold tracking-tight text-[#0063ff]">PPSW Admin</p>
            <p className="text-xs font-medium text-[#5d75a8]">Portfolio management</p>
          </div>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <p className="px-3 pb-2 text-xs font-bold uppercase tracking-wider text-[#7b91bd]">Manage</p>
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center rounded-2xl px-3.5 py-3 text-sm font-semibold transition',
                  isActive 
                    ? 'bg-[#0063ff] text-white shadow-lg shadow-[#0063ff]/20' 
                    : 'text-[#294678] hover:bg-white/75 hover:text-[#0063ff]'
                )}
              >
                <span className={cn('mr-3 grid size-9 place-items-center rounded-xl', isActive ? 'bg-white/18 text-white' : 'bg-[#eaf3ff] text-[#0063ff]')}>
                  <item.icon className="size-4.5" />
                </span>
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t border-white/70 p-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between rounded-2xl border border-white/80 bg-white/70 px-4 py-3 text-sm font-bold text-[#0063ff] shadow-sm transition hover:bg-white"
        >
          View Public Site
          <ExternalLink className="size-4" />
        </Link>
      </div>
    </aside>
  );
}
