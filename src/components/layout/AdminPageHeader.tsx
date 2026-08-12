import { ReactNode } from 'react';

type AdminPageHeaderProps = {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
};

export function AdminPageHeader({ icon, eyebrow, title, description, action }: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-bold text-[#0063ff] shadow-sm">
          {icon}
          {eyebrow}
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-[#08245c]">{title}</h1>
        <p className="mt-2 text-[#5a72a4]">{description}</p>
      </div>
      {action}
    </div>
  );
}
