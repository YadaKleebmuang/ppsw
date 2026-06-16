import { ProjectGrid } from '@/features/projects/components/ProjectGrid';

export const metadata = {
  title: 'Projects | Personal Portfolio',
  description: 'A showcase of my software development projects.',
};

export default function ProjectsPage() {
  // In a real scenario, these would be fetched from Firestore
  const mockProjects = [
    {
      id: '1',
      slug: 'coos-online-studio',
      titleTh: 'COOS - ระบบจัดการสตูดิโอออนไลน์',
      titleEn: 'COOS - Online Studio Management System',
      shortDescriptionTh: 'ระบบจัดการสตูดิโอและการสั่งซื้อออนไลน์',
      tags: ['Nuxt 3', 'Express.js', 'MySQL'],
      category: 'Web App',
    },
    {
      id: '2',
      slug: 'sure-about-it-chatbot',
      titleTh: 'SureAboutIt – แชทบอทให้ความรู้เรื่องเพศศึกษา',
      titleEn: 'SureAboutIt – Sexual Health Education Chatbot',
      shortDescriptionTh: 'แชทบอทให้ความรู้เรื่องเพศศึกษาสำหรับวัยรุ่นและบุคคลทั่วไป',
      tags: ['Dialogflow', 'LINE API'],
      category: 'Chatbot',
    },
    {
      id: '3',
      slug: 'life-management-platform',
      titleTh: 'แพลตฟอร์มจัดการชีวิตส่วนตัว',
      titleEn: 'Life Management Platform',
      shortDescriptionTh: 'ระบบจัดการบัญชีและชีวิตส่วนตัวบน Vercel',
      tags: ['Next.js', 'Tailwind'],
      category: 'Web App',
    }
  ];

  return (
    <div className="py-12 space-y-12">
      <section className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">ผลงาน (Projects)</h1>
        <p className="text-xl text-gray-500 max-w-2xl">
          รวบรวมผลงานและโปรเจกต์ต่างๆ ที่ผ่านมา ทั้งงานเดี่ยว งานกลุ่ม และโปรเจกต์ส่วนตัว
        </p>
      </section>

      <ProjectGrid projects={mockProjects} />
    </div>
  );
}
