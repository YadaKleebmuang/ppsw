import * as SiIcons from 'react-icons/si';
import * as FaIcons from 'react-icons/fa';
import * as TbIcons from 'react-icons/tb';

export function TechIcon({ icon }: { icon: string }) {
  if (!icon) return null;

  // 1. If it's a URL or path
  if (icon.startsWith('http') || icon.startsWith('/') || icon.startsWith('data:')) {
    return <img src={icon} alt="Tech Icon" className="w-4 h-4 object-contain" />;
  }

  // 2. React Icons mapping (runs on server, outputs SVG)
  if (icon.startsWith('Si')) {
    const IconComponent = (SiIcons as any)[icon];
    if (IconComponent) return <IconComponent className="w-4 h-4" />;
  }
  
  if (icon.startsWith('Fa')) {
    const IconComponent = (FaIcons as any)[icon];
    if (IconComponent) return <IconComponent className="w-4 h-4" />;
  }

  if (icon.startsWith('Tb')) {
    const IconComponent = (TbIcons as any)[icon];
    if (IconComponent) return <IconComponent className="w-4 h-4" />;
  }

  // Fallback
  return <div className="w-4 h-4 bg-gray-200 rounded-full shrink-0" />;
}
