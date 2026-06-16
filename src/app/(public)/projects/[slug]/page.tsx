import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  // Mock data based on slug. In reality, fetch from Firestore
  const isCoos = params.slug === 'coos-online-studio';

  return (
    <article className="max-w-4xl mx-auto py-12 space-y-12">
      <div className="space-y-8">
        <Link href="/projects" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          กลับไปหน้าผลงาน
        </Link>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            {isCoos ? 'COOS - ระบบจัดการสตูดิโอออนไลน์' : 'SureAboutIt – แชทบอทให้ความรู้เรื่องเพศศึกษา'}
          </h1>
          <p className="text-xl text-gray-500 font-medium">
            {isCoos ? 'COOS - Online Studio Management System' : 'SureAboutIt – Sexual Health Education Chatbot'}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Badge className="bg-black text-white px-3 py-1 rounded-full text-sm font-normal">
            {isCoos ? 'Web Application' : 'Chatbot'}
          </Badge>
          <Badge variant="outline" className="px-3 py-1 rounded-full text-sm font-normal border-gray-300">
            {isCoos ? 'Nuxt 3' : 'Dialogflow'}
          </Badge>
          <Badge variant="outline" className="px-3 py-1 rounded-full text-sm font-normal border-gray-300">
            {isCoos ? 'MySQL' : 'LINE API'}
          </Badge>
        </div>
      </div>

      <div className="aspect-video w-full bg-gray-100 rounded-2xl overflow-hidden relative flex items-center justify-center border">
        <span className="text-gray-400 font-medium text-lg">Project Cover Image</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8 border-t">
        <div className="md:col-span-2 space-y-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">ภาพรวม (Overview)</h2>
            <div className="prose prose-gray prose-lg">
              <p className="text-gray-700 leading-relaxed">
                {isCoos
                  ? 'ออกแบบฐานข้อมูลและระบบสำหรับให้ลูกค้าจัดการสตูดิโอ พัฒนา Dashboard สำหรับลูกค้าและระบบจัดการคำสั่งซื้อ'
                  : 'พัฒนาแชทบอทด้วย Dialogflow และ LINE Messaging API บริหารจัดการโปรเจกต์เองทั้งหมด ตั้งแต่การออกแบบจนถึงการนำไปใช้งานจริง'}
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">หน้าที่รับผิดชอบ (Responsibilities)</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg leading-relaxed">
              {isCoos ? (
                <>
                  <li>Designed database schema and system architecture.</li>
                  <li>Developed customer dashboard and order management workflow.</li>
                  <li>Implemented role-based authentication and authorization.</li>
                </>
              ) : (
                <>
                  <li>Developed a chatbot solution using Dialogflow and LINE Messaging API.</li>
                  <li>Designed conversational workflows and user interaction flows.</li>
                  <li>Integrated multimedia content including text, audio, video, and infographics.</li>
                </>
              )}
            </ul>
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-gray-50 p-6 rounded-2xl space-y-6 border border-gray-100">
            <h3 className="font-bold text-gray-900">Links</h3>
            <div className="space-y-3 flex flex-col">
              <Button className="w-full justify-start rounded-full bg-black hover:bg-gray-800" size="lg">
                <FaGithub className="mr-2 h-4 w-4" />
                GitHub Repository
              </Button>
              <Button variant="outline" className="w-full justify-start rounded-full border-gray-300" size="lg">
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </Button>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
