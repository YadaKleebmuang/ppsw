'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Download } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Skills', href: '/skills' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

export function PublicNavbarClient({ resumeUrl }: { resumeUrl: string }) {
  const pathname = usePathname();
  const cvHref = resumeUrl || '/contact';
  const hasResume = Boolean(resumeUrl);

  return (
    <header className="sticky top-4 z-50 px-4 pt-4">
      <nav className="glass-panel mx-auto flex h-20 w-full max-w-[108rem] items-center justify-between rounded-[2rem] px-5 md:px-8">
        <Link href="/" className="flex items-center gap-3 text-[#0063ff]">
          <span className="glass-button grid size-12 place-items-center rounded-full">
            <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-[#3a86ff] to-[#0052e8] text-2xl font-bold text-white shadow-lg">
              P
            </span>
          </span>
          <span className="text-2xl font-bold tracking-normal">PPSW.</span>
        </Link>

        <div className="hidden items-center gap-3 lg:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname === item.href.split('#')[0];

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-7 py-3 text-base font-medium transition ${
                  isActive
                    ? 'bg-[#d8e8ff] text-[#005eff] shadow-inner'
                    : 'text-[#092763] hover:bg-white/35 hover:text-[#005eff]'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        <a
          href={cvHref}
          target={hasResume ? '_blank' : undefined}
          rel={hasResume ? 'noreferrer' : undefined}
          download={hasResume}
          className="glass-button hidden items-center gap-4 rounded-full px-8 py-4 text-base font-bold text-[#005eff] md:flex"
        >
          Download CV
          <Download className="size-5" />
        </a>
      </nav>
    </header>
  );
}
