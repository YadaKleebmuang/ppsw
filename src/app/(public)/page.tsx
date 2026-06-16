import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

export const metadata = {
  title: 'Home | Personal Portfolio',
  description: 'Welcome to my personal portfolio showcase.',
};

export default function HomePage() {
  return (
    <div className="flex flex-col space-y-32 py-16">
      {/* Hero Section */}
      <section className="flex flex-col space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-tight">
          Hi, I&apos;m <span className="text-black dark:text-white">Your Name</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          I&apos;m a passionate developer specializing in building exceptional digital experiences. 
          Currently, I&apos;m focused on building accessible, human-centered products.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-8">
          <Link href="/projects" className={buttonVariants({ size: "lg", className: "rounded-full px-8" })}>
            ดูผลงานทั้งหมด (View Projects)
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/resume" className={buttonVariants({ variant: "outline", size: "lg", className: "rounded-full px-8" })}>
            ดาวน์โหลดเรซูเม่ (Download Resume)
            <Download className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Featured Projects Preview Section */}
      <section className="space-y-12">
        <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">My Work</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Projects I&apos;ve built
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Here are some of the projects I&apos;ve worked on. Each project is a unique piece of development that solved a specific problem.
            </p>
        </div>
        
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">ผลงานแนะนำ</h2>
            <p className="text-gray-500 mt-2">Featured Projects</p>
          </div>
          <Link href="/projects" className="text-sm font-medium hover:underline flex items-center">
            ดูทั้งหมด <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Skeleton/Placeholder for now. Will be replaced by ProjectCard */}
          <div className="group relative block overflow-hidden rounded-xl bg-gray-100 aspect-video transition-all hover:shadow-xl">
             <div className="absolute inset-0 flex items-center justify-center text-gray-400">
               <span className="font-medium text-lg">COOS - Online Studio</span>
             </div>
          </div>
          <div className="group relative block overflow-hidden rounded-xl bg-gray-100 aspect-video transition-all hover:shadow-xl">
             <div className="absolute inset-0 flex items-center justify-center text-gray-400">
               <span className="font-medium text-lg">SureAboutIt Chatbot</span>
             </div>
          </div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="bg-black text-white rounded-3xl p-12 text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">สนใจร่วมงานด้วยกัน?</h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
        </p>
        <div className="pt-4">
          <Link href="/contact" className={buttonVariants({ variant: "secondary", size: "lg", className: "rounded-full px-8 bg-white text-black hover:bg-gray-200" })}>
            ติดต่อฉัน (Contact Me)
          </Link>
        </div>
      </section>
    </div>
  );
}
