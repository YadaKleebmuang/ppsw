'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { useRouter, usePathname } from 'next/navigation';
import { AdminShell } from '@/components/layout/AdminShell';
import { AuthProvider } from '@/providers/AuthProvider';

function AdminGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || isLoading) return;

    if (!isAuthenticated && !isLoginPage) {
      router.push('/admin/login');
    } else if (isAuthenticated && isLoginPage) {
      router.push('/admin/dashboard');
    }
  }, [isAuthenticated, isLoading, isLoginPage, router, mounted]);

  if (!mounted || isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return <AdminShell>{children}</AdminShell>;
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AdminGuard>{children}</AdminGuard>
    </AuthProvider>
  );
}
