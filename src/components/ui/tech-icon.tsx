import type { IconType } from 'react-icons';
import { createElement } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import * as TbIcons from 'react-icons/tb';
import { Bot, Code2, Database, Layout, MonitorSmartphone, Server, Sparkles } from 'lucide-react';

type IconLibrary = Record<string, IconType>;

const namedIconMap: Record<string, { icon: IconType; color: string }> = {
  html: { icon: SiIcons.SiHtml5, color: '#e34f26' },
  html5: { icon: SiIcons.SiHtml5, color: '#e34f26' },
  css: { icon: SiIcons.SiCss, color: '#1572b6' },
  css3: { icon: SiIcons.SiCss, color: '#1572b6' },
  javascript: { icon: SiIcons.SiJavascript, color: '#f7df1e' },
  js: { icon: SiIcons.SiJavascript, color: '#f7df1e' },
  typescript: { icon: SiIcons.SiTypescript, color: '#3178c6' },
  react: { icon: SiIcons.SiReact, color: '#61dafb' },
  nextjs: { icon: SiIcons.SiNextdotjs, color: '#111111' },
  next: { icon: SiIcons.SiNextdotjs, color: '#111111' },
  nodejs: { icon: SiIcons.SiNodedotjs, color: '#5fa04e' },
  expressjs: { icon: SiIcons.SiExpress, color: '#111111' },
  express: { icon: SiIcons.SiExpress, color: '#111111' },
  firebase: { icon: SiIcons.SiFirebase, color: '#ffca28' },
  mysql: { icon: SiIcons.SiMysql, color: '#4479a1' },
  git: { icon: SiIcons.SiGit, color: '#f05032' },
  github: { icon: SiIcons.SiGithub, color: '#181717' },
  figma: { icon: SiIcons.SiFigma, color: '#f24e1e' },
  tailwindcss: { icon: SiIcons.SiTailwindcss, color: '#06b6d4' },
  tailwind: { icon: SiIcons.SiTailwindcss, color: '#06b6d4' },
  vercel: { icon: SiIcons.SiVercel, color: '#111111' },
  vscode: { icon: TbIcons.TbBrandVscode, color: '#007acc' },
  visualstudiocode: { icon: TbIcons.TbBrandVscode, color: '#007acc' },
  dialogflow: { icon: SiIcons.SiDialogflow, color: '#ff9800' },
  jwt: { icon: SiIcons.SiJsonwebtokens, color: '#111111' },
  jwtauthentication: { icon: SiIcons.SiJsonwebtokens, color: '#111111' },
  line: { icon: SiIcons.SiLine, color: '#00c300' },
  linemessagingapi: { icon: SiIcons.SiLine, color: '#00c300' },
  python: { icon: SiIcons.SiPython, color: '#3776ab' },
  nlp: { icon: Bot, color: '#0063ff' },
  chatbot: { icon: Bot, color: '#0063ff' },
  chatbotdevelopment: { icon: Bot, color: '#0063ff' },
  uiuxdesign: { icon: SiIcons.SiFigma, color: '#a259ff' },
  responsive: { icon: MonitorSmartphone, color: '#3b82f6' },
  responsivedesign: { icon: MonitorSmartphone, color: '#3b82f6' },
  frontenddevelopment: { icon: Layout, color: '#0063ff' },
  backenddevelopment: { icon: Server, color: '#2563eb' },
  fullstackwebdevelopment: { icon: Code2, color: '#0063ff' },
  database: { icon: Database, color: '#4479a1' },
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function resolveLibraryIcon(icon: string) {
  if (icon.startsWith('Si')) return (SiIcons as IconLibrary)[icon];
  if (icon.startsWith('Fa')) return (FaIcons as IconLibrary)[icon];
  if (icon.startsWith('Tb')) return (TbIcons as IconLibrary)[icon];
  return null;
}

export function TechIcon({
  icon,
  name,
  className = 'h-4 w-4',
}: {
  icon?: string;
  name?: string;
  className?: string;
}) {
  const iconValue = icon?.trim();
  const nameValue = name?.trim();

  if (iconValue && (iconValue.startsWith('http') || iconValue.startsWith('/') || iconValue.startsWith('data:'))) {
    return <img src={iconValue} alt={nameValue || 'Technology icon'} className={`${className} object-contain`} />;
  }

  if (iconValue) {
    const IconComponent = resolveLibraryIcon(iconValue);
    if (IconComponent) return createElement(IconComponent, { className });
  }

  const mapped = namedIconMap[normalize(iconValue || nameValue || '')];
  if (mapped) {
    const IconComponent = mapped.icon;
    return createElement(IconComponent, { className, style: { color: mapped.color } });
  }

  return <Sparkles className={className} style={{ color: '#0063ff' }} />;
}
