'use client';

import { useEffect, useRef } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { useAuthStore } from '@/store/auth.store';
import { logout } from '@/lib/firebase/auth';
import { useRouter, usePathname } from 'next/navigation';

const INACTIVITY_TIMEOUT = 10 * 60 * 1000; // 10 minutes

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, setUser, setLoading } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          role: 'admin', // In this portfolio, we assume the logged in user is the admin
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading]);

  useEffect(() => {
    // Only track inactivity if user is logged in and in admin section (but not login page)
    if (!user || pathname === '/admin/login') {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const handleInactivity = async () => {
      await logout();
      alert('เซสชันหมดอายุ: คุณถูกออกจากระบบอัตโนมัติเนื่องจากไม่มีการใช้งานเป็นเวลานาน');
      router.push('/admin/login');
    };

    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(handleInactivity, INACTIVITY_TIMEOUT);
    };

    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    
    resetTimer(); // Initialize timer

    events.forEach((event) => window.addEventListener(event, resetTimer));

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [user, pathname, router]);

  return <>{children}</>;
}
