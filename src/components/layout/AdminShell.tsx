import { ReactNode } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#eef5ff] text-[#0b1f4d] font-sans">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 top-12 size-96 rounded-full bg-[#0063ff]/15 blur-3xl" />
        <div className="absolute right-0 top-0 size-[30rem] rounded-full bg-white/70 blur-3xl" />
        <div className="absolute bottom-0 right-20 size-[28rem] rounded-full bg-[#6aa6ff]/25 blur-3xl" />
      </div>
      <AdminSidebar />
      <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
