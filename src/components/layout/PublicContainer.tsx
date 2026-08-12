import { ReactNode } from 'react';
import { PublicNavbar } from './PublicNavbar';
import { PublicFooter } from './PublicFooter';

export function PublicContainer({ children }: { children: ReactNode }) {
  return (
    <div className="ppsw-shell flex min-h-screen flex-col font-sans">
      <PublicNavbar />
      <main className="relative z-10 flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}
