import { PublicContainer } from '@/components/layout/PublicContainer';
import { ReactNode } from 'react';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return <PublicContainer>{children}</PublicContainer>;
}
