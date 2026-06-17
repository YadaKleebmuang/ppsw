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
  Star
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/admin/projects', icon: FolderOpen },
  { name: 'Categories', href: '/admin/categories', icon: Tags },
  { name: 'Tech Stacks', href: '/admin/tech-stacks', icon: Cpu },
  { name: 'Skills', href: '/admin/skills', icon: Star },
  { name: 'Educations', href: '/admin/educations', icon: GraduationCap },
  { name: 'Experiences', href: '/admin/experiences', icon: Briefcase },
  { name: 'Profile & Resume', href: '/admin/profile', icon: User },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-white">
      <div className="flex h-16 items-center px-6 border-b">
        <span className="text-lg font-bold text-gray-900 tracking-tight">Admin Panel</span>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive 
                    ? 'bg-black text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <item.icon className={cn('mr-3 h-5 w-5', isActive ? 'text-white' : 'text-gray-400')} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
