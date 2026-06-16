import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export const metadata = {
  title: 'Resume | Personal Portfolio',
  description: 'Download or view my resume.',
};

export default function ResumePage() {
  return (
    <div className="max-w-4xl mx-auto py-16 space-y-12">
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">เรซูเม่ (Resume)</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          ดาวน์โหลดเอกสารเพื่อดูประวัติการศึกษา ประสบการณ์ทำงาน และทักษะแบบครบถ้วน
        </p>
      </section>

      <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 md:p-16 flex flex-col items-center justify-center space-y-8 text-center">
        <div className="w-20 h-24 bg-white border-2 border-gray-200 rounded-lg shadow-sm flex items-center justify-center">
          <span className="text-gray-400 font-bold text-xl">PDF</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Software Engineer Resume</h2>
          <p className="text-gray-500 mt-2">อัปเดตล่าสุด: มิถุนายน 2026</p>
        </div>
        <Button size="lg" className="rounded-full px-8 bg-black hover:bg-gray-800 shadow-lg shadow-black/10">
          <Download className="mr-2 h-5 w-5" />
          ดาวน์โหลดไฟล์ PDF
        </Button>
      </div>
    </div>
  );
}
