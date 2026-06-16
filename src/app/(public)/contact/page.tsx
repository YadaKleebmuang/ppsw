import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { buttonVariants } from '@/components/ui/button';
import { CopyEmailButton } from './CopyEmailButton';
import { getProfile } from '@/features/profile/services/profile.service';

export const metadata = {
  title: 'Contact | Personal Portfolio',
  description: 'Get in touch with me.',
};

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  const profile = await getProfile();
  const email = profile?.email || 'yadakleebmuang@gmail.com';

  return (
    <div className="max-w-4xl mx-auto py-16 space-y-16">
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-extrabold tracking-tight">ช่องทางการติดต่อ</h1>
        <p className="text-xl text-gray-500">Contact & Connect</p>
        <p className="max-w-2xl mx-auto text-gray-600">
          หากคุณมีโปรเจกต์ที่น่าสนใจ หรือกำลังมองหาผู้ร่วมงาน สามารถติดต่อผมได้ตามช่องทางด้านล่างนี้เลยครับ
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center text-center space-y-4 hover:bg-gray-100 transition-colors">
          <div className="bg-white p-4 rounded-full shadow-sm">
            <Mail className="h-8 w-8 text-black" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">Email</h3>
            <p className="text-gray-500 mt-1">{email}</p>
          </div>
          <div className="flex gap-2 mt-4 justify-center">
            <CopyEmailButton email={email} />
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center text-center space-y-4 hover:bg-gray-100 transition-colors">
          <div className="bg-white p-4 rounded-full shadow-sm">
            <FaGithub className="h-8 w-8 text-black" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">GitHub</h3>
            <p className="text-gray-500 mt-1">{profile?.github ? profile.github.replace('https://github.com/', '@') : '@YadaKleebmuang'}</p>
          </div>
          <a href={profile?.github || "https://github.com/YadaKleebmuang"} target="_blank" rel="noreferrer" className={buttonVariants({ variant: "outline", className: "mt-4 rounded-full" })}>
            View Profile
          </a>
        </div>

        {profile?.linkedin && (
          <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center text-center space-y-4 hover:bg-gray-100 transition-colors md:col-span-2">
            <div className="bg-white p-4 rounded-full shadow-sm">
              <FaLinkedin className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">LinkedIn</h3>
              <p className="text-gray-500 mt-1">Connect with me</p>
            </div>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className={buttonVariants({ variant: "outline", className: "mt-4 rounded-full" })}>
              View LinkedIn
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
