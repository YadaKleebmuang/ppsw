import { buttonVariants } from '@/components/ui/button';
import { Mail, MapPin } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export const metadata = {
  title: 'Contact | Personal Portfolio',
  description: 'Get in touch with me.',
};

export default function ContactPage() {
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
            <p className="text-gray-500 mt-1">hello@example.com</p>
          </div>
          <a href="mailto:hello@example.com" className={buttonVariants({ variant: "outline", className: "mt-4 rounded-full" })}>
            Send Email
          </a>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center text-center space-y-4 hover:bg-gray-100 transition-colors">
          <div className="bg-white p-4 rounded-full shadow-sm">
            <FaGithub className="h-8 w-8 text-black" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">GitHub</h3>
            <p className="text-gray-500 mt-1">@yourusername</p>
          </div>
          <a href="https://github.com" target="_blank" rel="noreferrer" className={buttonVariants({ variant: "outline", className: "mt-4 rounded-full" })}>
            View Profile
          </a>
        </div>
      </div>
    </div>
  );
}
