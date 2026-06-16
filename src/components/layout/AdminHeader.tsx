'use client';

import { useRouter } from 'next/navigation';
import { logout } from '@/lib/firebase/auth';
import { LogOut } from 'lucide-react';

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
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-white px-4 sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1"></div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button
            onClick={handleLogout}
            className="flex items-center text-sm font-medium text-gray-700 hover:text-black transition-colors"
          >
            <LogOut className="mr-2 h-4 w-4" />
            ออกจากระบบ
          </button>
        </div>
      </div>
    </header>
  );
}
