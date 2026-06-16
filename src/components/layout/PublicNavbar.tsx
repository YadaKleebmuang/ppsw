'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function PublicNavbar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'หน้าแรก (Home)', href: '/' },
    { name: 'เกี่ยวกับ (About)', href: '/about' },
    { name: 'ผลงาน (Projects)', href: '/projects' },
    { name: 'เรซูเม่ (Resume)', href: '/resume' },
    { name: 'ติดต่อ (Contact)', href: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">
              Portfolio
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link 
                    key={item.href} 
                    href={item.href} 
                    className={`px-3 py-2 text-sm transition-colors ${
                      isActive 
                        ? 'text-black font-extrabold' 
                        : 'text-gray-600 font-medium hover:text-black'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
