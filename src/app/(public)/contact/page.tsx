import { profileRepository } from '@/repositories/profile.repository';
import { Mail, MapPin, Download } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import { CopyEmailButton } from './CopyEmailButton';

export const metadata: Metadata = {
  title: 'Contact | Portfolio',
  description: 'ติดต่อหรือดาวน์โหลดเรซูเม่',
};

export const revalidate = 60;

export default async function ContactPage() {
  const profile = await profileRepository.getProfile();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gray-50 py-20 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
              ติดต่อ (Contact)
            </h1>
            <p className="text-xl text-gray-600">
              สนใจร่วมงานกัน มีโปรเจกต์ที่น่าสนใจ หรือต้องการสอบถามข้อมูลเพิ่มเติม สามารถติดต่อฉันได้ตามช่องทางด้านล่างนี้เลยค่ะ
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          
          {/* Contact Methods */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">ช่องทางการติดต่อ</h2>
            
            {profile?.email && (
              <CopyEmailButton email={profile.email} />
            )}

            {profile?.linkedinUrl && (
              <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="group flex items-center p-6 bg-white border rounded-2xl shadow-sm hover:shadow-md transition-all hover:border-[#0077b5]">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#0077b5] group-hover:text-white transition-colors shrink-0">
                  <FaLinkedin className="w-5 h-5" />
                </div>
                <div className="ml-6">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">LinkedIn</h3>
                  <p className="text-lg font-semibold text-gray-900 group-hover:underline">ดูโปรไฟล์ LinkedIn</p>
                </div>
              </a>
            )}

            {profile?.githubUrl && (
              <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="group flex items-center p-6 bg-white border rounded-2xl shadow-sm hover:shadow-md transition-all hover:border-black">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors shrink-0">
                  <FaGithub className="w-5 h-5" />
                </div>
                <div className="ml-6">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">GitHub</h3>
                  <p className="text-lg font-semibold text-gray-900 group-hover:underline">ดู Source Code และผลงาน</p>
                </div>
              </a>
            )}

          </div>

          {/* Download Resume & Location */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">ข้อมูลเพิ่มเติม</h2>
            
            <div className="p-8 bg-black text-white rounded-3xl shadow-xl relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4">Resume</h3>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  สามารถกดดู Resume ของฉันได้ที่นี่เพื่อดูรายละเอียดประวัติการศึกษา ประสบการณ์ทำงาน และทักษะ
                </p>
                {/* 
                  Note: For real world use, the user should provide a resume URL in the profile. 
                  Currently, we can mock it or provide a mailto link asking for it.
                */}
                {profile?.resumeUrl ? (
                  <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
                    <Button size="lg" className="w-full bg-white text-black hover:bg-gray-100 rounded-xl font-bold">
                      <Download className="mr-2 w-5 h-5" /> Resume
                    </Button>
                  </a>
                ) : (
                  <Button size="lg" disabled className="w-full bg-white/50 text-gray-500 rounded-xl font-bold cursor-not-allowed">
                    <Download className="mr-2 w-5 h-5" /> ยังไม่มีไฟล์ Resume
                  </Button>
                )}
              </div>
            </div>

            <div className="p-8 bg-gray-50 rounded-3xl border">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-white border shadow-sm flex items-center justify-center text-black">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">สถานที่ทำงาน</h3>
              </div>
              <p className="text-gray-600 pl-14">
                Bangkok, Thailand (On-site / Hybrid / Remote)
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
