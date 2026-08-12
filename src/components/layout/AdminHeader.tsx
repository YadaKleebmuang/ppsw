'use client';

import { useRouter } from 'next/navigation';
import { logout } from '@/lib/firebase/auth';
import { LogOut, Search } from 'lucide-react';

export function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <header className="sticky top-0 z-40 mx-4 mt-4 flex h-16 shrink-0 items-center rounded-3xl border border-white/75 bg-white/70 px-4 shadow-[0_18px_45px_rgba(41,101,202,0.08)] backdrop-blur-2xl sm:mx-6 sm:px-5 lg:mx-8">
      <div className="flex flex-1 items-center gap-4">
        <div className="hidden min-h-11 w-full max-w-md items-center gap-3 rounded-2xl border border-white/85 bg-white/65 px-4 text-sm font-medium text-[#7890bd] md:flex">
          <Search className="size-4 text-[#0063ff]" />
          Search admin content...
        </div>
        <div className="ml-auto flex items-center gap-x-4">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-bold text-[#08245c]">Admin</p>
            <p className="text-xs text-[#6a82b2]">Content manager</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex min-h-10 items-center gap-2 rounded-2xl border border-white/85 bg-white/75 px-4 text-sm font-bold text-[#294678] shadow-sm transition hover:bg-white hover:text-[#0063ff]"
          >
            <LogOut className="size-4" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
